// Types
import type { ElementKey, ElementDefinition, RegisteredElements } from '@/core/block/element/types';

// Helpers
import { pickElementDefinition } from '@/core/block/element/helpers';
import { validateElementKey } from '@/core/block/element/helpers/validators';

// Registry
import { getRegisteredElements } from '@/core/block/element/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Get all registered element definitions.
 */
export function getElementDefinitions(): RegisteredElements {
	return getRegisteredElements();
}

/**
 * Get a specific element definition by key.
 * @param elementKey - The element key to get the definition for
 */
export function getElementDefinition(elementKey: ElementKey): ElementDefinition | undefined {
	const results = new ResultPipeline('[ElementQueries → getElementDefinition]')
		.validate({
			elementKey: validateElementKey(elementKey),
		})
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.elementKey, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	return results.elementDefinition;
}