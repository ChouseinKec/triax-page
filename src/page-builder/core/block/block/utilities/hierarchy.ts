// Types
import type { BlockInstance, BlockTypes, BlockID, BlockDefinition } from '@/src/page-builder/core/block/block/types';

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
export function getBlockDescendants(blockIDs: BlockID[], allBlocks: Record<BlockID, BlockInstance>): BlockID[] {
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
export function isBlockDescendant(parentBlock: BlockInstance, targetID: BlockID, allBlocks: Record<BlockID, BlockInstance>): boolean {
	if (!parentBlock?.contentIDs) return false;
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
export function isBlockChildAllowed(parentType: BlockTypes, childType: BlockTypes, registeredBlocks: Record<string, BlockDefinition>): boolean {
	if (!registeredBlocks || !parentType || !childType) return false;

	const parentBlock = registeredBlocks[parentType];
	const childBlock = registeredBlocks[childType];
	if (!parentBlock || !childBlock) return false;

	if (parentBlock.permittedContent == null) return true;
	return parentBlock.permittedContent.includes(childType);
}
