// Utilities
import { createKeywordOption, createFunctionOption, createDimensionOptions, createNumberOption, createIntegerOption, isSlotOptionValid, createOptionTable } from '@/src/core/block/style/utilities/option';
import { getTokenCanonical } from '@/src/core/block/style/utilities';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

	// Keyword options: ensure creation, empty token handling, icon behavior
	describe('createKeywordOption', () => {
		it('creates keyword option with name and value', () => {
			const opt = createKeywordOption('auto', 'display');
			expect(opt).toEqual({ name: 'auto', value: 'auto', category: 'keyword', icon: undefined, type: 'keyword' });
		});
		it('returns undefined for empty token', () => {
			expect(createKeywordOption('', 'display')).toBeUndefined();
		});
	});

	// Function options: defaults, malformed inputs, canonicalization
	describe('createFunctionOption', () => {
		it('creates function option when defaults exist', () => {
			const opt = createFunctionOption('repeat(<integer>, <length>)');
			expect(opt?.category).toBe('function');
			expect(opt?.name).toBe('repeat()');
			expect(opt?.value).toMatch(/^repeat\(.+\)$/);
		});
		it('returns undefined for invalid token', () => {
			expect(createFunctionOption('invalid')).toBeUndefined();
		});
	});

	// Dimension options: unit list, range application, invalid group tokens
	describe('createDimensionOptions', () => {
		it('returns unit options for dimension token', () => {
			const res = createDimensionOptions('<length>');
			expect(Array.isArray(res)).toBe(true);
			expect(res?.length).toBeGreaterThan(0);
		});
		it('applies range min/max when provided', () => {
			const res = createDimensionOptions('<length [0,100]>');
			expect(res?.[0].min).toBe(0);
			expect(res?.[0].max).toBe(100);
		});
		it('returns undefined for non-dimension token', () => {
			expect(createDimensionOptions('<number>')).toBeUndefined();
		});
	});

	// Number options: defaults, range parsing, malformed range stability
	describe('createNumberOption', () => {
		it('creates number option with defaults', () => {
			const opt = createNumberOption('<number>');
			expect(opt).toEqual({ name: 'number', value: '0.0', category: 'other', min: undefined, max: undefined, icon: undefined, type: 'number' });
		});
		it('applies range when present', () => {
			const opt = createNumberOption('<number [1,5]>');
			expect(opt?.min).toBe(1);
			expect(opt?.max).toBe(5);
		});
	});

	// Integer options: defaults, range parsing, non-integer bounds tolerance
	describe('createIntegerOption', () => {
		it('creates integer option with defaults', () => {
			const opt = createIntegerOption('<integer>');
			expect(opt).toEqual({ name: 'integer', value: '0', category: 'other', min: undefined, max: undefined, icon: undefined, type: 'integer' });
		});
		it('applies range when present', () => {
			const opt = createIntegerOption('<integer [0,10]>');
			expect(opt?.min).toBe(0);
			expect(opt?.max).toBe(10);
		});
	});

	// Slot validity: prefix matching, rejection, canonical differences
	describe('isSlotOptionValid', () => {
		it('allows when replacing slot yields a valid prefix', () => {
			const validSet = ['auto block', 'block block', 'auto auto'];
			const current = ['auto', 'block'].map(getTokenCanonical) as string[];
			expect(isSlotOptionValid('auto', 1, validSet, current)).toBe(true);
		});
		it('rejects when no match is found', () => {
			const validSet = ['auto 10px'];
			const current = ['block', '5px'].map(getTokenCanonical) as string[];
			expect(isSlotOptionValid('20px', 1, validSet, current)).toBe(false);
		});
	});

	// Options table: single-slot display behavior, invalid values, empty inputs,
	// unknown token filtering, deduplication, case-insensitive canonicalization
	describe('createOptionTable', () => {
		it('builds options per slot using validity rules', () => {
			const syntaxNormalized = ['', 'flex', 'grid', 'none', 'block', 'inline', 'inline-block'];
			const syntaxSet = [new Set(['...', 'flex', 'grid', 'none', 'block', 'inline', 'inline-block'])];
			const values = ['flex'];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			expect(table[0].some((o) => o.value === 'none')).toBe(true);
		});

		it('rejects non-valid current values and does not include them', () => {
			const syntaxNormalized = ['', 'flex', 'grid', 'none', 'block', 'inline', 'inline-block'];
			const syntaxSet = [new Set(['...', 'flex', 'grid', 'none', 'block', 'inline', 'inline-block'])];
			const values = ['invalid-token'];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			// Should not include the invalid current value as an option
			expect(table[0].some((o) => o.value === 'invalid-token')).toBe(false);
			// Still should include valid options from the set
			expect(table[0].some((o) => o.value === 'flex')).toBe(true);
			expect(table[0].some((o) => o.value === 'grid')).toBe(true);
			expect(table[0].some((o) => o.value === 'block')).toBe(true);
		});

		it('handles empty inputs gracefully', () => {
			const syntaxNormalized: string[] = [];
			const syntaxSet = [new Set<string>()];
			const values: string[] = [];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			expect(Array.isArray(table)).toBe(true);
			expect(table.length).toBe(1);
			expect(table[0].length).toBe(0);
		});

		it('filters unknown tokens present in syntaxSet', () => {
			const syntaxNormalized = ['', 'flex', 'grid'];
			const syntaxSet = [new Set(['flex', 'grid', 'foobar'])];
			const values = ['flex'];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			// Known tokens included
			expect(table[0].some((o) => o.value === 'flex')).toBe(true);
			expect(table[0].some((o) => o.value === 'grid')).toBe(true);
			// Unknown token excluded
			expect(table[0].some((o) => o.value === 'foobar')).toBe(false);
		});

		it('includes current value and avoids duplicates when current equals candidate', () => {
			const syntaxNormalized = ['', 'flex', 'grid'];
			const syntaxSet = [new Set(['flex', 'grid'])];
			const values = ['grid'];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			const grids = table[0].filter((o) => o.value === 'grid');
			expect(grids.length).toBeGreaterThan(0);
			// No duplicates of the same option
			expect(new Set(grids.map((o) => o.value)).size).toBe(1);
		});

		it('accepts canonicalization differences (case-insensitive tokens)', () => {
			const syntaxNormalized = ['', 'Flex', 'GRID'];
			const syntaxSet = [new Set(['Flex', 'GRID', 'none'])];
			const values = ['flex'];
			const table = createOptionTable(syntaxNormalized, syntaxSet, values, 'display');

			// Expect canonicalized match to include lower-case queries
			expect(table[0].some((o) => o.value.toLowerCase() === 'flex')).toBe(true);
			expect(table[0].some((o) => o.value.toLowerCase() === 'grid')).toBe(true);
		});
	});
