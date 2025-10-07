// Types
import type { BlockRecord, BlockInstance, BlockType, BlockID, BlockDefinition } from '@/src/page-builder/core/block/block/types';

/**
 * Finds the next sibling of a given block.
 * @param blockID - The block ID to find the next sibling for
 * @param allBlocks - All blocks collection
 * @returns The next sibling block instance or null
 */
export function findBlockNextSibling(blockID: BlockID, allBlocks: BlockRecord): BlockInstance | null {
	const block = allBlocks[blockID];
	if (!block?.parentID) return null;

	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex === -1 || currentIndex === parentBlock.contentIDs.length - 1) return null;

	const nextSiblingID = parentBlock.contentIDs[currentIndex + 1];
	return nextSiblingID ? allBlocks[nextSiblingID] : null;
}

/**
 * Finds the previous sibling of a given block.
 * @param blockID - The block ID to find the previous sibling for
 * @param allBlocks - All blocks collection
 * @returns The previous sibling block instance or null
 */
export function findBlockPreviousSibling(blockID: BlockID, allBlocks: BlockRecord): BlockInstance | null {
	const block = allBlocks[blockID];
	if (!block?.parentID) return null;

	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex <= 0) return null;

	const previousSiblingID = parentBlock.contentIDs[currentIndex - 1];
	return previousSiblingID ? allBlocks[previousSiblingID] : null;
}

/**
 * Finds the last (deepest) descendant of a block by traversing to the last child recursively.
 * @param block - The starting block
 * @param allBlocks - All blocks collection
 * @returns The last descendant block instance or null if input is invalid
 */
export function findBlockLastDescendant(block: BlockInstance, allBlocks: BlockRecord): BlockInstance | null {
	let current = block;
	while (current.contentIDs?.length > 0) {
		const lastChildID = current.contentIDs[current.contentIDs.length - 1];
		const lastChild = allBlocks[lastChildID];
		if (!lastChild) break;
		current = lastChild;
	}
	return current;
}

/**
 * Recursively gets all descendant block IDs from given block IDs.
 * Includes the input block IDs in the result for deletion operations.
 *
 * @param blockIDs - Array of starting block IDs
 * @param allBlocks - The collection of all blocks
 * @returns Array of all descendant block IDs including the starting IDs
 *
 * @example
 * findBlockDescendants(['parent-1'], allBlocks) // → ['parent-1', 'child-1', 'grandchild-1']
 */
export function findBlockDescendants(blockIDs: BlockID[], allBlocks: BlockRecord): BlockID[] {
	const result: string[] = [];
	const visited = new Set<string>();

	const traverse = (id: string) => {
		if (visited.has(id)) return;

		visited.add(id);
		result.push(id);

		const block = allBlocks[id];
		if (block?.contentIDs?.length) {
			block.contentIDs.forEach(traverse);
		}
	};

	blockIDs.forEach(traverse);
	return result;
}

/**
 * Checks if a target block is a descendant of a parent block.
 * Recursively traverses the block tree to find relationship.
 *
 * @param parentBlock - The parent block instance
 * @param targetID - The target block identifier to search for
 * @param allBlocks - All blocks collection keyed by IDs
 * @returns True if target is a descendant of parent, false otherwise
 *
 * @example
 * isBlockDescendant(parentBlock, 'child-2', allBlocks) // → true
 */
export function isBlockDescendant(parentBlock: BlockInstance, targetID: BlockID, allBlocks: BlockRecord): boolean {
	if (parentBlock.contentIDs.includes(targetID)) return true;
	return parentBlock.contentIDs.some((childID) => {
		const childBlock = allBlocks[childID];
		return childBlock ? isBlockDescendant(childBlock, targetID, allBlocks) : false;
	});
}

/**
 * Core function to move a block to a specific parent and position.
 * Handles removing from old parent and updating the block's parentID.
 *
 * @param blockID - The block ID to move
 * @param targetParentID - The target parent block ID
 * @param targetIndex - The index position within the target parent's contentIDs
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the block moved to new position
 */
export function moveBlock(sourceBlockID: BlockID, targetParentID: BlockID, targetIndex: number, allBlocks: BlockRecord): BlockRecord {
	const block = allBlocks[sourceBlockID];
	const targetParent = allBlocks[targetParentID];

	if (!block || !targetParent) return allBlocks;

	let updatedBlocks = { ...allBlocks };

	// Remove from current parent if it exists
	if (block.parentID) {
		const currentParent = allBlocks[block.parentID];
		if (currentParent) {
			const filteredContentIDs = currentParent.contentIDs.filter((id) => id !== sourceBlockID);
			updatedBlocks = {
				...updatedBlocks,
				[block.parentID]: {
					...currentParent,
					contentIDs: filteredContentIDs,
				},
			};
		}
	}

	// Update block's parentID
	const updatedBlock = {
		...block,
		parentID: targetParentID,
	};

	// Insert at target position in new parent
	// Use the updated target parent if it was modified above, otherwise use the original
	const targetParentToUse = updatedBlocks[targetParentID];
	const newContentIDs = [...targetParentToUse.contentIDs];
	newContentIDs.splice(targetIndex, 0, sourceBlockID);

	const updatedTargetParent = {
		...targetParentToUse,
		contentIDs: newContentIDs,
	};

	return {
		...updatedBlocks,
		[sourceBlockID]: updatedBlock,
		[targetParentID]: updatedTargetParent,
	};
}
