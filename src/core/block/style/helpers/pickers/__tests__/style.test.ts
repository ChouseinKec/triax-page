import { pickBlockStyles } from '../style';
import { mockBlockInstance, mockBlockStyles } from '@/shared/helpers/mock';

describe('pickBlockStyles', () => {
	it('returns block styles when they exist', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('returns exact styles object reference', () => {
		const styles = mockBlockStyles({ all: { all: { all: { 'font-size': '16px', color: 'blue' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
		expect(Object.is(result.data, styles)).toBe(true);
	});

	it('returns empty styles object when styles are empty', () => {
		const styles = mockBlockStyles({});
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(styles);
	});

	it('returns styles with nested structure', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' }, hover: { color: 'blue' } }, portrait: { all: { 'font-size': '14px' } } }, mobile: { portrait: { all: { color: 'green' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(styles);
		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.all.hover.color).toBe('blue');
		expect(result.data.mobile.portrait.all.color).toBe('green');
	});

	it('returns styles with multiple device contexts', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'black' } } }, mobile: { all: { all: { color: 'blue' } } }, tablet: { all: { all: { color: 'green' } } }, desktop: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('black');
		expect(result.data.mobile.all.all.color).toBe('blue');
		expect(result.data.tablet.all.all.color).toBe('green');
		expect(result.data.desktop.all.all.color).toBe('red');
	});

	it('returns styles with multiple orientation contexts', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } }, portrait: { all: { color: 'blue' } }, landscape: { all: { color: 'green' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.portrait.all.color).toBe('blue');
		expect(result.data.all.landscape.all.color).toBe('green');
	});

	it('returns styles with multiple pseudo contexts', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' }, hover: { color: 'blue' }, focus: { color: 'green' }, active: { color: 'yellow' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('red');
		expect(result.data.all.all.hover.color).toBe('blue');
		expect(result.data.all.all.focus.color).toBe('green');
		expect(result.data.all.all.active.color).toBe('yellow');
	});

	it('returns styles with complex property values', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'rgb(255, 0, 0)', 'background-color': 'rgba(0, 0, 0, 0.5)', 'font-size': '16px', 'line-height': '1.5', margin: '10px 20px', padding: '5px', 'border-radius': '4px' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.all.all.all.color).toBe('rgb(255, 0, 0)');
		expect(result.data.all.all.all['background-color']).toBe('rgba(0, 0, 0, 0.5)');
		expect(result.data.all.all.all['font-size']).toBe('16px');
	});

	it('returns success status', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		expect(result).toHaveProperty('data');
	});

	it('rejects when styles are undefined', () => {
		const blockInstance = mockBlockInstance({ styles: undefined });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('Block styles not found');
		expect(result.error).toContain(blockInstance.id);
	});

	it('returns error message with block id', () => {
		const blockInstance = mockBlockInstance({ id: 'test-block-123', styles: undefined });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('test-block-123');
	});

	it('rejects when styles are null', () => {
		const blockInstance = mockBlockInstance({ styles: null as any });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('Block styles not found');
	});

	it('returns error status when styles missing', () => {
		const blockInstance = mockBlockInstance({ styles: undefined });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		expect(result).toHaveProperty('error');
	});

	it('handles different block types', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ type: 'custom-block', styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('handles blocks with different tags', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'blue' } } } });
		const blockInstance = mockBlockInstance({ tag: 'span', styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('handles blocks with different parent IDs', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'green' } } } });
		const blockInstance = mockBlockInstance({ parentID: 'parent-123', styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('handles blocks with children', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'yellow' } } } });
		const blockInstance = mockBlockInstance({ contentIDs: ['child-1', 'child-2', 'child-3'], styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('handles blocks with attributes', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'purple' } } } });
		const blockInstance = mockBlockInstance({ attributes: { 'data-test': 'value', 'aria-label': 'test' }, styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('returns styles regardless of block id format', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'teal' } } } });
		const blockInstance = mockBlockInstance({ id: 'uuid-long-format-string-123', styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('returns same object reference, not a copy', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });

		const result1 = pickBlockStyles(blockInstance);
		const result2 = pickBlockStyles(blockInstance);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		if (!result1.success || !result2.success) return;

		expect(result1.data).toBe(result2.data);
	});

	it('preserves returned styles object without modification', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const originalColor = styles.all.all.all.color;
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		// Verify styles are unchanged
		expect(styles.all.all.all.color).toBe(originalColor);
	});

	it('returns consistent reference across multiple calls', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red', 'font-size': '16px' } } } });
		const blockInstance = mockBlockInstance({ styles });

		const results = [pickBlockStyles(blockInstance), pickBlockStyles(blockInstance), pickBlockStyles(blockInstance)];

		const firstData = results[0];
		const secondData = results[1];
		const thirdData = results[2];

		if (!firstData.success || !secondData.success || !thirdData.success) return;

		expect(firstData.data).toBe(secondData.data);
		expect(secondData.data).toBe(thirdData.data);
		expect(Object.is(firstData.data, styles)).toBe(true);
	});

	it('returns correct result type with success true', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result).toHaveProperty('data');
		expect(result).not.toHaveProperty('error');
	});

	it('returns correct result type with success false', () => {
		const blockInstance = mockBlockInstance({ styles: undefined });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result).toHaveProperty('error');
		expect(result).not.toHaveProperty('data');
	});

	it('returns typed data property with correct structure', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		// Type assertions for data structure
		expect(typeof result.data).toBe('object');
		expect(result.data).toHaveProperty('all');
	});

	it('returns typed error property as string when unsuccessful', () => {
		const blockInstance = mockBlockInstance({ styles: undefined });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(typeof result.error).toBe('string');
		expect(result.error.length).toBeGreaterThan(0);
	});

	it('returns styles when block has minimal properties', () => {
		const styles = mockBlockStyles({ all: { all: { all: {} } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(styles);
	});

	it('returns styles with single style property', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data.all.all.all).length).toBe(1);
	});

	it('returns styles with many style properties', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'red', 'font-size': '16px', 'font-weight': 'bold', 'margin-top': '10px', 'margin-bottom': '10px', 'padding-left': '5px', 'padding-right': '5px', background: 'linear-gradient(to right, red, blue)', 'border-radius': '4px', width: 'calc(100% - 20px)' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data.all.all.all).length).toBeGreaterThan(5);
		expect(result.data).toBe(styles);
	});

	it('handles deeply nested device/orientation/pseudo combinations', () => {
		const styles = mockBlockStyles({ all: { all: { all: { color: 'base' } } }, mobile: { portrait: { all: { color: 'mobile-portrait' }, hover: { color: 'mobile-portrait-hover' } } }, tablet: { landscape: { active: { color: 'tablet-landscape-active' } } } });
		const blockInstance = mockBlockInstance({ styles });
		const result = pickBlockStyles(blockInstance);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.mobile.portrait.hover.color).toBe('mobile-portrait-hover');
		expect(result.data.tablet.landscape.active.color).toBe('tablet-landscape-active');
	});
});
