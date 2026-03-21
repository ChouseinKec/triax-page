import { describe, it, expect } from '@jest/globals';
import { DISPLAY_DEFINITIONS } from '@/config/block/style/property/display';
import { validate } from './validate';

describe('display', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'display')?.syntax;
	if (!syntax) throw new Error('Syntax not found for display');

	it('should validate: display-outside keywords', () => {
		expect(validate('block', syntax)).toBe(true);
		expect(validate('inline', syntax)).toBe(true);
	});

	it('should validate: display-inside keywords', () => {
		expect(validate('flow-root', syntax)).toBe(true);
		expect(validate('flex', syntax)).toBe(true);
		expect(validate('grid', syntax)).toBe(true);
	});

	it('should validate: display-box keywords', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: combined outside || inside', () => {
		expect(validate('inline flex', syntax)).toBe(true);
		expect(validate('block grid', syntax)).toBe(true);
	});

	it('should validate: outside [ inside | math ]', () => {
		expect(validate('block math', syntax)).toBe(true);
		expect(validate('inline math', syntax)).toBe(true);
		expect(validate('block flex', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, number', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('absolute', syntax)).toBe(false);
		expect(validate('<number>', syntax)).toBe(false);
	});
});

describe('flex-direction', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'flex-direction')?.syntax;
	if (!syntax) throw new Error('Syntax not found for flex-direction');

	it('should validate: all keywords', () => {
		expect(validate('row', syntax)).toBe(true);
		expect(validate('row-reverse', syntax)).toBe(true);
		expect(validate('column', syntax)).toBe(true);
		expect(validate('column-reverse', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
		expect(validate('reverse', syntax)).toBe(false);
		expect(validate('row column', syntax)).toBe(false);
	});
});

describe('flex-wrap', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'flex-wrap')?.syntax;
	if (!syntax) throw new Error('Syntax not found for flex-wrap');

	it('should validate: all keywords', () => {
		expect(validate('nowrap', syntax)).toBe(true);
		expect(validate('wrap', syntax)).toBe(true);
		expect(validate('wrap-reverse', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('reverse', syntax)).toBe(false);
		expect(validate('wrap nowrap', syntax)).toBe(false);
	});
});

describe('align-items', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'align-items')?.syntax;
	if (!syntax) throw new Error('Syntax not found for align-items');

	it('should validate: normal and stretch', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: baseline-position', () => {
		expect(validate('baseline', syntax)).toBe(true);
		expect(validate('first baseline', syntax)).toBe(true);
		expect(validate('last baseline', syntax)).toBe(true);
	});

	it('should validate: self-position keywords', () => {
		expect(validate('center', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('flex-start', syntax)).toBe(true);
		expect(validate('flex-end', syntax)).toBe(true);
		expect(validate('self-start', syntax)).toBe(true);
		expect(validate('self-end', syntax)).toBe(true);
	});

	it('should validate: overflow-position + self-position', () => {
		expect(validate('safe center', syntax)).toBe(true);
		expect(validate('unsafe flex-start', syntax)).toBe(true);
		expect(validate('safe self-end', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('left', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
	});
});

describe('align-content', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'align-content')?.syntax;
	if (!syntax) throw new Error('Syntax not found for align-content');

	it('should validate: normal', () => {
		expect(validate('normal', syntax)).toBe(true);
	});

	it('should validate: baseline-position', () => {
		expect(validate('baseline', syntax)).toBe(true);
		expect(validate('first baseline', syntax)).toBe(true);
		expect(validate('last baseline', syntax)).toBe(true);
	});

	it('should validate: content-distribution', () => {
		expect(validate('space-between', syntax)).toBe(true);
		expect(validate('space-around', syntax)).toBe(true);
		expect(validate('space-evenly', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: content-position keywords', () => {
		expect(validate('center', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('flex-start', syntax)).toBe(true);
		expect(validate('flex-end', syntax)).toBe(true);
	});

	it('should validate: overflow-position + content-position', () => {
		expect(validate('safe center', syntax)).toBe(true);
		expect(validate('unsafe end', syntax)).toBe(true);
		expect(validate('safe flex-start', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('left', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
	});
});

describe('justify-content', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'justify-content')?.syntax;
	if (!syntax) throw new Error('Syntax not found for justify-content');

	it('should validate: normal', () => {
		expect(validate('normal', syntax)).toBe(true);
	});

	it('should validate: content-distribution', () => {
		expect(validate('space-between', syntax)).toBe(true);
		expect(validate('space-around', syntax)).toBe(true);
		expect(validate('space-evenly', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: content-position and left/right', () => {
		expect(validate('center', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('flex-start', syntax)).toBe(true);
		expect(validate('flex-end', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
	});

	it('should validate: overflow-position + content-position', () => {
		expect(validate('safe center', syntax)).toBe(true);
		expect(validate('unsafe flex-end', syntax)).toBe(true);
		expect(validate('safe left', syntax)).toBe(true);
		expect(validate('unsafe right', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
		expect(validate('bottom', syntax)).toBe(false);
	});
});

describe('row-gap', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'row-gap')?.syntax;
	if (!syntax) throw new Error('Syntax not found for row-gap');

	it('should validate: normal', () => {
		expect(validate('normal', syntax)).toBe(true);
	});

	it('should validate: length or percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('column-gap', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'column-gap')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-gap');

	it('should validate: normal', () => {
		expect(validate('normal', syntax)).toBe(true);
	});

	it('should validate: length or percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('gap', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'gap')?.syntax;
	if (!syntax) throw new Error('Syntax not found for gap');

	it('should validate: two gap values (row column)', () => {
		expect(validate('normal normal', syntax)).toBe(true);
		expect(validate('<length> <percentage>', syntax)).toBe(true);
		expect(validate('<percentage> normal', syntax)).toBe(true);
		expect(validate('normal <length>', syntax)).toBe(true);
	});

	it('should invalidate: empty, single value, three values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length> <length> <length>', syntax)).toBe(false);
	});
});

describe('flex-grow', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'flex-grow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for flex-grow');

	it('should validate: number', () => {
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should invalidate: empty, percentage, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('<number> <number>', syntax)).toBe(false);
	});
});

describe('flex-shrink', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'flex-shrink')?.syntax;
	if (!syntax) throw new Error('Syntax not found for flex-shrink');

	it('should validate: number', () => {
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should invalidate: empty, percentage, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('<number> <number>', syntax)).toBe(false);
	});
});

describe('flex-basis', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'flex-basis')?.syntax;
	if (!syntax) throw new Error('Syntax not found for flex-basis');

	it('should validate: content keyword', () => {
		expect(validate('content', syntax)).toBe(true);
	});

	it('should validate: width keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
		expect(validate('fit-content', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
		expect(validate('contain', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: fit-content(<length-percentage>)', () => {
		expect(validate('fit-content(<length>)', syntax)).toBe(true);
		expect(validate('fit-content(<percentage>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with size-keyword basis', () => {
		expect(validate('calc-size(auto, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(min-content, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(max-content, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(fit-content, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(stretch, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(contain, <number>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with any basis', () => {
		expect(validate('calc-size(any, <number>)', syntax)).toBe(true);
		expect(validate('calc-size(any, <percentage>)', syntax)).toBe(true);
		expect(validate('calc-size(any, <dimension>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with + operator (calc-sum)', () => {
		expect(validate('calc-size(auto, <number> + <number>)', syntax)).toBe(true);
		expect(validate('calc-size(any, <percentage> + <percentage>)', syntax)).toBe(true);
		expect(validate('calc-size(min-content, <dimension> + <number>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with - operator (calc-sum)', () => {
		expect(validate('calc-size(auto, <number> - <number>)', syntax)).toBe(true);
		expect(validate('calc-size(max-content, <percentage> - <dimension>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with * operator (calc-product)', () => {
		expect(validate('calc-size(auto, <number> * <number>)', syntax)).toBe(true);
		expect(validate('calc-size(any, <dimension> * <number>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with / operator (calc-product)', () => {
		expect(validate('calc-size(auto, <number> / <number>)', syntax)).toBe(true);
		expect(validate('calc-size(any, <dimension> / <number>)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with calc-keyword values (e, pi, infinity, -infinity, NaN)', () => {
		expect(validate('calc-size(auto, e)', syntax)).toBe(true);
		expect(validate('calc-size(any, pi)', syntax)).toBe(true);
		expect(validate('calc-size(auto, infinity)', syntax)).toBe(true);
		expect(validate('calc-size(any, -infinity)', syntax)).toBe(true);
		expect(validate('calc-size(auto, NaN)', syntax)).toBe(true);
	});

	it('should validate: calc-size() with calc-keyword in expressions', () => {
		expect(validate('calc-size(auto, e + pi)', syntax)).toBe(true);
		expect(validate('calc-size(any, infinity - <number>)', syntax)).toBe(true);
		expect(validate('calc-size(min-content, NaN * <number>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, none, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('justify-items', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'justify-items')?.syntax;
	if (!syntax) throw new Error('Syntax not found for justify-items');

	it('should validate: normal and stretch', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('stretch', syntax)).toBe(true);
	});

	it('should validate: baseline-position', () => {
		expect(validate('baseline', syntax)).toBe(true);
		expect(validate('first baseline', syntax)).toBe(true);
		expect(validate('last baseline', syntax)).toBe(true);
	});

	it('should validate: self-position, left, right', () => {
		expect(validate('center', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('flex-start', syntax)).toBe(true);
		expect(validate('flex-end', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
	});

	it('should validate: overflow + self-position', () => {
		expect(validate('safe center', syntax)).toBe(true);
		expect(validate('unsafe left', syntax)).toBe(true);
		expect(validate('safe flex-end', syntax)).toBe(true);
	});

	it('should validate: legacy keyword combinations', () => {
		expect(validate('legacy', syntax)).toBe(true);
		expect(validate('legacy left', syntax)).toBe(true);
		expect(validate('legacy right', syntax)).toBe(true);
		expect(validate('legacy center', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
		expect(validate('bottom', syntax)).toBe(false);
	});
});

describe('grid-auto-flow', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-auto-flow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-auto-flow');

	it('should validate: single keywords', () => {
		expect(validate('row', syntax)).toBe(true);
		expect(validate('column', syntax)).toBe(true);
		expect(validate('dense', syntax)).toBe(true);
	});

	it('should validate: row/column combined with dense (|| order independent)', () => {
		expect(validate('row dense', syntax)).toBe(true);
		expect(validate('column dense', syntax)).toBe(true);
		expect(validate('dense row', syntax)).toBe(true);
		expect(validate('dense column', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, row and column together', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('row column', syntax)).toBe(false);
	});
});

describe('grid-auto-rows', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-auto-rows')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-auto-rows');

	it('should validate: single track-size values', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
	});

	it('should validate: multiple track sizes', () => {
		expect(validate('auto <length>', syntax)).toBe(true);
		expect(validate('<length> <length> auto', syntax)).toBe(true);
		expect(validate('min-content max-content', syntax)).toBe(true);
	});

	it('should invalidate: empty', () => {
		expect(validate('', syntax)).toBe(false);
	});
});

describe('grid-auto-columns', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-auto-columns')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-auto-columns');

	it('should validate: single track-size values', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
	});

	it('should validate: multiple track sizes', () => {
		expect(validate('auto <length>', syntax)).toBe(true);
		expect(validate('<length> auto <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty', () => {
		expect(validate('', syntax)).toBe(false);
	});
});

describe('grid-template-areas', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-template-areas')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-template-areas');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: one or more strings', () => {
		expect(validate('<string>', syntax)).toBe(true);
		expect(validate('<string> <string>', syntax)).toBe(true);
		expect(validate('<string> <string> <string>', syntax)).toBe(true);
	});

	it('should invalidate: empty, number, length', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<number>', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
	});
});

describe('grid-template-rows', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-template-rows')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-template-rows');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: subgrid (without line-name-list)', () => {
		expect(validate('subgrid', syntax)).toBe(true);
	});

	it('should validate: auto (valid track-breadth)', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('fixed', syntax)).toBe(false);
	});
});

describe('grid-template-columns', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'grid-template-columns')?.syntax;
	if (!syntax) throw new Error('Syntax not found for grid-template-columns');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: subgrid (without line-name-list)', () => {
		expect(validate('subgrid', syntax)).toBe(true);
	});

	it('should validate: auto (valid track-breadth)', () => {
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('fixed', syntax)).toBe(false);
	});
});

describe('direction', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'direction')?.syntax;
	if (!syntax) throw new Error('Syntax not found for direction');

	it('should validate: ltr and rtl', () => {
		expect(validate('ltr', syntax)).toBe(true);
		expect(validate('rtl', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('ltr rtl', syntax)).toBe(false);
	});
});

describe('box-sizing', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'box-sizing')?.syntax;
	if (!syntax) throw new Error('Syntax not found for box-sizing');

	it('should validate: both keywords', () => {
		expect(validate('content-box', syntax)).toBe(true);
		expect(validate('border-box', syntax)).toBe(true);
	});

	it('should invalidate: empty, padding-box, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('padding-box', syntax)).toBe(false);
		expect(validate('content-box border-box', syntax)).toBe(false);
	});
});

describe('visibility', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'visibility')?.syntax;
	if (!syntax) throw new Error('Syntax not found for visibility');

	it('should validate: all keywords', () => {
		expect(validate('visible', syntax)).toBe(true);
		expect(validate('hidden', syntax)).toBe(true);
		expect(validate('collapse', syntax)).toBe(true);
	});

	it('should invalidate: empty, none, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('visible hidden', syntax)).toBe(false);
	});
});

describe('float', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'float')?.syntax;
	if (!syntax) throw new Error('Syntax not found for float');

	it('should validate: classic keywords', () => {
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('none', syntax)).toBe(true);
		expect(validate('top', syntax)).toBe(true);
		expect(validate('bottom', syntax)).toBe(true);
	});

	it('should validate: logical keywords', () => {
		expect(validate('block-start', syntax)).toBe(true);
		expect(validate('block-end', syntax)).toBe(true);
		expect(validate('inline-start', syntax)).toBe(true);
		expect(validate('inline-end', syntax)).toBe(true);
	});

	it('should validate: snap and footnote keywords', () => {
		expect(validate('snap-block', syntax)).toBe(true);
		expect(validate('snap-inline', syntax)).toBe(true);
		expect(validate('footnote', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('center', syntax)).toBe(false);
		expect(validate('left right', syntax)).toBe(false);
	});
});

describe('clear', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'clear')?.syntax;
	if (!syntax) throw new Error('Syntax not found for clear');

	it('should validate: classic keywords', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('both', syntax)).toBe(true);
		expect(validate('top', syntax)).toBe(true);
		expect(validate('bottom', syntax)).toBe(true);
	});

	it('should validate: logical and extended keywords', () => {
		expect(validate('inline-start', syntax)).toBe(true);
		expect(validate('inline-end', syntax)).toBe(true);
		expect(validate('block-start', syntax)).toBe(true);
		expect(validate('block-end', syntax)).toBe(true);
		expect(validate('both-inline', syntax)).toBe(true);
		expect(validate('both-block', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('left right', syntax)).toBe(false);
	});
});

describe('object-position', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'object-position')?.syntax;
	if (!syntax) throw new Error('Syntax not found for object-position');

	it('should validate: single keyword positions', () => {
		expect(validate('center', syntax)).toBe(true);
		expect(validate('top', syntax)).toBe(true);
		expect(validate('bottom', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
	});

	it('should validate: two-value keyword positions', () => {
		expect(validate('center center', syntax)).toBe(true);
		expect(validate('top left', syntax)).toBe(true);
		expect(validate('bottom right', syntax)).toBe(true);
		expect(validate('left center', syntax)).toBe(true);
	});

	it('should validate: length and percentage positions', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
		expect(validate('<length> <percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});
});

describe('object-fit', () => {
	const syntax = DISPLAY_DEFINITIONS.find((def) => def.key === 'object-fit')?.syntax;
	if (!syntax) throw new Error('Syntax not found for object-fit');

	it('should validate: fill and none', () => {
		expect(validate('fill', syntax)).toBe(true);
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: contain and cover alone', () => {
		expect(validate('contain', syntax)).toBe(true);
		expect(validate('cover', syntax)).toBe(true);
	});

	it('should validate: scale-down alone', () => {
		expect(validate('scale-down', syntax)).toBe(true);
	});

	it('should validate: [ contain | cover ] || scale-down combinations', () => {
		expect(validate('contain scale-down', syntax)).toBe(true);
		expect(validate('cover scale-down', syntax)).toBe(true);
		expect(validate('scale-down contain', syntax)).toBe(true);
		expect(validate('scale-down cover', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, fill + contain', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('fill contain', syntax)).toBe(false);
	});
});
