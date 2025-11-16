import type { AttributeRecord } from '@/src/core/block/attribute/types';

export const ACCESSIBILITY_ATTRIBUTES: Partial<AttributeRecord> = {
	role: {
		name: 'role',
		syntax: { type: 'string' },
		description: 'Defines the role of the element for accessibility.',
		category: 'accessibility',
	},
	'aria-label': {
		name: 'aria-label',
		syntax: { type: 'string' },
		description: 'Provides a label for the element.',
		category: 'accessibility',
	},
	'aria-labelledby': {
		name: 'aria-labelledby',
		syntax: { type: 'string' },
		description: 'References elements that label the current element.',
		category: 'accessibility',
	},
	'aria-describedby': {
		name: 'aria-describedby',
		syntax: { type: 'string' },
		description: 'References elements that describe the current element.',
		category: 'accessibility',
	},
	'aria-description': {
		name: 'aria-description',
		syntax: { type: 'string' },
		description: 'Provides an extended, localized description for the element.',
		category: 'accessibility',
	},
	'aria-details': {
		name: 'aria-details',
		syntax: { type: 'string' },
		description: 'References an element that provides additional details.',
		category: 'accessibility',
	},
	'aria-current': {
		name: 'aria-current',
		syntax: {
			type: 'list',
			options: [
				{ value: 'page', name: 'Page' },
				{ value: 'step', name: 'Step' },
				{ value: 'location', name: 'Location' },
				{ value: 'date', name: 'Date' },
				{ value: 'time', name: 'Time' },
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates the current item within a set or container.',
		category: 'accessibility',
	},
	'aria-controls': {
		name: 'aria-controls',
		syntax: { type: 'string' },
		description: 'Identifies elements whose contents are controlled by this element.',
		category: 'accessibility',
	},
	'aria-hidden': {
		name: 'aria-hidden',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is exposed to assistive technologies.',
		category: 'accessibility',
	},
	'aria-live': {
		name: 'aria-live',
		syntax: {
			type: 'list',
			options: [
				{ value: 'off', name: 'Off' },
				{ value: 'polite', name: 'Polite' },
				{ value: 'assertive', name: 'Assertive' },
			],
		},
		description: 'Indicates how updates to the region are presented to assistive technologies.',
		category: 'accessibility',
	},
	'aria-atomic': {
		name: 'aria-atomic',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Whether assistive tech should present the entire region as a whole.',
		category: 'accessibility',
	},
	'aria-busy': {
		name: 'aria-busy',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Signals that the element is being updated and may not be ready for interaction.',
		category: 'accessibility',
	},
	'aria-keyshortcuts': {
		name: 'aria-keyshortcuts',
		syntax: { type: 'string' },
		description: 'Lists keyboard shortcuts that activate or give focus to the element.',
		category: 'accessibility',
	},
	'aria-roledescription': {
		name: 'aria-roledescription',
		syntax: { type: 'string' },
		description: 'Provides a human-readable, localized description for the role.',
		category: 'accessibility',
	},
	'aria-autocomplete': {
		name: 'aria-autocomplete',
		syntax: {
			type: 'list',
			options: [
				{ value: 'none', name: 'None' },
				{ value: 'inline', name: 'Inline' },
				{ value: 'list', name: 'List' },
				{ value: 'both', name: 'Both' },
			],
		},
		description: 'Indicates whether user input may trigger display of suggestions.',
		category: 'accessibility',
	},
	'aria-checked': {
		name: 'aria-checked',
		syntax: {
			type: 'list',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
				{ value: 'mixed', name: 'Mixed' },
			],
		},
		description: 'Indicates current checked state of checkboxes, radio buttons, and other widgets.',
		category: 'accessibility',
	},
	'aria-colcount': {
		name: 'aria-colcount',
		syntax: { type: 'number' },
		description: 'Total number of columns in a table, grid, or treegrid.',
		category: 'accessibility',
	},
	'aria-colindex': {
		name: 'aria-colindex',
		syntax: { type: 'number' },
		description: 'Column index or position in the total set of columns.',
		category: 'accessibility',
	},
	'aria-colindextext': {
		name: 'aria-colindextext',
		syntax: { type: 'string' },
		description: 'Human-readable text alternative for aria-colindex.',
		category: 'accessibility',
	},
	'aria-colspan': {
		name: 'aria-colspan',
		syntax: { type: 'number' },
		description: 'Number of columns spanned by a cell or gridcell.',
		category: 'accessibility',
	},
	'aria-disabled': {
		name: 'aria-disabled',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the element is perceivable but disabled.',
		category: 'accessibility',
	},
	'aria-errormessage': {
		name: 'aria-errormessage',
		syntax: { type: 'string' },
		description: 'References the element that describes an error message.',
		category: 'accessibility',
	},
	'aria-expanded': {
		name: 'aria-expanded',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is expanded or collapsed.',
		category: 'accessibility',
	},
	'aria-flowto': {
		name: 'aria-flowto',
		syntax: { type: 'string' },
		description: 'Indicates an alternative reading order of content.',
		category: 'accessibility',
	},
	'aria-haspopup': {
		name: 'aria-haspopup',
		syntax: {
			type: 'list',
			options: [
				{ value: 'false', name: 'False' },
				{ value: 'true', name: 'True' },
				{ value: 'menu', name: 'Menu' },
				{ value: 'listbox', name: 'Listbox' },
				{ value: 'tree', name: 'Tree' },
				{ value: 'grid', name: 'Grid' },
				{ value: 'dialog', name: 'Dialog' },
			],
		},
		description: 'Indicates the availability and type of interactive popup.',
		category: 'accessibility',
	},
	'aria-invalid': {
		name: 'aria-invalid',
		syntax: {
			type: 'list',
			options: [
				{ value: 'false', name: 'False' },
				{ value: 'true', name: 'True' },
				{ value: 'grammar', name: 'Grammar' },
				{ value: 'spelling', name: 'Spelling' },
			],
		},
		description: 'Indicates the entered value does not conform to the format.',
		category: 'accessibility',
	},
	'aria-level': {
		name: 'aria-level',
		syntax: { type: 'number' },
		description: 'Hierarchical level of an element within a structure.',
		category: 'accessibility',
	},
	'aria-modal': {
		name: 'aria-modal',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is modal when displayed.',
		category: 'accessibility',
	},
	'aria-multiline': {
		name: 'aria-multiline',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether a textbox accepts multiple lines of input.',
		category: 'accessibility',
	},
	'aria-multiselectable': {
		name: 'aria-multiselectable',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the user may select more than one item.',
		category: 'accessibility',
	},
	'aria-orientation': {
		name: 'aria-orientation',
		syntax: {
			type: 'list',
			options: [
				{ value: 'horizontal', name: 'Horizontal' },
				{ value: 'vertical', name: 'Vertical' },
			],
		},
		description: "Indicates if the element's orientation is horizontal or vertical.",
		category: 'accessibility',
	},
	'aria-owns': {
		name: 'aria-owns',
		syntax: { type: 'string' },
		description: 'Identifies elements which are owned by the current element.',
		category: 'accessibility',
	},
	'aria-posinset': {
		name: 'aria-posinset',
		syntax: { type: 'number' },
		description: 'Position in the current set of items.',
		category: 'accessibility',
	},
	'aria-pressed': {
		name: 'aria-pressed',
		syntax: {
			type: 'list',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
				{ value: 'mixed', name: 'Mixed' },
			],
		},
		description: 'Indicates the current pressed state of toggle buttons.',
		category: 'accessibility',
	},
	'aria-readonly': {
		name: 'aria-readonly',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the element is not editable, but is otherwise operable.',
		category: 'accessibility',
	},
	'aria-relevant': {
		name: 'aria-relevant',
		syntax: {
			type: 'list',
			separator: ' ',
			options: [
				{ value: 'additions', name: 'Additions' },
				{ value: 'removals', name: 'Removals' },
				{ value: 'text', name: 'Text' },
				{ value: 'all', name: 'All' },
			],
		},
		description: 'Indicates what changes are relevant and should be announced in live regions.',
		category: 'accessibility',
	},
	'aria-required': {
		name: 'aria-required',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that user input is required.',
		category: 'accessibility',
	},
	'aria-rowcount': {
		name: 'aria-rowcount',
		syntax: { type: 'number' },
		description: 'Total number of rows in a table, grid, or treegrid.',
		category: 'accessibility',
	},
	'aria-rowindex': {
		name: 'aria-rowindex',
		syntax: { type: 'number' },
		description: 'Row index or position in the total set of rows.',
		category: 'accessibility',
	},
	'aria-rowindextext': {
		name: 'aria-rowindextext',
		syntax: { type: 'string' },
		description: 'Human-readable text alternative for aria-rowindex.',
		category: 'accessibility',
	},
	'aria-rowspan': {
		name: 'aria-rowspan',
		syntax: { type: 'number' },
		description: 'Number of rows spanned by a cell or gridcell.',
		category: 'accessibility',
	},
	'aria-selected': {
		name: 'aria-selected',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates the current selected state of various widgets.',
		category: 'accessibility',
	},
	'aria-setsize': {
		name: 'aria-setsize',
		syntax: { type: 'number' },
		description: 'Number of items in the current set.',
		category: 'accessibility',
	},
	'aria-sort': {
		name: 'aria-sort',
		syntax: {
			type: 'list',
			options: [
				{ value: 'none', name: 'None' },
				{ value: 'ascending', name: 'Ascending' },
				{ value: 'descending', name: 'Descending' },
				{ value: 'other', name: 'Other' },
			],
		},
		description: 'Indicates if items are sorted in ascending or descending order.',
		category: 'accessibility',
	},
	'aria-valuemax': {
		name: 'aria-valuemax',
		syntax: { type: 'number' },
		description: 'Maximum allowed value for a range widget.',
		category: 'accessibility',
	},
	'aria-valuemin': {
		name: 'aria-valuemin',
		syntax: { type: 'number' },
		description: 'Minimum allowed value for a range widget.',
		category: 'accessibility',
	},
	'aria-valuenow': {
		name: 'aria-valuenow',
		syntax: { type: 'number' },
		description: 'Current value for a range widget.',
		category: 'accessibility',
	},
	'aria-valuetext': {
		name: 'aria-valuetext',
		syntax: { type: 'string' },
		description: 'Human-readable text alternative for aria-valuenow.',
		category: 'accessibility',
	},
};
