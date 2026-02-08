// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT } from './shared';

const HEADING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const HEADING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'hgroup',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedChildren: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
		forbiddenAncestors: null,
		structure: [
			{ key: 'h1', order: 1, min: 0, max: 1 },
			{ key: 'h2', order: 1, min: 0, max: 1 },
			{ key: 'h3', order: 1, min: 0, max: 1 },
			{ key: 'h4', order: 1, min: 0, max: 1 },
			{ key: 'h5', order: 1, min: 0, max: 1 },
			{ key: 'h6', order: 1, min: 0, max: 1 },
			{ key: 'p', order: 2, min: 0, max: null },
		],
		description: 'Represents a heading and related content. Groups a single h1–h6 element with one or more p elements containing subheadings, alternative titles, or taglines.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h1',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Top-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h2',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Second-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h3',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Third-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h4',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Fourth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h5',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Fifth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'h6',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'span', order: null, min: 1, max: null }],
		description: 'Sixth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
];
