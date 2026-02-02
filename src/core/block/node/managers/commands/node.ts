// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { overwriteNodeInTree, pickNodeStoreState, validateNodeInstance, passesAllRules, duplicateNodeInTree, addNodeToTree, addNodesToTree, deleteNodeFromTree, createNode, detachNodeFromParent, pickNodeDefinitions, pickNodeDefinition, pickNodeInstance, validateNodeID, validateNodeKey } from '@/core/block/node/helpers';
import { pickElementDefinition, pickElementDefinitions } from '@/core/block/element/helpers/pickers';

// Types
import type { NodeID, NodeKey, NodeInstance } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';
import { elementRegistryState } from '@/core/block/element/states/registry';

/**
 * Adds a new block instance of the specified type to the page hierarchy.
 *
 * This operation creates a new node instance based on the provided node key and element key,
 * validates that it can be added as a child of the specified parent (checking element rules),
 * and inserts it into the block store. The new node is appended to the end of the parent's
 * child list. If validation fails, the operation is aborted and no changes are made.
 *
 * @param nodeKey - The unique key identifying the type of node to create (e.g., 'container', 'text')
 * @param parentNodeID - The unique identifier of the parent node where the new node will be added
 * @param nodeElementKey - The HTML element key that defines the node's rendering behavior
 * @param options - Optional configuration object containing initial data for the node
 * @returns The newly created node instance if successful, undefined if validation fails
 * @see {@link addNodes} - For adding multiple nodes atomically
 * @see {@link createNode} - The underlying node creation function
 * @see {@link addNodeToTree} - The tree insertion operation
 */
export function addNode(nodeKey: NodeKey, parentNodeID: NodeID, nodeElementKey: ElementKey, options?: { data?: {} }): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → addNode]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
			parentID: validateNodeID(parentNodeID),
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
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.elementKey, data.elementDefinitions),
			sourceElementDefinition: pickElementDefinition(nodeElementKey, data.elementDefinitions),
		}))
		.operate((data) => ({
			createdNode: createNode(data.sourceNodeDefinition, data.parentID, nodeElementKey, options),
		}))
		.condition((data) => ({
			rulesPass: passesAllRules(data.createdNode, data.parentNodeInstance, data.parentElementDefinition, data.sourceElementDefinition, data.nodeStoreState.storedNodes, data.parentNodeInstance.childNodeIDs.length),
		}))
		.operate((data) => ({
			addedNode: addNodeToTree(data.createdNode, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Add block to store
	useNodeStore.setState((state) => {
		return { storedNodes: { ...state.storedNodes, ...validData.addedNode } };
	});
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
 *   - parentNodeID: The parent node identifier
 *   - nodeElementKey: The HTML element key for rendering
 *   - options: Optional initial data configuration
 * @returns Array of successfully created node instances, or undefined if any validation failed
 * @see {@link addNode} - For adding a single node
 * @see {@link passesAllRules} - The validation function used to check node compatibility
 */
export function addNodes(nodeConfigs: [NodeKey, NodeID, ElementKey, { data?: {} }?][]): NodeInstance[] | undefined {
	const createdNodes: NodeInstance[] = [];
	// Track the current child count for each parent during validation.
	// This ensures that when validating multiple nodes to the same parent,
	// the validation uses the updated count after each addition in the batch,
	// preventing issues with rules that depend on child count (e.g., max children).
	const currentChildCounts: Record<NodeID, number> = {};
	for (const [nodeKey, parentNodeID, nodeElementKey, options] of nodeConfigs) {
		const validData = new ResultPipeline('[BlockManager → addNode]')
			.validate({
				nodeKey: validateNodeKey(nodeKey),
				parentID: validateNodeID(parentNodeID),
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
			.pick((data) => {
				// Initialize the child count for this parent if not already set.
				// This lazy initialization ensures we have the starting count from the store.
				if (!(data.parentID in currentChildCounts)) currentChildCounts[data.parentID] = data.parentNodeInstance.childNodeIDs.length;

				return {
					parentElementDefinition: pickElementDefinition(data.parentNodeInstance.elementKey, data.elementDefinitions),
					sourceElementDefinition: pickElementDefinition(nodeElementKey, data.elementDefinitions),
				};
			})
			.operate((data) => ({
				createdNode: createNode(data.sourceNodeDefinition, data.parentID, nodeElementKey, options),
			}))
			.condition((data) => ({
				rulesPass: passesAllRules(data.createdNode, data.parentNodeInstance, data.parentElementDefinition, data.sourceElementDefinition, data.nodeStoreState.storedNodes, currentChildCounts[data.parentID]),
			}))
			.execute();
		if (!validData) return undefined;

		createdNodes.push(validData.createdNode);

		// Increment the child count for this parent after successful validation.
		// This simulates the addition for subsequent validations in the batch.
		currentChildCounts[validData.parentID]++;
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
 * @param nodeID - The unique identifier of the block instance to delete
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link deleteNodeFromTree} - The underlying tree deletion operation
 * @see {@link detachNodeFromParent} - The initial detachment operation
 */
export function deleteNode(nodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → deleteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.nodeID, useNodeStore.getState().storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			sourceElementDefinition: pickElementDefinition(data.sourceNodeInstance.elementKey, data.elementDefinitions),
			parentNodeInstance: pickNodeInstance(data.sourceNodeInstance.parentID, useNodeStore.getState().storedNodes),
		}))
		.operate((data) => ({
			deletedBlocks: detachNodeFromParent(data.sourceNodeInstance, data.parentNodeInstance, useNodeStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Check if the block is deletable
	if (!validData.sourceElementDefinition.isDeletable) return (devLog.error(`[BlockManager → deleteNode] Block with ID ${nodeID} is not deletable.`), undefined);

	// Apply the deletion to the store
	useNodeStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...validData.deletedBlocks };
		return { storedNodes: updatedNodes };
	});

	// Complete the deletion in the next microtask to allow React unmounting
	queueMicrotask(() => {
		const currentStore = useNodeStore.getState();

		// Re-validate and pick necessary data
		const currentResults = new ResultPipeline('[BlockManager → deleteNode → Cleanup] ')
			.pick(() => ({
				sourceNodeInstance: pickNodeInstance(nodeID, currentStore.storedNodes),
			}))
			.operate((data) => ({
				blocksAfterDeletion: deleteNodeFromTree(data.sourceNodeInstance, currentStore.storedNodes),
			}))
			.execute();
		if (!currentResults) return;

		// Calculate final selected ID
		const finalSelectedID = currentStore.selectedNodeID === nodeID ? null : currentStore.selectedNodeID;

		// Update store with final state
		useNodeStore.setState((state) => {
			const updatedNodes = { ...state.storedNodes, ...currentResults.blocksAfterDeletion };
			return {
				storedNodes: updatedNodes,
				data: {
					...state.data,
					global: {
						...state.data.global,
						selectedNodeID: finalSelectedID,
					},
				},
			};
		});
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
 * @param nodeID - The unique identifier of the block instance to duplicate
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link duplicateNodeInTree} - The underlying tree duplication operation
 * @see {@link cloneNode} - The deep cloning function used internally
 */
export function duplicateNode(nodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → duplicateNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.nodeID, useNodeStore.getState().storedNodes),
		}))
		.operate((data) => ({
			clonedNodes: duplicateNodeInTree(data.sourceNodeInstance, useNodeStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Apply the cloned tree returned by the helper
	useNodeStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...validData.clonedNodes };
		return { storedNodes: updatedNodes };
	});
}

// Clipboard storage for copy/paste operations
let blockClipboard: NodeInstance | null = null;

/**
 * Copies a block instance and all its descendants to the clipboard for later pasting.
 *
 * This operation performs a deep clone of the specified node and its entire subtree,
 * storing the complete hierarchical structure in memory. The copied data can then
 * be used to overwrite other nodes via the paste operation, enabling content duplication
 * and replacement workflows.
 *
 * @param nodeID - The unique identifier of the block instance to copy to the clipboard
 * @returns void - This function does not return a value but updates the global clipboard state
 * @see {@link pasteNode} - The complementary operation that applies the copied content
 * @see {@link overwriteNodeInTree} - The underlying tree operation used during pasting
 */
export function copyNode(nodeID: NodeID): void {
	// Validate and pick the blockInstance to copy
	const results = new ResultPipeline('[BlockManager → copyNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!results) return;

	// Store the entire blockInstance tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(results.blockInstance));
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
 * @param nodeID - The unique identifier of the block instance to replace with clipboard content
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link copyNode} - The operation that populates the clipboard with content
 * @see {@link overwriteNodeInTree} - The core tree manipulation function used for the replacement
 */
export function pasteNode(nodeID: NodeID): void {
	if (!blockClipboard) return (devLog.error(`[BlockManager → pasteNode] No blockInstance in clipboard`), undefined);

	// Validate and pick the target blockInstance to paste into
	const results = new ResultPipeline('[BlockManager → pasteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.validate(() => ({
			clipboardBlock: validateNodeInstance(blockClipboard),
		}))
		.operate((data) => ({
			pastedBlocks: overwriteNodeInTree(data.clipboardBlock, data.targetBlock, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block store with the new blockInstance tree
	useNodeStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...results.pastedBlocks };
		return { storedNodes: updatedNodes };
	});
}
