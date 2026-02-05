// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT } from './shared';

const HEADING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const HEADING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'h1',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Top-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'h2',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Second-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'h3',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Third-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'h4',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Fourth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'h5',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Fifth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'h6',
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Sixth-level section heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
