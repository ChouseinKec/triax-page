// Utilities
import { collectBlockStyleKeys } from '../style';
import { mockBlockStyles } from '@/src/shared/helpers/mock';

// Types
import type { BlockStyles } from '@/src/core/block/instance/types';

describe('collectBlockStyleKeys', () => {
	it('returns empty array for empty styles', () => {
		const blockStyles = mockBlockStyles();
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([]);
	});

	it('returns single style key', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data.length).toBe(1);
	});

	it('returns multiple style keys from same pseudo-state', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red', padding: '10px' });
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('color');
		expect(result.data).toContain('padding');
		expect(result.data.length).toBe(3);
	});

	it('returns unique keys from multiple pseudo-states', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px', color: 'red' }, hover: { color: 'blue', 'text-decoration': 'underline' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('color');
		expect(result.data).toContain('text-decoration');
		expect(result.data.length).toBe(3);
	});

	it('returns unique keys from multiple orientations', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px' } }, portrait: { all: { padding: '10px' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('padding');
		expect(result.data.length).toBe(2);
	});

	it('returns unique keys from multiple devices', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px' } } }, mobile: { all: { all: { 'font-size': '14px', 'margin-top': '5px' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('margin-top');
		expect(result.data.length).toBe(2);
	});

	it('returns unique keys across all dimensions', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px', color: 'red' }, hover: { color: 'blue', 'text-decoration': 'underline' } }, portrait: { all: { padding: '10px' } } }, mobile: { all: { all: { 'font-size': '14px', margin: '5px' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('color');
		expect(result.data).toContain('text-decoration');
		expect(result.data).toContain('padding');
		expect(result.data).toContain('margin');
		expect(result.data.length).toBe(5);
	});

	it('returns success status as true', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px' });
		const result = collectBlockStyleKeys(blockStyles);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result).toHaveProperty('data');
	});

	it('excludes duplicate keys in result', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px' }, hover: { 'font-size': '18px' } } }, mobile: { all: { all: { 'font-size': '14px' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		const fontSizeCount = result.data.filter((key) => key === 'font-size').length;
		expect(fontSizeCount).toBe(1);
	});

	it('returns empty array for empty nested styles', () => {
		const blockStyles: BlockStyles = { all: { all: { all: {}, hover: {} }, portrait: { all: {} } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([]);
	});

	it('returns same array instance on consecutive calls', () => {
		const blockStyles = mockBlockStyles({ 'font-size': '16px', color: 'red' });
		const result1 = collectBlockStyleKeys(blockStyles);
		const result2 = collectBlockStyleKeys(blockStyles);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(result2.data);
	});

	it('handles styles with only device variations', () => {
		const blockStyles: BlockStyles = {
			desktop: { all: { all: { 'font-size': '16px' } } },
			tablet: { all: { all: { 'font-size': '14px' } } },
			mobile: { all: { all: { 'font-size': '12px' } } },
		};
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data.length).toBe(1);
	});

	it('handles styles with focus pseudo-state', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { color: 'black' }, focus: { color: 'blue' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('color');
		expect(result.data.length).toBe(1);
	});

	it('handles styles with landscape orientation', () => {
		const blockStyles: BlockStyles = { all: { all: { all: { 'font-size': '16px' }, landscape: { padding: '20px' } } } };
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('font-size');
		expect(result.data).toContain('padding');
		expect(result.data.length).toBe(2);
	});

	it('returns sorted keys for consistent ordering', () => {
		const blockStyles = mockBlockStyles({ 'z-index': '1', 'color': 'red', 'border': '1px solid' });
		const result = collectBlockStyleKeys(blockStyles);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toContain('z-index');
		expect(result.data).toContain('color');
		expect(result.data).toContain('border');
	});
});
