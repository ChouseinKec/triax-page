// Types
import type { ElementDefinition, ElementTag, ElementRecord } from '@/src/core/block/element/types';
import type { FetchResult } from '@/src/shared/types/result';

/**
 * Fetches an element definition from the element registry by its tag.
 * Returns a result object indicating success with the definition or failure with an error message.
 * @param elementTag - The tag identifier of the element definition to fetch
 * @param elementDefinitions - The element definitions record
 * @returns FetchResult containing the element definition or error message
 */
export function fetchElementDefinition(elementTag: ElementTag, elementDefinitions: Partial<ElementRecord>): FetchResult<ElementDefinition> {
	const definition = elementDefinitions[elementTag];
	if (!definition) return { success: false, error: `Element tag not found: '${elementTag}' is not a recognized element tag` };

	return { success: true, data: definition };
}
