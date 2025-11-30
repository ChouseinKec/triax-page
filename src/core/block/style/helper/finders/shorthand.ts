// Types
import type { StyleShorthandRecord, StyleShorthandDefinition, StyleKey } from '@/src/core/block/style/types';
import type { FindResult } from '@/src/shared/types/result';

/**
 * Find the longhand list for a shorthand StyleKey.
 *
 * @param styleKey - The shorthand StyleKey to look up.
 * @param registeredShorthands - The record of registered shorthand definitions to use for the lookup.
 */
export function findStyleShorthand(styleKey: StyleKey, registeredShorthands: StyleShorthandRecord): FindResult<StyleShorthandDefinition> {
	const shorthandDefinition = registeredShorthands[styleKey];
	if (!shorthandDefinition) return { status: 'not-found' };

	return { status: 'found', data: shorthandDefinition };
}
