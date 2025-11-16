// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Helpers
import { fetchBlock, renderBlockStyles } from '@/src/core/block/instance/helper';
import { resolveStyle, validateStyleKey } from '@/src/core/block/style/helper';
import { validateBlockID } from '@/src/core/block/instance/helper/validate';

// Managers
import { getSelectedDeviceID, getSelectedOrientationID, getSelectedPseudoID } from '@/src/core/layout/page/manager';
import { validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/core/layout/page/helper/validators';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Gets a style key value with CSS cascade fallback logic for block style operations.
 * Resolves the style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to lookup
 * @returns The resolved value or undefined if not found
 *
 * @example
 * getBlockStyle('block-123', 'color') → 'red'
 */
export function getBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return resolveStyle(
		safeParams.block.styles, //
		safeParams.styleKey,
		safeParams.deviceID,
		safeParams.orientationID,
		safeParams.pseudoID
	);
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * @param blockID - The block identifier
 * @returns Rendered CSS string or undefined if block doesn't exist or has no styles
 *
 * @example
 * getBlockRenderedStyles('block-123') → 'color: red; font-size: 16px;'
 */
export function getBlockRenderedStyles(blockID: BlockID): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockRenderedStyles]')
		.validate({
			blockID: validateBlockID(blockID),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return renderBlockStyles(
		safeParams.block.styles, //
		blockID,
		safeParams.deviceID,
		safeParams.orientationID,
		safeParams.pseudoID
	);
}
