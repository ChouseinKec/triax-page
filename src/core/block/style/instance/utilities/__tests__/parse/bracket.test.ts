import { hasBrackets, hasBracketsMultiplier, parseBrackets, parseBracketsMultiplier } from '@/core/block/style/instance/utilities/parse/bracket';
import { MAX_MULTIPLIER_DEPTH } from '@/core/block/style/instance/utilities/parse/parse';

describe('hasBrackets', () => {
	it.each([
		['[a b]', true],
		['[]', true],
		['[   ]', true],
		['a b', false],
		['[a b', false],
		['a b]', false],
	])('returns %s for %s', (input, expected) => {
		expect(hasBrackets(input)).toBe(expected);
	});

	it('handles empty string', () => {
		expect(hasBrackets('')).toBe(false);
	});
});

describe('hasBracketsMultiplier', () => {
	it.each([
		['[a b]+', true],
		['[a]+', true],
		['[a b]*', true],
		['[a b]?', true],
		['[a]#', true],
		['[a]{2}', true],
		['[a]{2,3}', true],
		['[a]{2,}', false],
		['[a]{,3}', false],
		['[a]x', false],
		['a b+', false],
	])('returns %s for %s', (input, expected) => {
		expect(hasBracketsMultiplier(input)).toBe(expected);
	});

	it('rejects empty string', () => {
		expect(hasBracketsMultiplier('')).toBe(false);
	});
});

describe('parseBrackets', () => {
	it('returns empty array for empty brackets', () => {
		expect(parseBrackets('[]')).toEqual([]);
	});

	it('returns tokens for non-empty group', () => {
		expect(parseBrackets('[a b]')).toEqual(['', 'a b']);
	});

	it('filters empty entries', () => {
		expect(parseBrackets('[  a   ]')).toEqual(['', 'a']);
	});

	it('returns empty array when no brackets', () => {
		expect(parseBrackets('a b')).toEqual([]);
	});
});

describe('parseBracketsMultiplier', () => {
	it('returns input when pattern missing', () => {
		expect(parseBracketsMultiplier('a b+')).toEqual(['a b+']);
	});

	it('handles + (one or more)', () => {
		const res = parseBracketsMultiplier('[a b]+');
		expect(res).toContain('a b');
		expect(res.some((v) => v.includes('a b a b'))).toBe(true);
	});

	it('handles * (zero or more)', () => {
		const res = parseBracketsMultiplier('[a]*');
		expect(res).toContain('');
		expect(res).toContain('a');
	});

	it('handles ? (zero or one)', () => {
		const res = parseBracketsMultiplier('[a]?');
		expect(res.sort()).toEqual(['', 'a'].sort());
	});

	it('handles # (comma join, one or more)', () => {
		const res = parseBracketsMultiplier('[a]#');
		expect(res).toContain('a');
		expect(res.some((v) => v.includes('a,a'))).toBe(true);
	});

	it('joins multi-token groups for #', () => {
		const res = parseBracketsMultiplier('[a b]#');
		expect(res).toContain('a b');
		expect(res.some((v) => v.includes('a b,a b'))).toBe(true);
	});

	it('handles {n} exact repetitions', () => {
		const res = parseBracketsMultiplier('[a]{2}');
		expect(res).toContain('a a');
		expect(res).not.toContain('');
	});

	it('deduplicates outputs', () => {
		const res = parseBracketsMultiplier('[a]{2}');
		const occurrences = res.filter((v) => v === 'a a').length;
		expect(occurrences).toBe(1);
	});

	it('handles {min,max} repetitions', () => {
		const res = parseBracketsMultiplier('[a]{1,2}');
		expect(res).toContain('a');
		expect(res).toContain('a a');
	});

	it('respects MAX_MULTIPLIER_DEPTH', () => {
		const res = parseBracketsMultiplier('[a]+');
		const longest = res.reduce((max, v) => Math.max(max, (v.match(/a/g) || []).length), 0);
		expect(longest).toBeLessThanOrEqual(MAX_MULTIPLIER_DEPTH);
	});

	it('rejects invalid {min,} or {,max}', () => {
		expect(parseBracketsMultiplier('[a]{2,}')).toEqual(['[a]{2,}']);
		expect(parseBracketsMultiplier('[a]{,3}')).toEqual(['[a]{,3}']);
	});
});
