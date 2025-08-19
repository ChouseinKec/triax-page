import type { HTMLPropertyDefinition, HTMLPropertyKey, HTMLPropertyCategory } from '@/types/block/attribute/property';
import type { HTMLValueSyntax } from '@/types/block/attribute/value';

/**
 * Helper function to create an HTMLPropertyDefinition object.
 * @param name - The canonical name of the HTML attribute (e.g. 'id', 'class').
 * @param syntax - The value type for the attribute (string, boolean, number, etc.).
 * @param options - Optional value options for select-type attributes.
 * @param description - Description for UI/help.
 * @returns An HTMLPropertyDefinition object.
 */
export const createProperty = (name: HTMLPropertyKey, syntax: HTMLValueSyntax, description: string, category: HTMLPropertyCategory): HTMLPropertyDefinition => ({
	name,
	syntax,
	description,
	category,
});

/**
 * A lookup table of all supported HTML global attributes and their metadata.
 * Each entry is an HTMLPropertyDefinition describing the attribute's name, syntax, and description.
 */
export const HTMLPropertyDefinitions: Record<HTMLPropertyKey, HTMLPropertyDefinition> = {
	// Global
	id: createProperty('id', { type: 'string' }, 'Unique identifier for the element.', 'global'),
	class: createProperty('class', { type: 'string' }, 'Space-separated list of classes for styling.', 'global'),
	title: createProperty('title', { type: 'string' }, 'Advisory information (tooltip) for the element.', 'global'),
	lang: createProperty('lang', { type: 'string' }, "Language code for the element's content.", 'global'),
	tabIndex: createProperty('tabIndex', { type: 'number' }, 'Tab order of the element for keyboard navigation.', 'global'),
	hidden: createProperty('hidden', { type: 'boolean' }, 'Indicates that the element is not relevant.', 'global'),
	autoFocus: createProperty('autoFocus', { type: 'boolean' }, 'Indicates that the element should automatically receive focus when the page loads.', 'global'),
	draggable: createProperty(
		'draggable',
		{
			type: 'boolean',
		},
		'Specifies whether the element is draggable.',
		'global'
	),
	contentEditable: createProperty(
		'contentEditable',
		{
			type: 'list',
			options: [
				{ value: 'plaintext-only', name: 'Plaintext Only' },
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		"Specifies whether the element's content is editable.",
		'global'
	),
	text: createProperty('text', { type: 'string' }, 'Text content of the element.', 'global'),
	spellCheck: createProperty(
		'spellCheck',
		{
			type: 'boolean',
		},
		'Indicates whether the element should be checked for spelling errors.',
		'global'
	),
	accessKey: createProperty('accessKey', { type: 'string' }, 'Defines a shortcut key to activate/focus the element.', 'global'),
	dir: createProperty(
		'dir',
		{
			type: 'list',
			options: [
				{ value: 'ltr', name: 'Left to right' },
				{ value: 'rtl', name: 'Right to left' },
				{ value: 'auto', name: 'Auto' },
			],
		},
		'Defines the text direction for the content in the element.',
		'global'
	),
	popover: createProperty('popover', { type: 'string' }, 'Controls popover behavior for the element.', 'global'),

	inputMode: createProperty(
		'inputMode',
		{
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
		'Hints at the type of data that might be entered by the user.',
		'global'
	),
	inert: createProperty('inert', { type: 'boolean' }, 'Prevents user interaction with the element and its subtree.', 'global'),
	enterKeyHint: createProperty(
		'enterKeyHint',
		{
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
		'Hints at the action label for the enter key on virtual keyboards.',
		'global'
	),
	translate: createProperty(
		'translate',
		{
			type: 'boolean',
			options: { true: 'Yes', false: 'No' },
		},
		'Specifies whether the content of the element should be translated.',
		'global'
	),

	// Schema
	itemref: createProperty('itemref', { type: 'string' }, 'References other elements for microdata.', 'schema'),
	itemtype: createProperty('itemtype', { type: 'string' }, 'Specifies the type of item for microdata.', 'schema'),
	itemscope: createProperty('itemscope', { type: 'boolean' }, 'Defines the scope of microdata item.', 'schema'),
	itemid: createProperty('itemid', { type: 'string' }, 'Unique identifier for microdata item.', 'schema'),
	itemprop: createProperty('itemprop', { type: 'string' }, 'Property name for microdata.', 'schema'),

	// Accesibility
	role: createProperty('role', { type: 'string' }, 'Defines the role of the element for accessibility.', 'accesibility'),
	'aria-atomic': createProperty('aria-atomic', { type: 'boolean' }, 'Indicates whether assistive technologies should present all changes to the element as a whole.', 'accesibility'),
	'aria-busy': createProperty('aria-busy', { type: 'boolean' }, 'Indicates whether an element is being modified and assistive technologies should wait.', 'accesibility'),
	'aria-controls': createProperty('aria-controls', { type: 'string' }, 'Identifies the element(s) whose contents or presence are controlled by the current element.', 'accesibility'),
	'aria-current': createProperty('aria-current', { type: 'string' }, 'Indicates the current item within a container or set.', 'accesibility'),
	'aria-describedby': createProperty('aria-describedby', { type: 'string' }, 'Identifies the element(s) that describe the object.', 'accesibility'),
	'aria-description': createProperty('aria-description', { type: 'string' }, 'Defines a string value that describes or annotates the current element.', 'accesibility'),
	'aria-details': createProperty('aria-details', { type: 'string' }, 'Identifies the element that provides additional details.', 'accesibility'),
	'aria-disabled': createProperty('aria-disabled', { type: 'boolean' }, 'Indicates that the element is perceivable but disabled.', 'accesibility'),
	'aria-dropeffect': createProperty('aria-dropeffect', { type: 'string' }, 'Indicates what operations can be performed by dragging.', 'accesibility'),
	'aria-errormessage': createProperty('aria-errormessage', { type: 'string' }, 'Identifies the element that provides an error message.', 'accesibility'),
	'aria-flowto': createProperty('aria-flowto', { type: 'string' }, 'Identifies the next element in an alternate reading order.', 'accesibility'),
	'aria-grabbed': createProperty('aria-grabbed', { type: 'boolean' }, 'Indicates an element\'s "grabbed" state in drag-and-drop operations.', 'accesibility'),
	'aria-haspopup': createProperty('aria-haspopup', { type: 'string' }, 'Indicates the availability and type of interactive popup element.', 'accesibility'),
	'aria-hidden': createProperty('aria-hidden', { type: 'boolean' }, 'Indicates whether the element is exposed to an accessibility API.', 'accesibility'),
	'aria-invalid': createProperty('aria-invalid', { type: 'string' }, 'Indicates the entered value does not conform to the format expected.', 'accesibility'),
	'aria-keyshortcuts': createProperty('aria-keyshortcuts', { type: 'string' }, 'Indicates keyboard shortcuts that can be used to activate or focus an element.', 'accesibility'),
	'aria-label': createProperty('aria-label', { type: 'string' }, 'Defines a string value that labels the current element.', 'accesibility'),
	'aria-labelledby': createProperty('aria-labelledby', { type: 'string' }, 'Identifies the element(s) that label the current element.', 'accesibility'),
	'aria-live': createProperty('aria-live', { type: 'string' }, 'Indicates that an element will be updated, and describes the types of updates.', 'accesibility'),
	'aria-owns': createProperty('aria-owns', { type: 'string' }, 'Identifies an element that is owned by the current element.', 'accesibility'),
	'aria-relevant': createProperty('aria-relevant', { type: 'string' }, 'Indicates what notifications the user agent should trigger for changes in a live region.', 'accesibility'),
	'aria-roledescription': createProperty('aria-roledescription', { type: 'string' }, 'Defines a human-readable description for the role of an element.', 'accesibility'),

	// Specific
	cite: createProperty('cite', { type: 'string' }, 'References a creative work.', 'specific'),
	datetime: createProperty('datetime', { type: 'string' }, 'Defines the date and time of the element.', 'specific'),
} as const;
