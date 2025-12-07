// Types
import { resolveStyleShorthand } from '../shorthands';

describe('resolveStyleShorthand', () => {
	it('returns the value when all shorthands are identical', () => {
		const result = resolveStyleShorthand(['10px', '10px', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('10px');
	});

	it('returns the value for single shorthand', () => {
		const result = resolveStyleShorthand(['5px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('5px');
	});

	it('returns numeric shorthand strings', () => {
		const result = resolveStyleShorthand(['1', '1', '1']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('1');
	});

	it('returns color shorthands', () => {
		const result = resolveStyleShorthand(['red', 'red']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('red');
	});

	it('returns complex CSS values', () => {
		const result = resolveStyleShorthand(['1px solid black', '1px solid black', '1px solid black']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('1px solid black');
	});

	it('returns identical hex color values', () => {
		const result = resolveStyleShorthand(['#ff5733', '#ff5733']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('#ff5733');
	});

	it('returns identical rgb color values', () => {
		const result = resolveStyleShorthand(['rgb(255, 87, 51)', 'rgb(255, 87, 51)', 'rgb(255, 87, 51)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('rgb(255, 87, 51)');
	});

	it('returns identical unit values with different units', () => {
		const result = resolveStyleShorthand(['1em', '1em']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('1em');
	});

	it('returns "mixed" when shorthands differ', () => {
		const result = resolveStyleShorthand(['10px', '20px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" for multiple different values', () => {
		const result = resolveStyleShorthand(['10px', '20px', '30px', '40px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" when one value differs from others', () => {
		const result = resolveStyleShorthand(['10px', '10px', '20px', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" for different color values', () => {
		const result = resolveStyleShorthand(['red', 'blue', 'green']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" for different complex CSS values', () => {
		const result = resolveStyleShorthand(['1px solid black', '2px solid black']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" for different hex colors', () => {
		const result = resolveStyleShorthand(['#ff5733', '#33ff57', '#3357ff']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" when color formats differ', () => {
		const result = resolveStyleShorthand(['red', '#ff0000']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns the value when all duplicates are identical', () => {
		const result = resolveStyleShorthand(['10px', '10px', '10px', '10px', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('10px');
	});

	it('returns "mixed" when duplicates exist with different values', () => {
		const result = resolveStyleShorthand(['10px', '10px', '20px', '20px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns "mixed" with duplicates and single different value', () => {
		const result = resolveStyleShorthand(['10px', '10px', '10px', '20px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('returns the value for multiple identical colors', () => {
		const result = resolveStyleShorthand(['red', 'red', 'red', 'red']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('red');
	});

	it('returns the value for many identical values', () => {
		const value = '5px solid blue';
		const result = resolveStyleShorthand(Array(10).fill(value));

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(value);
	});

	it('handles empty string values', () => {
		const result = resolveStyleShorthand(['', '', '']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('');
	});

	it('returns "mixed" when comparing empty and non-empty strings', () => {
		const result = resolveStyleShorthand(['', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles whitespace in values correctly', () => {
		const result = resolveStyleShorthand(['10px ', '10px ']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('10px ');
	});

	it('returns "mixed" for different whitespace', () => {
		const result = resolveStyleShorthand(['10px ', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles special characters in values', () => {
		const result = resolveStyleShorthand(['calc(100% - 10px)', 'calc(100% - 10px)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('calc(100% - 10px)');
	});

	it('handles case-sensitive values correctly', () => {
		const result = resolveStyleShorthand(['Red', 'red']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles very long CSS values', () => {
		const longValue = 'linear-gradient(to right, red 0%, orange 16.67%, yellow 33.33%, green 50%, blue 66.67%, indigo 83.33%, violet 100%)';
		const result = resolveStyleShorthand([longValue, longValue]);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(longValue);
	});

	it('returns "mixed" for different long CSS values', () => {
		const value1 = 'linear-gradient(to right, red 0%, orange 16.67%, yellow 33.33%, green 50%, blue 66.67%, indigo 83.33%, violet 100%)';
		const value2 = 'linear-gradient(to left, red 0%, orange 16.67%, yellow 33.33%, green 50%, blue 66.67%, indigo 83.33%, violet 100%)';
		const result = resolveStyleShorthand([value1, value2]);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles CSS variables (custom properties)', () => {
		const result = resolveStyleShorthand(['var(--main-color)', 'var(--main-color)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('var(--main-color)');
	});

	it('returns "mixed" for different CSS variables', () => {
		const result = resolveStyleShorthand(['var(--color1)', 'var(--color2)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles percentage values', () => {
		const result = resolveStyleShorthand(['50%', '50%', '50%']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('50%');
	});

	it('returns "mixed" for different percentages', () => {
		const result = resolveStyleShorthand(['50%', '100%']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles negative values', () => {
		const result = resolveStyleShorthand(['-10px', '-10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('-10px');
	});

	it('returns "mixed" for positive and negative values', () => {
		const result = resolveStyleShorthand(['10px', '-10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles zero values', () => {
		const result = resolveStyleShorthand(['0', '0', '0']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('0');
	});

	it('returns "mixed" for zero with unit and without', () => {
		const result = resolveStyleShorthand(['0', '0px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles decimals in values', () => {
		const result = resolveStyleShorthand(['1.5px', '1.5px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('1.5px');
	});

	it('returns "mixed" for integer and decimal values', () => {
		const result = resolveStyleShorthand(['1px', '1.5px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('always returns success: true', () => {
		const result = resolveStyleShorthand(['10px', '20px']);

		expect(result.success).toBe(true);
	});

	it('returns result with data property', () => {
		const result = resolveStyleShorthand(['10px']);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result).toHaveProperty('data');
		expect(typeof result.data).toBe('string');
	});

	it('returns string data for identical shorthands', () => {
		const result = resolveStyleShorthand(['10px', '10px']);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(typeof result.data).toBe('string');
	});

	it('returns "mixed" string for different values', () => {
		const result = resolveStyleShorthand(['10px', '20px']);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(typeof result.data).toBe('string');
		expect(result.data).toBe('mixed');
	});

	it('never returns null or undefined', () => {
		const result = resolveStyleShorthand(['10px']);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).not.toBeNull();
		expect(result.data).not.toBeUndefined();
	});

	it('returns consistent type for any input', () => {
		const testInputs = [['10px'], ['red', 'blue'], ['calc(100% - 10px)', 'calc(100% - 10px)'], ['', ''], Array(5).fill('value')];

		testInputs.forEach((input) => {
			const result = resolveStyleShorthand(input);

			expect(result.success).toBe(true);
			if (!result.success) return;

			expect(typeof result.data).toBe('string');
		});
	});

	it('handles margin shorthand resolution', () => {
		const result = resolveStyleShorthand(['10px', '10px', '10px', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('10px');
	});

	it('handles padding shorthand resolution with mixed values', () => {
		const result = resolveStyleShorthand(['10px', '10px', '5px', '10px']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles border shorthand components', () => {
		const result = resolveStyleShorthand(['1px solid black', '1px solid black']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('1px solid black');
	});

	it('handles transform function values', () => {
		const result = resolveStyleShorthand(['rotate(45deg)', 'rotate(45deg)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('rotate(45deg)');
	});

	it('returns "mixed" for different transform values', () => {
		const result = resolveStyleShorthand(['rotate(45deg)', 'rotate(90deg)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('mixed');
	});

	it('handles box-shadow shorthand values', () => {
		const result = resolveStyleShorthand(['0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.1)']);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('0 4px 6px rgba(0, 0, 0, 0.1)');
	});
});
