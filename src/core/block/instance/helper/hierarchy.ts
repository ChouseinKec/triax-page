// Types
import type { BlockDefinition, BlockInstance, BlockID, BlockRecord } from '@/src/core/block/instance/types';
import type { ElementTag, ElementDefinition } from '@/src/core/block/element/types';

/**
 * Checks if a child tag is allowed as a direct child of the parent block.
 * @param parentBlockDefinition - The definition of the parent block
 * @param childElementTag - The tag of the child to check
 * @returns True if allowed, false otherwise
 */
export function isAllowedChild(
	parentBlockDefinition: BlockDefinition, //
	childElementTag: ElementTag
): boolean {
	return parentBlockDefinition.allowedChildren == null || parentBlockDefinition.allowedChildren.includes(childElementTag);
}

/**
 * Checks if the child has forbidden ancestors in the parent's ancestry.
 * @param childElementDefinition - The element definition of the child
 * @param parentBlock - The parent block instance
 * @param storedBlocks - All blocks collection
 * @returns True if forbidden ancestor found, false otherwise
 */
export function hasForbiddenAncestor(
	childElementDefinition: ElementDefinition, //
	parentBlockInstance: BlockInstance,
	storedBlocks: BlockRecord
): boolean {
	const ancestorIDs = findBlockAscendants(parentBlockInstance.id, storedBlocks);
	const ancestorTags = ancestorIDs.map((blockID) => storedBlocks[blockID]?.tag).filter(Boolean);
	const tagsToCheck = [parentBlockInstance.tag, ...ancestorTags];

	return tagsToCheck.some((tag) => childElementDefinition.forbiddenAncestors?.includes(tag));
}

/**
 * Checks if adding the child tag would exceed the unique element limit.
 * @param parentBlockDefinition - The definition of the parent block
 * @param parentBlock - The parent block instance
 * @param childElementTag - The tag of the child to check
 * @param storedBlocks - All blocks collection
 * @param excludeBlockID - Optional block ID to exclude from count (for moving)
 * @returns True if limit exceeded, false otherwise
 */
export function exceedsUniqueElementLimit(
	parentBlockDefinition: BlockDefinition, //
	parentBlockInstance: BlockInstance,
	childElementTag: ElementTag,
	storedBlocks: BlockRecord,
	excludeBlockID?: BlockID
): boolean {
	const limit = parentBlockDefinition.uniqueElements?.[childElementTag];
	if (limit === undefined) return false;

	const existingCount = parentBlockInstance.contentIDs.filter((id) => {
		const sibling = storedBlocks[id];
		return sibling && sibling.tag === childElementTag && id !== excludeBlockID;
	}).length;

	return existingCount >= limit;
}

/**
 * Checks if inserting the child tag at the target index violates ordered elements rules.
 * @param parentBlockDefinition - The definition of the parent block
 * @param parentBlock - The parent block instance
 * @param childElementTag - The tag of the child to check
 * @param targetIndex - The index to insert at
 * @param storedBlocks - All blocks collection
 * @returns True if violates, false otherwise
 */
export function violatesOrderedElements(
	parentBlockDefinition: BlockDefinition, //
	parentBlockInstance: BlockInstance,
	childElementTag: ElementTag,
	targetIndex: number,
	storedBlocks: BlockRecord
): boolean {
	if (!parentBlockDefinition.orderedElements || targetIndex === undefined) return false;

	const currentChildTags = parentBlockInstance.contentIDs.map((id) => storedBlocks[id]?.tag).filter(Boolean);
	const projectedTags = [...currentChildTags];
	projectedTags.splice(targetIndex, 0, childElementTag);

	let currentGroupIndex = 0;
	for (const tag of projectedTags) {
		let foundInGroup = false;
		for (let i = currentGroupIndex; i < parentBlockDefinition.orderedElements.length; i++) {
			if (parentBlockDefinition.orderedElements[i].includes(tag)) {
				currentGroupIndex = i;
				foundInGroup = true;
				break;
			}
		}
		if (!foundInGroup) return true;
	}
	return false;
}

/**
 * Core function to move a block to a specific parent and position.
 * Handles removing from old parent and updating the block's parentID.
 *
 * @param sourceBlockInstance - The block instance to move
 * @param targetBlockInstance - The target parent block instance
 * @param targetIndex - The index position within the target parent's contentIDs
 * @param storedBlocks - All blocks collection
 * @returns Updated blocks record with the block moved to new position
 *
 * @example
 * const source = storedBlocks['block-123'];
 * const target = storedBlocks['parent-456'];
 * moveBlock(source, target, 2, storedBlocks) → Updated BlockRecord
 */
export function moveBlock(
	sourceBlockInstance: BlockInstance, //
	targetBlockInstance: BlockInstance,
	targetIndex: number,
	storedBlocks: BlockRecord
): BlockRecord {
	let updatedBlocks = { ...storedBlocks };

	// Remove the source block from its current parent (if it has one)
	if (sourceBlockInstance.parentID) {
		const currentParent = storedBlocks[sourceBlockInstance.parentID];
		if (currentParent) {
			// Filter out the source block's ID from the parent's content list
			const filteredContentIDs = currentParent.contentIDs.filter((id) => id !== sourceBlockInstance.id);
			updatedBlocks = {
				...updatedBlocks,
				[sourceBlockInstance.parentID]: {
					...currentParent,
					contentIDs: filteredContentIDs,
				},
			};
		}
	}

	// Update the source block's parentID to the new target
	const updatedBlock = {
		...sourceBlockInstance,
		parentID: targetBlockInstance.id,
	};

	// Insert the source block into the target parent's content list at the specified index
	// Use the potentially updated target parent from the blocks record
	const parentToUse = updatedBlocks[targetBlockInstance.id];
	const newContentIDs = [...parentToUse.contentIDs];
	newContentIDs.splice(targetIndex, 0, sourceBlockInstance.id);

	const updatedParent = {
		...parentToUse,
		contentIDs: newContentIDs,
	};

	// Return the updated blocks record with the moved block and updated parents
	return {
		...updatedBlocks,
		[sourceBlockInstance.id]: updatedBlock,
		[targetBlockInstance.id]: updatedParent,
	};
}

/**
 * Checks if a child block can be moved into a parent block.
 * Validates against allowedChildren, forbiddenAncestors, uniqueElements, and orderedElements constraints.
 *
 * @param sourceBlockInstance - The child block instance to validate
 * @param targetBlockInstance - The target parent block instance
 * @param targetIndex - The index position for insertion
 * @param parentBlock - The actual parent block instance (targetBlockInstance's parent)
 * @param parentBlockDefinition - The definition of the parent block
 * @param childElementDefinition - The element definition of the child block
 * @param storedBlocks - All blocks collection for ancestor traversal
 * @returns True if the child can be moved into the parent, false otherwise
 *
 * @example
 * canBlockMove(sourceBlockInstance, targetBlockInstance, 2, parent, parentDef, childDef, storedBlocks) → true
 */
export function canBlockMove(
	sourceBlockInstance: BlockInstance, //
	parentBlock: BlockInstance,
	parentBlockDefinition: BlockDefinition,
	sourceBlockDefinition: ElementDefinition,
	storedBlocks: BlockRecord,
	targetIndex: number
): boolean {
	// 1. CHECK ALLOWED CHILDREN
	if (!isAllowedChild(parentBlockDefinition, sourceBlockInstance.tag)) return false;

	// 2. CHECK FORBIDDEN ANCESTORS
	if (hasForbiddenAncestor(sourceBlockDefinition, parentBlock, storedBlocks)) return false;

	// 3. CHECK UNIQUE ELEMENTS (exclude the child itself for moving)
	if (exceedsUniqueElementLimit(parentBlockDefinition, parentBlock, sourceBlockInstance.tag, storedBlocks, sourceBlockInstance.id)) return false;

	// 4. CHECK ORDERED ELEMENTS
	if (violatesOrderedElements(parentBlockDefinition, parentBlock, sourceBlockInstance.tag, targetIndex, storedBlocks)) return false;

	return true;
}

/**
 * Finds the next sibling of a given block.
 * @param sourceBlockInstance - The block instance to find the next sibling for
 * @param storedBlocks - All blocks collection
 * @returns The next sibling block instance or null
 *
 * @example
 * const block = storedBlocks['block-123'];
 * findBlockNextSibling(block, storedBlocks) → { id: 'sibling-124', ... }
 */
export function findBlockNextSibling(
	sourceBlockInstance: BlockInstance, //
	parentBlockInstance: BlockInstance,
	storedBlocks: BlockRecord
): BlockInstance | null {
	// Find the current block's index in the parent's content list
	const currentIndex = parentBlockInstance.contentIDs.indexOf(sourceBlockInstance.id);
	if (currentIndex === -1) return null; // Block not found in parent (shouldn't happen)

	// Check if this is the last child (no next sibling possible)
	if (currentIndex === parentBlockInstance.contentIDs.length - 1) return null;

	// Get the next sibling's ID
	const nextSiblingID = parentBlockInstance.contentIDs[currentIndex + 1];
	if (!nextSiblingID) return null;

	// Return the next sibling block instance
	return storedBlocks[nextSiblingID];
}

/**
 * Finds the next sibling of any ancestor by climbing up the parent chain.
 * Recursively traverses parent blocks until finding one with a next sibling.
 *
 * @param sourceBlockInstance - The starting block instance to climb from
 * @param storedBlocks - All blocks collection
 * @returns The next sibling of an ancestor, or null if none found
 *
 * @example
 * findBlockNextParentSibling('block-123', storedBlocks) → { id: 'ancestor-sibling', ... }
 */
export function findBlockNextParentSibling(sourceBlockInstance: BlockInstance, storedBlocks: BlockRecord): BlockInstance | null {
	// If the block has no parent, it can't have parent siblings
	if (!sourceBlockInstance.parentID) return null;

	// Start from the immediate parent
	let currentParentID = sourceBlockInstance.parentID;

	while (currentParentID) {
		// Get the current parent block instance
		const parentBlock = storedBlocks[currentParentID];
		if (!parentBlock) break;

		// Check if this parent has a next sibling
		// If found a next sibling for this ancestor, return it
		const parentNextSibling = findBlockNextSibling(parentBlock, storedBlocks[parentBlock.parentID], storedBlocks);
		if (parentNextSibling) return parentNextSibling;

		// No next sibling found, move up to the next ancestor
		currentParentID = parentBlock.parentID;
	}

	// No ancestor with a next sibling found
	return null;
}

/**
 * Finds the previous sibling of a given block.
 * @param blockID - The block ID to find the previous sibling for
 * @param storedBlocks - All blocks collection
 * @returns The previous sibling block instance or null
 *
 * @example
 * findBlockPreviousSibling('block-123', storedBlocks) → { id: 'sibling-122', ... }
 */
export function findBlockPreviousSibling(blockID: BlockID, storedBlocks: BlockRecord): BlockInstance | null {
	const block = storedBlocks[blockID];
	if (!block?.parentID) return null;

	const parentBlock = storedBlocks[block.parentID];
	if (!parentBlock) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex <= 0) return null;

	const previousSiblingID = parentBlock.contentIDs[currentIndex - 1];
	return previousSiblingID ? storedBlocks[previousSiblingID] : null;
}

/**
 * Finds the last (deepest) descendant of a block by traversing to the last child recursively.
 * @param block - The starting block
 * @param storedBlocks - All blocks collection
 * @returns The last descendant block instance or null if input is invalid
 *
 * @example
 * findBlockLastDescendant('block-123', storedBlocks) → { id: 'deepest-child', ... }
 */
export function findBlockLastDescendant(sourceBlockInstance: BlockInstance, storedBlocks: BlockRecord): BlockInstance | null {
	if (!sourceBlockInstance) return null;

	let current = sourceBlockInstance;

	while (current.contentIDs?.length > 0) {
		const lastChildID = current.contentIDs[current.contentIDs.length - 1];
		const lastChild = storedBlocks[lastChildID];
		if (!lastChild) break;
		current = lastChild;
	}
	return current;
}

/**
 * Recursively gets all descendant block IDs from a given block ID.
 * Does not include the input block ID in the result.
 *
 * @param blockID - The starting block ID
 * @param storedBlocks - The collection of all blocks
 * @returns Array of all descendant block IDs including the starting ID
 *
 * @example
 * findBlockDescendants('block-123', storedBlocks) → ['block-123', 'child-1', 'child-2', ...]
 */
export function findBlockDescendants(blockID: BlockID, storedBlocks: BlockRecord): BlockID[] {
	const block = storedBlocks[blockID];
	if (!block) return [];

	const result: string[] = [];
	const visited = new Set<string>();

	const traverse = (id: string) => {
		if (visited.has(id)) return;

		visited.add(id);

		// Only add to result if not the input blockID
		if (id !== blockID) result.push(id);

		const block = storedBlocks[id];
		if (block?.contentIDs?.length) {
			block.contentIDs.forEach(traverse);
		}
	};

	traverse(blockID);
	return result;
}

/**
 * Gets all ancestor block IDs from a given block ID by climbing the parent chain.
 * Does not include the input block ID in the result.
 *
 * @param blockID - The starting block ID
 * @param storedBlocks - The collection of all blocks
 * @returns Array of all ancestor block IDs (from immediate parent to root)
 *
 * @example
 * findBlockAscendants('block-123', storedBlocks) → ['parent-1', 'grandparent-2', 'root']
 */
export function findBlockAscendants(blockID: BlockID, storedBlocks: BlockRecord): BlockID[] {
	const block = storedBlocks[blockID];
	if (!block) return [];

	const result: BlockID[] = [];
	const visited = new Set<BlockID>();

	let currentBlock = storedBlocks[blockID];

	while (currentBlock?.parentID) {
		if (visited.has(currentBlock.parentID)) break; // Prevent infinite loops

		visited.add(currentBlock.parentID);
		result.push(currentBlock.parentID);
		currentBlock = storedBlocks[currentBlock.parentID];
	}

	return result;
}

/**
 * Checks if a block can be moved into a target block.
 * Returns the target index if the move is needed, null if already positioned correctly or invalid.
 * @param sourceBlockInstance - The block to potentially move
 * @param targetBlockInstance - The target block for positioning reference
 * @param storedBlocks - All blocks collection for ancestor chain traversal
 * @returns Target index if move is needed, null if already positioned correctly or invalid
 *
 * @example
 * findBlockMoveIntoIndex(sourceBlockInstance, targetBlockInstance, parentBlock) → 2 | null
 */
export function findBlockMoveIntoIndex(sourceBlockID: BlockID, targetBlockID: BlockID, storedBlocks: BlockRecord): number | null {
	const targetBlockInstance = storedBlocks[targetBlockID];
	if (!targetBlockInstance) return null;

	const sourceBlockInstance = storedBlocks[sourceBlockID];
	if (!sourceBlockInstance) return null;

	// If source is already a child of target, no move needed
	if (sourceBlockInstance.parentID === targetBlockID) return null;

	// Otherwise, return the target index (where source should be positioned)
	return targetBlockInstance.contentIDs.length;
}

/**
 * Checks if a block can be moved before a target block.
 * Returns the target index if the move is needed, null if already positioned correctly or invalid.
 *
 * @param sourceBlockInstance - The block to potentially move
 * @param targetBlockInstance - The target block for positioning reference
 * @param parentBlock - The parent block containing both source and target
 * @returns Target index if move is needed, null if already positioned correctly or invalid
 *
 * @example
 * findBlockMoveBeforeIndex(sourceBlockInstance, targetBlockInstance, parentBlock) → 2 | null
 */
export function findBlockMoveBeforeIndex(sourceBlockID: BlockID, targetBlockID: BlockID, storedBlocks: BlockRecord): number | null {
	const targetBlockInstance = storedBlocks[targetBlockID];
	if (!targetBlockInstance) return null;

	const parentBlock = storedBlocks[targetBlockInstance.parentID];
	if (!parentBlock) return null;

	// Find the index of the source and target blocks within the parent's contentIDs
	const sourceIndex = parentBlock.contentIDs.indexOf(sourceBlockID);
	const targetIndex = parentBlock.contentIDs.indexOf(targetBlockID);

	// If target block is not found, cannot insert before it
	if (targetIndex === -1) return null;

	// If source block is not found, treat as a new insertion before target
	if (sourceIndex === -1) return targetIndex;

	// If source is already before target, no move needed
	if (sourceIndex < targetIndex) return null;

	// Otherwise, return the target index (where source should be positioned)
	return targetIndex;
}

/**
 * Checks if a block can be moved after a target block.
 * Returns the target index if the move is needed, null if already positioned correctly or invalid.
 *
 * @param sourceBlockInstance - The block to potentially move
 * @param targetBlockInstance - The target block for positioning reference
 * @param parentBlock - The parent block containing both source and target
 * @returns Target index if move is needed, null if already positioned correctly or invalid
 *
 * @example
 * findBlockMoveAfterIndex(sourceBlockInstance, targetBlockInstance, parentBlock) → 3 | null
 */
export function findBlockMoveAfterIndex(sourceBlockID: BlockID, targetBlockID: BlockID, storedBlocks: BlockRecord): number | null {
	const targetBlockInstance = storedBlocks[targetBlockID];
	if (!targetBlockInstance) return null;

	const parentBlock = storedBlocks[targetBlockInstance.parentID];
	if (!parentBlock) return null;

	// Find the index of the source and target blocks within the parent's contentIDs
	const sourceIndex = parentBlock.contentIDs.indexOf(sourceBlockID);
	const targetIndex = parentBlock.contentIDs.indexOf(targetBlockID);

	// If target block is not found, cannot insert after it
	if (targetIndex === -1) return null;

	// If source block is not found, treat as a new insertion after target
	if (sourceIndex === -1) return targetIndex + 1;

	// If source is already after target, no move needed
	if (sourceIndex === targetIndex + 1) return null;

	// Otherwise, return the desired index (where source should be positioned)
	return targetIndex + 1;
}
