// Types
import type { NodeStyles } from '@/core/block/node/types/definition';
import type { StyleKey } from '@/core/block/style/types';
import type { CollectResult } from '@/shared/types/result';

/**
 * Collects all unique style keys from all device/orientation/pseudo combinations in NodeStyles.
 * @param NodeStyles - The block's complete style definition
 */
export function collectBlockStyleKeys(NodeStyles: NodeStyles): CollectResult<StyleKey[]> {
	const allKeys = new Set<StyleKey>();
	Object.values(NodeStyles).forEach((deviceStyles) => {
		Object.values(deviceStyles).forEach((orientationStyles) => {
			Object.values(orientationStyles).forEach((pseudoStyles) => {
				Object.keys(pseudoStyles).forEach((key) => allKeys.add(key as StyleKey));
			});
		});
	});
	return { success: true, data: Array.from(allKeys) };
}
