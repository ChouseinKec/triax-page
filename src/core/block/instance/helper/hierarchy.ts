// Registry
import * as blockRegistry from '@/src/core/block/instance/registry';

// Types
import type { BlockInstance, BlockID, BlockRecord } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';

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
 *
 * @example
 * moveBlock('block-123', 'parent-456', 2, allBlocks) → Updated BlockRecord
 */
export function moveBlock(sourceBlockID: BlockID, parentBlockID: BlockID, targetIndex: number, allBlocks: BlockRecord): BlockRecord {
	const block = allBlocks[sourceBlockID];
	const targetParent = allBlocks[parentBlockID];

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
		parentID: parentBlockID,
	};

	// Insert at target position in new parent
	// Use the updated target parent if it was modified above, otherwise use the original
	const parentToUse = updatedBlocks[parentBlockID];
	const newContentIDs = [...parentToUse.contentIDs];
	newContentIDs.splice(targetIndex, 0, sourceBlockID);

	const updatedParent = {
		...parentToUse,
		contentIDs: newContentIDs,
	};

	return {
		...updatedBlocks,
		[sourceBlockID]: updatedBlock,
		[parentBlockID]: updatedParent,
	};
}

/**
 * Finds the next sibling of a given block.
 * @param blockID - The block ID to find the next sibling for
 * @param allBlocks - All blocks collection
 * @returns The next sibling block instance or null
 *
 * @example
 * findBlockNextSibling('block-123', allBlocks) → { id: 'sibling-124', ... }
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
 *
 * @example
 * findBlockPreviousSibling('block-123', allBlocks) → { id: 'sibling-122', ... }
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
 *
 * @example
 * findBlockLastDescendant('block-123', allBlocks) → { id: 'deepest-child', ... }
 */
export function findBlockLastDescendant(blockInstance: BlockInstance, allBlocks: BlockRecord): BlockInstance | null {
	let current = blockInstance;

	while (current.contentIDs?.length > 0) {
		const lastChildID = current.contentIDs[current.contentIDs.length - 1];
		const lastChild = allBlocks[lastChildID];
		if (!lastChild) break;
		current = lastChild;
	}
	return current;
}

/**
 * Finds the next sibling of any ancestor by climbing up the parent chain.
 * Recursively traverses parent blocks until finding one with a next sibling.
 *
 * @param blockID - The starting block ID to climb from
 * @param allBlocks - All blocks collection
 * @returns The next sibling of an ancestor, or null if none found
 *
 * @example
 * findBlockNextAncestorSibling('block-123', allBlocks) → { id: 'ancestor-sibling', ... }
 */
export function findBlockNextAncestorSibling(blockID: BlockID, allBlocks: BlockRecord): BlockInstance | null {
	let currentParentID = allBlocks[blockID]?.parentID;

	while (currentParentID) {
		const parentNextSibling = findBlockNextSibling(currentParentID, allBlocks);
		if (parentNextSibling) return parentNextSibling;

		// Move up one more level
		const parentBlock = allBlocks[currentParentID];
		if (!parentBlock) break;
		currentParentID = parentBlock.parentID;
	}

	return null;
}

/**
 * Recursively gets all descendant block IDs from a given block ID.
 * Includes the input block ID in the result for deletion operations.
 *
 * @param blockID - The starting block ID
 * @param allBlocks - The collection of all blocks
 * @returns Array of all descendant block IDs including the starting ID
 *
 * @example
 * findBlockDescendants('block-123', allBlocks) → ['block-123', 'child-1', 'child-2', ...]
 */
export function findBlockDescendants(blockID: BlockID, allBlocks: BlockRecord): BlockID[] {
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

	traverse(blockID);
	return result;
}

/**
 * Checks if a child block can be moved into a parent block based on HTML defaultTag compatibility.
 * Determines if the parent block's permitted content includes the child block's defaultTag.
 *
 * @param parentTag - The HTML defaultTag of the parent block
 * @param childTag - The HTML defaultTag of the child block
 * @returns True if the child can be moved into the parent, false otherwise
 *
 * @example
 * canBlockMoveInto('section', 'p') → true
 * canBlockMoveInto('div', 'h1') → true
 */
export function canBlockMoveInto(parentTag: ElementTag, childTag: ElementTag): boolean {
	// If parent is body, always allow any child
	if (parentTag === 'body') return true;

	// Get all registered blocks
	const registeredBlocks = blockRegistry.getRegisteredBlocks();

	// Find parent block definition by tag
	const parentBlockDefinition = Object.values(registeredBlocks).find((block) => block.defaultTag === parentTag);
	if (!parentBlockDefinition) return false;

	// If allowedElements is null, parent accepts any child
	if (parentBlockDefinition.allowedElements == null) return true;

	// Check if parent's allowedElements includes the child's tag
	return parentBlockDefinition.allowedElements.includes(childTag);
}

/**
 * Checks if a block can be moved before a target block.
 * Returns the target index if the move is needed, null if already positioned correctly or invalid.
 *
 * @param sourceBlock - The block to potentially move
 * @param targetBlock - The target block for positioning reference
 * @param parentBlock - The parent block containing both source and target
 * @returns Target index if move is needed, null if already positioned correctly or invalid
 *
 * @example
 * canBlockMoveBefore(sourceBlock, targetBlock, parentBlock) → 2 | null
 */
export function canBlockMoveBefore(sourceBlock: BlockInstance, targetBlock: BlockInstance, parentBlock: BlockInstance): number | null {
	const sourceIndex = parentBlock.contentIDs.indexOf(sourceBlock.id);
	const targetIndex = parentBlock.contentIDs.indexOf(targetBlock.id);

	// If either block is not found, return null
	if (sourceIndex === -1 || targetIndex === -1) return targetIndex;

	// If source is already before target, no move needed
	if (sourceIndex < targetIndex) return null;

	// Return the target index (where source should be positioned)
	return targetIndex;
}

/**
 * Checks if a block can be moved after a target block.
 * Returns the target index if the move is needed, null if already positioned correctly or invalid.
 *
 * @param sourceBlock - The block to potentially move
 * @param targetBlock - The target block for positioning reference
 * @param parentBlock - The parent block containing both source and target
 * @returns Target index if move is needed, null if already positioned correctly or invalid
 *
 * @example
 * canBlockMoveAfter(sourceBlock, targetBlock, parentBlock) → 3 | null
 */
export function canBlockMoveAfter(sourceBlock: BlockInstance, targetBlock: BlockInstance, parentBlock: BlockInstance): number | null {
	const sourceIndex = parentBlock.contentIDs.indexOf(sourceBlock.id);
	const targetIndex = parentBlock.contentIDs.indexOf(targetBlock.id);

	// If either block is not found, return null
	if (sourceIndex === -1 || targetIndex === -1) return targetIndex;

	const desiredIndex = targetIndex + 1;

	// If source is already at the desired position, no move needed
	if (sourceIndex === desiredIndex) return null;

	// Return the target index (where source should be positioned)
	return desiredIndex;
}
