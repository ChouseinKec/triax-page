// Types
import type { ElementKey, ElementDefinition } from '@/core/block/element/types';

// Helpers
import { pickElementDefinitions, pickElementDefinition } from '@/core/block/element/helpers';
import { validateElementKey } from '@/core/block/element/helpers/validators';

// Registry
import { elementRegistryState } from '@/core/block/element/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Get all registered element definitions.
 */
export function getBlockElementDefinitions(): ElementDefinition[] {
	const validData = new ResultPipeline('[ElementQueries → getBlockElementDefinitions]')
		.pick(() => ({
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.elementDefinitions);
}

/**
 * Get a specific element definition by key.
 * @param elementKey - The element key to get the definition for
 */
export function getBlockElementDefinition(elementKey: ElementKey): ElementDefinition | undefined {
	const validData = new ResultPipeline('[ElementQueries → getBlockElementDefinition]')
		.validate({
			elementKey: validateElementKey(elementKey),
		})
		.pick((data) => ({
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))

		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.elementKey, data.elementDefinitions),
		}))
		.execute();
	if (!validData) return;

	return validData.elementDefinition;
}

/**
 * Determines if an element type's styles can be edited by users based on its definition.
 *
 * This function checks whether the element allows style modifications. Most elements
 * support style editing by default, but certain elements may restrict style changes
 * for structural or semantic reasons.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element's styles are editable (or not explicitly restricted), false if style editing is disabled
 */
export function getBlockElementIsStyleEditable(elementKey: ElementKey): boolean {
	const elementDefinition = getBlockElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isStyleEditable ?? true;
}

/**
 * Determines if an element type's attributes can be edited by users based on its definition.
 *
 * This function checks whether the element allows attribute modifications. Most elements
 * support attribute editing by default, but certain elements may have restricted
 * attribute editing for security, semantic, or structural reasons.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element's attributes are editable (or not explicitly restricted), false if attribute editing is disabled
 */
export function getBlockElementIsAttributeEditable(elementKey: ElementKey): boolean {
	const elementDefinition = getBlockElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isAttributeEditable ?? true;
}

