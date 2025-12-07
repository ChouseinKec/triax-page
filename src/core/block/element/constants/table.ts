import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, TABLE_SECTIONS, COL_ONLY, TR_ONLY, TABLE_CELLS, VOID_CONTENT } from './shared';

const TABLE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TABLE_TEXT_ATTRIBUTES: AttributeKey[] = [...TABLE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const TH_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'scope', 'colspan', 'rowspan', 'headers'];

const TD_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'colspan', 'rowspan', 'headers'];

export const TABLE_ELEMENTS: Partial<ElementRecord> = {
	table: {
		tag: 'table',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TABLE_SECTIONS,
		forbiddenAncestors: null,
		uniqueElements: { caption: 1 },
		orderedElements: [['caption'], ['colgroup'], ['thead'], ['tbody', 'tfoot', 'tr']],
		description: 'Tabular data container. May contain caption, column groups, header/body/footer sections, or rows.',
	},
	caption: {
		tag: 'caption',
		allowedAttributes: TABLE_TEXT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Table caption describing the table purpose.',
	},
	colgroup: {
		tag: 'colgroup',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: ['col'],
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Groups columns for shared presentation. Contains col elements only.',
	},
	col: {
		tag: 'col',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Represents a table column (void element, no children).',
	},
	thead: {
		tag: 'thead',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Table header section grouping header rows (tr).',
	},
	tbody: {
		tag: 'tbody',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Table body section grouping data rows (tr).',
	},
	tfoot: {
		tag: 'tfoot',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TR_ONLY,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Table footer section grouping summary rows (tr).',
	},
	tr: {
		tag: 'tr',
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedChildren: TABLE_CELLS,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Table row containing header (th) or data (td) cells.',
	},
	th: {
		tag: 'th',
		allowedAttributes: TH_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Header cell for labeling columns/rows. Can contain flow content.',
	},
	td: {
		tag: 'td',
		allowedAttributes: TD_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Data cell. Can contain flow content such as paragraphs, lists, or images.',
	},
};
