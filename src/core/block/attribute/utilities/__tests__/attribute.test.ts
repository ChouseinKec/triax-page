// Types
import { AttributeKey } from '@/src/core/block/attribute/types';

// Utilities
import { normalizeAttributeValue, normalizeAttributeKey } from '../attribute';

describe('attribute utilities', () => {
	describe('normalizeAttributeValue', () => {
		it.each([
			['true', true],
			['false', false],
			['my-class', 'my-class'],
			['', ''],
		])('%p → %p', (input, expected) => {
			expect(normalizeAttributeValue(input as string)).toBe(expected);
		});

		it('keeps case differences as-is', () => {
			expect(normalizeAttributeValue('True')).toBe('True');
			expect(normalizeAttributeValue('FALSE')).toBe('FALSE');
		});
	});

	describe('normalizeAttributeKey', () => {
		it('maps "class" to "className"', () => {
			expect(normalizeAttributeKey('class')).toBe('className');
		});

		it.each([
			['id'],
			['aria-label'],
			['data-test'],
			['role'], //
		])('keeps %p unchanged', (key) => {
			expect(normalizeAttributeKey(key as AttributeKey)).toBe(key);
		});

		it('does not map case differences', () => {
			expect(normalizeAttributeKey('Class' as AttributeKey)).toBe('Class');
		});
	});
});
