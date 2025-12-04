/**
 * Generates a random hex color code.
 * The color is in the format #RRGGBB.
 */
export function getRandomColor(): string {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

/**
 *  Checks if a string is a valid CSS color.
 * Supports hex, rgb, rgba, hsl, and hsla formats.
 * @param  input - The string to check.
 */
export  function isColor(input: string): boolean {
	return /^#[0-9a-fA-F]{3,6}$|^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s[\d.]+)?\)$|^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s[\d.]+)?\)$/.test(input);
}

