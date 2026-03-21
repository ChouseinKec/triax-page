import { describe, it, expect } from '@jest/globals';
import { SIZE_DEFINITIONS } from '@/config/block/style/property/size';
import { validate } from './validate';

describe('width', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for width');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: content-sizing keywords', () => {
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
		expect(validate('fit-content', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
		expect(validate('contain', syntax)).toBe(true);
	});

	it('should validate: fit-content() function', () => {
		expect(validate('fit-content( <length> )', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( auto , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( min-content , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( max-content , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( any , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values, keyword-only stacks', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
		expect(validate('min-content max-content', syntax)).toBe(false);
	});
});

describe('min-width', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'min-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for min-width');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: intrinsic keywords', () => {
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( auto , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( stretch , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto <length>', syntax)).toBe(false);
	});
});

describe('max-width', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'max-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for max-width');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: fit-content() with length', () => {
		expect(validate('fit-content( <length> )', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( max-content , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( contain , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('height', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'height')?.syntax;
	if (!syntax) throw new Error('Syntax not found for height');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: content-sizing keywords', () => {
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
		expect(validate('fit-content', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
		expect(validate('contain', syntax)).toBe(true);
	});

	it('should validate: fit-content() function', () => {
		expect(validate('fit-content( <length> )', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( auto , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( fit-content , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( any , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto min-content', syntax)).toBe(false);
	});
});

describe('min-height', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'min-height')?.syntax;
	if (!syntax) throw new Error('Syntax not found for min-height');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: intrinsic keywords', () => {
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( auto , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( min-content , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
	});
});

describe('max-height', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'max-height')?.syntax;
	if (!syntax) throw new Error('Syntax not found for max-height');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: fit-content() function', () => {
		expect(validate('fit-content( <length> )', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size( auto , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( stretch , <number> )', syntax)).toBe(true);
		expect(validate('calc-size( any , <number> )', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('aspect-ratio', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'aspect-ratio')?.syntax;
	if (!syntax) throw new Error('Syntax not found for aspect-ratio');

	it('should validate: auto keyword', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: ratio as single number', () => {
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should validate: ratio as fraction (n / n)', () => {
		expect(validate('<number> / <number>', syntax)).toBe(true);
	});

	it('should validate: auto combined with ratio (|| operator)', () => {
		expect(validate('auto <number>', syntax)).toBe(true);
		expect(validate('auto <number> / <number>', syntax)).toBe(true);
	});

	it('should invalidate: empty, two autos, plain string', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
		expect(validate('wide', syntax)).toBe(false);
	});
});

describe('overflow', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'overflow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for overflow');

	it('should validate: all single overflow-block keywords', () => {
		expect(validate('visible', syntax)).toBe(true);
		expect(validate('hidden', syntax)).toBe(true);
		expect(validate('clip', syntax)).toBe(true);
		expect(validate('scroll', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: two values (x and y axes)', () => {
		expect(validate('hidden scroll', syntax)).toBe(true);
		expect(validate('auto hidden', syntax)).toBe(true);
		expect(validate('clip auto', syntax)).toBe(true);
		expect(validate('visible visible', syntax)).toBe(true);
	});

	it('should invalidate: three values, empty', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('hidden scroll auto', syntax)).toBe(false);
	});

	it('should invalidate: unknown keywords', () => {
		expect(validate('overflow', syntax)).toBe(false);
		expect(validate('show', syntax)).toBe(false);
	});
});

describe('position', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'position')?.syntax;
	if (!syntax) throw new Error('Syntax not found for position');

	it('should validate: standard positioning keywords', () => {
		expect(validate('static', syntax)).toBe(true);
		expect(validate('relative', syntax)).toBe(true);
		expect(validate('absolute', syntax)).toBe(true);
	});

	it('should validate: sticky and fixed', () => {
		expect(validate('sticky', syntax)).toBe(true);
		expect(validate('fixed', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('static relative', syntax)).toBe(false);
		expect(validate('float', syntax)).toBe(false);
	});
});

describe('padding', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'padding')?.syntax;
	if (!syntax) throw new Error('Syntax not found for padding');

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: auto (not allowed), empty', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});

	it('should invalidate: multiple values (shorthand not allowed in syntax)', () => {
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('padding-top', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'padding-top')?.syntax;
	if (!syntax) throw new Error('Syntax not found for padding-top');

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: auto, empty, multiple values', () => {
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <percentage>', syntax)).toBe(false);
	});
});

describe('padding-right', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'padding-right')?.syntax;
	if (!syntax) throw new Error('Syntax not found for padding-right');

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: auto, empty', () => {
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('padding-bottom', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'padding-bottom')?.syntax;
	if (!syntax) throw new Error('Syntax not found for padding-bottom');

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: auto, empty', () => {
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('padding-left', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'padding-left')?.syntax;
	if (!syntax) throw new Error('Syntax not found for padding-left');

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: auto, empty', () => {
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('', syntax)).toBe(false);
	});
});

describe('margin', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'margin')?.syntax;
	if (!syntax) throw new Error('Syntax not found for margin');

	it('should validate: length and percentage (including negative)', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
	});
});

describe('margin-top', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'margin-top')?.syntax;
	if (!syntax) throw new Error('Syntax not found for margin-top');

	it('should validate: length, percentage, auto', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> auto', syntax)).toBe(false);
	});
});

describe('margin-right', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'margin-right')?.syntax;
	if (!syntax) throw new Error('Syntax not found for margin-right');

	it('should validate: length, percentage, auto', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto <length>', syntax)).toBe(false);
	});
});

describe('margin-bottom', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'margin-bottom')?.syntax;
	if (!syntax) throw new Error('Syntax not found for margin-bottom');

	it('should validate: length, percentage, auto', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('margin-left', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'margin-left')?.syntax;
	if (!syntax) throw new Error('Syntax not found for margin-left');

	it('should validate: length, percentage, auto', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
	});
});

describe('top', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'top')?.syntax;
	if (!syntax) throw new Error('Syntax not found for top');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
		expect(validate('start', syntax)).toBe(false);
	});
});

describe('right', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'right')?.syntax;
	if (!syntax) throw new Error('Syntax not found for right');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto <length>', syntax)).toBe(false);
	});
});

describe('bottom', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'bottom')?.syntax;
	if (!syntax) throw new Error('Syntax not found for bottom');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> auto', syntax)).toBe(false);
	});
});

describe('left', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'left')?.syntax;
	if (!syntax) throw new Error('Syntax not found for left');

	it('should validate: auto, length, percentage', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
	});
});

describe('z-index', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'z-index')?.syntax;
	if (!syntax) throw new Error('Syntax not found for z-index');

	it('should validate: auto', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: integer', () => {
		expect(validate('<integer>', syntax)).toBe(true);
	});

	it('should validate: inherit', () => {
		expect(validate('inherit', syntax)).toBe(true);
	});

	it('should invalidate: empty, length, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('auto auto', syntax)).toBe(false);
	});
});

describe('scroll-behavior', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-behavior')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-behavior');

	it('should validate: auto and smooth', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('smooth', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto smooth', syntax)).toBe(false);
		expect(validate('instant', syntax)).toBe(false);
	});
});

describe('scroll-snap-stop', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-snap-stop')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-snap-stop');

	it('should validate: normal and always', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('always', syntax)).toBe(true);
	});

	it('should invalidate: empty, multiple, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('normal always', syntax)).toBe(false);
		expect(validate('never', syntax)).toBe(false);
	});
});

describe('overscroll-behavior', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'overscroll-behavior')?.syntax;
	if (!syntax) throw new Error('Syntax not found for overscroll-behavior');

	it('should validate: single value', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('contain', syntax)).toBe(true);
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: two values (x and y axes)', () => {
		expect(validate('auto contain', syntax)).toBe(true);
		expect(validate('none auto', syntax)).toBe(true);
		expect(validate('contain none', syntax)).toBe(true);
		expect(validate('auto auto', syntax)).toBe(true);
		expect(validate('none none', syntax)).toBe(true);
	});

	it('should invalidate: three values, empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto contain none', syntax)).toBe(false);
		expect(validate('scroll', syntax)).toBe(false);
	});
});

describe('scroll-snap-type', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-snap-type')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-snap-type');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: axis keyword alone', () => {
		expect(validate('x', syntax)).toBe(true);
		expect(validate('y', syntax)).toBe(true);
		expect(validate('block', syntax)).toBe(true);
		expect(validate('inline', syntax)).toBe(true);
		expect(validate('both', syntax)).toBe(true);
	});

	it('should validate: axis + snap strictness', () => {
		expect(validate('x mandatory', syntax)).toBe(true);
		expect(validate('y proximity', syntax)).toBe(true);
		expect(validate('both mandatory', syntax)).toBe(true);
		expect(validate('block proximity', syntax)).toBe(true);
	});

	it('should invalidate: strictness keyword alone (no axis)', () => {
		expect(validate('mandatory', syntax)).toBe(false);
		expect(validate('proximity', syntax)).toBe(false);
	});

	it('should invalidate: multiple axes, empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('x y', syntax)).toBe(false);
		expect(validate('x mandatory proximity', syntax)).toBe(false);
		expect(validate('diagonal', syntax)).toBe(false);
	});
});

describe('scroll-snap-align', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-snap-align')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-snap-align');

	it('should validate: single alignment value', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('center', syntax)).toBe(true);
	});

	it('should validate: two values (block and inline alignment)', () => {
		expect(validate('start end', syntax)).toBe(true);
		expect(validate('center start', syntax)).toBe(true);
		expect(validate('none center', syntax)).toBe(true);
	});

	it('should invalidate: three values, empty, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('start center end', syntax)).toBe(false);
		expect(validate('left', syntax)).toBe(false);
	});
});

describe('scroll-margin', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin');

	it('should validate: one length value', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should validate: two, three, and four length values', () => {
		expect(validate('<length> <length>', syntax)).toBe(true);
		expect(validate('<length> <length> <length>', syntax)).toBe(true);
		expect(validate('<length> <length> <length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: five values, empty, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});
});

describe('scroll-margin-top', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-top')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-top');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-right', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-right')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-right');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-bottom', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-bottom')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-bottom');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-left', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-left')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-left');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-block', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-block')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-block');

	it('should validate: one or two length values', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: three values, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('scroll-margin-block-start', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-block-start')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-block-start');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-block-end', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-block-end')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-block-end');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-inline', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-inline')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-inline');

	it('should validate: one or two length values', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: three values, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('scroll-margin-inline-start', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-inline-start')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-inline-start');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-margin-inline-end', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-margin-inline-end')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-margin-inline-end');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding');

	it('should validate: one length value', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should validate: two, three, and four length values', () => {
		expect(validate('<length> <length>', syntax)).toBe(true);
		expect(validate('<length> <length> <length>', syntax)).toBe(true);
		expect(validate('<length> <length> <length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: five values, empty, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});
});

describe('scroll-padding-top', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-top')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-top');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-right', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-right')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-right');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-bottom', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-bottom')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-bottom');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-left', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-left')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-left');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-block', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-block')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-block');

	it('should validate: one or two length values', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: three values, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('scroll-padding-block-start', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-block-start')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-block-start');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-block-end', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-block-end')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-block-end');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-inline', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-inline')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-inline');

	it('should validate: one or two length values', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: three values, percentage, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('scroll-padding-inline-start', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-inline-start')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-inline-start');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('scroll-padding-inline-end', () => {
	const syntax = SIZE_DEFINITIONS.find((def) => def.key === 'scroll-padding-inline-end')?.syntax;
	if (!syntax) throw new Error('Syntax not found for scroll-padding-inline-end');

	it('should validate: single length', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should invalidate: percentage, auto, multiple values', () => {
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});
