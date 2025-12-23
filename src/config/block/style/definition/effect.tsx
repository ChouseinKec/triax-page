import type { StyleDefinition } from "@/src/core/block/style/types";

export const EFFECT_DEFINITIONS: StyleDefinition[] = [
	{
		key: 'filter',
		description: 'Applies graphical effects such as blurring, brightness, contrast, and more to the element itself.',
		syntax: 'none|[<filter-function>]+',
	},
	{
		key: 'backdrop-filter',
		description: 'Applies graphical effects such as blurring or color shifting to the area behind an element.',
		syntax: 'none|[<filter-function>]+',
	},
	{
		key: 'transform',
		description: 'Transforms the element in 2D or 3D space.',
		syntax: 'none|[<transform-function>]{1,4}',
	},
	{
		key: 'box-shadow',
		description: 'Adds shadow effects around the element\'s frame.',
		syntax: '<spread-shadow>',
		icons: {
			'inset': (
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M120-120v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-640v-80h80v80h-80Zm320 640v-80h80v80h-80Zm160 0v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-320v-80h80v80h-80Zm0-160v-80h80v80h-80Zm-160 0v-80h80v80h-80ZM440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" /></svg>
			),
		},
	},
	{
		key: 'opacity',
		description: 'Sets the transparency level of the element, affecting its content and children.',
		syntax: '<number [0,1]>',
	},
]