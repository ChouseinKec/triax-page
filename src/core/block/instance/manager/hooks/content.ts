import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/core/block/store';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Types
import type { BlockID, BlockContent } from '@/src/core/block/instance/types';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';

/**
 * React hook to get the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 * @returns The block's content data or undefined
 *
 * @example
 * const content = useBlockContent('block-123') // Returns { text: 'Hello World' }
 */
export function useBlockContent(blockID: BlockID): BlockContent | undefined {
	const safeParam = useMemo(
		() =>
			new ResultPipeline('[BlockQueries → useBlockContent]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[safeParam.blockID];
		if (!block) return undefined;

		return block.content;
	});
}
