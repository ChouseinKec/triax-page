// Utilities
import { isOrientationNameValid, isOrientationValueValid, isOrientationIDValid, isOrientationDefinitionValid } from '@/core/layout/page/utilities/orientation';

// Orientation name validation: non-empty string
describe('isOrientationNameValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isOrientationNameValid('portrait')).toBe(true);
		expect(isOrientationNameValid('landscape')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isOrientationNameValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isOrientationNameValid(123)).toBe(false);
		expect(isOrientationNameValid(null)).toBe(false);
		expect(isOrientationNameValid(undefined)).toBe(false);
	});
});

// Orientation value validation: non-empty string
describe('isOrientationValueValid', () => {
	it('accepts valid value strings', () => {
		expect(isOrientationValueValid('landscape')).toBe(true);
		expect(isOrientationValueValid('portrait')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isOrientationValueValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isOrientationValueValid(456)).toBe(false);
		expect(isOrientationValueValid(null)).toBe(false);
	});
});

// Orientation ID validation: non-empty string
describe('isOrientationIDValid', () => {
	it('accepts valid ID strings', () => {
		expect(isOrientationIDValid('portrait')).toBe(true);
		expect(isOrientationIDValid('landscape')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isOrientationIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isOrientationIDValid(789)).toBe(false);
		expect(isOrientationIDValid(null)).toBe(false);
	});
});

// Orientation definition validation: object with name and value
describe('isOrientationDefinitionValid', () => {
	it('accepts valid orientation definition', () => {
		const orientation = {
			name: 'Portrait',
			value: 'portrait',
		};
		expect(isOrientationDefinitionValid(orientation)).toBe(true);
	});

	it('rejects objects missing name', () => {
		expect(isOrientationDefinitionValid({ value: 'portrait' })).toBe(false);
	});

	it('rejects objects missing value', () => {
		expect(isOrientationDefinitionValid({ name: 'Portrait' })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isOrientationDefinitionValid(null)).toBe(false);
		expect(isOrientationDefinitionValid(undefined)).toBe(false);
		expect(isOrientationDefinitionValid('orientation')).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const orientation = {
			name: 'Portrait',
			value: 'portrait',
			extra: 'property',
		};
		expect(isOrientationDefinitionValid(orientation)).toBe(true);
	});
});
