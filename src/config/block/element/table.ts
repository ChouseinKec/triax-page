// Types
import type { ElementDefinition } from '@/core/block/element/definition/types';
import type { AttributeKey } from '@/core/block/attribute/definition/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, TABLE_SECTIONS, COL_ONLY, TR_ONLY, TABLE_CELLS, VOID_CONTENT } from './shared';

const TABLE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TABLE_TEXT_ATTRIBUTES: AttributeKey[] = [...TABLE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const TH_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'scope', 'colspan', 'rowspan', 'headers'];

const TD_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'colspan', 'rowspan', 'headers'];

export const TABLE_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'table',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TABLE_SECTIONS,
		forbiddenAncestors: null,
		uniqueChildren: { caption: 1 },
		orderedChildren: [['caption'], ['colgroup'], ['thead'], ['tbody', 'tfoot', 'tr']],
		description: 'Tabular data container. May contain caption, column groups, header/body/footer sections, or rows.',
	},
	{
		key: 'caption',
		allowedAttributes: TABLE_TEXT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Table caption describing the table purpose.',
	},
	{
		key: 'colgroup',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['col'],
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Groups columns for shared presentation. Contains col elements only.',
	},
	{
		key: 'col',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Represents a table column (void element, no children).',
	},
	{
		key: 'thead',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Table header section grouping header rows (tr).',
	},
	{
		key: 'tbody',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Table body section grouping data rows (tr).',
	},
	{
		key: 'tfoot',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Table footer section grouping summary rows (tr).',
	},
	{
		key: 'tr',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TABLE_CELLS,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Table row containing header (th) or data (td) cells.',
	},
	{
		key: 'th',
		allowedAttributes: TH_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Header cell for labeling columns/rows. Can contain flow content.',
	},
	{
		key: 'td',
		allowedAttributes: TD_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Data cell. Can contain flow content such as paragraphs, lists, or images.',
	},
];
