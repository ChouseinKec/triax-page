// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT } from './shared';

// Define table sections that can be direct children of table
const TABLE_SECTIONS_ONLY: ElementKey[] = ['caption', 'colgroup', 'thead', 'tbody', 'tfoot'];

const TABLE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TABLE_TEXT_ATTRIBUTES: AttributeKey[] = [...TABLE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const TH_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'scope', 'colspan', 'rowspan', 'headers'];

const TD_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'colspan', 'rowspan', 'headers'];

export const TABLE_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'table',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TABLE_SECTIONS_ONLY,
		forbiddenAncestors: null,
		structure: [
			{ key: 'caption', order: 0, min: 0, max: 1 },
			{ key: 'colgroup', order: 1, min: 0, max: null },
			{ key: 'thead', order: 2, min: 0, max: 1 },
			{ key: 'tbody', order: 3, min: 1, max: null },
			{ key: 'tfoot', order: 4, min: 0, max: 1 },
		],
		description: 'Tabular data container. May contain caption, column groups, header/body/footer sections.',

		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'caption',
		allowedAttributes: TABLE_TEXT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Table caption describing the table purpose.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'colgroup',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['col'],
		forbiddenAncestors: null,
		structure: [{ key: 'col', min: 1, max: null, order: null }],
		description: 'Groups columns for shared presentation. Contains col elements only.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'col',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Represents a table column (void element, no children).',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'thead',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['tr'],
		forbiddenAncestors: null,
		structure: [{ key: 'tr', min: 1, max: null, order: null }],
		description: 'Table header section grouping header rows (tr).',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'tbody',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['tr'],
		forbiddenAncestors: null,
		structure: [{ key: 'tr', min: 1, max: null, order: null }],
		description: 'Table body section grouping data rows (tr).',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'tfoot',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['tr'],
		forbiddenAncestors: null,
		structure: [{ key: 'tr', min: 1, max: null, order: null }],
		description: 'Table footer section grouping summary rows (tr).',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'tr',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['th', 'td'],
		forbiddenAncestors: null,
		structure: [{ key: 'td', min: 1, max: null, order: null }],
		description: 'Table row containing header (th) or data (td) cells.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'th',
		allowedAttributes: TH_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Header cell for labeling columns/rows. Can contain flow content.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
	{
		key: 'td',
		allowedAttributes: TD_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Data cell. Can contain flow content such as paragraphs, lists, or images.',
		isStyleEditable: true,
		isAttributeEditable: true,
	},
];
