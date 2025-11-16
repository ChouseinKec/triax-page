import type { ElementDefinition, ElementTag } from '@/src/core/block/element/types';
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
 */
export const ELEMENT_DEFINITIONS: Partial<Record<ElementTag, ElementDefinition>> = {
	...FLOW_ELEMENTS,
	...SECTIONING_ELEMENTS,
	...HEADING_ELEMENTS,
	...PHRASING_ELEMENTS,
	...EMBEDED_ELEMENTS,
	...INTERACTIVE_ELEMENTS,
	...PALPABLE_ELEMENTS,
	...LIST_ELEMENTS,
	...TABLE_ELEMENTS,
	...FORM_ELEMENTS
};