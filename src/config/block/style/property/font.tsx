import type { StyleDefinition } from "@/core/block/style/types";

export const FONT_DEFINITIONS: StyleDefinition[] = [
	{
		key: 'font-size',
		description: 'Sets the size of the font.',
		syntax: '<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math',
	},
	{
		key: 'font-weight',
		description: 'Sets the thickness or boldness of the font.',
		syntax: '<font-weight-absolute> | bolder | lighter',
	},
	{
		key: 'line-height',
		description: 'Sets the height of each line of text.',
		syntax: 'normal | <number [0,∞]> | <length-percentage [0,∞]>',
	},
	{
		key: 'font-family',
		description: 'Specifies the font family for the element\'s text.',
		syntax: '[ <family-name> | <generic-family> ]#',
	},
	{
		key: 'font-style',
		description: 'Specifies the font style.',
		syntax: 'normal | italic | left | right | oblique <angle [-90deg,90deg]>?',
		icons: {
			'italic': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" /></svg>
			),
			'normal': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M12 4v16" /><path fill='black' d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /><path fill='black' d="M9 20h6" /></svg>
			),
		},
	},
	{
		key: 'color',
		description: 'Sets the color of the text.',
		syntax: '<color>',
	},
	{
		key: 'text-align',
		description: 'Sets the horizontal alignment of text within its container.',
		syntax: 'start | end | left | right | center | <string> | justify | match-parent | justify-all',
	},
	{
		key: 'text-align-last',
		description: 'Specifies how the last line of a block or a line right before a forced line break is aligned.',
		syntax: 'auto | start | end | left | right | center | justify | match-parent',
	},
	{
		key: 'text-transform',
		description: 'Controls the capitalization of text.',
		syntax: 'none | [ capitalize | uppercase | lowercase ] || full-width || full-size-kana | math-auto ',
	},
	{
		key: 'text-combine-upright',
		description: 'Combines multiple characters into a single upright character, useful for vertical text layout.',
		syntax: 'none | all | [ digits <integer [2,4]>? ]',
	},
	{
		key: 'text-overflow',
		description: 'Specifies how overflowed content that is not displayed is signaled to the user.',
		syntax: '[ clip | ellipsis | <string> | fade | fade(<length-percentage>) ]{1,2}',
	},
	{
		key: 'text-orientation',
		description: 'Specifies the orientation of text characters in a line.',
		syntax: 'mixed | upright | sideways',
	},
	{
		key: 'text-decoration',
		description: 'Specifies decoration added to text, such as underline, overline, or line-through.',
		syntax: '<text-decoration-line> || <text-decoration-thickness> || <text-decoration-style> || <text-decoration-color>',
	},
	{
		key: 'text-shadow',
		description: 'Adds shadow effects to text.',
		syntax: 'none | <shadow>#',
	},
	{
		key: 'text-indent',
		description: 'Indents the first line of text by a specified amount.',
		syntax: '[ <length-percentage> ] && hanging? && each-line?',
	},
	{
		key: 'writing-mode',
		description: 'Defines whether lines of text are laid out horizontally or vertically.',
		syntax: 'horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr',
	},
	{
		key: 'white-space',
		description: 'Controls how whitespace inside the element is handled.',
		syntax: 'normal | pre | pre-wrap | pre-line | <white-space-collapse> || <text-wrap-mode> || <white-space-trim>',
	},
	{
		key: 'word-break',
		description: 'Specifies how words should break when reaching the end of a line.',
		syntax: 'normal | break-all | keep-all | manual | auto-phrase | break-word',
	},
	{
		key: 'line-break',
		description: 'Sets how/where to break lines within text.',
		syntax: 'auto|loose|normal|strict|anywhere',
	},
	{
		key: 'letter-spacing',
		description: 'Sets the spacing between characters of text.',
		syntax: 'normal | <length-percentage>',
	},
	{
		key: 'word-spacing',
		description: 'Sets the spacing between words in text.',
		syntax: 'normal | <length-percentage>',
	},
	{
		key: 'column-count',
		description: 'Specifies the number of columns an element should be divided into for multi-column layout.',
		syntax: 'auto|<integer [1,∞]>',
	},
	{
		key: 'column-width',
		description: 'Specifies the ideal width of columns in a multi-column layout.',
		syntax: 'auto | <length [0,∞]> | min-content | max-content | fit-content( <length-percentage> )',
	},
	{
		key: 'column-rule-width',
		description: 'Specifies the width of the line that separates columns in a multi-column layout.',
		syntax: '<line-width-list> | <auto-line-width-list>',
	},
	{
		key: 'column-rule-style',
		description: 'Specifies the style of the line that separates columns.',
		syntax: '<line-style-list> | <auto-line-style-list>',
		icons: {
			'none': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z" /></svg>
			),
			'solid': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" /></svg>
			),
			'ridge': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M222.16,177.25a8,8,0,0,1-1,11.25c-17.36,14.39-32.86,19.5-47,19.5-18.58,0-34.82-8.82-49.93-17-25.35-13.76-47.24-25.64-79.07.74a8,8,0,1,1-10.22-12.31c40.17-33.28,70.32-16.92,96.93-2.48,25.35,13.75,47.24,25.63,79.07-.74A8,8,0,0,1,222.16,177.25Zm-11.27-57c-31.83,26.38-53.72,14.5-79.07.74-26.61-14.43-56.76-30.79-96.93,2.49a8,8,0,0,0,10.22,12.31c31.83-26.38,53.72-14.5,79.07-.74,15.11,8.19,31.35,17,49.93,17,14.14,0,29.64-5.11,47-19.5a8,8,0,1,0-10.22-12.31ZM45.11,79.8c31.83-26.37,53.72-14.49,79.07-.74,15.11,8.2,31.35,17,49.93,17,14.14,0,29.64-5.12,47-19.5a8,8,0,1,0-10.22-12.31c-31.83,26.38-53.72,14.5-79.07.74C105.21,50.58,75.06,34.22,34.89,67.5A8,8,0,1,0,45.11,79.8Z" /></svg>
			),
			'inset': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M42.34,77.66A8,8,0,0,1,53.66,66.34L128,140.69l74.34-74.35a8,8,0,0,1,11.32,11.32l-80,80a8,8,0,0,1-11.32,0ZM208,184H48a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16Z" /></svg>
			),
			'hidden': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z" /></svg>
			),
			'dashed': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M152,40a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,40Zm-8,168H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM208,32H184a8,8,0,0,0,0,16h24V72a8,8,0,0,0,16,0V48A16,16,0,0,0,208,32Zm8,72a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V112A8,8,0,0,0,216,104Zm0,72a8,8,0,0,0-8,8v24H184a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V184A8,8,0,0,0,216,176ZM40,152a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,40,152Zm32,56H48V184a8,8,0,0,0-16,0v24a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16ZM72,32H48A16,16,0,0,0,32,48V72a8,8,0,0,0,16,0V48H72a8,8,0,0,0,0-16Z" /></svg>
			),
			'dotted': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,144ZM48,96a32,32,0,1,0,32,32A32,32,0,0,0,48,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,48,144ZM208,96a32,32,0,1,0,32,32A32,32,0,0,0,208,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,208,144Z" /></svg>
			),
			'double': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M224,160a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,160ZM40,104H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z" /></svg>
			),
			'groove': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M239.24,131.4c-22,46.8-41.4,68.6-61.2,68.6-25.1,0-40.73-33.32-57.28-68.6C107.7,103.56,92.9,72,78,72c-16.4,0-36.31,37.21-46.72,59.4a8,8,0,0,1-14.48-6.8C38.71,77.8,58.16,56,78,56c25.1,0,40.73,33.32,57.28,68.6C148.3,152.44,163.1,184,178,184c16.4,0,36.31-37.21,46.72-59.4a8,8,0,0,1,14.48,6.8Z" /></svg>
			),
			'outset': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M213.66,197.66a8,8,0,0,1-11.32,0L128,123.31,53.66,197.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,197.66ZM48,80H208a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16Z" /></svg>
			),
		}
	},
	{
		key: 'column-rule-color',
		description: 'Specifies the color of the line that separates columns.',
		syntax: '<line-color-list> | <auto-line-color-list>',
	},
	{
		key: 'break-before',
		description: 'Specifies whether a page, column, or region break should occur before the element.',
		syntax: 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',

	},
	{
		key: 'break-inside',
		description: 'Specifies whether a page, column, or region break should occur inside the element.',
		syntax: 'auto|avoid|avoid-page|avoid-column|avoid-region',

	},
	{
		key: 'break-after',
		description: 'Specifies whether a page, column, or region break should occur after the element.',
		syntax: 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',

	},
	{
		key: 'column-span',
		description: 'Specifies how many columns an element should span across in a multi-column layout.',
		syntax: 'none|<integer [1,∞]> | all | auto',
	},
	{
		key: 'column-fill',
		description: 'Specifies how content should be distributed between columns.',
		syntax: 'auto | balance | balance-all',
	},
]
