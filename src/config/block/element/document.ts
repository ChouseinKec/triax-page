// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT, METADATA_CONTENT } from './shared';

const DOCUMENT_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const DOCUMENT_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'html',
		allowedAttributes: DOCUMENT_ATTRIBUTES,
		allowedChildren: ['head', 'body'],
		forbiddenAncestors: [],
		structure: [
			{ key: 'head', order: 0, min: 1, max: 1 },
			{ key: 'body', order: 1, min: 1, max: 1 },
		],
		description: 'The root element of an HTML document, containing the head and body.',
		isStyleEditable: false,
		isAttributeEditable: true,

	},
	{
		key: 'head',
		allowedAttributes: DOCUMENT_ATTRIBUTES,
		allowedChildren: METADATA_CONTENT,
		forbiddenAncestors: [],
		structure: null,
		description: 'Container for metadata about the document, such as styles and scripts.',
		isStyleEditable: false,
		isAttributeEditable: false,

	},
	{
		key: 'body',
		allowedAttributes: DOCUMENT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: [],
		structure: null,
		description: 'The main content area of an HTML document.',
		isStyleEditable: true,
		isAttributeEditable: true,

	},
];
