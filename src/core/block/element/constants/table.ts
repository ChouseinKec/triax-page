import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, TABLE_SECTIONS, COL_ONLY, TR_ONLY, TABLE_CELLS, VOID_CONTENT } from './shared';

const TABLE_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TABLE_TEXT_ATTRIBUTES = [...TABLE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const TABLE_ELEMENTS: Partial<ElementRecord> = {
	table: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['caption', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'],
		description: 'Tabular data container. May contain caption, column groups, header/body/footer sections, or rows.',
	},
	caption: {
		attributes: TABLE_TEXT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Table caption describing the table purpose.',
	},
	colgroup: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['col'],
		description: 'Groups columns for shared presentation. Contains col elements only.',
	},
	col: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: [],
		description: 'Represents a table column (void element, no children).',
	},
	thead: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['tr'],
		description: 'Table header section grouping header rows (tr).',
	},
	tbody: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['tr'],
		description: 'Table body section grouping data rows (tr).',
	},
	tfoot: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['tr'],
		description: 'Table footer section grouping summary rows (tr).',
	},
	tr: {
		attributes: TABLE_ATTRIBUTES,
		allowedContent: ['th', 'td'],
		description: 'Table row containing header (th) or data (td) cells.',
	},
	th: {
		attributes: TABLE_TEXT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Header cell for labeling columns/rows. Can contain flow content.',
	},
	td: {
		attributes: TABLE_TEXT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Data cell. Can contain flow content such as paragraphs, lists, or images.',
	},
};
