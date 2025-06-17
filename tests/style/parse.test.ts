import { normalizeSyntax, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseBrackets, parse, filterTokens, expandTokens } from '@/utilities/style/parse';

import { parseSequence } from '@/utilities/style/parse-combinator';
import { parseMultiplier } from '@/utilities/style/parse-multiplier';

describe('filterTokens', () => {
	it('should allow concrete values', () => {
		expect(filterTokens(['auto', 'block'])).toEqual(['auto', 'block']);
	});
	it('should allow known data types', () => {
		expect(filterTokens(['<color>', '<number>'])).toEqual(['<color>', '<number>']);
	});
	it('should allow primitive types even if not in CSSTokenDefs', () => {
		expect(filterTokens(['<length>', '<angle [1,5]>', '<percentage>'])).toEqual(['<length>', '<angle [1,5]>', '<percentage>']);
	});
	it('should filter out unknown data types', () => {
		expect(filterTokens(['<foo>', 'bar', '<length>'])).toEqual(['bar', '<length>']);
	});
});

describe('expandTokens', () => {
	it('should expand known data types', () => {
		expect(expandTokens('<length-percentage>')).toMatch(/<length>|<percentage>/);
	});
	it('should preserve ranges on expansion', () => {
		expect(expandTokens('<length-percentage [0,∞]>')).toMatch('<length [0,∞]> | <percentage [0,∞]>');
	});
	it('should not expand unknown data types', () => {
		expect(expandTokens('<foo>')).toBe('<foo>');
	});
});

describe('normalizeSyntax', () => {
	it('normalizes || and && spacing', () => {
		expect(normalizeSyntax('a||b')).toBe('a || b');
		expect(normalizeSyntax('a  ||b')).toBe('a || b');
		expect(normalizeSyntax('a||  b')).toBe('a || b');
		expect(normalizeSyntax('a  &&b')).toBe('a&&b');
		expect(normalizeSyntax('a&&b')).toBe('a&&b');
		expect(normalizeSyntax('a&&  b')).toBe('a&&b');
		expect(normalizeSyntax('a && b')).toBe('a&&b');
		expect(normalizeSyntax('a &&b')).toBe('a&&b');
		expect(normalizeSyntax('a&& b')).toBe('a&&b');
	});

	it('normalizes | spacing (no spaces)', () => {
		expect(normalizeSyntax('a | b')).toBe('a|b');
		expect(normalizeSyntax('a| b')).toBe('a|b');
		expect(normalizeSyntax('a |b')).toBe('a|b');
		expect(normalizeSyntax('a|b')).toBe('a|b');
		// Should not affect ||
		expect(normalizeSyntax('a || b')).toBe('a || b');
	});

	it('removes spaces before *, +, ?', () => {
		expect(normalizeSyntax('a *')).toBe('a*');
		expect(normalizeSyntax('a +')).toBe('a+');
		expect(normalizeSyntax('a ?')).toBe('a?');
		expect(normalizeSyntax('a  *')).toBe('a*');
		expect(normalizeSyntax('a*')).toBe('a*');
	});

	it('removes extra spaces', () => {
		expect(normalizeSyntax('a    ||    b')).toBe('a || b');
		expect(normalizeSyntax('a   |   b')).toBe('a|b');
		expect(normalizeSyntax('a   *')).toBe('a*');
		expect(normalizeSyntax('  a   ||   b  ')).toBe('a || b');
	});
});

describe('parseDoubleBar', () => {
	it('parses || (1 part)', () => {
		expect(parseDoubleBar('a')).toEqual(['a']);
	});

	it('parses || (2 parts)', () => {
		expect(parseDoubleBar('a || b')).toEqual(['a', 'b', 'a b', 'b a']);
	});

	it('parses || (3 parts)', () => {
		const result = parseDoubleBar('a || b || c');
		const expected = ['a', 'b', 'c', 'a b', 'b a', 'a c', 'c a', 'b c', 'c b', 'a b c', 'a c b', 'b a c', 'b c a', 'c a b', 'c b a'];
		expect(result).toEqual(expected);
	});
});

describe('parseDoubleAmp', () => {
	it('parses && (1 part)', () => {
		expect(parseDoubleAmp('a')).toEqual(['a']); // → ['a']
	});

	it('parses && (2 parts)', () => {
		const result = parseDoubleAmp('a && b');
		expect(result).toEqual(['a b', 'b a']); // → ['a b', 'b a']
	});
	it('parses && (3 parts)', () => {
		const result = parseDoubleAmp('a && b && c');
		expect(result).toEqual(['a b c', 'a c b', 'b a c', 'b c a', 'c a b', 'c b a']); // → all permutations of 'a', 'b', 'c'
	});
});

describe('parseSingleBar', () => {
	it('parses | (1 part)', () => {
		expect(parseSingleBar('a')).toEqual(['a']); // → ['a']
	});

	it('parses | (2 parts)', () => {
		expect(parseSingleBar('a | b')).toEqual(['a', 'b']); // → ['a', 'b']
	});
	it('parses | (3 parts)', () => {
		expect(parseSingleBar('a | b | c')).toEqual(['a', 'b', 'c']); // → ['a', 'b', 'c']
	});
});

describe('parseSequence', () => {
	it('parses sequence (1 part)', () => {
		expect(parseSequence('a')).toEqual(['a']); // → ['a']
	});

	it('parses sequence (2 parts)', () => {
		expect(parseSequence('a b')).toEqual(['a b']); // → ['a b']
	});
	it('parses sequence (3 parts)', () => {
		expect(parseSequence('a b c')).toEqual(['a b c']); // → ['a b c']
	});
});

describe('parseBrackets', () => {
	it('parses optional group', () => {
		expect(parseBrackets('[a b]')).toEqual(['', 'a b']); // → ['', 'a b']
	});
});

describe('parseMultiplier', () => {
	it('parses ?', () => {
		expect(parseMultiplier('a?')).toEqual(['', 'a']); // → ['', 'a']
	});
	it('parses +', () => {
		const result = parseMultiplier('a+');
		expect(result).toEqual(['a', 'a a']); // → at least one 'a', up to some reasonable limit
	});
	it('parses *', () => {
		const result = parseMultiplier('a*');
		expect(result).toEqual(['', 'a', 'a a']); // → zero or more 'a', up to some reasonable limit
	});
	it('parses {2,3}', () => {
		const result = parseMultiplier('a{2,3}');
		expect(result).toEqual(['a a', 'a a a']); // → ['a a', 'a a a']
	});
	it('parses {1}', () => {
		expect(parseMultiplier('a{1,1}')).toEqual(['a']); // → ['a']
	});
});

describe('parse', () => {
	it('parses || and |', () => {
		const result = parse('a || b|c');
		const expected = ['a', 'b', 'c', 'a b', 'a c', 'b a', 'c a'];
		expect(result).toEqual(expected);
	});

	it('parses || and &&', () => {
		const result = parse('a || b&&c');
		const expected = ['a', 'b c', 'c b', 'a b c', 'a c b', 'b c a', 'c b a'];
		expect(result).toEqual(expected);
	});

	it('parses || and +', () => {
		const result = parse('a || b+');
		const expected = ['a', 'b', 'b b', 'a b', 'b a', 'a b b', 'b b a'];
		expect(result).toEqual(expected);
	});

	it('parses || and *', () => {
		const result = parse('a || b*');
		const expected = ['', 'a', 'b', 'b b', 'a b', 'b a', 'a b b', 'b b a'];
		expect(result).toEqual(expected);
	});

	it('parses || and ?', () => {
		const result = parse('a || b?');
		const expected = ['', 'a', 'b', 'a b', 'b a'];
		expect(result).toEqual(expected);
	});

	it('parses && and |', () => {
		const result = parse('a&&b|c');
		const expected = ['a b', 'a c', 'b a', 'c a'];
		expect(result).toEqual(expected);
	});

	it('parses && and ||', () => {
		const result = parse('a&&b || c');
		const expected = ['c', 'a b', 'b a', 'a b c', 'b a c', 'c a b', 'c b a'];
		expect(result).toEqual(expected);
	});

	it('parses && and +', () => {
		const result = parse('a&&b+');
		const expected = ['a b', 'b a', 'a b b', 'b b a'];
		expect(result).toEqual(expected);
	});

	it('parses && and *', () => {
		const result = parse('a&&b*');
		const expected = ['a', 'a b', 'b a', 'a b b', 'b b a'];
		expect(result).toEqual(expected);
	});

	it('parses && and ?', () => {
		const result = parse('a&&b?');
		const expected = ['a', 'a b', 'b a'];
		expect(result).toEqual(expected);
	});

	it('parses []', () => {
		const result = parse('[a b]');
		const expected = ['', 'a b'];
		expect(result).toEqual(expected);
	});

	it('parses [] and |', () => {
		const result = parse('[a | b]');
		const expected = ['', 'a', 'b'];
		expect(result).toEqual(expected);
	});

	it('parses [] and *', () => {
		const result = parse('[a | b]*');
		const expected = ['', 'a', 'b', 'a a', 'a b', 'b a', 'b b'];
		expect(result).toEqual(expected);
	});

	it('parses [] and +', () => {
		const result = parse('[a | b]+');
		const expected = ['a', 'b', 'a a', 'a b', 'b a', 'b b'];
		expect(result).toEqual(expected);
	});

	it('parses [] and ?', () => {
		const result = parse('[a | b]?');
		const expected = ['', 'a', 'b'];
		expect(result).toEqual(expected);
	});

	it('parses complex expressions', () => {
		const result = parse('a || d+ e? f*');
		const expected = ['a', 'd', 'd e', 'd d', 'a d', 'd  f', 'd e f', 'd d e', 'a d e', 'a d d', 'd   a', 'd  f f', 'd d  f', 'a d  f', 'd  f a', 'd e  a', 'd e f f', 'd d e f', 'a d e f', 'a d d e', 'd e f a', 'd d   a', 'd d  f f', 'a d  f f', 'a d d  f', 'd  f f a', 'd d  f a', 'd d e  a', 'd d e f f', 'a d e f f', 'a d d e f', 'd e f f a', 'd d e f a', 'a d d  f f', 'd d  f f a', 'a d d e f f', 'd d e f f a'];
		expect(result).toEqual(expected);
	});

	it('parses with brackets', () => {
		const result = parse('a || [b|c] d');
		const expected = ['a', 'd', 'b d', 'c d', 'd a', 'a  d', 'a b d', 'a c d', 'b d a', 'c d a'];
		expect(result).toEqual(expected);
	});
});
