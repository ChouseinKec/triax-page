// Utilities
import { validateOrientationID, validateOrientationName, validateOrientationValue, validateOrientationDefinition } from '../orientation';
import { mockOrientationInstance } from '@/src/shared/helpers/mock';

describe('validateOrientationID', () => {
	it('accepts valid orientation ID', () => {
		const result = validateOrientationID('orientation-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('orientation-1');
	});

	it('rejects non-string values', () => {
		const results = [validateOrientationID(123), validateOrientationID(null), validateOrientationID(undefined), validateOrientationID({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Orientation ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateOrientationID('');
		expect(result.valid).toBe(false);
	});
});

describe('validateOrientationName', () => {
	it('accepts valid orientation name', () => {
		const result = validateOrientationName('Portrait');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Portrait');
	});

	it('rejects non-string values', () => {
		const results = [validateOrientationName(123), validateOrientationName(null), validateOrientationName(undefined), validateOrientationName({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Orientation name must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateOrientationName('');
		expect(result.valid).toBe(false);
	});
});

describe('validateOrientationValue', () => {
	it('accepts valid orientation value', () => {
		const result = validateOrientationValue('portrait');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('portrait');
	});

	it('rejects non-string values', () => {
		const results = [validateOrientationValue(123), validateOrientationValue(null), validateOrientationValue(undefined), validateOrientationValue({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Orientation value must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateOrientationValue('');
		expect(result.valid).toBe(false);
	});
});

describe('validateOrientationDefinition', () => {
	it('accepts valid orientation definition', () => {
		const orientation = mockOrientationInstance();
		const result = validateOrientationDefinition(orientation);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(orientation);
	});

	it('rejects non-object values', () => {
		const results = [validateOrientationDefinition('invalid'), validateOrientationDefinition(123), validateOrientationDefinition(null), validateOrientationDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Orientation definition must be an object');
		});
	});

	it('rejects missing required properties', () => {
		const orientation = mockOrientationInstance();

		const results = [validateOrientationDefinition({ ...orientation, name: undefined }), validateOrientationDefinition({ ...orientation, value: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const orientation = mockOrientationInstance();

		const results = [validateOrientationDefinition({ ...orientation, name: 123 }), validateOrientationDefinition({ ...orientation, value: null })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});
