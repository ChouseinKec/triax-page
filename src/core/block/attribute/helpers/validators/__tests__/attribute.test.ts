// Utilities
import { validateAttributeKey, validateAttributeValue, validateBlockAttributes } from '../attribute';
import { mockBlockAttributes } from '@/src/shared/helpers/mock';

describe('validateAttributeKey', () => {
	// Accepts valid attribute key from predefined definitions
	it('accepts valid attribute key', () => {
		const result = validateAttributeKey('id');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('id');
	});

	// Accepts multiple valid attribute keys
	it('accepts multiple valid attribute keys', () => {
		const validKeys = ['id', 'class', 'aria-label', 'title'];

		for (const key of validKeys) {
			const result = validateAttributeKey(key);
			expect(result.valid).toBe(true);
		}
	});

	// Rejects unrecognized attribute key
	it('rejects unrecognized attribute key', () => {
		const result = validateAttributeKey('invalidAttr');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('not a recognized HTML attribute');
	});

	// Rejects empty string
	it('rejects empty string', () => {
		const result = validateAttributeKey('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	// Rejects null
	it('rejects null', () => {
		const result = validateAttributeKey(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	// Rejects undefined
	it('rejects undefined', () => {
		const result = validateAttributeKey(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateAttributeValue', () => {
	it('accepts non-empty string value', () => {
		const result = validateAttributeValue('button');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('button');
	});

	it('accepts multiple non-empty string values', () => {
		const validValues = ['submit', 'text', 'checkbox', 'hidden', 'my-value'];

		for (const value of validValues) {
			const result = validateAttributeValue(value);
			expect(result.valid).toBe(true);
		}
	});

	it('accepts empty string as valid attribute value', () => {
		const result = validateAttributeValue('');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('');
	});

	it('rejects null', () => {
		const result = validateAttributeValue(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateAttributeValue(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateBlockAttributes', () => {
	it('accepts valid block attributes object', () => {
		const attributes = mockBlockAttributes({ id: 'btn-1', class: 'primary' });
		const result = validateBlockAttributes(attributes);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(attributes);
	});

	it('accepts empty attributes object', () => {
		const result = validateBlockAttributes(mockBlockAttributes());

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual({});
	});

	it('accepts object with multiple attribute properties', () => {
		const attributes = mockBlockAttributes({ id: 'test-id', class: 'btn btn-primary', title: 'Click me', 'data-test': 'value' });
		const result = validateBlockAttributes(attributes);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(attributes);
	});

	it('rejects non-object value', () => {
		const result = validateBlockAttributes('not-an-object');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects null', () => {
		const result = validateBlockAttributes(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBlockAttributes(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});
