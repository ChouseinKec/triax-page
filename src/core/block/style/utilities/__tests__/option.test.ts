// Utilities
import { createKeywordOption, createFunctionOption, createDimensionOptions, createNumberOption, createIntegerOption, isSlotOptionValid, createOptionTable } from '@/src/core/block/style/utilities/option';
import { getTokenCanonical } from '@/src/core/block/style/utilities';


const mockProperty = { name: 'display', icons: undefined } as any;

describe('createKeywordOption', () => {
	it('returns keyword option with name and value', () => {
		const opt = createKeywordOption('auto', 'display');
		expect(opt).toEqual({ name: 'auto', value: 'auto', category: 'keyword', icon: undefined, type: 'keyword' });
	});

	it('rejects empty token', () => {
		expect(createKeywordOption('', 'display')).toBeUndefined();
	});

	it('rejects whitespace-only token', () => {
		expect(createKeywordOption('   ', 'display')).toBeUndefined();
	});
});

describe('createFunctionOption', () => {
	it('returns function option when token is valid', () => {
		const opt = createFunctionOption('repeat(<integer>, <length>)');
		expect(opt?.category).toBe('function');
		expect(opt?.name).toBe('repeat()');
		expect(opt?.value).toMatch(/^repeat\(.+\)$/);
	});

	it('rejects invalid token', () => {
		expect(createFunctionOption('invalid')).toBeUndefined();
	});

	it('rejects empty string token', () => {
		expect(createFunctionOption('')).toBeUndefined();
	});
});

describe('createDimensionOptions', () => {
	it('returns dimension unit options', () => {
		const res = createDimensionOptions('<length>');
		expect(Array.isArray(res)).toBe(true);
		expect(res?.length).toBeGreaterThan(0);
	});

	it('returns options containing px unit', () => {
		const res = createDimensionOptions('<length>');
		expect(res?.some((o) => o.value?.includes('px'))).toBe(true);
	});

	it('handles range min/max when provided', () => {
		const res = createDimensionOptions('<length [0,100]>');
		expect(res?.[0].min).toBe(0);
		expect(res?.[0].max).toBe(100);
	});

	it('rejects non-dimension token', () => {
		expect(createDimensionOptions('<number>')).toBeUndefined();
	});
});

describe('createNumberOption', () => {
	it('returns number option with defaults', () => {
		const opt = createNumberOption('<number>');
		expect(opt).toEqual({ name: 'number', value: '0.0', category: 'other', min: undefined, max: undefined, icon: undefined, type: 'number' });
	});

	it('applies range bounds when present', () => {
		const opt = createNumberOption('<number [1,5]>');
		expect(opt?.min).toBe(1);
		expect(opt?.max).toBe(5);
	});

	it('handles malformed range by keeping defaults', () => {
		const opt = createNumberOption('<number [a,b]>');
		expect(opt?.min).toBeNaN();
		expect(opt?.max).toBeNaN();
	});
});

describe('createIntegerOption', () => {
	it('returns integer option with defaults', () => {
		const opt = createIntegerOption('<integer>');
		expect(opt).toEqual({ name: 'integer', value: '0', category: 'other', min: undefined, max: undefined, icon: undefined, type: 'integer' });
	});

	it('applies integer range when present', () => {
		const opt = createIntegerOption('<integer [0,10]>');
		expect(opt?.min).toBe(0);
		expect(opt?.max).toBe(10);
	});

	it('handles malformed range by keeping defaults', () => {
		const opt = createIntegerOption('<integer [x,y]>');
		expect(opt?.min).toBeNaN();
		expect(opt?.max).toBeNaN();
	});
});

describe('isSlotOptionValid', () => {
	it('accepts replacement that yields valid prefix', () => {
		const validSet = ['auto block', 'block block', 'auto auto'];
		const current = ['auto', 'block'].map(getTokenCanonical) as string[];
		expect(isSlotOptionValid('auto', 1, validSet, current)).toBe(true);
	});

	it('rejects replacement with no matching combination', () => {
		const validSet = ['auto 10px'];
		const current = ['block', '5px'].map(getTokenCanonical) as string[];
		expect(isSlotOptionValid('20px', 1, validSet, current)).toBe(false);
	});

	it('accepts canonicalized match case-insensitively', () => {
		const validSet = ['AUTO BLOCK'];
		const current = ['auto', 'block'].map(getTokenCanonical) as string[];
		expect(isSlotOptionValid('auto', 0, validSet, current)).toBe(true);
	});
});

describe('createOptionTable', () => {
	it('returns options per slot using validity rules', () => {
		const syntaxNormalized = ['', 'flex', 'grid', 'none', 'block'];
		const syntaxSet = [new Set(['...', 'flex', 'grid', 'none', 'block'])];
		const values = ['flex'];
		const table = createOptionTable(syntaxNormalized, syntaxSet, values, mockProperty);

		expect(table[0].some((o) => o.value === 'none')).toBe(true);
	});

	it('rejects invalid current value but keeps valid ones', () => {
		const syntaxNormalized = ['', 'flex', 'grid', 'block'];
		const syntaxSet = [new Set(['...', 'flex', 'grid', 'block'])];
		const values = ['invalid-token'];
		const table = createOptionTable(syntaxNormalized, syntaxSet, values, mockProperty);

		expect(table[0].some((o) => o.value === 'invalid-token')).toBe(false);
		expect(table[0].some((o) => o.value === 'flex')).toBe(true);
	});

	it('handles empty inputs', () => {
		const table = createOptionTable([], [new Set<string>()], [], mockProperty);
		expect(Array.isArray(table)).toBe(true);
		expect(table[0].length).toBe(0);
	});

	it('filters unknown tokens', () => {
		const syntaxNormalized = ['', 'flex', 'grid'];
		const syntaxSet = [new Set(['flex', 'grid', 'foobar'])];
		const values = ['flex'];
		const table = createOptionTable(syntaxNormalized, syntaxSet, values, mockProperty);

		expect(table[0].some((o) => o.value === 'foobar')).toBe(false);
		expect(table[0].some((o) => o.value === 'grid')).toBe(true);
	});

	it('deduplicates current value when also in candidates', () => {
		const syntaxNormalized = ['', 'flex', 'grid'];
		const syntaxSet = [new Set(['flex', 'grid'])];
		const values = ['grid'];
		const table = createOptionTable(syntaxNormalized, syntaxSet, values, mockProperty);

		const grids = table[0].filter((o) => o.value === 'grid');
		expect(new Set(grids.map((o) => o.value)).size).toBe(1);
	});

	it('accepts case-insensitive tokens', () => {
		const syntaxNormalized = ['', 'Flex', 'GRID'];
		const syntaxSet = [new Set(['Flex', 'GRID', 'none'])];
		const values = ['flex'];
		const table = createOptionTable(syntaxNormalized, syntaxSet, values, mockProperty);

		expect(table[0].some((o) => o.value.toLowerCase() === 'flex')).toBe(true);
		expect(table[0].some((o) => o.value.toLowerCase() === 'grid')).toBe(true);
	});
});
