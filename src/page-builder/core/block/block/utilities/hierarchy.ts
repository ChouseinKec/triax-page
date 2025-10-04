// Types
import type { BlockRecord, BlockInstance, BlockType, BlockID, BlockDefinition } from '@/src/page-builder/core/block/block/types';

/**
 * Finds the next sibling of a given block.
 * @param blockID - The block ID to find the next sibling for
 * @param allBlocks - All blocks collection
 * @returns The next sibling block instance or null
 */
export function findBlockNextSibling(blockID: BlockID, allBlocks:BlockRecord): BlockInstance | null {
	if (!blockID || typeof blockID !== 'string') return null;
	if (!allBlocks || typeof allBlocks !== 'object') return null;

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
export function findBlockPreviousSibling(blockID: BlockID, allBlocks:BlockRecord): BlockInstance | null {
	if (!blockID || typeof blockID !== 'string') return null;
	if (!allBlocks || typeof allBlocks !== 'object') return null;

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
export function findBlockLastDescendant(block: BlockInstance, allBlocks:BlockRecord): BlockInstance | null {
	if (!block || typeof block !== 'object') return null;
	if (!allBlocks || typeof allBlocks !== 'object') return null;

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
 * getBlockDescendants(['parent-1'], allBlocks) // → ['parent-1', 'child-1', 'grandchild-1']
 */
export function findBlockDescendants(blockIDs: BlockID[], allBlocks:BlockRecord): BlockID[] {
	if (!blockIDs || !Array.isArray(blockIDs) || blockIDs.length === 0) return [];
	if (!allBlocks || typeof allBlocks !== 'object') return [];

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
export function isBlockDescendant(parentBlock: BlockInstance, targetID: BlockID, allBlocks:BlockRecord): boolean {
	if (!parentBlock || typeof parentBlock !== 'object') return false;
	if (!targetID || typeof targetID !== 'string') return false;
	if (!allBlocks || typeof allBlocks !== 'object') return false;

	if (parentBlock.contentIDs.includes(targetID)) return true;
	return parentBlock.contentIDs.some((childID) => {
		const childBlock = allBlocks[childID];
		return childBlock ? isBlockDescendant(childBlock, targetID, allBlocks) : false;
	});
}

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType Parent block type
 * @param childType Child block type to check
 * @param registeredBlocks All registered block definitions
 * @returns True if child is permitted, false otherwise
 */
export function isBlockChildAllowed(parentType: BlockType, childType: BlockType, registeredBlocks: Record<string, BlockDefinition>): boolean {
	if (!parentType || typeof parentType !== 'string') return false;
	if (!childType || typeof childType !== 'string') return false;
	if (!registeredBlocks || typeof registeredBlocks !== 'object') return false;

	const parentBlock = registeredBlocks[parentType];
	const childBlock = registeredBlocks[childType];
	if (!parentBlock || !childBlock) return false;

	if (parentBlock.permittedContent == null) return true;
	return parentBlock.permittedContent.includes(childType);
}

/**
 * Moves a block to be positioned after a target block within the same parent.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param blockID - The block ID to move
 * @param targetBlockID - The target block ID to position after
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the block moved to new position
 *
 * @example
 * moveBlockAfter('block-456', 'block-123', allBlocks) → block-456 positioned after block-123
 */
export function moveBlockAfter(blockID: BlockID, targetBlockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	const block = allBlocks[blockID];
	const targetBlock = allBlocks[targetBlockID];

	if (!block || !targetBlock) return allBlocks;
	if (block.parentID !== targetBlock.parentID) return allBlocks; // Must be siblings

	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return allBlocks;

	// Remove the block from its current position
	const contentIDs = parentBlock.contentIDs.filter((id) => id !== blockID);

	// Find the target block's position and insert after it
	const targetIndex = contentIDs.indexOf(targetBlockID);
	if (targetIndex === -1) return allBlocks;

	contentIDs.splice(targetIndex + 1, 0, blockID);

	const updatedParent = {
		...parentBlock,
		contentIDs,
	};

	return {
		...allBlocks,
		[block.parentID]: updatedParent,
	};
}

/**
 * Moves a block to be positioned before a target block within the same parent.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param blockID - The block ID to move
 * @param targetBlockID - The target block ID to position before
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the block moved to new position
 *
 * @example
 * moveBlockBefore('block-456', 'block-123', allBlocks) → block-456 positioned before block-123
 */
export function moveBlockBefore(blockID: BlockID, targetBlockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	const block = allBlocks[blockID];
	const targetBlock = allBlocks[targetBlockID];

	if (!block || !targetBlock) return allBlocks;
	if (block.parentID !== targetBlock.parentID) return allBlocks; // Must be siblings

	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return allBlocks;

	// Remove the block from its current position
	const contentIDs = parentBlock.contentIDs.filter((id) => id !== blockID);

	// Find the target block's position and insert before it
	const targetIndex = contentIDs.indexOf(targetBlockID);
	if (targetIndex === -1) return allBlocks;

	contentIDs.splice(targetIndex, 0, blockID);

	const updatedParent = {
		...parentBlock,
		contentIDs,
	};

	return {
		...allBlocks,
		[block.parentID]: updatedParent,
	};
}
