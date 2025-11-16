import type { AttributeRecord } from '@/src/core/block/attribute/types';

export const ELEMENT_ATTRIBUTES: Partial<AttributeRecord> = {
	cite: {
		name: 'cite',
		syntax: { type: 'string' },
		description: 'References a creative work.',
		category: 'element',
	},
	datetime: {
		name: 'datetime',
		syntax: { type: 'string' },
		description: 'Defines the date and time of the element.',
		category: 'element',
	},
	href: {
		name: 'href',
		syntax: { type: 'string' },
		description: 'Specifies the URL of a linked resource.',
		category: 'element',
	},
	src: {
		name: 'src',
		syntax: { type: 'string' },
		description: 'Specifies the URL of an external resource.',
		category: 'element',
	},
	alt: {
		name: 'alt',
		syntax: { type: 'string' },
		description: 'Provides alternative text for images.',
		category: 'element',
	},
	type: {
		name: 'type',
		syntax: { type: 'string' },
		description: 'Specifies the type of the element.',
		category: 'element',
	},
	name: {
		name: 'name',
		syntax: { type: 'string' },
		description: 'Specifies the name of the element.',
		category: 'element',
	},
	value: {
		name: 'value',
		syntax: { type: 'string' },
		description: 'Specifies the value of the element.',
		category: 'element',
	},
	placeholder: {
		name: 'placeholder',
		syntax: { type: 'string' },
		description: 'Provides a hint to the user about what to enter.',
		category: 'element',
	},
	disabled: {
		name: 'disabled',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is disabled.',
		category: 'element',
	},
	readonly: {
		name: 'readonly',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is read-only.',
		category: 'element',
	},
	required: {
		name: 'required',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates whether the element is required.',
		category: 'element',
	},
	min: {
		name: 'min',
		syntax: { type: 'string' },
		description: 'Specifies the minimum value for an input.',
		category: 'element',
	},
	max: {
		name: 'max',
		syntax: { type: 'string' },
		description: 'Specifies the maximum value for an input.',
		category: 'element',
	},
	step: {
		name: 'step',
		syntax: { type: 'string' },
		description: 'Specifies the legal number intervals for an input.',
		category: 'element',
	},
	pattern: {
		name: 'pattern',
		syntax: { type: 'string' },
		description: 'Specifies a regular expression for validating input.',
		category: 'element',
	},
	accept: {
		name: 'accept',
		syntax: { type: 'string' },
		description: 'Specifies the types of files the server accepts.',
		category: 'element',
	},
	action: {
		name: 'action',
		syntax: { type: 'string' },
		description: 'Specifies where to send form data when submitted.',
		category: 'element',
	},
	method: {
		name: 'method',
		syntax: {
			type: 'list',
			options: [
				{ value: 'get', name: 'GET' },
				{ value: 'post', name: 'POST' },
				{ value: 'dialog', name: 'Dialog' },
			],
		},
		description: 'Specifies the HTTP method for form submission.',
		category: 'element',
	},
	target: {
		name: 'target',
		syntax: {
			type: 'list',
			options: [
				{ value: '_self', name: 'Self' },
				{ value: '_blank', name: 'Blank' },
				{ value: '_parent', name: 'Parent' },
				{ value: '_top', name: 'Top' },
			],
		},
		description: 'Specifies where to display the response after submitting a form or clicking a link.',
		category: 'element',
	},
	rel: {
		name: 'rel',
		syntax: { type: 'string' },
		description: 'Specifies the relationship between the current and linked document.',
		category: 'element',
	},
	download: {
		name: 'download',
		syntax: { type: 'string' },
		description: 'Specifies that the target will be downloaded when clicked.',
		category: 'element',
	},
	loading: {
		name: 'loading',
		syntax: {
			type: 'list',
			options: [
				{ value: 'eager', name: 'Eager' },
				{ value: 'lazy', name: 'Lazy' },
			],
		},
		description: 'Indicates how the browser should load the resource.',
		category: 'element',
	},
	decoding: {
		name: 'decoding',
		syntax: {
			type: 'list',
			options: [
				{ value: 'sync', name: 'Sync' },
				{ value: 'async', name: 'Async' },
				{ value: 'auto', name: 'Auto' },
			],
		},
		description: 'Provides a hint to the browser about image decoding.',
		category: 'element',
	},
	sizes: {
		name: 'sizes',
		syntax: { type: 'string' },
		description: 'Specifies image sizes for different page layouts.',
		category: 'element',
	},
	srcset: {
		name: 'srcset',
		syntax: { type: 'string' },
		description: 'Specifies a list of image sources for responsive images.',
		category: 'element',
	},
	width: {
		name: 'width',
		syntax: { type: 'string' },
		description: 'Specifies the width of the element.',
		category: 'element',
	},
	height: {
		name: 'height',
		syntax: { type: 'string' },
		description: 'Specifies the height of the element.',
		category: 'element',
	},
	controls: {
		name: 'controls',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that media controls should be displayed.',
		category: 'element',
	},
	autoplay: {
		name: 'autoplay',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that media should start playing automatically.',
		category: 'element',
	},
	loop: {
		name: 'loop',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that media should loop when finished.',
		category: 'element',
	},
	muted: {
		name: 'muted',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that media audio should be muted by default.',
		category: 'element',
	},
	poster: {
		name: 'poster',
		syntax: { type: 'string' },
		description: 'Specifies an image to show while video is downloading or until play is pressed.',
		category: 'element',
	},
	preload: {
		name: 'preload',
		syntax: {
			type: 'list',
			options: [
				{ value: 'none', name: 'None' },
				{ value: 'metadata', name: 'Metadata' },
				{ value: 'auto', name: 'Auto' },
			],
		},
		description: 'Specifies if and how media should be loaded when the page loads.',
		category: 'element',
	},
	for: {
		name: 'for',
		syntax: { type: 'string' },
		description: 'Specifies which form element a label is bound to.',
		category: 'element',
	},
	form: {
		name: 'form',
		syntax: { type: 'string' },
		description: 'Specifies which form the element belongs to.',
		category: 'element',
	},
	formaction: {
		name: 'formaction',
		syntax: { type: 'string' },
		description: 'Specifies where to send form data when submitted via this button.',
		category: 'element',
	},
	formmethod: {
		name: 'formmethod',
		syntax: {
			type: 'list',
			options: [
				{ value: 'get', name: 'GET' },
				{ value: 'post', name: 'POST' },
			],
		},
		description: 'Specifies the HTTP method for form submission via this button.',
		category: 'element',
	},
	multiple: {
		name: 'multiple',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that multiple values can be selected.',
		category: 'element',
	},
	selected: {
		name: 'selected',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that an option should be pre-selected.',
		category: 'element',
	},
	cols: {
		name: 'cols',
		syntax: { type: 'number' },
		description: 'Specifies the visible width of a text area.',
		category: 'element',
	},
	rows: {
		name: 'rows',
		syntax: { type: 'number' },
		description: 'Specifies the visible number of lines in a text area.',
		category: 'element',
	},
	wrap: {
		name: 'wrap',
		syntax: {
			type: 'list',
			options: [
				{ value: 'soft', name: 'Soft' },
				{ value: 'hard', name: 'Hard' },
			],
		},
		description: 'Specifies how text in a text area should be wrapped.',
		category: 'element',
	},
	open: {
		name: 'open',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that details should be visible (open) to the user.',
		category: 'element',
	},
	reversed: {
		name: 'reversed',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that the list order should be descending.',
		category: 'element',
	},
	start: {
		name: 'start',
		syntax: { type: 'number' },
		description: 'Specifies the start value of an ordered list.',
		category: 'element',
	},
	colspan: {
		name: 'colspan',
		syntax: { type: 'number' },
		description: 'Specifies the number of columns a table cell should span.',
		category: 'element',
	},
	rowspan: {
		name: 'rowspan',
		syntax: { type: 'number' },
		description: 'Specifies the number of rows a table cell should span.',
		category: 'element',
	},
	headers: {
		name: 'headers',
		syntax: { type: 'string' },
		description: 'Specifies one or more header cells a table cell is related to.',
		category: 'element',
	},
	scope: {
		name: 'scope',
		syntax: {
			type: 'list',
			options: [
				{ value: 'row', name: 'Row' },
				{ value: 'col', name: 'Column' },
				{ value: 'rowgroup', name: 'Row Group' },
				{ value: 'colgroup', name: 'Column Group' },
			],
		},
		description: 'Specifies whether a header cell is for a row, column, or group.',
		category: 'element',
	},
	checked: {
		name: 'checked',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that an input element should be pre-selected when the page loads.',
		category: 'element',
	},
	maxlength: {
		name: 'maxlength',
		syntax: { type: 'number' },
		description: 'Specifies the maximum number of characters allowed in an input element.',
		category: 'element',
	},
	minlength: {
		name: 'minlength',
		syntax: { type: 'number' },
		description: 'Specifies the minimum number of characters required in an input element.',
		category: 'element',
	},
	autocomplete: {
		name: 'autocomplete',
		syntax: {
			type: 'list',
			options: [
				{ value: 'on', name: 'On' },
				{ value: 'off', name: 'Off' },
			],
		},
		description: 'Specifies whether the browser should autocomplete the input.',
		category: 'element',
	},
	autofocus: {
		name: 'autofocus',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Specifies that an element should automatically get focus when the page loads.',
		category: 'element',
	},
	list: {
		name: 'list',
		syntax: { type: 'string' },
		description: 'Refers to a datalist element that contains pre-defined options.',
		category: 'element',
	},
	size: {
		name: 'size',
		syntax: { type: 'number' },
		description: 'Specifies the width or number of visible options for an input or select element.',
		category: 'element',
	},
	label: {
		name: 'label',
		syntax: { type: 'string' },
		description: 'Label text for option, optgroup, or track elements.',
		category: 'element',
	},
	high: {
		name: 'high',
		syntax: { type: 'number' },
		description: 'The upper bound of the low range for meter elements.',
		category: 'element',
	},
	low: {
		name: 'low',
		syntax: { type: 'number' },
		description: 'The lower bound of the high range for meter elements.',
		category: 'element',
	},
	optimum: {
		name: 'optimum',
		syntax: { type: 'number' },
		description: 'The optimal numeric value for meter elements.',
		category: 'element',
	},
	kind: {
		name: 'kind',
		syntax: {
			type: 'list',
			options: [
				{ value: 'subtitles', name: 'Subtitles' },
				{ value: 'captions', name: 'Captions' },
				{ value: 'descriptions', name: 'Descriptions' },
				{ value: 'chapters', name: 'Chapters' },
				{ value: 'metadata', name: 'Metadata' },
			],
		},
		description: 'The kind of text track for track elements.',
		category: 'element',
	},
	srclang: {
		name: 'srclang',
		syntax: { type: 'string' },
		description: 'Language of the track text data for track elements.',
		category: 'element',
	},
	default: {
		name: 'default',
		syntax: {
			type: 'radio',
			options: [
				{ value: 'true', name: 'True' },
				{ value: 'false', name: 'False' },
			],
		},
		description: 'Indicates that the track should be enabled by default.',
		category: 'element',
	},
	media: {
		name: 'media',
		syntax: { type: 'string' },
		description: 'Media query for which the linked resource is optimized.',
		category: 'element',
	},
	as: {
		name: 'as',
		syntax: {
			type: 'list',
			options: [
				{ value: 'audio', name: 'Audio' },
				{ value: 'document', name: 'Document' },
				{ value: 'embed', name: 'Embed' },
				{ value: 'fetch', name: 'Fetch' },
				{ value: 'font', name: 'Font' },
				{ value: 'image', name: 'Image' },
				{ value: 'object', name: 'Object' },
				{ value: 'script', name: 'Script' },
				{ value: 'style', name: 'Style' },
				{ value: 'track', name: 'Track' },
				{ value: 'video', name: 'Video' },
				{ value: 'worker', name: 'Worker' },
			],
		},
		description: 'The type of content being loaded (for link preload).',
		category: 'element',
	},
	crossorigin: {
		name: 'crossorigin',
		syntax: {
			type: 'list',
			options: [
				{ value: 'anonymous', name: 'Anonymous' },
				{ value: 'use-credentials', name: 'Use credentials' },
			],
		},
		description: 'How the element handles cross-origin requests.',
		category: 'element',
	},
	referrerpolicy: {
		name: 'referrerpolicy',
		syntax: {
			type: 'list',
			options: [
				{ value: 'no-referrer', name: 'No referrer' },
				{ value: 'no-referrer-when-downgrade', name: 'No referrer when downgrade' },
				{ value: 'origin', name: 'Origin' },
				{ value: 'origin-when-cross-origin', name: 'Origin when cross-origin' },
				{ value: 'same-origin', name: 'Same origin' },
				{ value: 'strict-origin', name: 'Strict origin' },
				{ value: 'strict-origin-when-cross-origin', name: 'Strict origin when cross-origin' },
				{ value: 'unsafe-url', name: 'Unsafe URL' },
			],
		},
		description: 'Referrer policy for fetches initiated by the element.',
		category: 'element',
	},
	fetchpriority: {
		name: 'fetchpriority',
		syntax: {
			type: 'list',
			options: [
				{ value: 'high', name: 'High' },
				{ value: 'low', name: 'Low' },
				{ value: 'auto', name: 'Auto' },
			],
		},
		description: 'Hint for the priority of fetching the resource.',
		category: 'element',
	},
	blocking: {
		name: 'blocking',
		syntax: {
			type: 'list',
			separator: ' ',
			options: [{ value: 'render', name: 'Render' }],
		},
		description: 'Indicates the element should block rendering until processed.',
		category: 'element',
	},
};

