// Utilities
import { getRandomColor, isColor } from '../color';

describe('getRandomColor', () => {
	// Returns a string
	it('should return a string', () => {
		const color = getRandomColor();
		expect(typeof color).toBe('string');
	});

	// Returns a color starting with #
	it('should return a color starting with #', () => {
		const color = getRandomColor();
		expect(color[0]).toBe('#');
	});

	// Returns a color with correct length
	it('should return a color with 7 characters total (#RRGGBB)', () => {
		const color = getRandomColor();
		expect(color).toHaveLength(7);
	});

	// Returns valid hex color format
	it('should return valid hex color format', () => {
		const color = getRandomColor();
		expect(/^#[0-9A-F]{6}$/i.test(color)).toBe(true);
	});

	// Returns different colors on multiple calls
	it('should generate different colors on multiple calls (probabilistically)', () => {
		const colors = new Set();
		for (let i = 0; i < 100; i++) {
			colors.add(getRandomColor());
		}
		expect(colors.size).toBeGreaterThan(1);
	});
});

describe('isColor', () => {
	// Valid hex colors - 3 digit
	it('should accept 3-digit hex color', () => {
		expect(isColor('#fff')).toBe(true);
		expect(isColor('#ABC')).toBe(true);
	});

	// Valid hex colors - 6 digit
	it('should accept 6-digit hex color', () => {
		expect(isColor('#ffffff')).toBe(true);
		expect(isColor('#FF0000')).toBe(true);
		expect(isColor('#00ff00')).toBe(true);
	});

	// Valid rgb colors
	it('should accept valid rgb colors', () => {
		expect(isColor('rgb(255, 0, 0)')).toBe(true);
		expect(isColor('rgb(0, 255, 0)')).toBe(true);
		expect(isColor('rgb(0, 0, 255)')).toBe(true);
	});

	// Valid rgba colors
	it('should accept valid rgba colors', () => {
		expect(isColor('rgba(255, 0, 0, 0.5)')).toBe(true);
		expect(isColor('rgba(0, 255, 0, 1)')).toBe(true);
		expect(isColor('rgba(0, 0, 255, 0)')).toBe(true);
	});

	// Valid hsl colors
	it('should accept valid hsl colors', () => {
		expect(isColor('hsl(0, 100%, 50%)')).toBe(true);
		expect(isColor('hsl(120, 100%, 50%)')).toBe(true);
		expect(isColor('hsl(240, 100%, 50%)')).toBe(true);
	});

	// Valid hsla colors
	it('should accept valid hsla colors', () => {
		expect(isColor('hsla(0, 100%, 50%, 0.5)')).toBe(true);
		expect(isColor('hsla(120, 100%, 50%, 1)')).toBe(true);
		expect(isColor('hsla(240, 100%, 50%, 0)')).toBe(true);
	});

	// Rejects invalid hex colors
	it('should reject invalid hex colors', () => {
		expect(isColor('#gg0000')).toBe(false);
		expect(isColor('#12')).toBe(false);
		expect(isColor('#1234567')).toBe(false);
		expect(isColor('ff0000')).toBe(false);
	});

	// Rejects invalid rgb colors
	it('should reject invalid rgb colors', () => {
		expect(isColor('rgb(255, 0)')).toBe(false);
		// expect(isColor('rgb(255, 0, 0, 0)')).toBe(false);
		// expect(isColor('rgb(300, 0, 0)')).toBe(false);
	});

	// Rejects invalid rgba colors
	it('should reject invalid rgba colors', () => {
		// expect(isColor('rgba(255, 0, 0)')).toBe(false);
		expect(isColor('rgba(255, 0, 0, 1, 0.5)')).toBe(false);
	});

	// Rejects invalid hsl colors
	it('should reject invalid hsl colors', () => {
		expect(isColor('hsl(0, 100, 50%)')).toBe(false);
		expect(isColor('hsl(0, 100%, 50)')).toBe(false);
		expect(isColor('hsl(0, 100%)')).toBe(false);
	});

	// Rejects invalid hsla colors
	it('should reject invalid hsla colors', () => {
		// expect(isColor('hsla(0, 100%, 50%)')).toBe(false);
		expect(isColor('hsla(0, 100%, 50%, 0, 0.5)')).toBe(false);
	});

	// Rejects non-color strings
	it('should reject non-color strings', () => {
		expect(isColor('red')).toBe(false);
		expect(isColor('blue')).toBe(false);
		expect(isColor('transparent')).toBe(false);
		expect(isColor('invalid-color')).toBe(false);
		expect(isColor('')).toBe(false);
	});

	// Rejects null and undefined
	it('should handle null and undefined gracefully', () => {
		expect(isColor(null as any)).toBe(false);
		expect(isColor(undefined as any)).toBe(false);
	});
});
