import type { StyleDefinition } from "@/core/block/style/types";

export const DISPLAY_DEFINITIONS: StyleDefinition[] = [
	{
		key: 'display',
		description: 'Controls the element\'s display type and how it participates in layout.',
		syntax: '[<display-outside> || <display-inside>] | <display-box> | <display-outside>  [<display-inside> | math]',
		icons: {
			'block': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
			),
			'flex': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></svg>
			),
			'grid': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
			),
			'none': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill='black' d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
			),
			'inline': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M5 12h14" /></svg>
			),
			'flow-root': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M208,96a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v8H96V48A16,16,0,0,0,80,32H48A16,16,0,0,0,32,48V80A16,16,0,0,0,48,96h8v64H48a16,16,0,0,0-16,16v32a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16v-8h64v8a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V176a16,16,0,0,0-16-16h-8V96ZM176,48h32V80H176ZM48,48H80V63.9a.51.51,0,0,0,0,.2V80H48ZM80,208H48V176H80v15.9a.51.51,0,0,0,0,.2V208Zm128,0H176V176h32Zm-24-48h-8a16,16,0,0,0-16,16v8H96v-8a16,16,0,0,0-16-16H72V96h8A16,16,0,0,0,96,80V72h64v8a16,16,0,0,0,16,16h8Z" /></svg>
			),
			'math': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z" /></svg>
			)
		},
	},
	{
		key: 'flex-direction',
		description: 'Defines the main axis direction for flex container children.',
		syntax: 'row | row-reverse | column | column-reverse',
		icons: {
			'column': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>
			),
			'column-reverse': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>
			),
			'row': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
			),
			'row-reverse': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
			),

		},
	},
	{
		key: 'flex-wrap',
		description: 'Specifies whether flex items are forced onto a single line or can wrap.',
		syntax: 'nowrap | wrap | wrap-reverse',
		icons: {
			'wrap': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M3 12h18" /><path fill='black' d="M3 18h18" /><path fill='black' d="M3 6h18" /></svg>
			),
			'nowrap': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M5 12h14" /></svg>
			),
			'wrap-reverse': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path fill='black' d="m17 2 4 4-4 4" /><path fill='black' d="M3 11v-1a4 4 0 0 1 4-4h14" /><path fill='black' d="m7 22-4-4 4-4" /><path fill='black' d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
			),
		},
	},
	{
		key: 'align-items',
		description: 'Aligns flex items along the cross axis of the flex container.',
		syntax: 'normal | stretch | <baseline-position> | <overflow-position>? <self-position>',
	},
	{
		key: 'align-content',
		description: 'Aligns flex lines within a flex container when there is extra space.',
		syntax: 'normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ',

	},
	{
		key: 'justify-content',
		description: 'Aligns flex items along the main axis of the flex container.',
		syntax: 'normal | <content-distribution> | <overflow-position>? [<content-position> | left | right]',

	},
	{
		key: 'gap',
		description: 'Shorthand for setting both row-gap and column-gap.',
		syntax: '<row-gap> <column-gap>?',
	},
	{
		key: 'row-gap',
		description: 'Sets the size of the gap between grid rows.',
		syntax: '<row-gap>',
	},
	{
		key: 'column-gap',
		description: 'Sets the size of the gap between grid columns.',
		syntax: '<column-gap>',
	},

	{
		key: 'flex-grow',
		description: 'Defines how much a flex item will grow relative to other flex items.',
		syntax: '<number [0,∞]>',
	},
	{
		key: 'flex-shrink',
		description: 'Defines how much a flex item will shrink relative to other flex items.',
		syntax: '<number [0,∞]>',
	},
	{
		key: 'flex-basis',
		description: 'Defines the default size of a flex item before the remaining space is distributed.',
		syntax: 'content | <width>',
	},

	{
		key: 'align-self',
		description: 'Allows a flex item to override the align-items value for its own alignment.',
		syntax: 'auto | <overflow-position>? [ normal | <self-position> ] | stretch | <baseline-position>'
	},
	{
		key: 'justify-self',
		description: 'Allows a flex item to override the justify-content value for its own alignment.',
		syntax: 'auto | <overflow-position>? [ normal | <self-position> | left | right ] | stretch | <baseline-position>'
	},
	{
		key: 'order',
		description: 'Defines the order of flex items within a flex container.',
		syntax: '<integer>',
	},



	{
		key: 'justify-items',
		description: 'Aligns items along the main axis in a single line or grid cell.',
		syntax: 'normal | stretch | <baseline-position> | <overflow-position>? [<self-position> | left | right] | legacy | legacy && [left | right | center]',
	},
	{
		key: 'grid-auto-flow',
		description: 'Controls the placement algorithm for auto-placed grid items.',
		syntax: '[row | column] || dense',
		icons: {
			'column': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
			),
			'row': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill='black' d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>
			),
			'dense': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" /></svg>
			),

		},
	},
	{
		key: 'grid-auto-rows',
		description: 'Specifies the size of rows created automatically in the grid.',
		syntax: '<track-size>+',
	},
	{
		key: 'grid-auto-columns',
		description: 'Specifies the size of columns created automatically in the grid.',
		syntax: '<track-size>+ ',
	},

	{
		key: 'grid-template-areas',
		description: 'Defines named grid areas for layout.',
		syntax: 'none | <string>+',
	},
	{
		key: 'grid-template-rows',
		description: 'Defines the row structure of the grid.',
		syntax: 'none | subgrid | <track-list> | <auto-track-list>',

	},
	{
		key: 'grid-template-columns',
		description: 'Defines the column structure of the grid.',
		syntax: 'none | subgrid | <track-list> | <auto-track-list> ',

	},
	{
		key: 'direction',
		description: 'Specifies the base writing direction for text and layout.',
		syntax: 'ltr | rtl',
		icons: {
			'ltr': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M3 19V5" /><path fill='black' d="m13 6-6 6 6 6" /><path fill='black' d="M7 12h14" /></svg>
			),
			'rtl': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="M17 12H3" /><path fill='black' d="m11 18 6-6-6-6" /><path fill='black' d="M21 5v14" /></svg>
			),
		},
	},
	{
		key: 'box-sizing',
		description: 'Controls how the total width and height of an element are calculated.',
		syntax: 'content-box | border-box',
		icons: {
			'border-box': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill="black" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
			),
			'content-box': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path fill="black" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
			),

		},
	},
	{
		key: 'visibility',
		description: 'Specifies whether the element is visible, hidden, or collapses its space.',
		syntax: 'visible | hidden | collapse',
		icons: {
			'visible': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" /></svg>
			),
			'hidden': (
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z" /></svg>
			),
			'collapse': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill='black' d="m296-80-56-56 240-240 240 240-56 56-184-184L296-80Zm184-504L240-824l56-56 184 184 184-184 56 56-240 240Z" /></svg>
			),

		},
	},
	{
		key: 'float',
		description: 'Removes the element from normal flow and positions it to the left or right.',
		syntax: 'block-start | block-end | inline-start | inline-end | snap-block | <snap-block()> | snap-inline | <snap-inline()> | left | right | top | bottom | none | footnote',
	},
	{
		key: 'clear',
		description: 'Specifies which sides of an element floating elements are not allowed to be adjacent to.',
		syntax: 'inline-start | inline-end | block-start | block-end | left | right | top | bottom | both-inline | both-block | both | none',
	},
	{
		key: 'object-position',
		description: 'Defines the alignment of replaced content within its box.',
		syntax: '<position>',
	},
	{
		key: 'object-fit',
		description: 'Specifies how replaced content should be resized to fit its container.',
		syntax: 'fill | none | [contain | cover] || scale-down ',
		icons: {
			'fill': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path fill="black" d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z" /></svg>
			),
			'contain': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path fill='black' d="M17 4h3c1.1 0 2 .9 2 2v2h-2V6h-3V4zM4 8V6h3V4H4c-1.1 0-2 .9-2 2v2h2zm16 8v2h-3v2h3c1.1 0 2-.9 2-2v-2h-2zM7 18H4v-2H2v2c0 1.1.9 2 2 2h3v-2zM18 8H6v8h12V8z" /></svg>
			),
			'cover': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
			),
			'none': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path fill="black" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" /></svg>
			),
			'scale-down': (
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill='black' d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" /><path fill='black' d="M9 19.8V15m0 0H4.2M9 15l-6 6" /><path fill='black' d="M15 4.2V9m0 0h4.8M15 9l6-6" /><path fill='black' d="M9 4.2V9m0 0H4.2M9 9 3 3" /></svg>
			),
		},
	},
]
