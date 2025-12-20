// Utilities
import { generateCSSProperties, generateCSSSelector, generateCSSRule, generateCascadePaths } from '../generate';
import { mockPageContext } from '@/src/shared/helpers/mock';

// Types
import type { StyleRecord } from '@/src/core/block/style/types';

describe('generateCSSProperties', () => {
	it('returns CSS properties from styles object', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: 'red' };
		const result = generateCSSProperties(styles);
		expect(result.success).toBe(true);

		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).toContain('color: red;');
	});

	it('returns success status', () => {
		const styles: StyleRecord = { padding: '10px' };
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('returns empty string for empty styles', () => {
		const styles: StyleRecord = {};
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('');
	});

	it('excludes empty values', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: '', padding: '10px' };
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).not.toContain('color:');
		expect(result.data).toContain('padding: 10px;');
	});

	it('converts camelCase property names to kebab-case', () => {
		const styles: StyleRecord = { fontSize: '16px', backgroundColor: 'blue' } as any;
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).toContain('background-color: blue;');
	});

	it('applies default indentation level', () => {
		const styles: StyleRecord = { 'font-size': '16px' };
		const result = generateCSSProperties(styles);
		expect(result.success).toBe(true);

		if (!result.success) return;

		expect(result.data).toMatch(/^  font-size/);
	});

	it('applies custom indentation level', () => {
		const styles: StyleRecord = { 'font-size': '16px' };
		const result = generateCSSProperties(styles, 2);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toMatch(/^    font-size/);
	});

	it('handles multiple properties', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: 'red', padding: '10px', margin: '5px' };
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		const lines = result.data.split('\n').filter((line) => line.trim());
		expect(lines.length).toBe(4);
	});

	it('excludes properties with empty keys', () => {
		const styles: StyleRecord = { 'font-size': '16px', '': 'value' } as any;
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data.split('\n').filter((line) => line.trim()).length).toBe(1);
	});

	it('formats properties with correct syntax', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: 'red' };
		const result = generateCSSProperties(styles);

		if (!result.success) return;

		expect(result.data).toMatch(/\w+: [^;]+;/);
	});

	it('handles special characters in property values', () => {
		const styles: StyleRecord = { 'font-family': 'Arial, sans-serif', content: '"quote"' } as any;
		const result = generateCSSProperties(styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-family: Arial, sans-serif;');
	});
});

describe('generateCSSSelector', () => {
	it('returns selector with pseudo-class', () => {
		const pageContext = mockPageContext();
		const result = generateCSSSelector('block-1', 'hover', pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('#block-block-1:hover');
	});

	it('omits pseudo-class for default pseudo', () => {
		const pageContext = mockPageContext();
		const result = generateCSSSelector('block-1', 'all', pageContext);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe('#block-block-1');
	});

	it('returns success status', () => {
		const pageContext = mockPageContext();
		const result = generateCSSSelector('block-1', 'focus', pageContext);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('handles different block IDs', () => {
		const pageContext = mockPageContext();
		const result1 = generateCSSSelector('block-1', 'hover', pageContext);
		const result2 = generateCSSSelector('block-2', 'hover', pageContext);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toBe('#block-block-1:hover');
		expect(result2.data).toBe('#block-block-2:hover');
	});

	it('handles different pseudo-classes', () => {
		const pageContext = mockPageContext();
		const result1 = generateCSSSelector('block-1', 'hover', pageContext);
		const result2 = generateCSSSelector('block-1', 'active', pageContext);
		const result3 = generateCSSSelector('block-1', 'focus', pageContext);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		expect(result3.success).toBe(true);

		if (!result1.success || !result2.success || !result3.success) return;

		expect(result1.data).toContain(':hover');
		expect(result2.data).toContain(':active');
		expect(result3.data).toContain(':focus');
	});

	it('uses hash prefix for ID selector', () => {
		const pageContext = mockPageContext();
		const result = generateCSSSelector('test-block', 'all', pageContext);

		if (!result.success) return;

		expect(result.data).toMatch(/^#/);
	});

	it('returns same selector for repeated calls', () => {
		const pageContext = mockPageContext();
		const result1 = generateCSSSelector('block-1', 'hover', pageContext);
		const result2 = generateCSSSelector('block-1', 'hover', pageContext);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});
});

describe('generateCSSRule', () => {
	it('returns complete CSS rule', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: 'red' };
		const result = generateCSSRule('#block-1', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('#block-1 {');
		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).toContain('color: red;');
		expect(result.data).toContain('}');
	});

	it('returns success status', () => {
		const styles: StyleRecord = { padding: '10px' };
		const result = generateCSSRule('.test', styles);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('handles empty styles object', () => {
		const styles: StyleRecord = {};
		const result = generateCSSRule('#block-1', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('#block-1 {');
		expect(result.data).toContain('}');
	});

	it('applies default indentation level', () => {
		const styles: StyleRecord = { 'font-size': '16px' };
		const result = generateCSSRule('#block-1', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toMatch(/^#block-1/);
	});

	it('applies custom indentation level', () => {
		const styles: StyleRecord = { 'font-size': '16px' };
		const result = generateCSSRule('#block-1', styles, 1);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toMatch(/^  #block-1/);
	});

	it('includes property names in kebab-case', () => {
		const styles: StyleRecord = { 'font-size': '16px', 'background-color': 'blue' };
		const result = generateCSSRule('.test', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).toContain('background-color: blue;');
	});

	it('excludes empty values', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: '', padding: '10px' };
		const result = generateCSSRule('#block-1', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size: 16px;');
		expect(result.data).not.toContain('color:');
		expect(result.data).toContain('padding: 10px;');
	});

	it('formats rule with proper structure', () => {
		const styles: StyleRecord = { 'font-size': '16px' };
		const result = generateCSSRule('#block-1', styles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toMatch(/#block-1 \{[\s\S]*\}/);
	});

	it('handles multiple selectors', () => {
		const styles: StyleRecord = { color: 'red', padding: '10px' };
		const result1 = generateCSSRule('#block-1', styles);
		const result2 = generateCSSRule('.element', styles);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
	});

	it('returns same rule for repeated calls', () => {
		const styles: StyleRecord = { 'font-size': '16px', color: 'red' };
		const result1 = generateCSSRule('#block-1', styles);
		const result2 = generateCSSRule('#block-1', styles);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});
});

describe('generateCascadePaths', () => {
	it('returns all cascade paths', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths).toHaveLength(8);
		expect(paths[0]).toEqual(['mobile', 'portrait', 'hover']);
	});

	it('returns paths in correct specificity order', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths[0]).toEqual(['mobile', 'portrait', 'hover']); // Most specific
		expect(paths[7]).toEqual(['all', 'all', 'all']); // Least specific (defaults)
	});

	it('includes path with default device', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths[4]).toEqual(['all', 'portrait', 'hover']);
	});

	it('includes path with default orientation', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths[2]).toEqual(['mobile', 'all', 'hover']);
	});

	it('includes path with default pseudo', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths[1]).toEqual(['mobile', 'portrait', 'all']);
	});

	it('handles all default values', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('all', 'all', 'all', pageContext);

		expect(paths[0]).toEqual(['all', 'all', 'all']);
		expect(paths[7]).toEqual(['all', 'all', 'all']);
	});

	it('returns array of tuples with length 3', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(Array.isArray(paths)).toBe(true);
		paths.forEach((path) => {
			expect(Array.isArray(path)).toBe(true);
			expect(path.length).toBe(3);
		});
	});

	it('covers all combinations of device/orientation/pseudo', () => {
		const pageContext = mockPageContext();
		const paths = generateCascadePaths('desktop', 'landscape', 'focus', pageContext);

		// Check that we have combinations mixing selected and default values
		const hasSelectedDevice = paths.some((path) => path[0] === 'desktop');
		const hasDefaultDevice = paths.some((path) => path[0] === 'all');
		const hasSelectedOrientation = paths.some((path) => path[1] === 'landscape');
		const hasDefaultOrientation = paths.some((path) => path[1] === 'all');
		const hasSelectedPseudo = paths.some((path) => path[2] === 'focus');
		const hasDefaultPseudo = paths.some((path) => path[2] === 'all');

		expect(hasSelectedDevice).toBe(true);
		expect(hasDefaultDevice).toBe(true);
		expect(hasSelectedOrientation).toBe(true);
		expect(hasDefaultOrientation).toBe(true);
		expect(hasSelectedPseudo).toBe(true);
		expect(hasDefaultPseudo).toBe(true);
	});

	it('returns same paths for repeated calls', () => {
		const pageContext = mockPageContext();
		const paths1 = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);
		const paths2 = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);

		expect(paths1).toEqual(paths2);
	});

	it('returns different paths for different inputs', () => {
		const pageContext = mockPageContext();
		const paths1 = generateCascadePaths('mobile', 'portrait', 'hover', pageContext);
		const paths2 = generateCascadePaths('desktop', 'landscape', 'focus', pageContext);

		expect(paths1[0]).not.toEqual(paths2[0]);
	});
});
