// Managers
import { useSelectedDeviceID, useSelectedOrientationID, useSelectedPseudoID } from '@/src/page-builder/services/managers/page';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';

// Utilities
import { renderBlockStyles, renderBlockAttributes } from '@/src/page-builder/core/block/block/utilities';
import { validateOrLog } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/block/validation';
import { validateDeviceID } from '@/src/page-builder/services/helpers/page/device';
import { validateOrientationID } from '@/src/page-builder/services/helpers/page/orientation';
import { validatePseudoID } from '@/src/page-builder/services/helpers/page/pseudo';

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
	const safeParams = validateOrLog(
		{
			blockID: validateBlockID(blockID),
			selectedDeviceID: validateDeviceID(useSelectedDeviceID()),
			selectedOrientationID: validateOrientationID(useSelectedOrientationID()),
			selectedPseudoID: validatePseudoID(useSelectedPseudoID()),
		},
		`[BlockManager → useRenderedBlockStyles]`
	);
	if (!safeParams) return;

	const styles = useBlockStore((state) => state.allBlocks[safeParams.blockID]?.styles);
	if (!styles) return devLog.warn(`[BlockManager → useRenderedBlockStyles] No styles found for block ID: ${safeParams.blockID}`), undefined;

	return renderBlockStyles(styles, blockID, safeParams.selectedDeviceID, safeParams.selectedOrientationID, safeParams.selectedPseudoID);
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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useRenderedBlockAttributes]`);
	if (!safeParams) return;

	const attributes = useBlockStore((state) => state.allBlocks[safeParams.blockID]?.attributes);
	if (!attributes) return devLog.warn(`[BlockManager → useRenderedBlockAttributes] No attributes found for block ID: ${safeParams.blockID}`), undefined;

	return renderBlockAttributes(attributes);
}
