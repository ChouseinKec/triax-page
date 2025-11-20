// Types
import type { ElementDefinition, ElementTag, ElementRecord } from '@/src/core/block/element/types';

// Constants
import { FLOW_ELEMENTS } from './flow';
import { SECTIONING_ELEMENTS } from './sectioning';
import { HEADING_ELEMENTS } from './heading';
import { PHRASING_ELEMENTS } from './phrasing';
import { EMBEDED_ELEMENTS } from './embeded';
import { INTERACTIVE_ELEMENTS } from './interactive';
import { PALPABLE_ELEMENTS } from './palpable';
import { LIST_ELEMENTS } from './list';
import { TABLE_ELEMENTS } from './table';
import { FORM_ELEMENTS } from './form';

/**
 * Registry of element definitions mapped by their tags.
 * Frozen to prevent mutations.
 */
const ELEMENT_DEFINITIONS: Partial<ElementRecord> = {
	...FLOW_ELEMENTS,
	...SECTIONING_ELEMENTS,
	...HEADING_ELEMENTS,
	...PHRASING_ELEMENTS,
	...EMBEDED_ELEMENTS,
	...INTERACTIVE_ELEMENTS,
	...PALPABLE_ELEMENTS,
	...LIST_ELEMENTS,
	...TABLE_ELEMENTS,
	...FORM_ELEMENTS,
};

/**
 * Retrieves all element definitions, returning a deep-frozen record to prevent mutations.
 * @returns The frozen record of all element definitions
 */
export const getElementDefinitions = (): Partial<ElementRecord> => {
	return ELEMENT_DEFINITIONS;
};

/**
 * Retrieves an element definition by tag, returning a deep-frozen copy to prevent mutations.
 * @param elementTag - The element tag to retrieve
 * @returns The element definition if found, undefined otherwise
 */
export const getElementDefinition = (elementTag: ElementTag): ElementDefinition | undefined => {
	const definition = ELEMENT_DEFINITIONS[elementTag];
	if (!definition) return undefined;

	return definition;
};
