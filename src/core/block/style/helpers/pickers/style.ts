// Types
import type { BlockInstance, BlockStyles } from '@/src/core/block/instance/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Pick the `styles` object for a block instance by id.
 *
 * @param blockInstance - instance of the block whose styles should be picked
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function pickBlockStyles(blockInstance: BlockInstance): PickResult<BlockStyles> {
	const blockStyles = blockInstance.styles;
	if (!blockStyles) return { success: false, error: `Block styles not found for block: '${blockInstance.id}'` };

	return { success: true, data: blockStyles };
}
