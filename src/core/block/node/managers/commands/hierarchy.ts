// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { isNodeCloneable, isNodeDeletable, findNodeIdenticalSiblings, findNodeDefinition, overwriteNodeInTree, pickNodeStoreState, validateNodeInstance, isNodeStructureValid, duplicateNodeInTree, addNodeToTree, addNodesToTree, deleteNodeFromTree, createNode, detachNodeFromParent, pickNodeDefinitions, pickNodeDefinition, pickNodeInstance, validateNodeID, validateNodeKey, findNodeInsertionIndex } from '@/core/block/node/helpers';
import { findRequiredElements, hasElementRequiredElements, pickElementDefinitions, pickElementDefinition } from '@/core/block/element/helpers';

// Types
import type { NodeID, NodeKey, NodeInstance } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';
import { elementRegistryState } from '@/core/block/element/states/registry';

// Managers
import { selectBlockNodePreviousNode, canBlockNodeBeCloned } from '@/core/block/node/managers/';

// Clipboard storage for copy/paste operations
export let clipboardNodeInstance: NodeInstance | null = null;

/**
 * Adds a new block instance of the specified type to the page hierarchy.
 *
 * This operation creates a new node instance based on the provided node key and element key,
 * validates that it can be added as a child of the specified parent (checking element rules),
 * and inserts it into the block store. The new node is appended to the end of the parent's
 * child list. If validation fails, the operation is aborted and no changes are made.
 *
 * @param nodeKey - The unique key identifying the type of node to create (e.g., 'container', 'text')
 * @param targetNodeID - The unique identifier of the parent node where the new node will be added
 * @param nodeElementKey - The HTML element key that defines the node's rendering behavior
 * @param options - Optional configuration object containing initial data for the node
 * @returns The newly created node instance if successful, undefined if validation fails
 * @see {@link addBlockNodes} - For adding multiple nodes atomically
 * @see {@link createNode} - The underlying node creation function
 * @see {@link addNodeToTree} - The tree insertion operation
 */
export function addBlockNode(nodeKey: NodeKey, targetNodeID: NodeID, nodeElementKey: ElementKey, options?: { data?: {} }): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → addBlockNode]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
			parentID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeDefinition: pickNodeDefinition(data.nodeKey, data.nodeDefinitions),
		}))
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.parentID, data.nodeStoreState.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.find((data) => ({
			insertionIndex: findNodeInsertionIndex(nodeElementKey, data.parentNodeInstance, data.nodeStoreState.storedNodes, data.elementDefinitions),
		}))
		.operate((data) => ({
			createdNode: createNode(data.sourceNodeDefinition, data.parentID, nodeElementKey, options),
		}))
		.operate((data) => ({
			mutatedNodeStore: addNodeToTree(data.createdNode, data.nodeStoreState.storedNodes, data.insertionIndex),
		}))
		.condition((data) => ({
			isNodeStructureValid: isNodeStructureValid(data.createdNode.id, data.elementDefinitions, data.mutatedNodeStore),
		}))
		.execute();
	if (!validData) return;

	// Add block to store
	useNodeStore.setState((state) => {
		return { storedNodes: { ...state.storedNodes, ...validData.mutatedNodeStore } };
	});

	// Validate, pick, and operate on required data
	const requiredData = new ResultPipeline('[BlockManager → addRequiredNodes]')
		.pick(() => ({
			sourceNodeInstance: pickNodeInstance(validData.createdNode.id, validData.mutatedNodeStore),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			sourceElementDefinition: pickElementDefinition(data.sourceNodeInstance.elementKey, data.elementDefinitions),
		}))
		.check((data) => ({
			hasRequiredElements: hasElementRequiredElements(data.sourceElementDefinition),
		}))
		.find((data) => ({
			requiredElementKeys: findRequiredElements(data.sourceElementDefinition),
		}))
		.execute();
	if (!requiredData) return;

	// Add each required element as a new node under the source node
	for (const elementKey of requiredData.requiredElementKeys) {
		const nodeDefinition = findNodeDefinition(elementKey, validData.nodeDefinitions);

		if (nodeDefinition.status !== 'found') {
			devLog.error(`[BlockManager → addRequiredNodes] No node definition found for required element key '${elementKey}'`);
			continue;
		}

		addBlockNode(nodeDefinition.data.key, requiredData.sourceNodeInstance.id, elementKey);
	}
}

/**
 * Adds multiple new block instances to the page hierarchy in a single atomic operation.
 *
 * This function validates all requested nodes before adding any of them. If any node
 * fails validation (due to invalid keys, parent relationships, or element rules), the
 * entire operation is aborted and no nodes are added. This ensures data consistency
 * when performing bulk insertions.
 *
 * @param nodeConfigs - Array of configuration tuples, each containing:
 *   - nodeKey: The type of node to create
 *   - targetNodeID: The parent node identifier
 *   - nodeElementKey: The HTML element key for rendering
 *   - options: Optional initial data configuration
 * @returns Array of successfully created node instances, or undefined if any validation failed
 * @see {@link addBlockNode} - For adding a single node
 * @see {@link isNodeStructureValid} - The validation function used to check node compatibility
 */
export function addBlockNodes(nodeConfigs: [NodeKey, NodeID, ElementKey, { data?: {} }?][]): NodeInstance[] | undefined {
	const createdNodes: NodeInstance[] = [];
	// Track the current child count for each parent during validation.
	// This ensures that when validating multiple nodes to the same parent,
	// the validation uses the updated count after each addition in the batch,
	// preventing issues with rules that depend on child count (e.g., max children).
	const currentChildCounts: Record<NodeID, number> = {};
	for (const [nodeKey, targetNodeID, nodeElementKey, options] of nodeConfigs) {
		const validData = new ResultPipeline('[BlockManager → addBlockNode]')
			.validate({
				nodeKey: validateNodeKey(nodeKey),
				parentID: validateNodeID(targetNodeID),
			})
			.pick(() => ({
				nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
				nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
			}))
			.pick((data) => ({
				sourceNodeDefinition: pickNodeDefinition(data.nodeKey, data.nodeDefinitions),
			}))
			.pick((data) => ({
				parentNodeInstance: pickNodeInstance(data.parentID, data.nodeStoreState.storedNodes),
				elementDefinitions: pickElementDefinitions(elementRegistryState),
			}))
			.operate((data) => ({
				createdNode: createNode(data.sourceNodeDefinition, data.parentID, nodeElementKey, options),
			}))
			.operate((data) => ({
				mutatedNodeStore: addNodeToTree(data.createdNode, data.nodeStoreState.storedNodes),
			}))
			.check((data) => ({
				isNodeStructureValid: isNodeStructureValid(data.createdNode.id, data.elementDefinitions, data.mutatedNodeStore),
			}))
			.execute();
		if (!validData) return undefined;

		createdNodes.push(validData.createdNode);

		// Increment the child count for this parent after successful validation.
		// This simulates the addition for subsequent validations in the batch.
		currentChildCounts[validData.parentID] = (currentChildCounts[validData.parentID] || 0) + 1;
	}

	// Add all blocks to the tree progressively
	const addedNodes = addNodesToTree(createdNodes, useNodeStore.getState().storedNodes);
	if (!addedNodes.success) return undefined;

	// Update the store with the new nodes
	useNodeStore.setState((state) => {
		return { storedNodes: { ...state.storedNodes, ...addedNodes.data } };
	});
	return createdNodes;
}

/**
 * Deletes a block instance and all its descendants from the page hierarchy.
 *
 * This operation performs a two-phase deletion: first, it detaches the node from its parent
 * to update the tree structure immediately, then after a short delay, it completely removes
 * the node and its subtree from the store. The delay allows React components to unmount
 * gracefully. The root 'body' node cannot be deleted to maintain page structure integrity.
 *
 * If the node is currently selected, the selection is cleared after deletion.
 *
 * @param sourceNodeID - The unique identifier of the block instance to delete
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link deleteNodeFromTree} - The underlying tree deletion operation
 * @see {@link detachNodeFromParent} - The initial detachment operation
 */
export function deleteBlockNode(sourceNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → deleteBlockNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick((data) => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, useNodeStore.getState().storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			sourceElementDefinition: pickElementDefinition(data.sourceNodeInstance.elementKey, data.elementDefinitions),
			parentNodeInstance: pickNodeInstance(data.sourceNodeInstance.parentID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.elementKey, data.elementDefinitions),
		}))
		.find((data) => ({
			identicalSiblings: findNodeIdenticalSiblings(data.sourceNodeInstance, data.nodeStoreState.storedNodes),
		}))
		.check((data) => ({
			canNodeBeDeleted: isNodeDeletable(data.sourceNodeInstance.elementKey, data.parentElementDefinition, data.identicalSiblings.length),
		}))
		.operate((data) => ({
			mutatedNodeStore: deleteNodeFromTree(data.sourceNodeInstance, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Clear selection if the deleted node was selected
	if (validData.nodeStoreState.selectedNodeID === sourceNodeID) selectBlockNodePreviousNode();

	// Apply the deletion to the store
	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedNodeStore };
	});
}

/**
 * Duplicates a block instance and all its descendants, inserting the copy as a sibling.
 *
 * This operation creates a deep clone of the specified node and its entire subtree,
 * generating new unique IDs for all cloned nodes while preserving the hierarchical
 * structure and relationships. The duplicated subtree is inserted immediately after
 * the original node within its parent's child list, maintaining the same parent relationship.
 *
 * @param sourceNodeID - The unique identifier of the block instance to duplicate
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link duplicateNodeInTree} - The underlying tree duplication operation
 * @see {@link cloneNode} - The deep cloning function used internally
 */
export function duplicateBlockNode(sourceNodeID: NodeID): void {
	if (!canBlockNodeBeCloned(sourceNodeID)) return devLog.error(`[BlockManager → duplicateBlockNode] Node '${sourceNodeID}' is not clonable`);

	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → duplicateBlockNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.sourceNodeInstance.parentID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.elementKey, data.elementDefinitions),
		}))
		.find((data) => ({
			identicalSiblings: findNodeIdenticalSiblings(data.sourceNodeInstance, data.nodeStoreState.storedNodes),
		}))
		.check((data) => ({
			canNodeBeCloned: isNodeCloneable(data.sourceNodeInstance.elementKey, data.parentElementDefinition, data.identicalSiblings.length),
		}))
		.operate((data) => ({
			mutatedNodeStore: duplicateNodeInTree(data.sourceNodeInstance, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Apply the cloned tree returned by the helper
	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedNodeStore };
	});
}

/**
 * Copies a block instance and all its descendants to the clipboard for later pasting.
 *
 * This operation performs a deep clone of the specified node and its entire subtree,
 * storing the complete hierarchical structure in memory. The copied data can then
 * be used to overwrite other nodes via the paste operation, enabling content duplication
 * and replacement workflows.
 *
 * @param sourceNodeID - The unique identifier of the block instance to copy to the clipboard
 * @returns void - This function does not return a value but updates the global clipboard state
 * @see {@link pasteBlockNode} - The complementary operation that applies the copied content
 * @see {@link overwriteNodeInTree} - The underlying tree operation used during pasting
 */
export function copyBlockNode(sourceNodeID: NodeID): void {
	// Validate and pick the blockInstance to copy
	const validData = new ResultPipeline('[BlockManager → copyBlockNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Store the entire blockInstance tree in clipboard
	clipboardNodeInstance = JSON.parse(JSON.stringify(validData.blockInstance));
}

/**
 * Pastes a copied block instance by replacing the target block's content with clipboard content.
 *
 * This operation takes the block instance previously stored in the clipboard and uses it
 * to completely overwrite the target node. The target's position in the hierarchy is preserved,
 * but its definition key, styles, attributes, and child structure are replaced with those
 * from the clipboard. This enables content replacement while maintaining layout relationships.
 *
 * If no content exists in the clipboard, the operation is silently ignored.
 *
 * @param sourceNodeID - The unique identifier of the block instance to replace with clipboard content
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link copyBlockNode} - The operation that populates the clipboard with content
 * @see {@link overwriteNodeInTree} - The core tree manipulation function used for the replacement
 */
export function pasteBlockNode(sourceNodeID: NodeID): void {
	if (!clipboardNodeInstance) return (devLog.error(`[BlockManager → pasteBlockNode] No blockInstance in clipboard`), undefined);

	// Validate and pick the target blockInstance to paste into
	const validData = new ResultPipeline('[BlockManager → pasteBlockNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.validate(() => ({
			clipboardBlock: validateNodeInstance(clipboardNodeInstance),
		}))
		.operate((data) => ({
			mutatedNodeStore: overwriteNodeInTree(data.clipboardBlock, data.sourceNodeInstance, data.nodeStoreState.storedNodes),
		}))
		.condition((data) => ({
			isNodeStructureValid: isNodeStructureValid(data.sourceNodeID, data.elementDefinitions, data.mutatedNodeStore),
		}))
		.execute();
	if (!validData) return;

	// Update the block store with the new blockInstance tree
	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedNodeStore };
	});
}
