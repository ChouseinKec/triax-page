import { duplicateToken, hasMultiplier, parseMultiplierQuestion, parseMultiplierPlus, parseMultiplierStar, parseMultiplier } from '@/core/block/style/instance/utilities/parse/multiplier';
import { MAX_MULTIPLIER_DEPTH } from '@/core/block/style/instance/utilities/parse/parse';

describe('duplicateToken', () => {
	it('returns repetitions up to depth', () => {
		expect(duplicateToken('a', 3)).toEqual(['a', 'a a', 'a a a']);
		expect(duplicateToken('b', 2)).toEqual(['b', 'b b']);
	});

	it('returns empty array for non-positive depth', () => {
		expect(duplicateToken('a', 0)).toEqual([]);
		expect(duplicateToken('a', -1)).toEqual([]);
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
	])('returns %s for %s', (input, expected) => {
		expect(hasMultiplier(input)).toBe(expected);
	});

	it('handles empty string', () => {
		expect(hasMultiplier('')).toBe(false);
	});
});

describe('parseMultiplierQuestion', () => {
	it('returns empty and base for ?', () => {
		expect(parseMultiplierQuestion('a')).toEqual(['', 'a']);
	});

	it('returns empty array for empty input', () => {
		expect(parseMultiplierQuestion('')).toEqual(['', '']);
	});
});

describe('parseMultiplierPlus', () => {
	it('returns one or more occurrences up to depth', () => {
		const res = parseMultiplierPlus('a', 3);
		expect(res).toEqual(['a', 'a a', 'a a a']);
	});
	
	it('uses default depth when omitted', () => {
		const res = parseMultiplierPlus('a');
		expect(res.length).toBe(MAX_MULTIPLIER_DEPTH);
	});
});

describe('parseMultiplierStar', () => {
	it('returns zero or more occurrences including empty', () => {
		const res = parseMultiplierStar('a', 2);
		expect(res).toEqual(['', 'a', 'a a']);
	});

	it('uses default depth when omitted', () => {
		const res = parseMultiplierStar('a');
		expect(res[0]).toBe('');
		expect(res.length).toBe(MAX_MULTIPLIER_DEPTH + 1);
	});
});

describe('parseMultiplier', () => {
	it('returns optional occurrences for ?', () => {
		expect(parseMultiplier('a?')).toEqual(['', 'a']);
	});

	it('returns one-plus occurrences for +', () => {
		const res = parseMultiplier('a+');
		expect(res[0]).toBe('a');
		expect(res.length).toBe(MAX_MULTIPLIER_DEPTH);
	});

	it('returns zero-plus occurrences for *', () => {
		const res = parseMultiplier('a*');
		expect(res[0]).toBe('');
		expect(res[1]).toBe('a');
	});

	it('returns bounded repetitions for {n,m}', () => {
		expect(parseMultiplier('a{2,3}')).toEqual(['a a', 'a a a']);
	});

	it('returns input when no multiplier', () => {
		expect(parseMultiplier('a')).toEqual(['a']);
	});

	it('returns input for unsupported pattern', () => {
		expect(parseMultiplier('a{2,}')).toEqual(['a{2,}']);
	});
});
