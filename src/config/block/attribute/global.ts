import type { AttributeDefinition } from '@/core/block/attribute/types';

export const GLOBAL_DEFINITIONS: AttributeDefinition[] = [
	{
		key: 'id',
		syntax: { type: 'string' },
		description: 'Unique identifier for the element.',
		category: 'global',
	},
	{
		key: 'class',
		syntax: { type: 'string' },
		description: 'Space-separated list of classes for styling.',
		category: 'global',
	},
	{
		key: 'title',
		syntax: { type: 'string' },
		description: 'Advisory information (tooltip) for the element.',
		category: 'global',
	},
	{
		key: 'lang',
		syntax: { type: 'string' },
		description: "Language code for the element's content.",
		category: 'global',
	},
	{
		key: 'tabIndex',
		syntax: { type: 'number' },
		description: 'Tab order of the element for keyboard navigation.',
		category: 'global',
	},
	{
		key: 'hidden',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the element is not relevant.',
		category: 'global',
	},
	{
		key: 'autoFocus',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the element should automatically receive focus when the page loads.',
		category: 'global',
	},
	{
		key: 'draggable',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies whether the element is draggable.',
		category: 'global',
	},
	{
		key: 'contentEditable',
		syntax: {
			type: 'list',
			options: [
				{ value: 'plaintext-only', name: 'Plaintext Only' },
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: "Specifies whether the element's content is editable.",
		category: 'global',
	},
	{
		key: 'text',
		syntax: { type: 'string' },
		description: 'Text content of the element.',
		category: 'global',
	},
	{
		key: 'spellCheck',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element should be checked for spelling errors.',
		category: 'global',
	},
	{
		key: 'accessKey',
		syntax: { type: 'string' },
		description: 'Defines a shortcut key to activate/focus the element.',
		category: 'global',
	},
	{
		key: 'dir',
		syntax: {
			type: 'list',
			options: [
				{ value: 'ltr', name: 'Left to right' },
				{ value: 'rtl', name: 'Right to left' },
				{ value: 'auto', name: 'Auto' },
			],
		},
		description: 'Defines the text direction for the content in the element.',
		category: 'global',
	},
	{
		key: 'popover',
		syntax: { type: 'string' },
		description: 'Controls popover behavior for the element.',
		category: 'global',
	},
	{
		key: 'inputMode',
		syntax: {
			type: 'list',
			options: [
				{ value: 'none', name: 'None' },
				{ value: 'text', name: 'Text' },
				{ value: 'decimal', name: 'Decimal' },
				{ value: 'numeric', name: 'Numeric' },
				{ value: 'tel', name: 'Telephone' },
				{ value: 'search', name: 'Search' },
				{ value: 'email', name: 'Email' },
				{ value: 'url', name: 'URL' },
			],
		},
		description: 'Hints at the type of data that might be entered by the user.',
		category: 'global',
	},
	{
		key: 'inert',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Prevents user interaction with the element and its subtree.',
		category: 'global',
	},
	{
		key: 'enterKeyHint',
		syntax: {
			type: 'list',
			options: [
				{ value: 'enter', name: 'Enter' },
				{ value: 'done', name: 'Done' },
				{ value: 'go', name: 'Go' },
				{ value: 'next', name: 'Next' },
				{ value: 'previous', name: 'Previous' },
				{ value: 'search', name: 'Search' },
				{ value: 'send', name: 'Send' },
			],
		},
		description: 'Hints at the action label for the enter key on virtual keyboards.',
		category: 'global',
	},
	{
		key: 'translate',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'yes', name: 'Yes' },
				{ value: 'no', name: 'No' },
			],
		},
		description: 'Specifies whether the content of the element should be translated.',
		category: 'global',
	},
];
