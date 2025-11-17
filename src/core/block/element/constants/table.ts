import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, TABLE_SECTIONS, COL_ONLY, TR_ONLY, TABLE_CELLS, VOID_CONTENT } from './shared';

const TABLE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TABLE_TEXT_ATTRIBUTES: AttributeKey[] = [...TABLE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const TH_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'scope', 'colspan', 'rowspan', 'headers'];

const TD_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'colspan', 'rowspan', 'headers'];

export const TABLE_ELEMENTS: Partial<ElementRecord> = {
	table: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: TABLE_SECTIONS,
		description: 'Tabular data container. May contain caption, column groups, header/body/footer sections, or rows.',
	},
	caption: {
		allowedAttributes: TABLE_TEXT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Table caption describing the table purpose.',
	},
	colgroup: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: ['col'],
		description: 'Groups columns for shared presentation. Contains col elements only.',
	},
	col: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Represents a table column (void element, no children).',
	},
	thead: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: TR_ONLY,
		description: 'Table header section grouping header rows (tr).',
	},
	tbody: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: TR_ONLY,
		description: 'Table body section grouping data rows (tr).',
	},
	tfoot: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: TR_ONLY,
		description: 'Table footer section grouping summary rows (tr).',
	},
	tr: {
		allowedAttributes: TABLE_ATTRIBUTES,
		allowedContent: TABLE_CELLS,
		description: 'Table row containing header (th) or data (td) cells.',
	},
	th: {
		allowedAttributes: TH_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Header cell for labeling columns/rows. Can contain flow content.',
	},
	td: {
		allowedAttributes: TD_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Data cell. Can contain flow content such as paragraphs, lists, or images.',
	},
};
