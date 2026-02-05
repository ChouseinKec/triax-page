// Types
import type { ElementKey, ElementDefinition } from '@/core/block/element/types';
import type { FindResult } from '@/shared/types/result';
/**
 * Find the required child elements for the given element definition.
 *
 * @param elementDefinition - the element definition to check
 * @returns FindResult with the array of required element keys
 */
export function findRequiredElements(elementDefinition: ElementDefinition): FindResult<ElementKey[]> {
	const structure = elementDefinition?.structure;
	if (!structure) return { status: 'not-found', message: 'No structure constraints defined' };

	const required = structure.filter((item) => item.min != null && item.min > 0).map((item) => item.key);
	if (required.length === 0) return { status: 'not-found', message: 'No required elements' };

	return { status: 'found', data: required };
}

/**
 * Find the order value for a specific element key in the element definition's structure.
 *
 * @param elementDefinition - the element definition to check
 * @param elementKey - the element key to find the order for
 * @returns FindResult with the order number, or not-found if no order defined
 */
export function findElementOrder(elementDefinition: ElementDefinition, elementKey: ElementKey): FindResult<number> {
	const structure = elementDefinition?.structure;
	if (!structure) return { status: 'not-found', message: 'No structure constraints defined' };

	const item = structure.find((item) => item.key === elementKey);
	if (!item || item.order == null) return { status: 'not-found', message: 'No order defined for this element' };

	return { status: 'found', data: item.order };
}
