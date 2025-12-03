// Types
import type { StyleShorthandRecord } from 'src/core/block/style/types';

// Constants
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/core/block/style/constants';

/**
 * Retrieves the style shorthand definitions.
 */
export function getStyleShorthands(): StyleShorthandRecord | undefined {
	const shorthands = STYLE_SHORTHAND_DEFINITIONS;
	if (!shorthands) return undefined;

	return shorthands;
}
