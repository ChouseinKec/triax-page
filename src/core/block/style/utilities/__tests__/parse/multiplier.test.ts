import { duplicateToken, hasMultiplier, parseMultiplierQuestion, parseMultiplierPlus, parseMultiplierStar, parseMultiplier } from '@/src/core/block/style/utilities/parse/multiplier';
import { MAX_MULTIPLIER_DEPTH } from '@/src/core/block/style/utilities/parse/parse';

	describe('duplicateToken', () => {
		it('duplicates token up to maxDepth and joins with space', () => {
			expect(duplicateToken('a', 3)).toEqual(['a', 'a a', 'a a a']);
			expect(duplicateToken('b', 2)).toEqual(['b', 'b b']);
		});
	});

	describe('hasMultiplier', () => {
		it.each([
			['a?', true],
			['a+', true],
			['a*', true],
			['a{2,3}', true],
			['a', false],
			['a b', false],
		])('"%s" → %s', (input, expected) => {
			expect(hasMultiplier(input)).toBe(expected);
		});
	});

	describe('parseMultiplierQuestion', () => {
		it('returns empty and base for ?', () => {
			expect(parseMultiplierQuestion('a')).toEqual(['', 'a']);
		});
	});

	describe('parseMultiplierPlus', () => {
		it('returns one or more occurrences up to max depth', () => {
			const res = parseMultiplierPlus('a', 3);
			expect(res).toEqual(['a', 'a a', 'a a a']);
		});
		it('uses default MAX_MULTIPLIER_DEPTH when not provided', () => {
			const res = parseMultiplierPlus('a');
			expect(res.length).toBe(MAX_MULTIPLIER_DEPTH);
		});
	});

	describe('parseMultiplierStar', () => {
		it('returns zero or more occurrences including empty', () => {
			const res = parseMultiplierStar('a', 2);
			expect(res).toEqual(['', 'a', 'a a']);
		});
		it('uses default MAX_MULTIPLIER_DEPTH when not provided', () => {
			const res = parseMultiplierStar('a');
			expect(res[0]).toBe('');
			expect(res.length).toBe(MAX_MULTIPLIER_DEPTH + 1);
		});
	});

	describe('parseMultiplier', () => {
		it('parses ?', () => {
			expect(parseMultiplier('a?')).toEqual(['', 'a']);
		});
		it('parses +', () => {
			const res = parseMultiplier('a+');
			expect(res[0]).toBe('a');
			expect(res.length).toBe(MAX_MULTIPLIER_DEPTH);
		});
		it('parses *', () => {
			const res = parseMultiplier('a*');
			expect(res[0]).toBe('');
			expect(res[1]).toBe('a');
		});
		it('parses {n,m}', () => {
			expect(parseMultiplier('a{2,3}')).toEqual(['a a', 'a a a']);
		});
		it('passes through when no multiplier', () => {
			expect(parseMultiplier('a')).toEqual(['a']);
		});
	});
