// Stores
import useBlockStore from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';


/**
 * Gets the previous sibling block in the parent's content list.
 * @param blockID - The block identifier to find the previous sibling for
 * @returns The previous sibling block ID, or null if none exists
 * @example
 * getBlockPreviousSibling('block-123'); // Returns 'block-122' or null
 */
export function getBlockPreviousSibling(blockID: BlockID): BlockID | null {
	const store = useBlockStore.getState();
	const block = store.allBlocks[blockID];
	if (!block || !block.parentID) return null;

	const parentBlock = store.allBlocks[block.parentID];
	if (!parentBlock) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex <= 0) return null;

	return parentBlock.contentIDs[currentIndex - 1];
}

/**
 * Gets the next sibling block in the parent's content list.
 * @param blockID - The block identifier to find the next sibling for
 * @returns The next sibling block ID, or null if none exists
 * @example
 * getBlockNextSibling('block-123'); // Returns 'block-124' or null
 */
export function getBlockNextSibling(blockID: BlockID): BlockID | null {
	const store = useBlockStore.getState();
	const block = store.allBlocks[blockID];
	if (!block || !block.parentID) return null;

	const parentBlock = store.allBlocks[block.parentID];
	if (!parentBlock) return null;

	const currentIndex = parentBlock.contentIDs.indexOf(blockID);
	if (currentIndex === -1 || currentIndex >= parentBlock.contentIDs.length - 1) return null;

	return parentBlock.contentIDs[currentIndex + 1];
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