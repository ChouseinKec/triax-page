import { parseSyntax } from '@/core/block/style/utilities/parse/parse';

describe('parseSyntax - CSS Value Definition Syntax Tests', () => {
	describe('SIMPLE: Atomic values and single types', () => {
		it('auto keyword', () => {
			expect(parseSyntax('auto')).toEqual(['auto']);
		});

		it('single type token', () => {
			expect(parseSyntax('<length>')).toEqual(['<length>']);
		});

		it('color type', () => {
			expect(parseSyntax('<color>')).toEqual(['<color>']);
		});

		it('percentage type', () => {
			expect(parseSyntax('<percentage>')).toEqual(['<percentage>']);
		});
	});

	describe('SIMPLE: Single bar (alternation)', () => {
		it('auto or length (width/height style)', () => {
			const res = parseSyntax('auto | <length>');
			expect(res).toEqual(expect.arrayContaining(['auto', '<length>']));
			expect(res.length).toBe(2);
		});

		it('multiple keywords', () => {
			const res = parseSyntax('left | center | right');
			expect(res).toEqual(expect.arrayContaining(['left', 'center', 'right']));
			expect(res.length).toBe(3);
		});

		it('inherit/initial/unset pseudo keywords', () => {
			const res = parseSyntax('inherit | initial | revert | revert-layer | unset');
			expect(res.length).toBe(5);
			expect(res).toContain('inherit');
			expect(res).toContain('unset');
		});
	});

	describe('SIMPLE: Sequence (space separation)', () => {
		it('length then color (like text-shadow)', () => {
			const res = parseSyntax('<length> <color>');
			expect(res).toEqual(['<length> <color>']);
		});

		it('three items in sequence', () => {
			const res = parseSyntax('<length> <length> <color>');
			expect(res).toEqual(['<length> <length> <color>']);
		});
	});

	describe('SIMPLE: Optional items with brackets', () => {
		it('required then optional', () => {
			const res = parseSyntax('<length> [<color>]?');
			expect(res).toEqual(expect.arrayContaining(['<length>', '<length> <color>']));
		});

		it('optional only', () => {
			const res = parseSyntax('[auto]?');
			expect(res).toEqual(['', 'auto']);
		});

		it('sequence with optional group', () => {
			const res = parseSyntax('<length> [<percentage>]?');
			expect(res).toEqual(expect.arrayContaining(['<length>', '<length> <percentage>']));
		});
	});

	describe('MEDIUM: Repetition with +', () => {
		it('one or more of same token', () => {
			const res = parseSyntax('<length>+');
			expect(res).toContain('<length>');
			expect(res).toContain('<length> <length>');
			expect(res.length).toBeGreaterThan(1);
		});

		it('one or more shadow layers', () => {
			const res = parseSyntax('[ <length> <color> ]+');
			expect(res).toContain('<length> <color>');
			expect(res).toContain('<length> <color> <length> <color>');
		});
	});

	describe('MEDIUM: Optional repetition with *', () => {
		it('zero or more occurrences', () => {
			const res = parseSyntax('<length>*');
			expect(res).toContain('');
			expect(res).toContain('<length>');
			expect(res).toContain('<length> <length>');
		});

		it('zero or more with group', () => {
			const res = parseSyntax('[<percentage>]*');
			expect(res).toContain('');
			expect(res).toContain('<percentage>');
		});
	});

	describe('MEDIUM: Range multipliers {m,n}', () => {
		it('fixed count {2}', () => {
			const res = parseSyntax('<length>{2}');
			// Per CSS spec: {2} means exactly 2 occurrences
			expect(res).toEqual(['<length> <length>']);
		});

		it('range 2-4 items like margin', () => {
			const res = parseSyntax('<length>{2,4}');
			expect(res).toContain('<length> <length>');
			expect(res).toContain('<length> <length> <length>');
			expect(res).toContain('<length> <length> <length> <length>');
		});

		it('range 1-3 items', () => {
			const res = parseSyntax('<color>{1,3}');
			expect(res).toContain('<color>');
			expect(res).toContain('<color> <color>');
			expect(res).toContain('<color> <color> <color>');
		});
	});

	describe('MEDIUM: Double bar (independent options)', () => {
		it('length or color in any order', () => {
			const res = parseSyntax('<length> || <color>');
			expect(res).toEqual(expect.arrayContaining(['<length>', '<color>', '<length> <color>', '<color> <length>']));
		});

		it('three options with double bar', () => {
			const res = parseSyntax('auto || <length> || <color>');
			expect(res).toContain('auto');
			expect(res).toContain('<length>');
			expect(res).toContain('<color>');
			expect(res).toContain('auto <length> <color>');
			expect(res).toContain('<length> auto <color>');
		});
	});

	describe('MEDIUM: Double ampersand (all required, any order)', () => {
		it('length and color both required', () => {
			const res = parseSyntax('<length> && <color>');
			expect(res).toEqual(expect.arrayContaining(['<length> <color>', '<color> <length>']));
		});

		it('three items all required', () => {
			const res = parseSyntax('<length> && <color> && auto');
			expect(res).toContain('<length> <color> auto');
			expect(res).toContain('auto <length> <color>');
			expect(res).toContain('<color> auto <length>');
		});
	});

	describe('COMPLEX: Mixed combinators with precedence', () => {
		it('single bar with sequence (| has lower precedence)', () => {
			const res = parseSyntax('auto | <length> <color>');
			// Per CSS spec: | is alternation (choice), space is sequence
			// Precedence: space (highest) > && > || > | > comma (lowest)
			// So this means: "auto" OR "<length> <color>"
			expect(res).toEqual(expect.arrayContaining(['auto', '<length> <color>']));
			expect(res.length).toBe(2);
		});

		it('double bar with sequence (|| has lower precedence than space)', () => {
			const res = parseSyntax('auto || <length> <color>');
			expect(res).toContain('auto');
			expect(res).toContain('<length> <color>');
			expect(res).toContain('auto <length> <color>');
			expect(res).toContain('<length> <color> auto');
		});

		it('double bar with double ampersand', () => {
			const res = parseSyntax('<length> && <color> || auto');
			// Should have permutations of the && group plus auto
			expect(res).toContain('<length> <color>');
			expect(res).toContain('<color> <length>');
			expect(res).toContain('auto');
		});
	});

	describe('COMPLEX: Real CSS property syntaxes', () => {
		it('margin: margin-width * 1-4', () => {
			// margin: [ <length> | <percentage> ]{1,4}
			const res = parseSyntax('[<length>|<percentage>]{1,4}');
			expect(res).toContain('<length>');
			expect(res).toContain('<percentage>');
			expect(res).toContain('<length> <length>');
			expect(res).toContain('<length> <percentage>');
		});

		it('background-position: with || and single spacing', () => {
			// Simplified: <length-percentage> || <length-percentage>
			const res = parseSyntax('<length-percentage> || <length-percentage>');
			expect(res).toContain('<length-percentage>');
			expect(res).toContain('<length-percentage> <length-percentage>');
		});

		it('box-shadow: color optional, multiple layers', () => {
			// Simplified: [ <color>? && [ <length> <length> <length>? ] ]+
			const res = parseSyntax('[<color>]? <length> <length>');
			expect(res).toContain('<length> <length>');
			expect(res).toContain('<color> <length> <length>');
		});

		it('border-radius: 1-4 values', () => {
			// border-radius: <length-percentage>{1,4} [ / <length-percentage>{1,4} ]?
			const res = parseSyntax('<length>{1,4}');
			expect(res).toContain('<length>');
			expect(res).toContain('<length> <length>');
			expect(res).toContain('<length> <length> <length> <length>');
		});

		it('flex: shorthand with alternatives', () => {
			// Simplified: auto | [ <flex> && <basis> ]
			const res = parseSyntax('auto | <flex>');
			expect(res).toEqual(expect.arrayContaining(['auto', '<flex>']));
		});
	});

	describe('COMPLEX: Nested groups and optional sections', () => {
		it('optional group with alternation inside', () => {
			const res = parseSyntax('<length> [<color> | <percentage>]?');
			expect(res).toContain('<length>');
			expect(res).toContain('<length> <color>');
			expect(res).toContain('<length> <percentage>');
		});

		it('multiple optional groups', () => {
			const res = parseSyntax('<length> [<color>]? [auto]?');
			expect(res).toContain('<length>');
			expect(res).toContain('<length> <color>');
			expect(res).toContain('<length> auto');
			expect(res).toContain('<length> <color> auto');
		});

		it('grouped repetition with options', () => {
			const res = parseSyntax('[<length> | auto]+');
			expect(res).toContain('<length>');
			expect(res).toContain('auto');
			expect(res).toContain('<length> <length>');
			expect(res).toContain('<length> auto');
		});
	});

	describe('EDGE CASES: Normalization', () => {
		it('handles inconsistent spacing around ||', () => {
			const res1 = parseSyntax('a||b');
			const res2 = parseSyntax('a || b');
			expect(res1).toEqual(res2);
		});

		it('handles inconsistent spacing around &&', () => {
			const res1 = parseSyntax('a&&b');
			const res2 = parseSyntax('a && b');
			expect(res1).toEqual(res2);
		});

		it('distinguishes || from |', () => {
			const res1 = parseSyntax('a | b');
			const res2 = parseSyntax('a || b');
			expect(res1.length).toBeLessThan(res2.length);
		});

		it('empty brackets return empty string', () => {
			expect(parseSyntax('[]')).toEqual(['']);
		});

		it('empty input returns empty string', () => {
			expect(parseSyntax('')).toEqual(['']);
		});
	});

	describe('EDGE CASES: Deduplication and sorting', () => {
		it('removes duplicate variations', () => {
			const res = parseSyntax('auto | auto');
			expect(res).toEqual(['auto']);
		});

		it('sorts by length (short to long)', () => {
			const res = parseSyntax('auto | <length> <color>');
			const autoIndex = res.indexOf('auto');
			const longIndex = res.indexOf('<length> <color>');
			expect(autoIndex).toBeLessThan(longIndex);
		});

		it('comma-separated list', () => {
			const res = parseSyntax('a, b');
			expect(res).toEqual(['a,b']);
		});
	});

	describe('COMPLEX REAL-WORLD: Box-shadow', () => {
		it('box-shadow: inset optional + required lengths + optional values repeated with #', () => {
			const res = parseSyntax('[inset? <length> <length> <length>? <length>? <color>?]#');
			// Check basic shadow with required values only
			expect(res).toContain('<length> <length>');
			// Check with inset keyword
			expect(res).toContain('inset <length> <length>');
			// Check with blur radius (3rd length)
			expect(res).toContain('<length> <length> <length>');
			// Check with color
			expect(res).toContain('<length> <length> <color>');
			// Check with inset and color
			expect(res).toContain('inset <length> <length> <color>');
			// Check multiple shadows (comma-separated via #)
			expect(res.some((v) => v.includes(','))).toBe(true);
		});
	});


});
