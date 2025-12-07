// Types
import { AttributeKey } from '@/src/core/block/attribute/types';

// Utilities
import { normalizeAttributeValue, normalizeAttributeKey } from '../attribute';

describe('normalizeAttributeValue', () => {
	it('returns true for lowercase "true"', () => {
		expect(normalizeAttributeValue('true')).toBe(true);
	});

	it('returns false for lowercase "false"', () => {
		expect(normalizeAttributeValue('false')).toBe(false);
	});

	it('returns string for class name', () => {
		expect(normalizeAttributeValue('my-class')).toBe('my-class');
	});

	it('returns string for empty value', () => {
		expect(normalizeAttributeValue('')).toBe('');
	});

	it('returns string for regular text', () => {
		expect(normalizeAttributeValue('some-value')).toBe('some-value');
	});

	it('returns string for numeric-like text', () => {
		expect(normalizeAttributeValue('123')).toBe('123');
	});

	it('preserves non-lowercase "True"', () => {
		expect(normalizeAttributeValue('True')).toBe('True');
	});

	it('preserves uppercase "FALSE"', () => {
		expect(normalizeAttributeValue('FALSE')).toBe('FALSE');
	});

	it('preserves mixed case boolean-like strings', () => {
		expect(normalizeAttributeValue('TRUE')).toBe('TRUE');
		expect(normalizeAttributeValue('tRuE')).toBe('tRuE');
	});

	it('returns either boolean or string type', () => {
		const result1 = normalizeAttributeValue('true');
		const result2 = normalizeAttributeValue('some-value');
		expect(typeof result1 === 'boolean' || typeof result1 === 'string').toBe(true);
		expect(typeof result2 === 'boolean' || typeof result2 === 'string').toBe(true);
	});
});

describe('normalizeAttributeKey', () => {
	it('converts "class" to "className"', () => {
		expect(normalizeAttributeKey('class')).toBe('className');
	});

	it('returns "id" unchanged', () => {
		expect(normalizeAttributeKey('id')).toBe('id');
	});

	it('returns "aria-label" unchanged', () => {
		expect(normalizeAttributeKey('aria-label')).toBe('aria-label');
	});

	it('returns "data-test" unchanged', () => {
		expect(normalizeAttributeKey('data-test')).toBe('data-test');
	});

	it('returns "role" unchanged', () => {
		expect(normalizeAttributeKey('role')).toBe('role');
	});

	it('preserves mixed case in custom attribute', () => {
		expect(normalizeAttributeKey('Class' as AttributeKey)).toBe('Class');
	});

	it('preserves uppercase custom attributes', () => {
		expect(normalizeAttributeKey('customAttr' as AttributeKey)).toBe('customAttr');
	});

	it('keeps aria attributes unchanged', () => {
		expect(normalizeAttributeKey('aria-hidden')).toBe('aria-hidden');
		expect(normalizeAttributeKey('aria-expanded')).toBe('aria-expanded');
	});

	it('keeps data attributes unchanged', () => {
		expect(normalizeAttributeKey('data-custom')).toBe('data-custom');
		expect(normalizeAttributeKey('data-value')).toBe('data-value');
	});

	it('only converts exact "class" string', () => {
		expect(normalizeAttributeKey('class')).toBe('className');
		expect(normalizeAttributeKey('classes' as AttributeKey)).not.toBe('classNames');
	});

	it('returns string type for valid keys', () => {
		const result = normalizeAttributeKey('id');
		expect(typeof result).toBe('string');
	});

	it('handles mapped key correctly', () => {
		const result = normalizeAttributeKey('class');
		expect(typeof result).toBe('string');
		expect(result).toBe('className');
	});
});
