import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/core/block/store';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Types
import type { BlockID, BlockInstance, BlockType, BlockContent } from '@/src/core/block/instance/types';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validate';

/**
 * Reactive hook to get a complete block instance in block queries.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if not found
 *
 * @example
 * useBlock('block-123') → { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	const safeParam = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlock]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return undefined;

	const blockInstance = useBlockStore((state) => state.allBlocks[safeParam.blockID]);
	if (!blockInstance) return undefined;

	return blockInstance;
}
