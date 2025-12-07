import { normalizeSyntax, parseSyntax, MAX_MULTIPLIER_DEPTH } from '@/src/core/block/style/utilities/parse/parse';

describe('normalizeSyntax', () => {
	it('returns spaced ||', () => {
		expect(normalizeSyntax('a||b')).toBe('a || b');
		expect(normalizeSyntax('a || b')).toBe('a || b');
	});

	it('returns compact &&', () => {
		expect(normalizeSyntax('a && b')).toBe('a&&b');
		expect(normalizeSyntax('a&&b')).toBe('a&&b');
	});

	it('returns compact | while keeping ||', () => {
		expect(normalizeSyntax('a | b')).toBe('a|b');
		expect(normalizeSyntax('a || b')).toBe('a || b');
	});

	it('removes spaces before multipliers', () => {
		expect(normalizeSyntax('a *')).toBe('a*');
		expect(normalizeSyntax('a +')).toBe('a+');
		expect(normalizeSyntax('a ?')).toBe('a?');
	});

	it('handles extra spaces and trims', () => {
		expect(normalizeSyntax('  a   b  ')).toBe('a b');
	});

	it('returns empty string for empty input', () => {
		expect(normalizeSyntax('')).toBe('');
	});
});

describe('parseSyntax', () => {
	it('returns comma-expanded values', () => {
		expect(parseSyntax('a, b')).toEqual(['a,b']);
	});
	
	it('returns double-bar expansions with precedence', () => {
		const res = parseSyntax('a || b c');
		expect(res).toEqual(expect.arrayContaining(['a', 'b c', 'a b c', 'b c a']));
	});

	it('returns double-amp expansions', () => {
		const res = parseSyntax('a && b');
		expect(res).toEqual(expect.arrayContaining(['a b', 'b a']));
	});
	
	it('returns sequence expansions', () => {
		expect(parseSyntax('a b')).toEqual(expect.arrayContaining(['a b']));
	});

	it('returns single-bar options', () => {
		const res = parseSyntax('a | b c');
		expect(res).toEqual(expect.arrayContaining(['a c', 'b c']));
	});

	it('returns bracket group expansion', () => {
		expect(parseSyntax('[a]')).toEqual(['', 'a']);
	});

	it('returns bracket+multiplier expansion', () => {
		const res = parseSyntax('[a]+');
		expect(res[0]).toBe('a');
		expect(res.length).toBeLessThanOrEqual(MAX_MULTIPLIER_DEPTH);
	});

	it('returns multiplier expansions', () => {
		expect(parseSyntax('a?')).toEqual(['', 'a']);
		const plus = parseSyntax('a+');
		expect(plus[0]).toBe('a');
		const star = parseSyntax('a*');
		expect(star[0]).toBe('');
		expect(parseSyntax('a{2,3}')).toEqual(['a a', 'a a a']);
	});

	it('returns atomic value when no combinators', () => {
		expect(parseSyntax('a')).toEqual(['a']);
	});

	it('deduplicates and sorts by length', () => {
		const res = parseSyntax('a | a');
		expect(res).toEqual(['a']);
	});
	
	it('returns empty array for empty input', () => {
		expect(parseSyntax('')).toEqual(['']);
	});
});
