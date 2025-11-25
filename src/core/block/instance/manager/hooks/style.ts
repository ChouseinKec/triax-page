import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/core/block/store';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Hooks
import { useSelectedDeviceID, useSelectedOrientationID, useSelectedPseudoID } from '@/src/core/layout/page/manager';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { validateStyleKey, resolveStyle } from '@/src/core/block/style/helper';

import { validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/core/layout/page/helper/validators';

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to retrieve
 * @returns The resolved style value or undefined if not found
 *
 * @example
 * const color = useBlockStyle('block-123', 'color') // Returns 'red' or undefined
 */
export function useBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const deviceID = useSelectedDeviceID();
	const orientationID = useSelectedOrientationID();
	const pseudoID = useSelectedPseudoID();
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlockStyle]')
				.validate({
					blockID: validateBlockID(blockID),
					styleKey: validateStyleKey(styleKey),
					deviceID: validateDeviceID(deviceID),
					orientationID: validateOrientationID(orientationID),
					pseudoID: validatePseudoID(pseudoID),
				})
				.execute(),
		[blockID, styleKey, deviceID, orientationID, pseudoID]
	);
	if (!safeParams) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[safeParams.blockID];
		if (!block) return undefined;

		return resolveStyle(
			block.styles, //
			safeParams.styleKey,
			safeParams.deviceID,
			safeParams.orientationID,
			safeParams.pseudoID
		);
	});
}
