import type { BlockStyleData } from '@/types/block/block';
import type { StylePropertyKeys } from '@/types/style/property';
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
export const getStyleWithFallback = (styles: BlockStyleData, property: StylePropertyKeys, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, defaultDevice: DeviceName = 'all', defaultOrientation: OrientationName = 'all', defaultPseudo: PseudoName = 'all'): string => {
	return (
		// 1. Exact match
		styles[device]?.[orientation]?.[pseudo]?.[property] ??
		// 2. Same context, default pseudo
		styles[device]?.[orientation]?.[defaultPseudo]?.[property] ??
		// 3. Default orientation
		styles[device]?.[defaultOrientation]?.[pseudo]?.[property] ??
		styles[device]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
		// 4. Default device
		styles[defaultDevice]?.[orientation]?.[pseudo]?.[property] ??
		styles[defaultDevice]?.[orientation]?.[defaultPseudo]?.[property] ??
		styles[defaultDevice]?.[defaultOrientation]?.[pseudo]?.[property] ??
		// 5. Global fallback
		styles[defaultDevice]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
		// 6. Empty string if nothing found
		''
	);
};

/**
 * Gets all properties with their resolved values for current context
 * Useful for rendering context-specific styles
 */
export const getAllStylesWithFallback = (styles: BlockStyleData, device: DeviceName, orientation: OrientationName, pseudo: PseudoName, defaultDevice: DeviceName = 'all', defaultOrientation: OrientationName = 'all', defaultPseudo: PseudoName = 'all'): Record<string, string> => {
	// Get all possible properties from all contexts
	const allProperties = new Set<string>();
	Object.values(styles).forEach((deviceStyles) => Object.values(deviceStyles).forEach((orientationStyles) => Object.values(orientationStyles).forEach((pseudoStyles) => Object.keys(pseudoStyles).forEach((prop) => allProperties.add(prop)))));

	// Build CSS with fallback values
	const resolvedStyles: Record<string, string> = {};
	allProperties.forEach((property) => {
		const value = getStyleWithFallback(styles, property as StylePropertyKeys, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
		if (value) resolvedStyles[property] = value;
	});

	return resolvedStyles;
};
