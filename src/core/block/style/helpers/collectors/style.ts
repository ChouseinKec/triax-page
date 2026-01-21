// Types
import type { BlockStyles } from '@/core/block/instance/types';
import type { StyleKey } from '@/core/block/style/types';
import type { CollectResult } from '@/shared/types/result';

/**
 * Collects all unique style keys from all device/orientation/pseudo combinations in BlockStyles.
 * @param blockStyles - The block's complete style definition
 */
export function collectBlockStyleKeys(blockStyles: BlockStyles): CollectResult<StyleKey[]> {
	const allKeys = new Set<StyleKey>();
	Object.values(blockStyles).forEach((deviceStyles) => {
		Object.values(deviceStyles).forEach((orientationStyles) => {
			Object.values(orientationStyles).forEach((pseudoStyles) => {
				Object.keys(pseudoStyles).forEach((key) => allKeys.add(key as StyleKey));
			});
		});
	});
	return { success: true, data: Array.from(allKeys) };
}
