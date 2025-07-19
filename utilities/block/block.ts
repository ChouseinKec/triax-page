import type { BlockData } from '@/types/block/block';
import type { BlockProps } from '@/editors/block/components/block/types';

/**
 * Initializes a flat map of BlockData into a map of BlockProps with empty content arrays.
 * Adds selection and descendant selection state to each node.
 *
 * @param blocks - Flat record of blocks keyed by id
 * @param selectedID - The currently selected block id (or null)
 * @param hasBlockSelectedChild - Function to determine if a block has a selected descendant
 * @returns Map of block id to BlockProps (with empty content)
 */
function initializeBlocks(blocks: Record<string, BlockData>, selectedID: string | null, hasBlockSelectedChild: (id: string) => boolean): Record<string, BlockProps & { content: BlockProps[] }> {
	const idToNode: Record<string, BlockProps & { content: BlockProps[] }> = {};

	Object.values(blocks).forEach((block) => {
		// Remove contentIDs (used only for flat structure)
		const { contentIDs, ...blockWithoutChildIDs } = block;

		idToNode[block.id] = {
			...blockWithoutChildIDs,
			content: [], // Will be filled in by nestBlocks
			isSelected: selectedID === block.id,
			hasSelectedChild: hasBlockSelectedChild(block.id),
		};
	});

	return idToNode;
}

/**
 * Nests a flat map of BlockProps into a tree structure by populating the content arrays.
 *
 * @param idToNode - Map of block id to BlockProps (with empty content)
 * @returns Array of root BlockProps, each with nested content
 */
function nestBlocks(idToNode: Record<string, BlockProps & { content: BlockProps[] }>): BlockProps[] {
	const roots: (BlockProps)[] = [];

	Object.values(idToNode).forEach((block) => {
		// If block has a parent, add it to the parent's content array
		if (block.parentID && idToNode[block.parentID]) {
			idToNode[block.parentID].content.push(block);
		} else {
			// Otherwise, it's a root block
			roots.push(block);
		}
	});

	return roots;
}

/**
 * Converts a flat record of BlockData into a nested tree of BlockProps.
 * Combines initializeBlocks and nestBlocks for convenience.
 *
 * @param blocks - Flat record of blocks keyed by id
 * @param selectedID - The currently selected block id (or null)
 * @param hasBlockSelectedChild - Function to determine if a block has a selected descendant
 * @returns Array of root BlockProps, each with nested content
 */
function treeifyBlocks(blocks: Record<string, BlockData>, selectedID: string | null, hasBlockSelectedChild: (id: string) => boolean): BlockProps[] {
	const idToNode = initializeBlocks(blocks, selectedID, hasBlockSelectedChild);
	return nestBlocks(idToNode);
}

export { treeifyBlocks, initializeBlocks, nestBlocks };
