import { hasBrackets, hasBracketsMultiplier, parseBrackets, parseBracketsMultiplier } from '@/src/core/block/style/utilities/parse/bracket';
import { MAX_MULTIPLIER_DEPTH } from '@/src/core/block/style/utilities/parse/parse';

	describe('has.brackets', () => {
		it.each([
			['[a b]', true],
			['[]', true],
			['[   ]', true],
			['a b', false],
			['[a b', false],
			['a b]', false],
		])('"%s" → %s', (input, expected) => {
			expect(hasBrackets(input)).toBe(expected);
		});
	});

	describe('has.bracketsWithMultiplier', () => {
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
		])('"%s" → %s', (input, expected) => {
			expect(hasBracketsMultiplier(input)).toBe(expected);
		});
	});

	describe('parse.brackets', () => {
		it('returns [] for empty inner content', () => {
			expect(parseBrackets('[]')).toEqual([]);
		});

		it('returns ["", ...] for non-empty group', () => {
			expect(parseBrackets('[a b]')).toEqual(['', 'a b']);
		});

		it('filters out empty strings from parsed results', () => {
			expect(parseBrackets('[  a   ]')).toEqual(['', 'a']);
		});
	});

	describe('parse.bracketsWithMultiplier', () => {
		it('returns input as-is when not matching pattern', () => {
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

		it('joins multi-token groups with comma for #', () => {
			const res = parseBracketsMultiplier('[a b]#');
			expect(res).toContain('a b');
			expect(res.some((v) => v.includes('a b,a b'))).toBe(true);
		});

		it('handles {n} exact repetitions', () => {
			const res = parseBracketsMultiplier('[a]{2}');
			expect(res).toContain('a a');
			expect(res).not.toContain('');
		});

		it('deduplicates repeated outputs', () => {
			const res = parseBracketsMultiplier('[a]{2}');
			const occurrences = res.filter((v) => v === 'a a').length;
			expect(occurrences).toBe(1);
		});

		it('handles {min,max} bounded repetitions', () => {
			const res = parseBracketsMultiplier('[a]{1,2}');
			expect(res).toContain('a');
			expect(res).toContain('a a');
		});

		it('respects MAX_MULTIPLIER_DEPTH upper bound', () => {
			const res = parseBracketsMultiplier('[a]+');
			const longest = res.reduce((max, v) => Math.max(max, (v.match(/a/g) || []).length), 0);
			expect(longest).toBeLessThanOrEqual(MAX_MULTIPLIER_DEPTH);
		});
	});
