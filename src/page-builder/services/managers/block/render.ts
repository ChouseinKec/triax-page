// Managers
import { useSelectedDeviceID, useSelectedOrientationID, useSelectedPseudoID } from '@/src/page-builder/services/managers/page';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBlockID, validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/page-builder/services/helpers/validate';
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';
import { renderBlockStyles, renderBlockAttributes } from '@/src/page-builder/services/helpers/block';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * @param blockID - The block identifier
 * @returns Rendered CSS string or undefined if block doesn't exist or has no styles
 *
 * @example
 * useRenderedBlockStyles('block-123') → 'color: red; font-size: 16px;'
 */
export function useRenderedBlockStyles(blockID: BlockID): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getRegisteredBlock]')
		.validate({
			blockID: validateBlockID(blockID),
			selectedDeviceID: validateDeviceID(useSelectedDeviceID()),
			selectedOrientationID: validateOrientationID(useSelectedOrientationID()),
			selectedPseudoID: validatePseudoID(useSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	return renderBlockStyles(
		safeData.block.styles, //
		blockID,
		safeData.selectedDeviceID,
		safeData.selectedOrientationID,
		safeData.selectedPseudoID
	);
}

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param blockID - The block identifier
 * @returns Rendered attributes object or undefined if block doesn't exist or has no attributes
 *
 * @example
 * useRenderedBlockAttributes('block-123') → { class: 'my-class', id: 'block-123' }
 */
export function useRenderedBlockAttributes(blockID: BlockID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getRegisteredBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	return renderBlockAttributes(safeData.block.attributes);
}
