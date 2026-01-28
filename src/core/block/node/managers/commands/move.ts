// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { passesAllRules, moveNode, validateNodeID, pickNodeInstance, findNodeMoveBeforeIndex, findNodeMoveAfterIndex, findNodeMoveIntoIndex } from '@/core/block/node/helpers';
import { pickElementDefinition } from '@/core/block/element/helpers/';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredElements } from '@/core/block/element/states/registry';

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
 * @see {@link moveNodeBefore} - For positioning before a target block
 * @see {@link moveNodeInto} - For moving a block as a child of another block
 * @see {@link passesAllRules} - The validation function that checks element compatibility
 */
export function moveNodeAfter(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveNodeAfter]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick((data) => ({
			sourceBlock: pickNodeInstance(data.sourceNodeID, useBlockStore.getState().storedNodes),
			targetBlock: pickNodeInstance(data.targetNodeID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			targetParentBlock: pickNodeInstance(data.targetBlock.parentID!, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.targetParentBlock.elementKey, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.elementKey, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Check if move is needed
	const targetIndexResult = findNodeMoveAfterIndex(results.sourceBlock, results.targetBlock, results.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveNodeAfter] Block is already positioned after target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = passesAllRules(results.sourceBlock, results.targetParentBlock, results.parentElementDefinition, results.childElementDefinition, useBlockStore.getState().storedNodes, targetIndexResult.data + 1);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveNodeAfter] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveNodeAfter] Block type not allowed as sibling`);

	// Use the target's parent as the attachment point — moveNode expects the
	// destination parent instance rather than a sibling instance.
	const moveResult = moveNode(results.sourceBlock, results.targetParentBlock, useBlockStore.getState().storedNodes, targetIndexResult.data + 1);
	if (moveResult.success)
		useBlockStore.setState((state) => {
			const updatedNodes = moveResult.data;
			return { storedNodes: updatedNodes };
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
 * @see {@link moveNodeAfter} - For positioning after a target block
 * @see {@link moveNodeInto} - For moving a block as a child of another block
 * @see {@link passesAllRules} - The validation function that checks element compatibility
 */
export function moveNodeBefore(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveNodeBefore]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick((data) => ({
			sourceBlock: pickNodeInstance(data.sourceNodeID, useBlockStore.getState().storedNodes),
			targetBlock: pickNodeInstance(data.targetNodeID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			targetParentBlock: pickNodeInstance(data.targetBlock.parentID!, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.targetParentBlock.elementKey, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.elementKey, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Check if move is needed
	const targetIndexResult = findNodeMoveBeforeIndex(results.sourceBlock, results.targetBlock, results.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveNodeBefore] Block is already positioned before target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = passesAllRules(results.sourceBlock, results.targetParentBlock, results.parentElementDefinition, results.childElementDefinition, useBlockStore.getState().storedNodes, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveNodeBefore] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveNodeBefore] Block element not allowed as sibling`);

	// Use the target's parent as the attachment point — moveNode expects the
	// destination parent instance rather than a sibling instance.
	const moveResult = moveNode(results.sourceBlock, results.targetParentBlock, useBlockStore.getState().storedNodes, targetIndexResult.data);
	if (moveResult.success)
		useBlockStore.setState((state) => {
			const updatedNodes = moveResult.data;
			return { storedNodes: updatedNodes };
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
 * @see {@link moveNodeAfter} - For positioning as a sibling after another block
 * @see {@link moveNodeBefore} - For positioning as a sibling before another block
 * @see {@link passesAllRules} - The validation function that checks parent-child compatibility
 */
export function moveNodeInto(sourceNodeID: NodeID, targetNodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveNodeInto]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick((data) => ({
			sourceBlock: pickNodeInstance(data.sourceNodeID, useBlockStore.getState().storedNodes),
			targetBlock: pickNodeInstance(data.targetNodeID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.targetBlock.elementKey, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.elementKey, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Calculate target index (append to end)
	const targetIndexResult = findNodeMoveIntoIndex(results.sourceBlock, results.targetBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveNodeInto] Block cannot be moved into target or invalid operation`);

	// If child is not compatible with parent (validate with target index)
	const isChildBlockPermitted = passesAllRules(results.sourceBlock, results.targetBlock, results.parentElementDefinition, results.childElementDefinition, useBlockStore.getState().storedNodes, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveNodeInto] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveNodeInto] Block type not allowed as child`);

	// For move-into the `targetBlock` *is* the destination parent and is
	// already passed as the second argument.
	const moveResult = moveNode(results.sourceBlock, results.targetBlock, useBlockStore.getState().storedNodes, targetIndexResult.data);
	if (moveResult.success)
		useBlockStore.setState((state) => {
			const updatedNodes = moveResult.data;
			return { storedNodes: updatedNodes };
		});
}
