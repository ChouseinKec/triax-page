// Types
import type { ElementKey, ElementDefinition, RegisteredElements } from '@/core/block/element/types';

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
export function getElementDefinitions(): ElementDefinition[] {
	const validData = new ResultPipeline('[ElementQueries → getElementDefinitions]')
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
export function getElementDefinition(elementKey: ElementKey): ElementDefinition | undefined {
	const validData = new ResultPipeline('[ElementQueries → getElementDefinition]')
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
 * Determines if an element type is deletable based on its definition.
 *
 * This function checks the element's definition to see if it can be deleted by users.
 * Most elements are deletable by default, but certain structural elements like 'html',
 * 'body', and 'head' may be marked as non-deletable to maintain page integrity.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element is deletable (or not explicitly marked as non-deletable), false if deletion is prevented
 */
export function isElementDeletable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isDeletable ?? true;
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
export function isElementStyleEditable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
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
export function isElementAttributeEditable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isAttributeEditable ?? true;
}

/**
 * Determines if an element type can be copied by users based on its definition.
 *
 * This function checks whether the element allows copying operations. Most elements
 * support copying by default, but certain structural elements may be marked as
 * non-copyable to maintain page integrity or prevent duplication of unique elements.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element can be copied (or not explicitly restricted), false if copying is prevented
 */
export function isElementCopyable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isElementCopyable ?? true;
}

/**
 * Determines if an element type can be cloned by users based on its definition.
 *
 * This function checks whether the element allows cloning operations. Most elements
 * support cloning by default, but certain structural elements may be marked as
 * non-cloneable to maintain page integrity or prevent duplication of unique elements.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element can be cloned (or not explicitly restricted), false if cloning is prevented
 */
export function isElementCloneable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isElementCloneable ?? true;
}

/**
 * Determines if an element type can be reordered by users based on its definition.
 *
 * This function checks whether the element allows reordering operations. Most elements
 * support reordering by default, but certain structural elements may be marked as
 * non-orderable to maintain page integrity or prevent disruption of unique layouts.
 *
 * @param elementKey - The key of the element type to check
 * @returns True if the element can be reordered (or not explicitly restricted), false if reordering is prevented
 */
export function isElementOrderable(elementKey: ElementKey): boolean {
	const elementDefinition = getElementDefinition(elementKey);
	if (!elementDefinition) return false;

	return elementDefinition.isOrderable ?? true;
}
