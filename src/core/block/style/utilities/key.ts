// Types
import type { StyleKey } from '@/core/block/style/types';
import type { Side, Corner } from '@/shared/components/select/position/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Generates a CSS property name based on the provided property, position, and optional suffix.
 * Handles multiple CSS property naming patterns:
 *
 * - property-position (e.g., padding-top, margin-left)
 * - property-position-suffix (e.g., border-top-width, border-left-style)
 * - property-suffix (e.g., background-color, font-size)
 * - property (e.g., color, display)
 *
 * @param key - The base CSS property (e.g., 'border', 'padding', 'background').
 * @param position - The position/side for the property (e.g., 'top', 'left', 'top-left').
 * @param suffix - The suffix to append (e.g., 'width', 'style', 'color').
 */
export function generateStyleKey(styleKey: string, position?: Side | Corner, suffix?: string): StyleKey | undefined {
	// Pattern 4: Just the base property (e.g., 'color', 'display')
	if (!position && !suffix) {
		return styleKey as StyleKey;
	}

	// Pattern 3: property-suffix (e.g., 'background-color', 'font-size')
	if (!position && suffix) {
		return `${styleKey}-${suffix}` as StyleKey;
	}

	// Pattern 1: property-position (e.g., 'padding-top', 'margin-left')
	if (position && !suffix) {
		return `${styleKey}-${position}` as StyleKey;
	}

	// Pattern 2: property-position-suffix (e.g., 'border-top-width', 'border-left-style')
	if (position && suffix) {
		return `${styleKey}-${position}-${suffix}` as StyleKey;
	}

	// Fallback (should never reach here)
	return devLog.error('Failed to generate style key with inputs:', { styleKey, position, suffix }), undefined;
}
