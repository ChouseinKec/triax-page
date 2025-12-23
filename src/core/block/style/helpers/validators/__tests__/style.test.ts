// Utilities
import { validateStyleKey, validateStyleValue, validateBlockStyles } from '../block';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('validateStyleKey', () => {
	it('accepts single-word properties like color', () => {
		const result = validateStyleKey('color');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('color');
	});

	it('accepts hyphenated properties like font-size', () => {
		const result = validateStyleKey('font-size');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('font-size');
	});

	it('accepts multi-hyphenated properties like background-color', () => {
		const result = validateStyleKey('background-color');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('background-color');
	});

	it('accepts shorthand properties like margin', () => {
		const result = validateStyleKey('margin');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('margin');
	});

	it('accepts shorthand properties like padding', () => {
		const result = validateStyleKey('padding');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('padding');
	});

	it('accepts properties like opacity', () => {
		const result = validateStyleKey('opacity');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('opacity');
	});

	it('accepts properties like border-width', () => {
		const result = validateStyleKey('border-width');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('border-width');
	});

	it('accepts properties like display', () => {
		const result = validateStyleKey('display');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('display');
	});

	it('rejects unknown properties', () => {
		const result = validateStyleKey('not-a-real-property');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style key');
		expect(result.message).toContain('not-a-real-property');
	});

	it('rejects camelCase format (requires kebab-case)', () => {
		const result = validateStyleKey('backgroundColor');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style key');
	});

	it('rejects empty string', () => {
		const result = validateStyleKey('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects mixed case (Color)', () => {
		const result = validateStyleKey('Color');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style key');
	});

	it('rejects uppercase (COLOR)', () => {
		const result = validateStyleKey('COLOR');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style key');
	});

	it('rejects numeric values', () => {
		const result = validateStyleKey(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects null', () => {
		const result = validateStyleKey(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateStyleKey(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects objects', () => {
		const result = validateStyleKey({ prop: 'color' });

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects arrays', () => {
		const result = validateStyleKey(['color']);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('returns typed valid result with value property', () => {
		const result = validateStyleKey('color');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result).toHaveProperty('value');
		expect(result).not.toHaveProperty('message');
	});

	it('returns typed invalid result with message property', () => {
		const result = validateStyleKey('invalid-prop');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result).toHaveProperty('message');
		expect(result).not.toHaveProperty('value');
	});
});

describe('validateStyleValue', () => {
	it('accepts hex color format (#000000)', () => {
		const result = validateStyleValue('color', '#000000');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('#000000');
	});

	it('accepts rgb color format', () => {
		const result = validateStyleValue('color', 'rgb(255, 0, 0)');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('rgb(255, 0, 0)');
	});

	it('accepts named colors like hex blue', () => {
		const result = validateStyleValue('color', '#0000ff');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('#0000ff');
	});

	it('accepts pixel measurements (font-size)', () => {
		const result = validateStyleValue('font-size', '16px');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('16px');
	});

	it('accepts pixel values for shorthand properties (margin)', () => {
		const result = validateStyleValue('margin', '10px');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('10px');
	});

	it('accepts decimal values (opacity)', () => {
		const result = validateStyleValue('opacity', '0.5');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('0.5');
	});

	it('accepts keyword values (display: flex)', () => {
		const result = validateStyleValue('display', 'flex');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('flex');
	});

	it('accepts empty string as CSS reset value', () => {
		const result = validateStyleValue('color', '');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('');
	});

	it('rejects unknown properties with valid values', () => {
		const result = validateStyleValue('not-a-property', 'red');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style key');
	});

	it('rejects numeric value types', () => {
		const result = validateStyleValue('color', 123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects null', () => {
		const result = validateStyleValue('color', null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateStyleValue('color', undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects object values', () => {
		const result = validateStyleValue('color', { value: 'red' });

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects array values', () => {
		const result = validateStyleValue('color', ['red', 'blue']);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects invalid color format', () => {
		const result = validateStyleValue('color', 'not-a-color');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style value');
	});

	it('rejects invalid font-size format', () => {
		const result = validateStyleValue('font-size', 'invalid-size');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style value');
	});

	it('rejects value type mismatched to property (pixel value for color)', () => {
		const result = validateStyleValue('color', '16px');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid style value');
	});

	it('returns typed valid result with value property', () => {
		const result = validateStyleValue('color', '#ff0000');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result).toHaveProperty('value');
		expect(result).not.toHaveProperty('message');
	});

	it('returns typed invalid result with message property', () => {
		const result = validateStyleValue('color', 123 as unknown as string);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result).toHaveProperty('message');
		expect(result).not.toHaveProperty('value');
	});
});

describe('validateBlockStyles', () => {
	it('accepts empty object', () => {
		const result = validateBlockStyles({});

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual({});
	});

	it('accepts single property object', () => {
		const styles = { color: 'red' };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});

	it('accepts multiple properties object', () => {
		const styles = { color: 'red', 'background-color': 'blue', 'font-size': '16px' };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});

	it('accepts nested device/orientation/pseudo structure', () => {
		const styles = { all: { all: { color: 'red' } } };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});

	it('accepts complex nested BlockStyles with multiple levels', () => {
		const styles = { all: { all: { color: 'red', hover: { color: 'blue' } }, portrait: { 'font-size': '14px' } }, mobile: { portrait: { color: 'green' } } };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});

	it('rejects null', () => {
		const result = validateBlockStyles(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBlockStyles(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects string', () => {
		const result = validateBlockStyles('color: red');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects number', () => {
		const result = validateBlockStyles(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects array', () => {
		const result = validateBlockStyles(['color', 'red']);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects boolean', () => {
		const result = validateBlockStyles(true);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('returns the same object reference when valid', () => {
		const styles = { color: 'red' };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(styles);
	});

	it('preserves object identity across multiple validations', () => {
		const styles = { color: 'red', 'font-size': '16px' };
		const result1 = validateBlockStyles(styles);
		const result2 = validateBlockStyles(styles);

		expect(result1.valid).toBe(true);
		expect(result2.valid).toBe(true);
		if (!result1.valid || !result2.valid) return;

		expect(result1.value).toBe(result2.value);
		expect(result1.value).toBe(styles);
	});

	it('returns valid result with correct properties (value only)', () => {
		const result = validateBlockStyles({ color: 'red' });

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result).toHaveProperty('value');
		expect(result).not.toHaveProperty('message');
	});

	it('returns invalid result with correct properties (message only)', () => {
		const result = validateBlockStyles(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result).toHaveProperty('message');
		expect(result).not.toHaveProperty('value');
	});

	it('returns typed data property with correct structure on success', () => {
		const styles = { all: { all: { color: 'red' } } };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(typeof result.value).toBe('object');
		expect(result.value).toHaveProperty('all');
	});

	it('returns typed error property as string when unsuccessful', () => {
		const result = validateBlockStyles({ invalid: 'structure' });
		if (result.valid) return;

		expect(typeof result.message).toBe('string');
		expect(result.message.length).toBeGreaterThan(0);
	});

	it('accepts empty nested structure', () => {
		const styles = { all: { all: {} } };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});

	it('handles deeply nested device/orientation/pseudo combinations', () => {
		const styles = { mobile: { portrait: { color: 'red', hover: { 'background-color': 'blue', focus: { 'border-color': 'green' } } }, landscape: { 'font-size': '14px' } }, tablet: { all: { opacity: '0.9' } } };
		const result = validateBlockStyles(styles);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(styles);
	});
});
