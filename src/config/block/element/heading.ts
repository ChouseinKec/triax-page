// Types
import type { ElementDefinition } from '@/core/block/element/definition/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT } from './shared';

const HEADING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const HEADING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'h1',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Top-level section heading.',
	},
	{
		key: 'h2',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Second-level section heading.',
	},
	{
		key: 'h3',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Third-level section heading.',
	},
	{
		key: 'h4',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Fourth-level section heading.',
	},
	{
		key: 'h5',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Fifth-level section heading.',
	},
	{
		key: 'h6',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Sixth-level section heading.',
	},
];
