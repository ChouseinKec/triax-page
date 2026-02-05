// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT } from './shared';

export const PALPABLE_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'hr',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Thematic break between paragraphs of a section (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'br',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Line break within text (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
