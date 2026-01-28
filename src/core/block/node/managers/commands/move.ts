// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { findNodeMoveBeforeIndex, findNodeMoveAfterIndex, findNodeMoveIntoIndex } from '@/core/block/node/helpers/finders';
import { moveNode } from '@/core/block/node/helpers/operations';
import { passesAllRules } from '@/core/block/node/helpers/checkers';
import { pickElementDefinition } from '@/core/block/element/helpers/';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredElements } from '@/core/block/element/states/registry';

/**
 * Moves a block to be positioned after a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceNodeID - The block ID to move
 * @param targetNodeID - The target block ID to position after
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
			parentElementDefinition: pickElementDefinition(data.targetParentBlock.tag, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
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
 * Moves a block to be positioned before a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceNodeID - The block ID to move
 * @param targetNodeID - The target block ID to position before
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
			parentElementDefinition: pickElementDefinition(data.targetParentBlock.tag, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
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
 * Moves a block to be positioned as the last child of a target block in block CRUD operations.
 * Updates the target's contentIDs array to include the moved block at the end.
 *
 * @param sourceNodeID - The block ID to move
 * @param targetNodeID - The target block ID to move into as the last child
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
			parentElementDefinition: pickElementDefinition(data.targetBlock.tag, getRegisteredElements()),
			childElementDefinition: pickElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
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
