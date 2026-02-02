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
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Thematic break between paragraphs of a section (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'br',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedChildren: [],
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Line break within text (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
];
