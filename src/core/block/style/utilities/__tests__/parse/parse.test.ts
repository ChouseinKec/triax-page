import { normalizeSyntax, parseSyntax, MAX_MULTIPLIER_DEPTH } from '@/src/core/block/style/utilities/parse/parse';

describe('normalizeSyntax', () => {
	it('normalizes spaces around || to have spaces', () => {
		expect(normalizeSyntax('a||b')).toBe('a || b');
		expect(normalizeSyntax('a || b')).toBe('a || b');
	});
	it('normalizes && to have no spaces', () => {
		expect(normalizeSyntax('a && b')).toBe('a&&b');
		expect(normalizeSyntax('a&&b')).toBe('a&&b');
	});
	it('normalizes single | to have no spaces (not affecting ||)', () => {
		expect(normalizeSyntax('a | b')).toBe('a|b');
		expect(normalizeSyntax('a || b')).toBe('a || b');
	});
	it('removes spaces before *, +, ?', () => {
		expect(normalizeSyntax('a *')).toBe('a*');
		expect(normalizeSyntax('a +')).toBe('a+');
		expect(normalizeSyntax('a ?')).toBe('a?');
	});
	it('collapses multiple spaces and trims', () => {
		expect(normalizeSyntax('  a   b  ')).toBe('a b');
	});
});

describe('parseSyntax', () => {
	it('parses comma-separated lists first', () => {
		expect(parseSyntax('a, b')).toEqual(['a,b']);
	});
	it('parses double bar with precedence', () => {
		const res = parseSyntax('a || b c');
		expect(res).toEqual(expect.arrayContaining(['a', 'b c', 'a b c', 'b c a']));
	});
	it('parses double ampersand', () => {
		const res = parseSyntax('a && b');
		expect(res).toEqual(expect.arrayContaining(['a b', 'b a']));
	});
	it('parses sequences', () => {
		expect(parseSyntax('a b')).toEqual(expect.arrayContaining(['a b']));
	});
	it('parses single bar', () => {
		const res = parseSyntax('a | b c');
		expect(res).toEqual(expect.arrayContaining(['a c', 'b c']));
	});
	it('parses bracket group', () => {
		expect(parseSyntax('[a]')).toEqual(['', 'a']);
	});
	it('parses bracket group with multiplier', () => {
		const res = parseSyntax('[a]+');
		expect(res[0]).toBe('a');
		expect(res.length).toBeLessThanOrEqual(MAX_MULTIPLIER_DEPTH);
	});
	it('parses multipliers (?, +, *, {m,n})', () => {
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
});
