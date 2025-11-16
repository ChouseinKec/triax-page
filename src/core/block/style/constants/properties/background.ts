export const BACKGROUND_PROPERTIES = {
	'background-image': {
		syntax: 'none|<bg-image>',
		description: 'Applies a background image to the element.',
	},
	'background-color': {
		syntax: '<color>',
		description: 'Sets the background color of the element.',
	},
	background: {
		syntax: '<color>',
		description: 'Shorthand for setting all background properties in one declaration.',
	},
	'background-blend-mode': {
		syntax: 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity',
		description: 'Specifies how multiple background layers blend with each other.',
	},
	'background-repeat': {
		syntax: 'repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}',
		description: 'Repeats the background image of the element.',
	},
	'background-attachment': {
		syntax: 'scroll|fixed|local',
		description: 'Determines if the background image scrolls with the page or stays fixed.',
	},
	'background-clip': {
		syntax: 'border-box|padding-box|content-box|text',
		description: 'Defines how far the background extends within the element.',
	},
	'background-origin': {
		syntax: 'border-box|padding-box|content-box',
		description: 'Determines the positioning area for the background image.',
	},
	'background-size': {
		syntax: '<bg-size>',
		description: 'Resizes the background image of the element.',
	},
	'background-position': {
		syntax: '<bg-position>',
		description: 'Positions the background image within the element.',
	},
	'mask-image': {
		syntax: 'none|<image>',
		description: 'Applies a mask image to the element.',
	},
	'mask-type': {
		syntax: 'luminance|alpha',
		description: 'Specifies the mask type for the element.',
	},
	'mask-mode': {
		syntax: 'match-source|alpha|luminance',
		description: 'Specifies the mask mode for the element.',
	},
	'mask-clip': {
		syntax: 'no-clip|view-box|fill-box|stroke-box|content-box|padding-box|border-box',
		description: 'Defines how far the mask extends within the element.',
	},
	'mask-repeat': {
		syntax: 'repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}',
		description: 'Repeats the mask image of the element.',
	},
	'mask-composite': {
		syntax: 'add|subtract|intersect|exclude',
		description: 'Defines how multiple mask images are combined.',
	},
	'mask-origin': {
		syntax: 'view-box|fill-box|stroke-box|content-box|padding-box|border-box',
		description: 'Determines the positioning area for the mask image.',
	},
	'mask-size': {
		syntax: '<bg-size>',
		description: 'Resizes the mask image of the element.',
	},
	'mask-position': {
		syntax: '<bg-position>',
		description: 'Positions the mask image within the element.',
	},
};
