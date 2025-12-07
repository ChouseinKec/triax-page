// Utilities
import { renderBlockAttributes } from '../render';
import { mockBlockAttributes } from '@/src/shared/helpers/mock';

describe('renderBlockAttributes', () => {
	it('renders empty attributes object', () => {
		const attributes = mockBlockAttributes();
		const result = renderBlockAttributes(attributes);

		expect(result).toEqual({});
	});

	it('renders attributes with string values', () => {
		const attributes = mockBlockAttributes({ id: 'btn-1', title: 'Click me' });
		const result = renderBlockAttributes(attributes);

		expect(result.id).toBe('btn-1');
		expect(result.title).toBe('Click me');
	});

	it('converts class to className', () => {
		const attributes = mockBlockAttributes({ class: 'btn btn-primary' });
		const result = renderBlockAttributes(attributes);

		expect(result.className).toBe('btn btn-primary');
		expect(result.class).toBeUndefined();
	});

	it('converts string true to boolean true', () => {
		const attributes = mockBlockAttributes({ disabled: 'true' });
		const result = renderBlockAttributes(attributes);

		expect(result.disabled).toBe(true);
		expect(typeof result.disabled).toBe('boolean');
	});

	it('converts string false to boolean false', () => {
		const attributes = mockBlockAttributes({ disabled: 'false' });
		const result = renderBlockAttributes(attributes);

		expect(result.disabled).toBe(false);
		expect(typeof result.disabled).toBe('boolean');
	});

	it('preserves non-boolean string values', () => {
		const attributes = mockBlockAttributes({ type: 'submit', value: 'true-as-string' });
		const result = renderBlockAttributes(attributes);

		expect(result.type).toBe('submit');
		expect(result.value).toBe('true-as-string');
	});

	it('skips empty string values', () => {
		const attributes = mockBlockAttributes({ id: 'btn-1', title: '', class: 'btn' });
		const result = renderBlockAttributes(attributes);

		expect(result.id).toBe('btn-1');
		expect(result.title).toBeUndefined();
		expect(result.className).toBe('btn');
	});

	it('handles multiple attributes with mixed types', () => {
		const attributes = mockBlockAttributes({ id: 'test-btn', class: 'primary large', disabled: 'true', title: 'Submit form', required: 'false' });
		const result = renderBlockAttributes(attributes);

		expect(result.id).toBe('test-btn');
		expect(result.className).toBe('primary large');
		expect(result.disabled).toBe(true);
		expect(result.title).toBe('Submit form');
		expect(result.required).toBe(false);
	});

	it('preserves data attributes', () => {
		const attributes = mockBlockAttributes({ 'data-testid': 'submit-btn', 'data-value': '123' });
		const result = renderBlockAttributes(attributes);

		expect(result['data-testid']).toBe('submit-btn');
		expect(result['data-value']).toBe('123');
	});

	it('preserves aria attributes', () => {
		const attributes = mockBlockAttributes({ 'aria-label': 'Submit', 'aria-pressed': 'true' });
		const result = renderBlockAttributes(attributes);

		expect(result['aria-label']).toBe('Submit');
		expect(result['aria-pressed']).toBe(true);
	});

	it('returns new object without mutating input', () => {
		const attributes = mockBlockAttributes({ class: 'btn', disabled: 'true' });
		const result = renderBlockAttributes(attributes);

		expect(result).not.toBe(attributes);
		expect(attributes.class).toBe('btn');
		expect(attributes.disabled).toBe('true');
	});

	it('returns empty object when all values are falsy', () => {
		const attributes = mockBlockAttributes({ title: '', id: '' });
		const result = renderBlockAttributes(attributes);

		expect(result).toEqual({});
	});
});
