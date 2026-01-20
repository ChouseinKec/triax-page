// Utilities
import { validatePseudoKey, validatePseudoName, validatePseudoValue, validatePseudoDefinition } from '../pseudo';
import { mockPseudoInstance } from '@/src/shared/helpers/mock';

describe('validatePseudoKey', () => {
	it('accepts valid pseudo ID', () => {
		const result = validatePseudoKey('pseudo-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('pseudo-1');
	});

	it('rejects non-string values', () => {
		const results = [validatePseudoKey(123), validatePseudoKey(null), validatePseudoKey(undefined), validatePseudoKey({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Pseudo ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePseudoKey('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePseudoName', () => {
	it('accepts valid pseudo name', () => {
		const result = validatePseudoName('Hover');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Hover');
	});

	it('rejects non-string values', () => {
		const results = [validatePseudoName(123), validatePseudoName(null), validatePseudoName(undefined), validatePseudoName({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Pseudo name must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePseudoName('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePseudoValue', () => {
	it('accepts valid pseudo value', () => {
		const result = validatePseudoValue('hover');
        
		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('hover');
	});

	it('rejects non-string values', () => {
		const results = [validatePseudoValue(123), validatePseudoValue(null), validatePseudoValue(undefined), validatePseudoValue({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Pseudo value must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePseudoValue('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePseudoDefinition', () => {
	it('accepts valid pseudo definition', () => {
		const pseudo = mockPseudoInstance();

		const result = validatePseudoDefinition(pseudo);
		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(pseudo);
	});

	it('rejects non-object values', () => {
		const results = [validatePseudoDefinition('invalid'), validatePseudoDefinition(123), validatePseudoDefinition(null), validatePseudoDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Pseudo definition must be an object');
		});
	});

	it('rejects missing required properties', () => {
		const pseudo = mockPseudoInstance();

		const results = [validatePseudoDefinition({ ...pseudo, name: undefined }), validatePseudoDefinition({ ...pseudo, value: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const pseudo = mockPseudoInstance();

		const results = [validatePseudoDefinition({ ...pseudo, name: 123 }), validatePseudoDefinition({ ...pseudo, value: null })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});