// Utilities
import { isPseudoNameValid, isPseudoValueValid, isPseudoIDValid, isPseudoDefinitionValid } from '@/core/layout/page/utilities/pseudo';

// Pseudo name validation: non-empty string
describe('isPseudoNameValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isPseudoNameValid('hover')).toBe(true);
		expect(isPseudoNameValid('active')).toBe(true);
		expect(isPseudoNameValid('focus')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPseudoNameValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPseudoNameValid(123)).toBe(false);
		expect(isPseudoNameValid(null)).toBe(false);
		expect(isPseudoNameValid(undefined)).toBe(false);
	});
});

// Pseudo value validation: non-empty string
describe('isPseudoValueValid', () => {
	it('accepts valid value strings', () => {
		expect(isPseudoValueValid('active')).toBe(true);
		expect(isPseudoValueValid('hover')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPseudoValueValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPseudoValueValid(456)).toBe(false);
		expect(isPseudoValueValid(null)).toBe(false);
	});
});

// Pseudo ID validation: non-empty string
describe('isPseudoIDValid', () => {
	it('accepts valid ID strings', () => {
		expect(isPseudoIDValid('hover')).toBe(true);
		expect(isPseudoIDValid('focus')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPseudoIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPseudoIDValid(789)).toBe(false);
		expect(isPseudoIDValid(null)).toBe(false);
	});
});

// Pseudo definition validation: object with name and value
describe('isPseudoDefinitionValid', () => {
	it('accepts valid pseudo definition', () => {
		const pseudo = {
			name: 'Hover',
			value: 'hover',
		};
		expect(isPseudoDefinitionValid(pseudo)).toBe(true);
	});

	it('rejects objects missing name', () => {
		expect(isPseudoDefinitionValid({ value: 'hover' })).toBe(false);
	});

	it('rejects objects missing value', () => {
		expect(isPseudoDefinitionValid({ name: 'Hover' })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isPseudoDefinitionValid(null)).toBe(false);
		expect(isPseudoDefinitionValid(undefined)).toBe(false);
		expect(isPseudoDefinitionValid('pseudo')).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const pseudo = {
			name: 'Hover',
			value: 'hover',
			extra: 'property',
		};
		expect(isPseudoDefinitionValid(pseudo)).toBe(true);
	});
});
