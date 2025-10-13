// Types
import type { BlockDefinition, BlockID, BlockInstance, BlockRecord, BlockType } from '@/src/page-builder/core/block/block/types';
import type { FetchResult } from '@/src/shared/types/result';

// Registry
import { getRegisteredBlock } from '@/src/page-builder/state/registries/block';

export function fetchBlock(blockID: BlockID, allBlocks: BlockRecord): FetchResult<BlockInstance> {
	const block = allBlocks[blockID];
	if (!block) return { success: false, error: `Block not found: '${blockID}' does not exist in the block collection` };

	return { success: true, data: block };
}

export function fetchRegisteredBlock(blockType: BlockType): FetchResult<BlockDefinition> {
	const block = getRegisteredBlock(blockType);
	if (!block) return { success: false, error: `Block type not registered: '${blockType}' is not a recognized block type` };

	return { success: true, data: block };
}
