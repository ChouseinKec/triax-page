// Utilities
import { cascadeStyleLonghandValue, cascadeStyleShorthandValue, cascadeBlockStyles, cascadeBlockStyle } from '../cascade';
import { mockBlockStyles, mockPageContext, mockStyleContext } from '@/src/shared/helpers/mock';

// Types
import type { BlockStyles } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('cascadeStyleLonghandValue', () => {
	it('returns longhand value from cascade path', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const pageContext = mockPageContext();
		const result = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('16px');
	});

	it('returns empty string when value not found', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const pageContext = mockPageContext();
		const result = cascadeStyleLonghandValue('color', blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('');
	});

	it('returns success status', () => {
		const blockStyles = mockBlockStyles({ padding: '10px' });
		const pageContext = mockPageContext();
		const result = cascadeStyleLonghandValue('padding', blockStyles, pageContext);

		expect(result).toHaveProperty('success');
		expect(result).toHaveProperty('data');
		expect(result.success).toBe(true);
	});

	it('handles cascade through empty pseudo states', () => {
		const blockStyles = mockBlockStyles({ all: { all: { all: { 'font-size': '16px' }, hover: {} } } });
		const pageContext = mockPageContext({});
		const result = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('16px');
	});

	it('returns string type in data property', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '14px' });
		const pageContext = mockPageContext();
		const result = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result).toHaveProperty('data');
		expect(typeof result.data).toBe('string');
	});

	it('returns same value on repeated lookups', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const pageContext = mockPageContext();
		const result1 = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);
		const result2 = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});

	it('handles different style keys independently', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red', padding: '10px' });
		const pageContext = mockPageContext();
		const fontResult = cascadeStyleLonghandValue('font-size', blockStyles, pageContext);
		const colorResult = cascadeStyleLonghandValue('color', blockStyles, pageContext);

		if (!fontResult.success || !colorResult.success) return;

		expect(fontResult.data).toBe('16px');
		expect(colorResult.data).toBe('red');
	});
});

describe('cascadeStyleShorthandValue', () => {
	it('returns shorthand values from longhand array', () => {
		const blockStyles = mockBlockStyles({ margin: '10px 10px' });
		const pageContext = mockPageContext();
		const styleKeys = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
	});

	it('returns success status', () => {
		const blockStyles = mockBlockStyles({ 'margin-top': '10px' });
		const pageContext = mockPageContext();
		const styleKeys = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('handles empty style keys array', () => {
		const blockStyles = mockBlockStyles();
		const pageContext = mockPageContext();
		const styleKeys: any[] = [];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
	});

	it('returns multiple longhand values', () => {
		const blockStyles = mockBlockStyles({ 'padding-top': '10px', 'padding-right': '15px', 'padding-bottom': '10px', 'padding-left': '15px' });
		const pageContext = mockPageContext();
		const styleKeys = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBeDefined();
	});

	it('returns empty array for missing style keys', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const pageContext = mockPageContext();
		const styleKeys = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.length).toBe(0);
	});

	it('handles single key in array', () => {
		const blockStyles = mockBlockStyles({ 'margin-top': '10px' });
		const pageContext = mockPageContext();
		const styleKeys = ['margin-top'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
	});

	it('handles partial matches in style keys', () => {
		const blockStyles = mockBlockStyles({ 'padding-top': '10px', 'padding-bottom': '10px' });
		const pageContext = mockPageContext();
		const styleKeys = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] as StyleKey[];
		const result = cascadeStyleShorthandValue(styleKeys, blockStyles, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBeDefined();
	});
});

describe('cascadeBlockStyles', () => {
	it('returns success status', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('returns cascaded styles record', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);

		if (!result.success) return;

		expect(typeof result.data).toBe('object');
		expect(result.data).not.toBeNull();
	});

	it('returns empty object for empty styles', () => {
		const blockStyles = mockBlockStyles();
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual({});
	});

	it('returns multiple style keys in result', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px', color: 'red', padding: '10px' } } } };
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data).length).toBeGreaterThan(0);
	});

	it('handles single style property', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data).length).toBeGreaterThan(0);
	});

	it('handles many style properties', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red', padding: '10px', margin: '5px', 'background-color': 'blue' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data).length).toBeGreaterThan(1);
	});

	it('returns same result on repeated calls', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result1 = cascadeBlockStyles(blockStyles, styleContext, pageContext);
		const result2 = cascadeBlockStyles(blockStyles, styleContext, pageContext);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});
});

describe('cascadeBlockStyle', () => {
	it('returns success status for longhand style', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyle('font-size', blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('returns cascaded longhand value', () => {
		const blockStyles = mockBlockStyles({ color: 'blue' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyle('color', blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('blue');
	});

	it('returns string type in data property', () => {
		const blockStyles = mockBlockStyles({ padding: '10px' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyle('padding', blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');

		if (!result.success) return;

		expect(typeof result.data).toBe('string');
	});

	it('returns empty string for missing style', () => {
		const blockStyles = mockBlockStyles({ color: 'red' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyle('background-color', blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('');
	});

	it('handles different style keys independently', () => {
		const blockStyles = mockBlockStyles({ color: 'red', 'font-size': '16px', padding: '10px' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const colorResult = cascadeBlockStyle('color', blockStyles, styleContext, pageContext);
		const fontResult = cascadeBlockStyle('font-size', blockStyles, styleContext, pageContext);

		if (!colorResult.success || !fontResult.success) return;

		expect(colorResult.data).toBe('red');
		expect(fontResult.data).toBe('16px');
	});

	it('returns same value on repeated calls', () => {
		const blockStyles = mockBlockStyles({ color: 'red' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result1 = cascadeBlockStyle('color', blockStyles, styleContext, pageContext);
		const result2 = cascadeBlockStyle('color', blockStyles, styleContext, pageContext);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});

	it('handles hyphenated style keys', () => {
		const blockStyles = mockBlockStyles({ 'text-decoration': 'underline' });
		const styleContext = mockStyleContext();
		const pageContext = mockPageContext();
		const result = cascadeBlockStyle('text-decoration', blockStyles, styleContext, pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('underline');
	});
});
