/**
 * Generates a random hex color code.
 * The color is in the format #RRGGBB.
 * @returns {string} - A random hex color code.
 * @example
 * getRandomColor(); → #A3C1AD
 */
function getRandomColor(): string {
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
 * @param {string} input - The string to check.
 * @returns {boolean} - True if the string is a valid color, false otherwise.
 * @example
 * isColor('#ff0000'); → true
 * isColor('rgb(255, 0, 0)'); → true
 * isColor('rgba(255, 0, 0, 0.5)'); → true
 * isColor('hsl(120, 100%, 50%)'); → true
 * isColor('hsla(120, 100%, 50%, 0.5)'); → true
 * isColor('invalid-color'); → false
 */
function isColor(input: string): boolean {
	return /^#[0-9a-fA-F]{3,6}$|^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s[\d.]+)?\)$|^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s[\d.]+)?\)$/.test(input);
}

export { getRandomColor, isColor };
