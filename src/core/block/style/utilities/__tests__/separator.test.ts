// Utilities
import { extractSeparator, extractSeparators } from '@/src/core/block/style/utilities/separator';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

// Basic case: single-space between tokens and a slash separator
describe('extractSeparator', () => {
	it('extracts space and slash separators', () => {
		expect(extractSeparator('a b / c')).toEqual([' ', '/']);
	});

	// Multiple spaces collapse to normalized spaces in sequence
	it('normalizes multiple spaces into a single space separator', () => {
		expect(extractSeparator('a    b   c')).toEqual([' ', ' ']);
	});

	// Trims spaces around comma and slash; order preserved
	it('removes spaces around comma and slash', () => {
		expect(extractSeparator('a , b /  c , d')).toEqual([',', '/', ',']);
	});

	// Angle-bracketed tokens are treated as atomic; only separators returned
	it('ignores angle-bracketed tokens as values and only returns separators', () => {
		expect(extractSeparator('<length> <percentage> / <length>')).toEqual([' ', '/']);
	});

	// Functions (and their inner content) are collapsed to a token; separators outside are kept
	it('treats functions as tokens and extracts separators outside', () => {
		expect(extractSeparator('calc(10px + 5%) / min(10px, 2em)')).toEqual(['/']);
	});

	// Nested/complex function-like strings: only top-level separators extracted
	it('handles nested function-like content robustly', () => {
		expect(extractSeparator('func(inner(1,2), 3) , other() / token')).toEqual([',', '/']);
	});

	// No separators → empty list
	it('returns empty array when no separators are present', () => {
		expect(extractSeparator('singletoken')).toEqual([]);
	});
});

// Applies extractSeparator to each variation; preserves per-variation results
describe('extractSeparators', () => {
	it('maps variations to arrays of separators', () => {
		const res = extractSeparators(['a b / c', 'd,e']);
		expect(res).toEqual([[' ', '/'], [',']]);
	});

	// Array-like input should be handled without mutation
	it('accepts array-like inputs and handles gracefully', () => {
		const arrLike = Object.assign(['x y', 'p / q'], { length: 2 });
		const res = extractSeparators(arrLike);
		expect(res).toEqual([[' '], ['/']]);
	});
});
