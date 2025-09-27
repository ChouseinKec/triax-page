// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID, BlockInstance } from '@/src/page-builder/core/block/block/types';

/**
 * Retrieves the previous sibling block of a given block.
 * If the block has no parent or is the first child, returns null.
 * @param blockID - The ID of the block to find the previous sibling for.
 * @returns The previous sibling block instance or null if not found.
 * @example
 * getBlockPreviousSibling('block-123'); // Returns 'block-122' or null
 */
function getBlockPreviousSibling(blockID: BlockID): BlockInstance | null {
	// If no blockID is provided, return null
	if (!blockID) return null;

	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;

	// Get the block instance
	const block = allBlocks[blockID];
	if (!block) return null;

	// If the block has no parent, return null
	if (!block.parentID) return null;

	// Get the parent block
	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return null;

	// Find the index of the current block in the parent's content IDs
	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex === -1) return null;

	// Return the previous sibling block if it exists
	const previousSiblingID = parentBlock.contentIDs[currentIndex - 1];
	return previousSiblingID ? allBlocks[previousSiblingID] : null;
}

/**
 * Retrieves the next sibling block of a given block.
 * If the block has no parent or is the last child, returns null.
 * @param blockID - The ID of the block to find the next sibling for.
 * @returns The next sibling block instance or null if not found.
 * @example
 * getBlockNextSibling('block-123'); // Returns 'block-124' or null
 */
function getBlockNextSibling(blockID: BlockID): BlockInstance | null {
	// If no blockID is provided, return null
	if (!blockID) return null;

	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;

	// Get the block instance
	const block = allBlocks[blockID];
	if (!block) return null;

	// If the block has no parent, return null
	if (!block.parentID) return null;

	// Get the parent block
	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return null;

	// Find the index of the current block in the parent's content IDs
	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex === -1) return null;

	// Return the next sibling block if it exists
	const nextSiblingID = parentBlock.contentIDs[currentIndex + 1];
	return nextSiblingID ? allBlocks[nextSiblingID] : null;
}

/**
 * Retrieves the next block in the hierarchy.
 * This function checks for children first, then siblings, and finally parents.
 * @returns The next block instance or null if not found.
 */
export function getNextBlock() {
	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;
	const selectedBlockID = store.selectedBlockID;

	// If no selected block, return null
	if (!selectedBlockID) return null;

	// Get the selected block
	const selectedBlock = allBlocks[selectedBlockID];
	if (!selectedBlock) return null;

	// If it has children, return the first child
	const childIDs = selectedBlock.contentIDs;
	if (childIDs && childIDs.length > 0) return allBlocks[childIDs[0]];

	// If no children, get the next sibling
	const nextSibling = getBlockNextSibling(selectedBlockID);
	if (nextSibling) return nextSibling;

	// If no next sibling, check the parent's next sibling
	const parentID = selectedBlock.parentID;
	if (parentID) return getBlockNextSibling(parentID);

	// If no next sibling, return null
	return null;
}

/**
 * Retrieves the previous block in the hierarchy.
 * This function checks for children first, then siblings, and finally parents.
 * @returns The previous block instance or null if not found.
 */
export function getPreviousBlock() {
	const store = useBlockStore.getState();
	const allBlocks = store.allBlocks;
	const selectedBlockID = store.selectedBlockID;

	// If no selected block, return null
	if (!selectedBlockID) return null;

	// Get the selected block
	const selectedBlock = allBlocks[selectedBlockID];
	if (!selectedBlock) return null;

	// Get previous sibling
	const previousSibling = getBlockPreviousSibling(selectedBlockID);
	if (previousSibling) {
		// If previous sibling has children, return its last child
		const prevSiblingChildren = previousSibling.contentIDs;
		if (prevSiblingChildren && prevSiblingChildren.length > 0) {
			return allBlocks[prevSiblingChildren[prevSiblingChildren.length - 1]];
		}
		// Otherwise, return previous sibling itself
		return previousSibling;
	}

	// If no previous sibling, check the parent block
	const parentID = selectedBlock.parentID;
	if (parentID) return allBlocks[parentID] || null;

	// If no previous block found, return null
	return null;
}

/**
 * Gets all descendant blocks of a given block (recursive).
 * @param blockID - The block identifier to get descendants for
 * @returns Array of all descendant block IDs
 * @example
 * getBlockDescendants('parent-123'); // Returns ['child-1', 'child-2', 'grandchild-3']
 */
export function getBlockDescendants(blockID: BlockID): BlockID[] {
	const store = useBlockStore.getState();
	const descendants: BlockID[] = [];
	const block = store.allBlocks[blockID];

	if (!block) return descendants;

	function collectDescendants(contentIDs: BlockID[]) {
		for (const childID of contentIDs) {
			descendants.push(childID);
			const childBlock = store.allBlocks[childID];
			if (childBlock && childBlock.contentIDs.length > 0) {
				collectDescendants(childBlock.contentIDs);
			}
		}
	}

	collectDescendants(block.contentIDs);
	return descendants;
}
