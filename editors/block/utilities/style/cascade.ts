import type { StylesEditor } from '@/editors/block/types';
import type { StyleKeys } from '@/editors/block/types/core/style/style';
import type { DeviceName } from '@/types/page/device';
import type { OrientationName } from '@/types/page/orientation';
import type { PseudoName } from '@/types/page/pseudo';

/**
 * Gets a style property value with CSS cascade fallback logic
 * @param styles - The block's complete style data
 * @param property - The style property to lookup
 * @param device - Current device context
 * @param orientation - Current orientation context
 * @param pseudo - Current pseudo context
 * @param defaultDevice - Default device fallback (usually 'all')
 * @param defaultOrientation - Default orientation fallback (usually 'all')
 * @param defaultPseudo - Default pseudo fallback (usually 'all')
 * @returns The resolved value or empty string if not found
 */
export const cascadeStyle = (styles: StylesEditor, styleKey: StyleKeys, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, defaultDevice: DeviceName = 'all', defaultOrientation: OrientationName = 'all', defaultPseudo: PseudoName = 'all'): string => {
	return (
		// 1. Exact match
		styles[device]?.[orientation]?.[pseudo]?.[styleKey] ??
		// 2. Same context, default pseudo
		styles[device]?.[orientation]?.[defaultPseudo]?.[styleKey] ??
		// 3. Default orientation
		styles[device]?.[defaultOrientation]?.[pseudo]?.[styleKey] ??
		styles[device]?.[defaultOrientation]?.[defaultPseudo]?.[styleKey] ??
		// 4. Default device
		styles[defaultDevice]?.[orientation]?.[pseudo]?.[styleKey] ??
		styles[defaultDevice]?.[orientation]?.[defaultPseudo]?.[styleKey] ??
		styles[defaultDevice]?.[defaultOrientation]?.[pseudo]?.[styleKey] ??
		// 5. Global fallback
		styles[defaultDevice]?.[defaultOrientation]?.[defaultPseudo]?.[styleKey] ??
		// 6. Empty string if nothing found
		''
	);
};

/**
 * Gets all properties with their resolved values for current context
 *
 * Useful for rendering context-specific styles
 */
export const cascadeStyles = (styles: StylesEditor, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, defaultDevice: DeviceName = 'all', defaultOrientation: OrientationName = 'all', defaultPseudo: PseudoName = 'all'): Record<string, string> => {
	// Get all possible properties from all contexts
	const allKeys = new Set<string>();
	Object.values(styles).forEach((deviceStyles) => Object.values(deviceStyles).forEach((orientationStyles) => Object.values(orientationStyles).forEach((pseudoStyles) => Object.keys(pseudoStyles).forEach((prop) => allKeys.add(prop)))));
	// Build CSS with fallback values
	const resolvedStyles: Record<string, string> = {};
	allKeys.forEach((key) => {
		const value = cascadeStyle(styles, key as StyleKeys, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
		if (value) resolvedStyles[key] = value;
	});

	return resolvedStyles;
};

export default {
	cascadeStyle,
	cascadeStyles,
} as const;
