import { describe, it, expect } from '@jest/globals';
import { FONT_DEFINITIONS } from '@/config/block/style/property/font';
import { validate } from './validate';

describe('font-size', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'font-size')?.syntax;
	if (!syntax) throw new Error('Syntax not found for font-size');

	it('should validate: absolute-size keywords', () => {
		expect(validate('xx-small', syntax)).toBe(true);
		expect(validate('x-small', syntax)).toBe(true);
		expect(validate('small', syntax)).toBe(true);
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('large', syntax)).toBe(true);
		expect(validate('x-large', syntax)).toBe(true);
		expect(validate('xx-large', syntax)).toBe(true);
		expect(validate('xxx-large', syntax)).toBe(true);
	});

	it('should validate: relative-size keywords', () => {
		expect(validate('larger', syntax)).toBe(true);
		expect(validate('smaller', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: math keyword', () => {
		expect(validate('math', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('small medium', syntax)).toBe(false);
	});
});

describe('font-weight', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'font-weight')?.syntax;
	if (!syntax) throw new Error('Syntax not found for font-weight');

	it('should validate: absolute keywords', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('bold', syntax)).toBe(true);
	});

	it('should validate: numeric weight', () => {
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should validate: relative keywords', () => {
		expect(validate('bolder', syntax)).toBe(true);
		expect(validate('lighter', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('bold bolder', syntax)).toBe(false);
	});
});

describe('line-height', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'line-height')?.syntax;
	if (!syntax) throw new Error('Syntax not found for line-height');

	it('should validate: normal keyword', () => {
		expect(validate('normal', syntax)).toBe(true);
	});

	it('should validate: unitless number', () => {
		expect(validate('<number>', syntax)).toBe(true);
	});

	it('should validate: length and percentage', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('font-family', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'font-family')?.syntax;
	if (!syntax) throw new Error('Syntax not found for font-family');

	it('should validate: generic-family keywords', () => {
		expect(validate('Serif', syntax)).toBe(true);
		expect(validate('Sans-Serif', syntax)).toBe(true);
		expect(validate('Monospace', syntax)).toBe(true);
		expect(validate('Cursive', syntax)).toBe(true);
		expect(validate('Fantasy', syntax)).toBe(true);
		expect(validate('System-Ui', syntax)).toBe(true);
	});

	it('should validate: family name as string or custom-ident', () => {
		expect(validate('<string>', syntax)).toBe(true);
		expect(validate('<custom-ident>', syntax)).toBe(true);
	});

	it('should validate: comma-separated font stack', () => {
		expect(validate('<string>, Serif', syntax)).toBe(true);
		expect(validate('<custom-ident>, Monospace', syntax)).toBe(true);
		expect(validate('Serif, Sans-Serif, Monospace', syntax)).toBe(true);
	});

	it('should invalidate: empty, bare number', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<number>', syntax)).toBe(false);
	});
});

describe('font-style', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'font-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for font-style');

	it('should validate: normal and italic', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('italic', syntax)).toBe(true);
	});

	it('should validate: oblique (with and without angle)', () => {
		expect(validate('oblique', syntax)).toBe(true);
		expect(validate('oblique <angle>', syntax)).toBe(true);
	});

	it('should invalidate: empty, bold, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('bold', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('italic normal', syntax)).toBe(false);
	});
});

describe('color', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for color');

	it('should validate: color type', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should invalidate: empty, length, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('<color> <color>', syntax)).toBe(false);
	});
});

describe('text-align', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-align')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-align');

	it('should validate: all keywords', () => {
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('center', syntax)).toBe(true);
		expect(validate('justify', syntax)).toBe(true);
		expect(validate('match-parent', syntax)).toBe(true);
		expect(validate('justify-all', syntax)).toBe(true);
	});

	it('should validate: string value', () => {
		expect(validate('<string>', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
		expect(validate('left right', syntax)).toBe(false);
	});
});

describe('text-align-last', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-align-last')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-align-last');

	it('should validate: all keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('start', syntax)).toBe(true);
		expect(validate('end', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('center', syntax)).toBe(true);
		expect(validate('justify', syntax)).toBe(true);
		expect(validate('match-parent', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('top', syntax)).toBe(false);
		expect(validate('left right', syntax)).toBe(false);
	});
});

describe('text-transform', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-transform')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-transform');

	it('should validate: none and math-auto', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('math-auto', syntax)).toBe(true);
	});

	it('should validate: case keywords', () => {
		expect(validate('capitalize', syntax)).toBe(true);
		expect(validate('uppercase', syntax)).toBe(true);
		expect(validate('lowercase', syntax)).toBe(true);
	});

	it('should validate: full-width and full-size-kana (|| independent)', () => {
		expect(validate('full-width', syntax)).toBe(true);
		expect(validate('full-size-kana', syntax)).toBe(true);
	});

	it('should validate: combinations via || operator', () => {
		expect(validate('capitalize full-width', syntax)).toBe(true);
		expect(validate('uppercase full-size-kana', syntax)).toBe(true);
		expect(validate('full-width full-size-kana', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('bold', syntax)).toBe(false);
	});
});

describe('text-combine-upright', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-combine-upright')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-combine-upright');

	it('should validate: none and all', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('all', syntax)).toBe(true);
	});

	it('should validate: digits alone and digits with count', () => {
		expect(validate('digits', syntax)).toBe(true);
		expect(validate('digits <integer>', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('none all', syntax)).toBe(false);
	});
});

describe('text-overflow', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-overflow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-overflow');

	it('should validate: single keywords', () => {
		expect(validate('clip', syntax)).toBe(true);
		expect(validate('ellipsis', syntax)).toBe(true);
		expect(validate('fade', syntax)).toBe(true);
	});

	it('should validate: string value', () => {
		expect(validate('<string>', syntax)).toBe(true);
	});

	it('should validate: fade() with length or percentage', () => {
		expect(validate('fade(<length>)', syntax)).toBe(true);
		expect(validate('fade(<percentage>)', syntax)).toBe(true);
	});

	it('should validate: two-value (start end overflow handling)', () => {
		expect(validate('clip ellipsis', syntax)).toBe(true);
		expect(validate('ellipsis clip', syntax)).toBe(true);
		expect(validate('clip fade', syntax)).toBe(true);
	});

	it('should invalidate: empty, more than 2 values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('clip ellipsis fade', syntax)).toBe(false);
	});
});

describe('text-orientation', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-orientation')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-orientation');

	it('should validate: all keywords', () => {
		expect(validate('mixed', syntax)).toBe(true);
		expect(validate('upright', syntax)).toBe(true);
		expect(validate('sideways', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('mixed upright', syntax)).toBe(false);
	});
});

describe('text-decoration', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-decoration')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-decoration');

	it('should validate: text-decoration-line values', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('underline', syntax)).toBe(true);
		expect(validate('overline', syntax)).toBe(true);
		expect(validate('line-through', syntax)).toBe(true);
	});

	it('should validate: text-decoration-style values', () => {
		expect(validate('solid', syntax)).toBe(true);
		expect(validate('double', syntax)).toBe(true);
		expect(validate('dotted', syntax)).toBe(true);
		expect(validate('dashed', syntax)).toBe(true);
		expect(validate('wavy', syntax)).toBe(true);
	});

	it('should validate: text-decoration-thickness values', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('from-font', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: text-decoration-color', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should validate: combinations via || operator', () => {
		expect(validate('underline solid', syntax)).toBe(true);
		expect(validate('underline wavy <color>', syntax)).toBe(true);
		expect(validate('underline auto <color>', syntax)).toBe(true);
		expect(validate('overline dashed', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown keyword', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('bold', syntax)).toBe(false);
	});
});

describe('text-shadow', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-shadow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-shadow');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: x/y offsets', () => {
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should validate: x/y offsets with blur', () => {
		expect(validate('<length> <length> <length>', syntax)).toBe(true);
	});

	it('should validate: color + offsets', () => {
		expect(validate('<color> <length> <length>', syntax)).toBe(true);
		expect(validate('<length> <length> <color>', syntax)).toBe(true);
	});

	it('should validate: with inset', () => {
		expect(validate('<length> <length> inset', syntax)).toBe(true);
	});

	it('should validate: multiple shadows (comma-separated)', () => {
		expect(validate('<length> <length>, <length> <length>', syntax)).toBe(true);
		expect(validate('<color> <length> <length>, <length> <length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: empty, single length', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
	});
});

describe('text-indent', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'text-indent')?.syntax;
	if (!syntax) throw new Error('Syntax not found for text-indent');

	it('should validate: length or percentage alone', () => {
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should validate: with hanging keyword', () => {
		expect(validate('<length> hanging', syntax)).toBe(true);
		expect(validate('hanging <length>', syntax)).toBe(true);
	});

	it('should validate: with each-line keyword', () => {
		expect(validate('<length> each-line', syntax)).toBe(true);
	});

	it('should validate: with both hanging and each-line', () => {
		expect(validate('<length> hanging each-line', syntax)).toBe(true);
		expect(validate('<percentage> each-line hanging', syntax)).toBe(true);
	});

	it('should invalidate: empty, hanging alone, each-line alone', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('hanging', syntax)).toBe(false);
		expect(validate('each-line', syntax)).toBe(false);
	});
});

describe('writing-mode', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'writing-mode')?.syntax;
	if (!syntax) throw new Error('Syntax not found for writing-mode');

	it('should validate: all keywords', () => {
		expect(validate('horizontal-tb', syntax)).toBe(true);
		expect(validate('vertical-rl', syntax)).toBe(true);
		expect(validate('vertical-lr', syntax)).toBe(true);
		expect(validate('sideways-rl', syntax)).toBe(true);
		expect(validate('sideways-lr', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('horizontal-tb vertical-rl', syntax)).toBe(false);
	});
});

describe('white-space', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'white-space')?.syntax;
	if (!syntax) throw new Error('Syntax not found for white-space');

	it('should validate: legacy shorthand keywords', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('pre', syntax)).toBe(true);
		expect(validate('pre-wrap', syntax)).toBe(true);
		expect(validate('pre-line', syntax)).toBe(true);
	});

	it('should validate: white-space-collapse values', () => {
		expect(validate('collapse', syntax)).toBe(true);
		expect(validate('preserve', syntax)).toBe(true);
		expect(validate('preserve-breaks', syntax)).toBe(true);
		expect(validate('break-spaces', syntax)).toBe(true);
	});

	it('should validate: text-wrap-mode values', () => {
		expect(validate('wrap', syntax)).toBe(true);
		expect(validate('nowrap', syntax)).toBe(true);
	});

	it('should validate: combinations via || operator', () => {
		expect(validate('preserve nowrap', syntax)).toBe(true);
		expect(validate('collapse wrap', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
	});
});

describe('word-break', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'word-break')?.syntax;
	if (!syntax) throw new Error('Syntax not found for word-break');

	it('should validate: all keywords', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('break-all', syntax)).toBe(true);
		expect(validate('keep-all', syntax)).toBe(true);
		expect(validate('manual', syntax)).toBe(true);
		expect(validate('auto-phrase', syntax)).toBe(true);
		expect(validate('break-word', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('normal break-all', syntax)).toBe(false);
	});
});

describe('line-break', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'line-break')?.syntax;
	if (!syntax) throw new Error('Syntax not found for line-break');

	it('should validate: all keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('loose', syntax)).toBe(true);
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('strict', syntax)).toBe(true);
		expect(validate('anywhere', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('break-all', syntax)).toBe(false);
		expect(validate('auto loose', syntax)).toBe(false);
	});
});

describe('letter-spacing', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'letter-spacing')?.syntax;
	if (!syntax) throw new Error('Syntax not found for letter-spacing');

	it('should validate: normal and length/percentage', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('word-spacing', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'word-spacing')?.syntax;
	if (!syntax) throw new Error('Syntax not found for word-spacing');

	it('should validate: normal and length/percentage', () => {
		expect(validate('normal', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, auto, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('column-count', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-count')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-count');

	it('should validate: auto and integer', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<integer>', syntax)).toBe(true);
	});

	it('should invalidate: empty, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('auto <integer>', syntax)).toBe(false);
	});
});

describe('column-width', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-width');

	it('should validate: auto and length', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should validate: intrinsic sizing keywords', () => {
		expect(validate('min-content', syntax)).toBe(true);
		expect(validate('max-content', syntax)).toBe(true);
	});

	it('should validate: fit-content() function', () => {
		expect(validate('fit-content(<length>)', syntax)).toBe(true);
		expect(validate('fit-content(<percentage>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, percentage alone, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
		expect(validate('<length> <length>', syntax)).toBe(false);
	});
});

describe('column-rule-width', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-rule-width')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-rule-width');

	it('should validate: named widths', () => {
		expect(validate('thin', syntax)).toBe(true);
		expect(validate('medium', syntax)).toBe(true);
		expect(validate('thick', syntax)).toBe(true);
	});

	it('should validate: length value', () => {
		expect(validate('<length>', syntax)).toBe(true);
	});

	it('should validate: multiple values (list)', () => {
		expect(validate('thin, medium', syntax)).toBe(true);
		expect(validate('<length>, thick', syntax)).toBe(true);
	});

	it('should invalidate: empty, percentage', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('column-rule-style', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-rule-style')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-rule-style');

	it('should validate: line-style keywords', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('solid', syntax)).toBe(true);
		expect(validate('dashed', syntax)).toBe(true);
		expect(validate('dotted', syntax)).toBe(true);
		expect(validate('double', syntax)).toBe(true);
		expect(validate('groove', syntax)).toBe(true);
		expect(validate('ridge', syntax)).toBe(true);
		expect(validate('inset', syntax)).toBe(true);
		expect(validate('outset', syntax)).toBe(true);
	});

	it('should validate: multiple styles (list)', () => {
		expect(validate('solid, dashed', syntax)).toBe(true);
	});

	it('should invalidate: empty, length', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
	});
});

describe('column-rule-color', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-rule-color')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-rule-color');

	it('should validate: single color', () => {
		expect(validate('<color>', syntax)).toBe(true);
	});

	it('should validate: multiple colors (list)', () => {
		expect(validate('<color>, <color>', syntax)).toBe(true);
	});

	it('should invalidate: empty, length', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
	});
});

describe('break-before', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'break-before')?.syntax;
	if (!syntax) throw new Error('Syntax not found for break-before');

	it('should validate: generic keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('avoid', syntax)).toBe(true);
		expect(validate('always', syntax)).toBe(true);
		expect(validate('all', syntax)).toBe(true);
	});

	it('should validate: page keywords', () => {
		expect(validate('avoid-page', syntax)).toBe(true);
		expect(validate('page', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('recto', syntax)).toBe(true);
		expect(validate('verso', syntax)).toBe(true);
	});

	it('should validate: column and region keywords', () => {
		expect(validate('avoid-column', syntax)).toBe(true);
		expect(validate('column', syntax)).toBe(true);
		expect(validate('avoid-region', syntax)).toBe(true);
		expect(validate('region', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('auto avoid', syntax)).toBe(false);
	});
});

describe('break-inside', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'break-inside')?.syntax;
	if (!syntax) throw new Error('Syntax not found for break-inside');

	it('should validate: all keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('avoid', syntax)).toBe(true);
		expect(validate('avoid-page', syntax)).toBe(true);
		expect(validate('avoid-column', syntax)).toBe(true);
		expect(validate('avoid-region', syntax)).toBe(true);
	});

	it('should invalidate: empty, always (not allowed inside), multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('always', syntax)).toBe(false);
		expect(validate('auto avoid', syntax)).toBe(false);
	});
});

describe('break-after', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'break-after')?.syntax;
	if (!syntax) throw new Error('Syntax not found for break-after');

	it('should validate: generic keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('avoid', syntax)).toBe(true);
		expect(validate('always', syntax)).toBe(true);
		expect(validate('all', syntax)).toBe(true);
	});

	it('should validate: page and column keywords', () => {
		expect(validate('page', syntax)).toBe(true);
		expect(validate('left', syntax)).toBe(true);
		expect(validate('right', syntax)).toBe(true);
		expect(validate('column', syntax)).toBe(true);
		expect(validate('region', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('auto page', syntax)).toBe(false);
	});
});

describe('column-span', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-span')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-span');

	it('should validate: none, all, auto', () => {
		expect(validate('none', syntax)).toBe(true);
		expect(validate('all', syntax)).toBe(true);
		expect(validate('auto', syntax)).toBe(true);
	});

	it('should validate: integer', () => {
		expect(validate('<integer>', syntax)).toBe(true);
	});

	it('should invalidate: empty, length, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('none all', syntax)).toBe(false);
	});
});

describe('column-fill', () => {
	const syntax = FONT_DEFINITIONS.find((def) => def.key === 'column-fill')?.syntax;
	if (!syntax) throw new Error('Syntax not found for column-fill');

	it('should validate: all keywords', () => {
		expect(validate('auto', syntax)).toBe(true);
		expect(validate('balance', syntax)).toBe(true);
		expect(validate('balance-all', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown, multiple', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('none', syntax)).toBe(false);
		expect(validate('auto balance', syntax)).toBe(false);
	});
});
