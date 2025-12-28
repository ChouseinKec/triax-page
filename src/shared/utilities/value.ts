/**
 * Checks if a value is a number (e.g., '10', '-5.5', '0.1').
 * @param input - The string to check.
 */
export function isValueNumber(input: string): boolean {
	return /^-?\d*\.?\d+$/.test(input);
}

/**
 * Checks if a value is an integer (e.g., '10', '-5').
 * @param input - The string to check.
 */
export function isValueInteger(input: string): boolean {
	return /^-?\d+$/.test(input);
}

/**
 * Checks if a value is a CSS color (e.g., '#fff', 'rgba(255, 0, 0)', 'hsl(120, 100%, 50%)').
 * @param input - The string to check.
 */
export function isValueColor(input: string): boolean {
	// Simple regex to check for hex colors, rgb(), rgba(), hsl(), hsla(), and color names
	const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
	const rgbRegex = /^rgb\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/;
	const rgbaRegex = /^rgba\(\s*(\d{1,3}\s*,\s*){3}(0|1|0?\.\d+)\s*\)$/;
	const hslRegex = /^hsl\(\s*\d{1,3}\s*,\s*(\d{1,3}%\s*,\s*)\d{1,3}%\s*\)$/;
	const hslaRegex = /^hsla\(\s*\d{1,3}\s*,\s*(\d{1,3}%\s*,\s*){2}(0|1|0?\.\d+)\s*\)$/;

	const cssColorNames = [
		'aliceblue',
		'antiquewhite',
		'aqua',
		'aquamarine',
		'azure',
		'beige',
		'bisque',
		'black',
		'blanchedalmond',
		'blue',
		'blueviolet',
		'brown',
		'burlywood',
		'cadetblue',
		'chartreuse',
		'chocolate',
		'coral',
		'cornflowerblue',
		'cornsilk',
		'crimson',
		'cyan',
		'darkblue',
		'darkcyan',
		'darkgoldenrod',
		'darkgray',
		'darkgreen',
		'darkkhaki',
		'darkmagenta',
		'darkolivegreen',
		'darkorange',
		'darkorchid',
		'darkred',
		'darksalmon',
		'darkseagreen',
		'darkslateblue',
		'darkslategray',
		'darkturquoise',
		'darkviolet',
		'deeppink',
		'deepskyblue',
		'dimgray',
		'dodgerblue',
		'firebrick',
		'floralwhite',
		'forestgreen',
		'fuchsia',
		'gainsboro',
		'ghostwhite',
		'gold',
		'goldenrod',
		'gray',
		'green',
		'greenyellow',
		'honeydew',
		'hotpink',
		'indianred',
		'indigo',
		'ivory',
		'khaki',
		'lavender',
		'lavenderblush',
		'lawngreen',
		'lemonchiffon',
		'lightblue',
		'lightcoral',
		'lightcyan',
		'lightgoldenrodyellow',
		'lightgray',
		'lightgreen',
		'lightpink',
		'lightsalmon',
		'lightseagreen',
		'lightskyblue',
		'lightslategray',
		'lightsteelblue',
		'lightyellow',
		'lime',
		'limegreen',
		'linen',
		'magenta',
		'maroon',
		'mediumaquamarine',
		'mediumblue',
		'mediumorchid',
		'mediumpurple',
		'mediumseagreen',
		'mediumslateblue',
		'mediumspringgreen',
		'mediumturquoise',
		'mediumvioletred',
		'midnightblue',
		'mintcream',
		'mistyrose',
		'moccasin',
		'navajowhite',
		'navy',
		'oldlace',
		'olive',
		'olivedrab',
		'orange',
		'orangered',
		'orchid',
		'palegoldenrod',
		'palegreen',
		'paleturquoise',
		'palevioletred',
		'papayawhip',
		'peachpuff',
		'peru',
		'pink',
		'plum',
		'powderblue',
		'purple',
		'rebeccapurple',
		'red',
		'rosybrown',
		'royalblue',
		'saddlebrown',
		'salmon',
		'sandybrown',
		'seagreen',
		'seashell',
		'sienna',
		'silver',
		'skyblue',
		'slateblue',
		'slategray',
		'snow',
		'springgreen',
		'steelblue',
		'tan',
		'teal',
		'thistle',
		'tomato',
		'turquoise',
		'violet',
		'wheat',
		'white',
		'whitesmoke',
		'yellow',
		'yellowgreen',
	];

	if (hexColorRegex.test(input) || rgbRegex.test(input) || rgbaRegex.test(input) || hslRegex.test(input) || hslaRegex.test(input) || cssColorNames.includes(input.toLowerCase())) return true;

	return false;
}

/**
 * Checks if a value is a link (e.g., 'https://example.com', '/path/to/resource').
 * @param input - The string to check.
 */
export function isValueLink(input: string): boolean {
	return /^"?https?:\/\/[^\s"]+"?$/.test(input) || /^"?\/[^\s"]+"?$/.test(input);
}
