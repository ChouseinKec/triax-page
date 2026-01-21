import { hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseComma, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseSequence } from '@/core/block/style/utilities/parse/combinator';

	describe('hasDoubleBar', () => {
		it.each([
			['a || b', true],
			['a||b', true],
			['a || b || c', true],
			['a', false],
		])('returns %s for %s', (input, expected) => {
			expect(hasDoubleBar(input)).toBe(expected);
		});

		it('handles empty string', () => {
			expect(hasDoubleBar('')).toBe(false);
		});
	});

	describe('hasDoubleAmp', () => {
		it.each([
			['a && b', true],
			['a&&b', true],
			['a && b && c', true],
			['a', false],
		])('returns %s for %s', (input, expected) => {
			expect(hasDoubleAmp(input)).toBe(expected);
		});

		it('handles empty string', () => {
			expect(hasDoubleAmp('')).toBe(false);
		});
	});

	describe('hasSingleBar', () => {
		it.each([
			['a | b', true],
			['a|b', true],
			['a | b | c', true],
			['a', false],
		])('returns %s for %s', (input, expected) => {
			expect(hasSingleBar(input)).toBe(expected);
		});

		it('handles empty string', () => {
			expect(hasSingleBar('')).toBe(false);
		});
	});

	describe('hasComma', () => {
		it.each([
			['a, b', true],
			['a,b', true],
			['a, b, c', true],
			['a', false],
		])('returns %s for %s', (input, expected) => {
			expect(hasComma(input)).toBe(expected);
		});

		it('handles empty string', () => {
			expect(hasComma('')).toBe(false);
		});
	});

	describe('hasSequence', () => {
		it.each([
			['a b', true],
			['a / b', true],
			['a/b', false],
			['a', false],
		])('returns %s for %s', (input, expected) => {
			expect(hasSequence(input)).toBe(expected);
		});

		it('handles empty string', () => {
			expect(hasSequence('')).toBe(false);
		});
	});

	describe('parseComma', () => {
		it('returns input when no comma', () => {
			expect(parseComma('a')).toEqual(['a']);
		});
		
		it('cross-products comma parts', () => {
			expect(parseComma('a, b')).toEqual(['a,b']);
		});

		it('handles empty string', () => {
			expect(parseComma('')).toEqual(['']);
		});
	});

	describe('parseSingleBar', () => {
		it('returns input when no single bar', () => {
			expect(parseSingleBar('a')).toEqual(['a']);
		});

		it('expands single-bar options', () => {
			const res = parseSingleBar('a | b c');
			expect(res).toContain('a');
			expect(res).toContain('b c');
		});
	});

	describe('parseDoubleBar', () => {
		it('returns input when no double bar', () => {
			expect(parseDoubleBar('a')).toEqual(['a']);
		});

		it('expands subsets and permutations', () => {
			const res = parseDoubleBar('a || b c');
			expect(res).toEqual(expect.arrayContaining(['a', 'b c', 'a b c', 'b c a']));
		});
	});

	describe('parseDoubleAmp', () => {
		it('returns input when no double ampersand', () => {
			expect(parseDoubleAmp('a')).toEqual(['a']);
		});

		it('expands permutations with all parts', () => {
			const res = parseDoubleAmp('a && b c');
			expect(res).toEqual(expect.arrayContaining(['a b c', 'b c a']));
		});
	});

	describe('parseSequence', () => {
		it('returns input when no separator', () => {
			expect(parseSequence('a')).toEqual(['a']);
		});

		it('cross-products space-separated parts', () => {
			const res = parseSequence('a b');
			expect(res).toContain('a b');
		});

		it('cross-products slash-separated parts', () => {
			const res = parseSequence('a/b');
			expect(res.some((v) => v.includes('a/b'))).toBe(true);
		});

		it('handles empty string', () => {
			expect(parseSequence('')).toEqual(['']);
		});
	});
