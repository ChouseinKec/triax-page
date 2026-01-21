// Utilities
import { extractSeparator, extractSeparators } from '@/core/block/style/utilities/separator';

// Mock icons to avoid JSX in tests
jest.mock('@/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('extractSeparator', () => {
	it('returns space and slash separators', () => {
		expect(extractSeparator('a b / c')).toEqual([' ', '/']);
	});

	it('returns normalized spaces as separators', () => {
		expect(extractSeparator('a    b   c')).toEqual([' ', ' ']);
	});

	it('returns comma and slash separators, trims spaces', () => {
		expect(extractSeparator('a , b /  c , d')).toEqual([',', '/', ',']);
	});

	it('returns separators, ignores angle-bracketed tokens', () => {
		expect(extractSeparator('<length> <percentage> / <length>')).toEqual([' ', '/']);
	});

	it('returns separators, ignores function content', () => {
		expect(extractSeparator('calc(10px + 5%) / min(10px, 2em)')).toEqual(['/']);
	});

	it('returns only top-level separators for nested functions', () => {
		expect(extractSeparator('func(inner(1,2), 3) , other() / token')).toEqual([',', '/']);
	});

	it('returns empty array if no separators', () => {
		expect(extractSeparator('singletoken')).toEqual([]);
	});

	it('handles empty string', () => {
		expect(extractSeparator('')).toEqual([]);
	});

	it('handles only separators', () => {
		expect(extractSeparator(' / , ')).toEqual(['/', ',']);
	});

	it('handles multiple types of separators', () => {
		expect(extractSeparator('a,b/c d')).toEqual([',', '/', ' ']);
	});
});

describe('extractSeparators', () => {
	it('returns arrays of separators for each variation', () => {
		expect(extractSeparators(['a b / c', 'd,e'])).toEqual([[' ', '/'], [',']]);
	});

	it('accepts array-like input', () => {
		const arrLike = Object.assign(['x y', 'p / q'], { length: 2 });
		expect(extractSeparators(arrLike)).toEqual([[' '], ['/']]);
	});

	it('returns empty arrays for empty or no-separator variations', () => {
		expect(extractSeparators(['', 'token'])).toEqual([[], []]);
	});
});
