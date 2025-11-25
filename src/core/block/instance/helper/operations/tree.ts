// Types
import type { BlockID, BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { OperationResult } from '@/src/shared/types/result';

// Helpers
import { findBlockDescendants, findBlockChildIndex } from '@/src/core/block/instance/helper/finders';
import { fetchBlockInstance } from '@/src/core/block/instance/helper/fetchers';
import { detachBlockFromContentIDs, attachBlockToContentIDs, updateBlockParentID } from '@/src/core/block/instance/helper/operations/instance';

// External
import { v4 as uuidv4 } from 'uuid';

/**
 * Detach a block instance from its parent.
 *
 * This only updates the parent/child relationship and does NOT remove nodes
 * from the store.
 * @see {@link deleteBlockFromTree}
 *
 * @param sourceBlockInstance - the block instance to detach
 * @param parentBlockInstance - the current parent block instance
 * @param storedBlocks - the current block instance record
 */
export function detachBlockFromParent(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Remove the child ID from the parent's contentIDs cleanly using the
	const mutatedParentResult = detachBlockFromContentIDs(parentBlockInstance, sourceBlockInstance.id);
	if (!mutatedParentResult.success) return { success: false, error: `Failed to detach child from parent: ${mutatedParentResult.error}` };

	// Update the child's parent reference to 'orphan' to reflect detachment.
	const mutatedSourceResult = updateBlockParentID(sourceBlockInstance, 'orphan');
	if (!mutatedSourceResult.success) return { success: false, error: `Failed to update child parentID: ${mutatedSourceResult.error}` };
	
	// Return the updated store reflecting the detached relationship.
	return {
		success: true,
		data: {
			...storedBlocks,
			[mutatedParentResult.data.id]: mutatedParentResult.data,
			[mutatedSourceResult.data.id]: mutatedSourceResult.data,
		},
	};
}

/**
 * Attach a block instance to a new parent at the specified index.
 *
 * This only updates the parent/child relationship and does NOT add a brand
 * new node into the canonical store by itself. When creating and inserting
 * a brand-new block into the store.
 * @see {@link addBlockToTree}
 *
 * @param sourceBlockInstance - the block instance to attach
 * @param parentBlockInstance - the new parent block instance
 * @param targetIndex - the index within the parent's contentIDs to insert at
 * @param storedBlocks - the current record of all block instances
 */
export function attachBlockToParent(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance, targetIndex: number, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Add the child ID into the parent's contentIDs cleanly using the
	const mutatedParentResult = attachBlockToContentIDs(parentBlockInstance, sourceBlockInstance.id, targetIndex);
	if (!mutatedParentResult.success) return { success: false, error: `Failed to attach child to parent: ${mutatedParentResult.error}` };

	// Update the child's parent reference to point to the new parent instance.
	const mutatedSourceInstanceResult = updateBlockParentID(sourceBlockInstance, mutatedParentResult.data.id);
	if (!mutatedSourceInstanceResult.success) return { success: false, error: `Failed to update child's parentID: ${mutatedSourceInstanceResult.error}` };

	// Return the updated store reflecting the attached relationship.
	return {
		success: true,
		data: {
			...storedBlocks,
			[mutatedParentResult.data.id]: mutatedParentResult.data,
			[mutatedSourceInstanceResult.data.id]: mutatedSourceInstanceResult.data,
		},
	};
}

/**
 * Remove a block and all of its descendant blocks from the provided store.
 *
 * @param blockID - id of the root block to delete
 * @param storedBlocks - the current block instance record
 */
export function deleteBlockFromTree(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Set to track all block ids to delete
	const blocksToDelete = new Set<BlockID>([sourceBlockInstance.id]);

	// Find all descendants and add their ids to the set
	const descendantInstancesResult = findBlockDescendants(sourceBlockInstance, storedBlocks);
	if (descendantInstancesResult.status === 'error') return { success: false, error: `Failed to delete tree: ${descendantInstancesResult.error}` };
	if (descendantInstancesResult.status === 'found') descendantInstancesResult.data.forEach((inst) => blocksToDelete.add(inst.id));

	// Create a shallow copy and remove each id
	const mutatedBlocks = { ...storedBlocks };
	blocksToDelete.forEach((id) => delete mutatedBlocks[id]);

	// Return the pruned record
	return { success: true, data: mutatedBlocks };
}

/**
 * Add a block instance to the store and attach it as the last child of its parent.
 *
 * @param blockInstance - the block instance to add
 * @param storedBlocks - the current block instance record
 */
export function addBlockToTree(blockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Add the instance into the store copy upfront so downstream operations
	const mutatedBlocks = { ...storedBlocks, [blockInstance.id]: blockInstance };

	// Fetch the parent block instance
	const parentInstanceResult = fetchBlockInstance(blockInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Add the block to its parent at the end of the contentIDs
	const mutatedParentInstance = attachBlockToParent(blockInstance, parentInstanceResult.data, parentInstanceResult.data.contentIDs.length, mutatedBlocks);
	if (!mutatedParentInstance.success) return mutatedParentInstance;

	// Return the updated record with the new block added to its parent
	return { success: true, data: mutatedParentInstance.data };
}

/**
 * Deep-clone the given block subtree and return the cloned instances.
 *
 * This only creates the new instances and does NOT merge clones into a store
 * @see {@link duplicateBlock} , {@link overwriteBlockInTree}
 *
 * @param rootBlockInstance - the root block instance to clone
 * @param storedBlocks - record of all block instances used to resolve children
 * @param newParentID - optional parent ID to assign to the cloned root
 */
export function cloneBlock(rootBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord, newParentID?: BlockID): { clonedInstance: BlockInstance; clonedBlocks: BlockInstanceRecord } {
	// Map to track all cloned instances
	const clonedBlocks: BlockInstanceRecord = {};

	function cloneRecursive(node: BlockInstance, newParentID?: BlockID): BlockInstance {
		// Generate a new unique ID for the cloned instance
		const newId = uuidv4();

		// Create a shallow clone with an empty child list initially
		const clonedBlockInstance: BlockInstance = {
			...node,
			id: newId,
			parentID: newParentID ?? node.parentID,
			contentIDs: [],
		};
		clonedBlocks[newId] = clonedBlockInstance;

		// Clone children recursively preserving order
		for (const childID of node.contentIDs) {
			const child = storedBlocks[childID];
			if (!child) continue;

			// Recursively clone the child node with the current cloned block as its new parent
			const clonedChild = cloneRecursive(child, clonedBlockInstance.id);

			// Add the cloned child's ID to the parent's contentIDs
			clonedBlockInstance.contentIDs.push(clonedChild.id);
		}

		// Return the cloned block instance
		return clonedBlockInstance;
	}

	// Start cloning the subtree
	const clonedInstance = cloneRecursive(rootBlockInstance, newParentID);

	// Return the cloned root and the map of all cloned instances
	return {
		clonedInstance,
		clonedBlocks,
	};
}

/**
 * Duplicate a block instance and its entire subtree within the store.
 *
 * The duplicated subtree will be inserted immediately after the original
 * within its parent's contentIDs list.
 *
 * @param sourceBlockInstance - the block instance to duplicate
 * @param storedBlocks - record of all block instances used to resolve children
 */
export function duplicateBlockInTree(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Clone the subtree
	const { clonedInstance, clonedBlocks } = cloneBlock(sourceBlockInstance, storedBlocks);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedBlocks, ...clonedBlocks };

	// Fetch the parent block instance
	const parentInstanceResult = fetchBlockInstance(sourceBlockInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return { success: false, error: parentInstanceResult.error };

	// Find the index of the source block within its parent's contentIDs
	const childIndexResult = findBlockChildIndex(sourceBlockInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Original block not found in parent's contentIDs` };

	// Attach the cloned root immediately after the original
	const attachedBlocksResult = attachBlockToParent(clonedInstance, parentInstanceResult.data, childIndexResult.data + 1, mutatedBlocks);
	if (!attachedBlocksResult.success) return { success: false, error: `Failed to insert cloned subtree: ${attachedBlocksResult.error}` };

	// Return the final updated store
	return { success: true, data: attachedBlocksResult.data };
}

export function overwriteBlockInTree(sourceBlock: BlockInstance, targetBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): OperationResult<BlockInstanceRecord> {
	// Clone the subtree
	const { clonedInstance, clonedBlocks } = cloneBlock(sourceBlock, storedBlocks, targetBlockInstance.parentID);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedBlocks, ...clonedBlocks };

	// Fetch the parent block instance
	const parentInstanceResult = fetchBlockInstance(targetBlockInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Find the index of the source block within its parent's contentIDs
	const childIndexResult = findBlockChildIndex(targetBlockInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Target block not found in parent's contentIDs` };

	// Remove the cloned root from the record as it will be overwritten
	delete mutatedBlocks[clonedInstance.id];

	// Overwrite the target block with the cloned instance
	mutatedBlocks[targetBlockInstance.id] = {
		...clonedInstance,
		id: targetBlockInstance.id,
		parentID: targetBlockInstance.parentID,
	};

	// Update the parent's contentIDs to reflect the overwritten block
	const newContentIDs = [...parentInstanceResult.data.contentIDs];
	newContentIDs[childIndexResult.data] = targetBlockInstance.id;

	// Update the mutatedBlocks with the updated parent instance
	mutatedBlocks[parentInstanceResult.data.id] = {
		...parentInstanceResult.data,
		contentIDs: newContentIDs,
	};

	// Return the final updated store
	return { success: true, data: mutatedBlocks };
}
