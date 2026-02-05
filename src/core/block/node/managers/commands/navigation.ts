// Managers
import { getSelectedBlockNodeID, getBlockNodeNextNode, getBlockNodePreviousNode } from '@/core/block/node/managers/queries';
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';

// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { isNodeStructureValid, pickNodeStoreState, moveNode, validateNodeID, pickNodeInstance, findNodeMoveBeforeIndex, findNodeMoveAfterIndex, findNodeMoveIntoIndex } from '@/core/block/node/helpers';
import { pickElementDefinitions } from '@/core/block/element/helpers/pickers';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { elementRegistryState } from '@/core/block/element/states/registry';

/**
 * Selects the next node in the document hierarchy using depth-first traversal.
 *
 * This command advances the current selection to the next node in the document order,
 * following a depth-first search pattern: first to the first child if available, then to
 * the next sibling, or recursively up to the parent's next sibling. This is commonly used
 * for keyboard navigation (e.g., Tab key) or programmatic selection advancement.
 *
 * If no next node exists (e.g., at the end of the document), the selection remains unchanged.
 * The root 'html' node is skipped in navigation.
 *
 * @returns void - Updates the global selection state to the next node, or leaves it unchanged if none exists
 * @see {@link selectBlockNodePreviousNode} - For selecting the previous node in the hierarchy
 * @see {@link getBlockNodeNextNode} - The query function used internally to find the next node
 */
export function selectBlockNodeNextNode(): void {
	const currentSelectedID = getSelectedBlockNodeID();

	const nextNode = getBlockNodeNextNode(currentSelectedID);
	if (!nextNode) return;

	setBlockNodeSelectedNodeID(nextNode.id);
}

/**
 * Selects the previous node in the document hierarchy using reverse depth-first traversal.
 *
 * This command moves the current selection to the previous node in the document order,
 * following a reverse depth-first search pattern: first to the last descendant of the
 * previous sibling if available, then to the previous sibling itself, or finally to the
 * parent node. This is commonly used for keyboard navigation (e.g., Shift+Tab key) or
 * programmatic selection reversal.
 *
 * If no previous node exists (e.g., at the beginning of the document or on the root 'html' node),
 * the selection remains unchanged. The root 'html' node cannot be selected as previous.
 *
 * @returns void - Updates the global selection state to the previous node, or leaves it unchanged if none exists
 * @see {@link selectBlockNodeNextNode} - For selecting the next node in the hierarchy
 * @see {@link getBlockNodePreviousNode} - The query function used internally to find the previous node
 */
export function selectBlockNodePreviousNode(): void {
	const currentSelectedID = getSelectedBlockNodeID();
	const previousNode = getBlockNodePreviousNode(currentSelectedID);
	if (!previousNode) return;

	setBlockNodeSelectedNodeID(previousNode.id);
}

/**
 * Moves a block to be positioned immediately after a target block as a sibling.
 *
 * This operation relocates the source block to appear directly after the target block
 * within the same parent container. The source block and its entire subtree are moved
 * as a unit, maintaining their hierarchical relationships. Element compatibility rules
 * are enforced to ensure the move is valid within the content structure constraints.
 *
 * @param sourceNodeID - The unique identifier of the block instance to move
 * @param targetNodeID - The unique identifier of the target block to position after
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link moveBlockNodeBefore} - For positioning before a target block
 * @see {@link moveBlockNodeInto} - For moving a block as a child of another block
 * @see {@link isNodeStructureValid} - The validation function that checks element compatibility
 */
export function moveBlockNodeAfter(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → moveBlockNodeAfter]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			targetNodeInstance: pickNodeInstance(data.targetNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			targetParentNodeInstance: pickNodeInstance(data.targetNodeInstance.parentID!, data.nodeStoreState.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.find((data) => ({
			targetIndex: findNodeMoveAfterIndex(data.sourceNodeInstance, data.targetNodeInstance, data.targetParentNodeInstance),
		}))
		.operate((data) => ({
			mutatedStore: moveNode(data.sourceNodeInstance, data.targetParentNodeInstance, data.nodeStoreState.storedNodes, data.targetIndex),
		}))
		.check((data) => ({
			isNodeStructureValid: isNodeStructureValid(data.sourceNodeID, data.elementDefinitions, data.mutatedStore),
		}))
		.execute();
	if (!validData) return;

	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedStore };
	});
}

/**
 * Moves a block to be positioned immediately before a target block as a sibling.
 *
 * This operation relocates the source block to appear directly before the target block
 * within the same parent container. The source block and its entire subtree are moved
 * as a unit, maintaining their hierarchical relationships. Element compatibility rules
 * are enforced to ensure the move is valid within the content structure constraints.
 *
 * @param sourceNodeID - The unique identifier of the block instance to move
 * @param targetNodeID - The unique identifier of the target block to position before
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link moveBlockNodeAfter} - For positioning after a target block
 * @see {@link moveBlockNodeInto} - For moving a block as a child of another block
 * @see {@link isNodeStructureValid} - The validation function that checks element compatibility
 */
export function moveBlockNodeBefore(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → moveBlockNodeBefore]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			targetNodeInstance: pickNodeInstance(data.targetNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			targetParentNodeInstance: pickNodeInstance(data.targetNodeInstance.parentID!, data.nodeStoreState.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.find((data) => ({
			targetIndex: findNodeMoveBeforeIndex(data.sourceNodeInstance, data.targetNodeInstance, data.targetParentNodeInstance),
		}))
		.operate((data) => ({
			mutatedStore: moveNode(data.sourceNodeInstance, data.targetParentNodeInstance, data.nodeStoreState.storedNodes, data.targetIndex),
		}))
		.check((data) => ({
			isNodeStructureValid: isNodeStructureValid(data.sourceNodeID, data.elementDefinitions, data.mutatedStore),
		}))
		.execute();
	if (!validData) return;

	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedStore };
	});
}

/**
 * Moves a block to become the last child of a target block.
 *
 * This operation relocates the source block to be appended as the final child of the
 * target block. The source block and its entire subtree are moved as a unit, becoming
 * part of the target's hierarchy. Element compatibility rules are enforced to ensure
 * the source block is permitted as a child of the target block type.
 *
 * @param sourceNodeID - The unique identifier of the block instance to move
 * @param targetNodeID - The unique identifier of the target block to move into as a child
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link moveBlockNodeAfter} - For positioning as a sibling after another block
 * @see {@link moveBlockNodeBefore} - For positioning as a sibling before another block
 * @see {@link isNodeStructureValid} - The validation function that checks parent-child compatibility
 */
export function moveBlockNodeInto(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → moveBlockNodeInto]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			targetNodeInstance: pickNodeInstance(data.targetNodeID, data.nodeStoreState.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.find((data) => ({
			targetIndex: findNodeMoveIntoIndex(data.sourceNodeInstance, data.targetNodeInstance),
		}))
		.operate((data) => ({
			mutatedStore: moveNode(data.sourceNodeInstance, data.targetNodeInstance, data.nodeStoreState.storedNodes, data.targetIndex),
		}))
		.check((data) => ({
			isNodeStructureValid: isNodeStructureValid(data.sourceNodeID, data.elementDefinitions, data.mutatedStore),
		}))
		.execute();
	if (!validData) return;

	useNodeStore.setState((state) => {
		return { storedNodes: validData.mutatedStore };
	});
}
