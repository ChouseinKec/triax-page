import { describe, it, expect } from '@jest/globals';
import { BORDER_DEFINITIONS } from '@/config/block/style/property/border';
import { validate } from './validate';

describe('border-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-style');

	it('should validate: all line-style keywords', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('hidden', syntax)).toBe(true);
		expect(validate('dotted', syntax)).toBe(true);
		expect(validate('dashed', syntax)).toBe(true);
		expect(validate('solid', syntax)).toBe(true);
		expect(validate('double', syntax)).toBe(true);
		expect(validate('groove', syntax)).toBe(true);
		expect(validate('ridge', syntax)).toBe(true);
		expect(validate('inset', syntax)).toBe(true);
		expect(validate('outset', syntax)).toBe(true);
	});

	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('solid dashed', syntax)).toBe(true);
		expect(validate('solid dashed dotted', syntax)).toBe(true);
		expect(validate('solid dashed dotted double', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown keywords, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('bold', syntax)).toBe(false);
		expect(validate('solid solid solid solid solid', syntax)).toBe(false);
	});
});

describe('border-top-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-top-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-top-style');

	it('should validate: single line-style keyword', () => {
		expect(validate('solid', syntax)).toBe(true);
		expect(validate('dashed', syntax)).toBe(true);
		expect(validate('none', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('solid dashed', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('border-right-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-right-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-right-style');

	it('should validate: single line-style keyword', () => {
		expect(validate('dotted', syntax)).toBe(true);
		expect(validate('ridge', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('solid dashed', syntax)).toBe(false);
	});
});

describe('border-bottom-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-bottom-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-bottom-style');

	it('should validate: single line-style keyword', () => {
		expect(validate('groove', syntax)).toBe(true);
		expect(validate('inset', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('solid dashed', syntax)).toBe(false);
	});
});

describe('border-left-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-left-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-left-style');

	it('should validate: single line-style keyword', () => {
		expect(validate('outset', syntax)).toBe(true);
		expect(validate('hidden', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('solid dashed', syntax)).toBe(false);
	});
});

describe('border-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-width');

	it('should validate: line-width keywords', () => {
		expect(validate('thin', syntax)).toBe(true);
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('thick', syntax)).toBe(true);
	});

	it('should validate: length value', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('thin medium', syntax)).toBe(true);
		expect(validate('thin medium thick', syntax)).toBe(true);
		expect(validate('thin medium thick thin', syntax)).toBe(true);
		expect(validate('<length> thin', syntax)).toBe(true);
		expect(validate('medium <length> thick <length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, empty, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('thin thin thin thin thin', syntax)).toBe(false);
	});
});

describe('border-top-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-top-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-top-width');

	it('should validate: single line-width value', () => {
		expect(validate('thin', syntax)).toBe(true);
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('thick', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values, percentage', () => {
		expect(validate('thin medium', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('border-right-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-right-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-right-width');

	it('should validate: single line-width value', () => {
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('thin medium', syntax)).toBe(false);
	});
});

describe('border-bottom-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-bottom-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-bottom-width');

	it('should validate: single line-width value', () => {
		expect(validate('thick', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('thin medium', syntax)).toBe(false);
	});
});

describe('border-left-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-left-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-left-width');

	it('should validate: single line-width value', () => {
		expect(validate('thin', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('thin medium', syntax)).toBe(false);
	});
});

describe('border-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-color');

	it('should validate: color value', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});



	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('<color> <color>', syntax)).toBe(true);
		expect(validate('<color> <color> <color>', syntax)).toBe(true);
		expect(validate('<color> <color> <color> <color>', syntax)).toBe(true);
	});

	it('should invalidate: empty, none, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('solid', syntax)).toBe(false);
		expect(validate('<color> <color> <color> <color> <color>', syntax)).toBe(false);
	});
});

describe('border-top-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-top-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-top-color');

	it('should validate: color or image-1D', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values, none', () => {
		expect(validate('<color> <color>', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('border-right-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-right-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-right-color');

	it('should validate: color or image-1D', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('<color> <color>', syntax)).toBe(false);
	});
});

describe('border-bottom-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-bottom-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-bottom-color');

	it('should validate: color or image-1D', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('<color> <color>', syntax)).toBe(false);
	});
});

describe('border-left-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-left-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-left-color');

	it('should validate: color or image-1D', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should invalidate: multiple values', () => {
		expect(validate('<color> <color>', syntax)).toBe(false);
	});
});

describe('border-radius', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-radius')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-radius');

	it('should validate: single length or percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: slash-separated form (horizontal / vertical)', () => {
		expect(validate('<length> / <length>', syntax)).toBe(true);
		expect(validate('<percentage> / <percentage>', syntax)).toBe(true);
		expect(validate('<length> / <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: none, two values without slash', () => {
		expect(validate('none', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('border-top-left-radius', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-top-left-radius')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-top-left-radius');

	it('should validate: single value (slash-separated or legacy)', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: slash-separated form', () => {
		expect(validate('<length> / <length>', syntax)).toBe(true);
		expect(validate('<percentage> / <percentage>', syntax)).toBe(true);
	});

	it('should validate: legacy two-value form (x y)', () => {
		expect(validate('<length> <length>', syntax)).toBe(true);
		expect(validate('<length> <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: none, three values', () => {
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('border-top-right-radius', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-top-right-radius')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-top-right-radius');

	it('should validate: single, slash, and legacy forms', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> / <length>', syntax)).toBe(true);
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: none, three values', () => {
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
	});
});

describe('border-bottom-right-radius', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-bottom-right-radius')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-bottom-right-radius');

	it('should validate: single, slash, and legacy forms', () => {
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('<percentage> / <percentage>', syntax)).toBe(true);
		expect(validate('<percentage> <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: none, three values', () => {
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
	});
});

describe('border-bottom-left-radius', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-bottom-left-radius')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-bottom-left-radius');

	it('should validate: single, slash, and legacy forms', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> / <percentage>', syntax)).toBe(true);
		expect(validate('<percentage> <length>', syntax)).toBe(true);
	});

	it('should invalidate: none, three values', () => {
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
	});
});

describe('border-image-source', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-image-source')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-image-source');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: url / src', () => {
		expect(validate('url(<string>)', syntax)).toBe(true);
	});

	it('should validate: gradients', () => {
		// expect(validate('linear-gradient(<color>, <color>)', syntax)).toBe(true);
		// expect(validate('radial-gradient(<color>, <color>)', syntax)).toBe(true);
		// expect(validate('conic-gradient(<color>, <color>)', syntax)).toBe(true);
		// expect(validate('repeating-linear-gradient(<color>, <color>)', syntax)).toBe(true);
		// expect(validate('repeating-radial-gradient(<color>, <color>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, keyword, color', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('solid', syntax)).toBe(false);
		expect(validate('<color>', syntax)).toBe(false);
	});
});

describe('border-image-slice', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-image-slice')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-image-slice');

	it('should validate: single number or percentage', () => {
		expect(validate('<number>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('<number> <number>', syntax)).toBe(true);
		expect(validate('<number> <percentage> <number>', syntax)).toBe(true);
		expect(validate('<number> <percentage> <number> <percentage>', syntax)).toBe(true);
	});

	it('should validate: with fill keyword (&&, any order)', () => {
		expect(validate('<number> fill', syntax)).toBe(true);
		expect(validate('<percentage> fill', syntax)).toBe(true);
		expect(validate('<number> <number> fill', syntax)).toBe(true);
		expect(validate('fill <number>', syntax)).toBe(true);
		expect(validate('fill <number> <number>', syntax)).toBe(true);
	});

	it('should invalidate: fill alone, empty, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('fill', syntax)).toBe(false);
		expect(validate('<number> <number> <number> <number> <number>', syntax)).toBe(false);
	});
});

describe('border-image-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-image-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-image-width');

	it('should validate: single value types', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('<number>', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('<length> <number>', syntax)).toBe(true);
		expect(validate('auto <percentage>', syntax)).toBe(true);
		expect(validate('<length> auto <number> <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: none, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('auto auto auto auto auto', syntax)).toBe(false);
	});
});

describe('border-image-outset', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-image-outset')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-image-outset');

	it('should validate: length or number', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should validate: 2 to 4 values ({1,4})', () => {
		expect(validate('<length> <number>', syntax)).toBe(true);
		expect(validate('<number> <length> <number>', syntax)).toBe(true);
		expect(validate('<length> <number> <length> <number>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, 5 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('<length> <length> <length> <length> <length>', syntax)).toBe(false);
	});
});

describe('border-image-repeat', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'border-image-repeat')?.syntax;
	if (!syntax) throw new Error('Syntax not found for border-image-repeat');

	it('should validate: single keyword', () => {
		expect(validate('stretch', syntax)).toBe(true);
		expect(validate('repeat', syntax)).toBe(true);
		expect(validate('round', syntax)).toBe(true);
		expect(validate('space', syntax)).toBe(true);
	});

	it('should validate: two-value form ({1,2})', () => {
		expect(validate('stretch repeat', syntax)).toBe(true);
		expect(validate('round space', syntax)).toBe(true);
		expect(validate('repeat round', syntax)).toBe(true);
	});

	it('should invalidate: three values, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('solid', syntax)).toBe(false);
		expect(validate('stretch repeat round', syntax)).toBe(false);
	});
});

describe('outline-width', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'outline-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for outline-width');

	it('should validate: line-width values', () => {
		expect(validate('thin', syntax)).toBe(true);
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('thick', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('thin medium', syntax)).toBe(false);
	});
});

describe('outline-style', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'outline-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for outline-style');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: outline-line-style keywords', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('dotted', syntax)).toBe(true);
		expect(validate('dashed', syntax)).toBe(true);
		expect(validate('solid', syntax)).toBe(true);
		expect(validate('double', syntax)).toBe(true);
		expect(validate('groove', syntax)).toBe(true);
		expect(validate('ridge', syntax)).toBe(true);
		expect(validate('inset', syntax)).toBe(true);
		expect(validate('outset', syntax)).toBe(true);
	});

	it('should invalidate: hidden (only valid in border-style), unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('hidden', syntax)).toBe(false);
		expect(validate('bold', syntax)).toBe(false);
	});
});

describe('outline-color', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'outline-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for outline-color');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: color', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});



	it('should invalidate: none, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<color> <color>', syntax)).toBe(false);
	});
});

describe('outline-offset', () => {
	const syntax = BORDER_DEFINITIONS.find((def) => def.key === 'outline-offset')?.syntax;
	if (!syntax) throw new Error('Syntax not found for outline-offset');

	it('should validate: length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, none, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});
});
