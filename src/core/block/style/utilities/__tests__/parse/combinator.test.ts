import { hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseComma, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseSequence } from '@/src/core/block/style/utilities/parse/combinator';

	describe('has* detectors', () => {
		it.each([
			['a || b', true],
			['a||b', true],
			['a || b || c', true],
			['a', false],
		])('hasDoubleBar("%s") → %s', (input, expected) => {
			expect(hasDoubleBar(input)).toBe(expected);
		});

		it.each([
			['a && b', true],
			['a&&b', true],
			['a && b && c', true],
			['a', false],
		])('hasDoubleAmp("%s") → %s', (input, expected) => {
			expect(hasDoubleAmp(input)).toBe(expected);
		});

		it.each([
			['a | b', true],
			['a|b', true],
			['a | b | c', true],
			['a', false],
		])('hasSingleBar("%s") → %s', (input, expected) => {
			expect(hasSingleBar(input)).toBe(expected);
		});

		it.each([
			['a, b', true],
			['a,b', true],
			['a, b, c', true],
			['a', false],
		])('hasComma("%s") → %s', (input, expected) => {
			expect(hasComma(input)).toBe(expected);
		});

		it.each([
			['a b', true],
			['a / b', true],
			['a/b', false],
			['a', false],
		])('hasSequence("%s") → %s', (input, expected) => {
			expect(hasSequence(input)).toBe(expected);
		});
	});

	describe('parseComma', () => {
		it('returns input when no comma', () => {
			expect(parseComma('a')).toEqual(['a']);
		});
		it('cross-products parts and joins with comma', () => {
			expect(parseComma('a, b')).toEqual(['a,b']);
		});
	});

	describe('parseSingleBar', () => {
		it('returns input when no single bar', () => {
			expect(parseSingleBar('a')).toEqual(['a']);
		});
		it('expands options', () => {
			const res = parseSingleBar('a | b c');
			expect(res).toContain('a');
			expect(res).toContain('b c');
		});
	});

	describe('parseDoubleBar', () => {
		it('returns input when no double bar', () => {
			expect(parseDoubleBar('a')).toEqual(['a']);
		});
		it('expands non-empty subsets and permutations', () => {
			const res = parseDoubleBar('a || b c');
			expect(res).toEqual(expect.arrayContaining(['a', 'b c', 'a b c', 'b c a']));
		});
	});

	describe('parseDoubleAmp', () => {
		it('returns input when no double ampersand', () => {
			expect(parseDoubleAmp('a')).toEqual(['a']);
		});
		it('expands permutations with all parts included', () => {
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
	});
