import { describe, it, expect } from '@jest/globals';
import { BACKGROUND_DEFINITIONS } from '@/config/block/style/property/background';
import { validate } from './validate';

describe('background-image', () => {
	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-image')?.syntax;
	if (!syntax) throw new Error('Syntax not found for background-image');

	it('should validate: keyword', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: url / src', () => {
		expect(validate('url(<string>)', syntax)).toBe(true);
	});


	it('should validate: cross-fade()', () => {
		expect(validate('cross-fade(url(<string>))', syntax)).toBe(true);
		// with explicit percentage
		expect(validate('cross-fade(url(<string>) <percentage>)', syntax)).toBe(true);

		// color without percentage
		expect(validate('cross-fade(<color>)', syntax)).toBe(true);
		// color as image argument with percentage
		expect(validate('cross-fade(<color> <percentage>)', syntax)).toBe(true);

		// two cf-images separated by comma
		expect(validate('cross-fade(url(<string>) <percentage>, <color> <percentage>)', syntax)).toBe(true);
	});


	// it('should validate: linear-gradient()', () => {
	// 	expect(validate('linear-gradient(<color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(<angle>, <color>, <color>)', syntax)).toBe(true);
	// 	// <zero> is valid in place of <angle>
	// 	expect(validate('linear-gradient(<zero>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to top, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to bottom, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to left, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to right top, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to bottom left, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(to right, <color> <percentage>, <color> <percentage>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(<angle>, <color> <length>, <color> <percentage>, <color>)', syntax)).toBe(true);
	// 	// with color interpolation method
	// 	expect(validate('linear-gradient(in srgb, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lab, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lab, <color>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lab to right, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lab to left, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lch shorter hue, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lch longer hue, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lch increasing hue, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(in lch decreasing hue, <color>, <color>)', syntax)).toBe(true);
	// });

	// it('should validate: repeating-linear-gradient()', () => {
	// 	expect(validate('repeating-linear-gradient(<color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('repeating-linear-gradient(<angle>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('repeating-linear-gradient(to right, <color> <percentage>, <color> <percentage>)', syntax)).toBe(true);
	// });

	// it('should validate: radial-gradient()', () => {
	// 	expect(validate('radial-gradient(<color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(closest-side, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(farthest-corner at top center, <color> <percentage>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(farthest-corner at <length> <length>, <color> <percentage>, <color> <percentage>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(closest-side at <percentage> <percentage>, <color>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(circle, <color> <percentage>, <color> <percentage>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(circle closest-side, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(ellipse at <length> <length>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(ellipse <length> at <length> <length>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('radial-gradient(ellipse <length>, <color>, <color>)', syntax)).toBe(true);
	// });

	// it('should validate: repeating-radial-gradient()', () => {
	// 	expect(validate('repeating-radial-gradient(circle, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('repeating-radial-gradient(ellipse at <length> <length>, <color>, <color>)', syntax)).toBe(true);
	// });

	// it('should validate: conic-gradient()', () => {
	// 	expect(validate('conic-gradient(<color>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(<color> <angle>, <color> <angle>, <color>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(at <length> <percentage>, <color>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(at <percentage> <percentage>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(from <angle>, <color>, <color>)', syntax)).toBe(true);
	// 	// <zero> is valid in place of <angle> after "from"
	// 	expect(validate('conic-gradient(from <zero>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(<color> <percentage>, <color> <angle> <percentage>, <color> <angle>)', syntax)).toBe(true);
	// 	expect(validate('conic-gradient(at right bottom, <color>, <color>)', syntax)).toBe(true);
	// });

	// it('should validate: repeating-conic-gradient()', () => {
	// 	expect(validate('repeating-conic-gradient(<color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('repeating-conic-gradient(from <angle>, <color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('repeating-conic-gradient(at <percentage> <percentage>, <color>, <color>)', syntax)).toBe(true);
	// });

	// it('should validate: multiple values (# multiplier)', () => {
	// 	expect(validate('none, none', syntax)).toBe(true);
	// 	expect(validate('url(<string>), none', syntax)).toBe(true);
	// 	expect(validate('none, url(<string>), linear-gradient(<color>, <color>)', syntax)).toBe(true);
	// 	expect(validate('linear-gradient(<angle>, <color>, <color>), radial-gradient(<color>, <color>)', syntax)).toBe(true);
	// });

	it('should invalidate incorrect values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('invalid', syntax)).toBe(false);
		expect(validate('<invalid>', syntax)).toBe(false);
		// wrong token type inside url
		expect(validate('url(<invalid>)', syntax)).toBe(false);
		// unknown function
		expect(validate('unknown-gradient(<color>, <color>)', syntax)).toBe(false);
		// none is not a valid image-set option
		expect(validate('image-set(none)', syntax)).toBe(false);
		// mixed valid/invalid in a multi-value list
		expect(validate('none, invalid', syntax)).toBe(false);
	});
});

// describe('background-color', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-color')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-color');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: color token', () => {
// 		expect(validate('<color>', syntax)).toBe(true);
// 	});

// 	it('should invalidate: multiple colors (no # multiplier)', () => {
// 		expect(validate('<color>, <color>', syntax)).toBe(false);
// 	});

// 	it('should invalidate: non-color tokens', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('<length>', syntax)).toBe(false);
// 	});
// });

// describe('background-blend-mode', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-blend-mode')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-blend-mode');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('normal', syntax)).toBe(true);
// 		expect(validate('multiply', syntax)).toBe(true);
// 		expect(validate('screen', syntax)).toBe(true);
// 		expect(validate('overlay', syntax)).toBe(true);
// 		expect(validate('darken', syntax)).toBe(true);
// 		expect(validate('lighten', syntax)).toBe(true);
// 		expect(validate('color-dodge', syntax)).toBe(true);
// 		expect(validate('color-burn', syntax)).toBe(true);
// 		expect(validate('hard-light', syntax)).toBe(true);
// 		expect(validate('soft-light', syntax)).toBe(true);
// 		expect(validate('difference', syntax)).toBe(true);
// 		expect(validate('exclusion', syntax)).toBe(true);
// 		expect(validate('hue', syntax)).toBe(true);
// 		expect(validate('saturation', syntax)).toBe(true);
// 		expect(validate('color', syntax)).toBe(true);
// 		expect(validate('luminosity', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('normal, multiply', syntax)).toBe(true);
// 		expect(validate('normal, multiply, screen', syntax)).toBe(true);
// 		expect(validate('overlay, darken, lighten, color-dodge', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('plus-lighter', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });

// describe('background-repeat', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-repeat')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-repeat');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: shorthand keywords', () => {
// 		expect(validate('repeat-x', syntax)).toBe(true);
// 		expect(validate('repeat-y', syntax)).toBe(true);
// 		expect(validate('repeat-block', syntax)).toBe(true);
// 		expect(validate('repeat-inline', syntax)).toBe(true);
// 	});

// 	it('should validate: single repetition value', () => {
// 		expect(validate('repeat', syntax)).toBe(true);
// 		expect(validate('space', syntax)).toBe(true);
// 		expect(validate('round', syntax)).toBe(true);
// 		expect(validate('no-repeat', syntax)).toBe(true);
// 	});

// 	it('should validate: two repetition values (x y)', () => {
// 		expect(validate('repeat no-repeat', syntax)).toBe(true);
// 		expect(validate('space round', syntax)).toBe(true);
// 		expect(validate('no-repeat repeat', syntax)).toBe(true);
// 		expect(validate('round space', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('repeat, no-repeat', syntax)).toBe(true);
// 		expect(validate('repeat-x, repeat-y', syntax)).toBe(true);
// 		expect(validate('repeat no-repeat, space round', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('repeat repeat repeat', syntax)).toBe(false);
// 	});
// });

// describe('background-attachment', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-attachment')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-attachment');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('scroll', syntax)).toBe(true);
// 		expect(validate('fixed', syntax)).toBe(true);
// 		expect(validate('local', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('scroll, fixed', syntax)).toBe(true);
// 		expect(validate('local, scroll, fixed', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('sticky', syntax)).toBe(false);
// 	});
// });

// describe('background-clip', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-clip')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-clip');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: box keywords', () => {
// 		expect(validate('border-box', syntax)).toBe(true);
// 		expect(validate('padding-box', syntax)).toBe(true);
// 		expect(validate('content-box', syntax)).toBe(true);
// 	});

// 	it('should validate: text keyword', () => {
// 		expect(validate('text', syntax)).toBe(true);
// 	});

// 	it('should validate: border-area keyword', () => {
// 		expect(validate('border-area', syntax)).toBe(true);
// 	});

// 	it('should validate: border-area || text combinations', () => {
// 		expect(validate('border-area text', syntax)).toBe(true);
// 		expect(validate('text border-area', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('border-box, padding-box', syntax)).toBe(true);
// 		expect(validate('content-box, text, border-box', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('view-box', syntax)).toBe(false);
// 	});
// });

// describe('background-origin', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-origin')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-origin');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: box keywords', () => {
// 		expect(validate('border-box', syntax)).toBe(true);
// 		expect(validate('padding-box', syntax)).toBe(true);
// 		expect(validate('content-box', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('border-box, padding-box', syntax)).toBe(true);
// 		expect(validate('content-box, border-box, padding-box', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('text', syntax)).toBe(false);
// 	});
// });

// describe('background-size', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-size')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-size');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: keywords', () => {
// 		expect(validate('cover', syntax)).toBe(true);
// 		expect(validate('contain', syntax)).toBe(true);
// 		expect(validate('auto', syntax)).toBe(true);
// 	});

// 	it('should validate: single length or percentage', () => {
// 		expect(validate('<length>', syntax)).toBe(true);
// 		expect(validate('<percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value form', () => {
// 		expect(validate('<length> <length>', syntax)).toBe(true);
// 		expect(validate('<percentage> <percentage>', syntax)).toBe(true);
// 		expect(validate('<length> auto', syntax)).toBe(true);
// 		expect(validate('auto <percentage>', syntax)).toBe(true);
// 		expect(validate('auto auto', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('cover, contain', syntax)).toBe(true);
// 		expect(validate('auto, <length> <length>', syntax)).toBe(true);
// 		expect(validate('<length>, cover, auto', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('<length> <length> <length>', syntax)).toBe(false);
// 	});
// });

// describe('background-position', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'background-position')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for background-position');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('center', syntax)).toBe(true);
// 		expect(validate('top', syntax)).toBe(true);
// 		expect(validate('bottom', syntax)).toBe(true);
// 		expect(validate('left', syntax)).toBe(true);
// 		expect(validate('right', syntax)).toBe(true);
// 	});

// 	it('should validate: single length/percentage', () => {
// 		expect(validate('<length>', syntax)).toBe(true);
// 		expect(validate('<percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value keyword form', () => {
// 		expect(validate('left top', syntax)).toBe(true);
// 		expect(validate('right bottom', syntax)).toBe(true);
// 		expect(validate('center center', syntax)).toBe(true);
// 		expect(validate('left center', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value length/keyword mix', () => {
// 		expect(validate('<percentage> <percentage>', syntax)).toBe(true);
// 		expect(validate('<length> <length>', syntax)).toBe(true);
// 		expect(validate('<percentage> center', syntax)).toBe(true);
// 		expect(validate('center <percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: four-value form', () => {
// 		expect(validate('left <length> top <length>', syntax)).toBe(true);
// 		expect(validate('right <percentage> bottom <percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: logical keywords (position-one)', () => {
// 		expect(validate('x-start', syntax)).toBe(true);
// 		expect(validate('x-end', syntax)).toBe(true);
// 		expect(validate('y-start', syntax)).toBe(true);
// 		expect(validate('y-end', syntax)).toBe(true);
// 		expect(validate('block-start', syntax)).toBe(true);
// 		expect(validate('block-end', syntax)).toBe(true);
// 		expect(validate('inline-start', syntax)).toBe(true);
// 		expect(validate('inline-end', syntax)).toBe(true);
// 	});

// 	it('should validate: logical two-value forms (position-two)', () => {
// 		expect(validate('x-start top', syntax)).toBe(true);
// 		expect(validate('x-end y-start', syntax)).toBe(true);
// 		expect(validate('block-start inline-end', syntax)).toBe(true);
// 		expect(validate('start end', syntax)).toBe(true);
// 		expect(validate('end center', syntax)).toBe(true);
// 	});

// 	it('should validate: logical four-value forms (position-four)', () => {
// 		expect(validate('x-start <length> y-start <length>', syntax)).toBe(true);
// 		expect(validate('block-start <percentage> inline-end <percentage>', syntax)).toBe(true);
// 		expect(validate('start <length> end <length>', syntax)).toBe(true);
// 	});

// 	it('should validate: three-value form (position-three)', () => {
// 		expect(validate('left <length> center', syntax)).toBe(true);
// 		expect(validate('center top <length>', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('center, top', syntax)).toBe(true);
// 		expect(validate('left top, right bottom', syntax)).toBe(true);
// 		expect(validate('center center, <length> <length>', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });

// describe('mask-image', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-image')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-image');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: none', () => {
// 		expect(validate('none', syntax)).toBe(true);
// 	});

// 	it('should validate: url / src (mask-source)', () => {
// 		expect(validate('url(<string>)', syntax)).toBe(true);
// 		expect(validate('src(<string>)', syntax)).toBe(true);
// 	});

// 	it('should validate: image types', () => {
// 		expect(validate('linear-gradient(<color>, <color>)', syntax)).toBe(true);
// 		expect(validate('radial-gradient(<color>, <color>)', syntax)).toBe(true);
// 		expect(validate('conic-gradient(<color>, <color>)', syntax)).toBe(true);
// 		expect(validate('repeating-linear-gradient(<color>, <color>)', syntax)).toBe(true);
// 		expect(validate('repeating-radial-gradient(<color>, <color>)', syntax)).toBe(true);
// 		expect(validate('repeating-conic-gradient(<color>, <color>)', syntax)).toBe(true);
// 	});

// 	it('should validate: image() function', () => {
// 		// both image-src and color — ! satisfied
// 		expect(validate('image(<string>, <color>)', syntax)).toBe(true);
// 		// image-src only (color absent) — ! satisfied
// 		expect(validate('image(<string>,)', syntax)).toBe(true);
// 		// color only (image-src absent) — ! satisfied
// 		expect(validate('image(, <color>)', syntax)).toBe(true);
// 		// with image-tags direction prefix — both parts
// 		expect(validate('image(ltr <string>, <color>)', syntax)).toBe(true);
// 		expect(validate('image(rtl <string>, <color>)', syntax)).toBe(true);
// 		// with image-tags — image-src only
// 		expect(validate('image(ltr <string>,)', syntax)).toBe(true);
// 		// with image-tags — color only
// 		expect(validate('image(ltr , <color>)', syntax)).toBe(true);
// 		// no group at all (empty args)
// 		expect(validate('image()', syntax)).toBe(false);
// 		// only image-tags, group absent
// 		expect(validate('image(ltr)', syntax)).toBe(false);
// 	});

// 	it('should validate: image-set()', () => {
// 		expect(validate('image-set(url(<string>))', syntax)).toBe(true);
// 		expect(validate('image-set(<string>)', syntax)).toBe(true);
// 		expect(validate('image-set(url(<string>) <resolution>)', syntax)).toBe(true);
// 		expect(validate('image-set(url(<string>) type(<string>))', syntax)).toBe(true);
// 		expect(validate('image-set(<string> <resolution> type(<string>))', syntax)).toBe(true);
// 	});

// 	it('should validate: cross-fade()', () => {
// 		expect(validate('cross-fade(url(<string>))', syntax)).toBe(true);
// 		expect(validate('cross-fade(url(<string>) <percentage>)', syntax)).toBe(true);
// 		expect(validate('cross-fade(<color>)', syntax)).toBe(true);
// 		expect(validate('cross-fade(<color> <percentage>)', syntax)).toBe(true);
// 	});

// 	it('should validate: element()', () => {
// 		expect(validate('element(<id-selector>)', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('none, none', syntax)).toBe(true);
// 		expect(validate('url(<string>), none', syntax)).toBe(true);
// 		expect(validate('none, linear-gradient(<color>, <color>)', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('invalid', syntax)).toBe(false);
// 	});
// });

// describe('mask-type', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-type')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-type');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: keywords', () => {
// 		expect(validate('luminance', syntax)).toBe(true);
// 		expect(validate('alpha', syntax)).toBe(true);
// 	});

// 	it('should invalidate: multiple values (no # multiplier)', () => {
// 		expect(validate('luminance, alpha', syntax)).toBe(false);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('match-source', syntax)).toBe(false);
// 	});
// });

// describe('mask-mode', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-mode')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-mode');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('alpha', syntax)).toBe(true);
// 		expect(validate('luminance', syntax)).toBe(true);
// 		expect(validate('match-source', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('alpha, luminance', syntax)).toBe(true);
// 		expect(validate('match-source, alpha, luminance', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });

// describe('mask-clip', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-clip')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-clip');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: no-clip', () => {
// 		expect(validate('no-clip', syntax)).toBe(true);
// 	});

// 	it('should validate: visual-box keywords', () => {
// 		expect(validate('content-box', syntax)).toBe(true);
// 		expect(validate('padding-box', syntax)).toBe(true);
// 		expect(validate('border-box', syntax)).toBe(true);
// 	});

// 	it('should validate: paint-box keywords', () => {
// 		expect(validate('fill-box', syntax)).toBe(true);
// 		expect(validate('stroke-box', syntax)).toBe(true);
// 	});

// 	it('should validate: view-box', () => {
// 		expect(validate('view-box', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('border-box, no-clip', syntax)).toBe(true);
// 		expect(validate('fill-box, stroke-box, view-box', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('text', syntax)).toBe(false);
// 	});
// });

// describe('mask-repeat', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-repeat')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-repeat');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: shorthand keywords', () => {
// 		expect(validate('repeat-x', syntax)).toBe(true);
// 		expect(validate('repeat-y', syntax)).toBe(true);
// 		expect(validate('repeat-block', syntax)).toBe(true);
// 		expect(validate('repeat-inline', syntax)).toBe(true);
// 	});

// 	it('should validate: single repetition value', () => {
// 		expect(validate('repeat', syntax)).toBe(true);
// 		expect(validate('space', syntax)).toBe(true);
// 		expect(validate('round', syntax)).toBe(true);
// 		expect(validate('no-repeat', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value form', () => {
// 		expect(validate('repeat no-repeat', syntax)).toBe(true);
// 		expect(validate('space round', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('repeat, no-repeat', syntax)).toBe(true);
// 		expect(validate('repeat no-repeat, space round', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });

// describe('mask-composite', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-composite')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-composite');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('add', syntax)).toBe(true);
// 		expect(validate('subtract', syntax)).toBe(true);
// 		expect(validate('intersect', syntax)).toBe(true);
// 		expect(validate('exclude', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('add, subtract', syntax)).toBe(true);
// 		expect(validate('intersect, exclude, add', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('multiply', syntax)).toBe(false);
// 	});
// });

// describe('mask-origin', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-origin')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-origin');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: visual-box keywords', () => {
// 		expect(validate('content-box', syntax)).toBe(true);
// 		expect(validate('padding-box', syntax)).toBe(true);
// 		expect(validate('border-box', syntax)).toBe(true);
// 	});

// 	it('should validate: paint-box keywords', () => {
// 		expect(validate('fill-box', syntax)).toBe(true);
// 		expect(validate('stroke-box', syntax)).toBe(true);
// 	});

// 	it('should validate: view-box', () => {
// 		expect(validate('view-box', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('border-box, fill-box', syntax)).toBe(true);
// 		expect(validate('view-box, stroke-box, content-box', syntax)).toBe(true);
// 	});

// 	it('should invalidate: unknown keywords', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 		expect(validate('no-clip', syntax)).toBe(false);
// 	});
// });

// describe('mask-size', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-size')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-size');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: keywords', () => {
// 		expect(validate('cover', syntax)).toBe(true);
// 		expect(validate('contain', syntax)).toBe(true);
// 		expect(validate('auto', syntax)).toBe(true);
// 	});

// 	it('should validate: single length or percentage', () => {
// 		expect(validate('<length>', syntax)).toBe(true);
// 		expect(validate('<percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value form', () => {
// 		expect(validate('<length> <length>', syntax)).toBe(true);
// 		expect(validate('<length> auto', syntax)).toBe(true);
// 		expect(validate('auto <percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('cover, contain', syntax)).toBe(true);
// 		expect(validate('auto, <length> <length>', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });

// describe('mask-position', () => {
// 	const syntax = BACKGROUND_DEFINITIONS.find((def) => def.key === 'mask-position')?.syntax;
// 	if (!syntax) throw new Error('Syntax not found for mask-position');
// 	const syntax = derivesyntax(syntax, NON_TERMINALS);

// 	it('should validate: single keyword', () => {
// 		expect(validate('center', syntax)).toBe(true);
// 		expect(validate('top', syntax)).toBe(true);
// 		expect(validate('left', syntax)).toBe(true);
// 	});

// 	it('should validate: single length/percentage', () => {
// 		expect(validate('<length>', syntax)).toBe(true);
// 		expect(validate('<percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: two-value form', () => {
// 		expect(validate('left top', syntax)).toBe(true);
// 		expect(validate('center center', syntax)).toBe(true);
// 		expect(validate('<percentage> <percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: four-value form', () => {
// 		expect(validate('left <length> top <length>', syntax)).toBe(true);
// 		expect(validate('right <percentage> bottom <percentage>', syntax)).toBe(true);
// 	});

// 	it('should validate: logical keywords (position-one)', () => {
// 		expect(validate('x-start', syntax)).toBe(true);
// 		expect(validate('x-end', syntax)).toBe(true);
// 		expect(validate('y-start', syntax)).toBe(true);
// 		expect(validate('y-end', syntax)).toBe(true);
// 		expect(validate('block-start', syntax)).toBe(true);
// 		expect(validate('block-end', syntax)).toBe(true);
// 		expect(validate('inline-start', syntax)).toBe(true);
// 		expect(validate('inline-end', syntax)).toBe(true);
// 	});

// 	it('should validate: logical two-value forms (position-two)', () => {
// 		expect(validate('x-start top', syntax)).toBe(true);
// 		expect(validate('x-end y-start', syntax)).toBe(true);
// 		expect(validate('block-start inline-end', syntax)).toBe(true);
// 		expect(validate('start end', syntax)).toBe(true);
// 		expect(validate('end center', syntax)).toBe(true);
// 	});

// 	it('should validate: logical four-value forms (position-four)', () => {
// 		expect(validate('x-start <length> y-start <length>', syntax)).toBe(true);
// 		expect(validate('block-start <percentage> inline-end <percentage>', syntax)).toBe(true);
// 		expect(validate('start <length> end <length>', syntax)).toBe(true);
// 	});

// 	it('should validate: multiple layers (#)', () => {
// 		expect(validate('center, top', syntax)).toBe(true);
// 		expect(validate('left top, right bottom', syntax)).toBe(true);
// 	});

// 	it('should invalidate: invalid values', () => {
// 		expect(validate('', syntax)).toBe(false);
// 		expect(validate('none', syntax)).toBe(false);
// 	});
// });
