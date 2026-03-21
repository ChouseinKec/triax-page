import { describe, it, expect } from '@jest/globals';
import { EFFECT_DEFINITIONS } from '@/config/block/style/property/effect';
import { validate } from './validate';

describe('filter', () => {
	const syntax = EFFECT_DEFINITIONS.find((def) => def.key === 'filter')?.syntax;
	if (!syntax) throw new Error('Syntax not found for filter');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: blur()', () => {
		expect(validate('blur(<length>)', syntax)).toBe(true);
		expect(validate('blur()', syntax)).toBe(false);
	});

	it('should validate: brightness(), contrast(), grayscale(), invert(), opacity(), sepia(), saturate()', () => {
		expect(validate('brightness(<number>)', syntax)).toBe(true);
		expect(validate('brightness(<percentage>)', syntax)).toBe(true);
		expect(validate('brightness()', syntax)).toBe(false);
		expect(validate('contrast(<number>)', syntax)).toBe(true);
		expect(validate('contrast(<percentage>)', syntax)).toBe(true);
		expect(validate('grayscale(<number>)', syntax)).toBe(true);
		expect(validate('invert(<percentage>)', syntax)).toBe(true);
		expect(validate('opacity(<number>)', syntax)).toBe(true);
		expect(validate('sepia(<percentage>)', syntax)).toBe(true);
		expect(validate('saturate(<number>)', syntax)).toBe(true);
	});

	it('should validate: hue-rotate()', () => {
		expect(validate('hue-rotate(<angle>)', syntax)).toBe(true);
		expect(validate('hue-rotate()', syntax)).toBe(false);
	});

	it('should validate: drop-shadow()', () => {
		expect(validate('drop-shadow(<length> <length>)', syntax)).toBe(true);
		expect(validate('drop-shadow(<length> <length> <length>)', syntax)).toBe(true);
		expect(validate('drop-shadow(<color> <length> <length>)', syntax)).toBe(true);
	});

	it('should validate: multiple filter functions (space-separated)', () => {
		expect(validate('blur(<length>) brightness(<number>)', syntax)).toBe(true);
		expect(validate('grayscale(<percentage>) sepia(<number>)', syntax)).toBe(true);
		expect(validate('blur(<length>) contrast(<number>) saturate(<percentage>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown keyword, plain type values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<color>', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
	});
});

describe('backdrop-filter', () => {
	const syntax = EFFECT_DEFINITIONS.find((def) => def.key === 'backdrop-filter')?.syntax;
	if (!syntax) throw new Error('Syntax not found for backdrop-filter');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: filter functions', () => {
		expect(validate('blur(<length>)', syntax)).toBe(true);
		expect(validate('brightness(<percentage>)', syntax)).toBe(true);
		expect(validate('saturate(<number>)', syntax)).toBe(true);
		expect(validate('hue-rotate(<angle>)', syntax)).toBe(true);
	});

	it('should validate: multiple filter functions', () => {
		expect(validate('blur(<length>) saturate(<number>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown keyword, plain type values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<color>', syntax)).toBe(false);
	});
});

describe('transform', () => {
	const syntax = EFFECT_DEFINITIONS.find((def) => def.key === 'transform')?.syntax;
	if (!syntax) throw new Error('Syntax not found for transform');

	it('should validate: none', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: scale functions', () => {
		expect(validate('scale(<number>, <number>)', syntax)).toBe(true);
		expect(validate('scale(<number>)', syntax)).toBe(true); // second arg optional
		expect(validate('scaleX(<number>)', syntax)).toBe(true);
		expect(validate('scaleY(<number>)', syntax)).toBe(true);
		expect(validate('scaleZ(<number>)', syntax)).toBe(true);
		expect(validate('scale3d(<number>, <number>, <number>)', syntax)).toBe(true);
	});

	it('should validate: rotate functions', () => {
		expect(validate('rotate(<angle>)', syntax)).toBe(true);
		expect(validate('rotateX(<angle>)', syntax)).toBe(true);
		expect(validate('rotateY(<angle>)', syntax)).toBe(true);
		expect(validate('rotateZ(<angle>)', syntax)).toBe(true);
		expect(validate('rotate3d(<number>, <number>, <number>, <angle>)', syntax)).toBe(true);
	});

	it('should validate: translate functions', () => {
		expect(validate('translateX(<length>)', syntax)).toBe(true);
		expect(validate('translateY(<percentage>)', syntax)).toBe(true);
		expect(validate('translateZ(<length>)', syntax)).toBe(true);
		expect(validate('translate3d(<length>, <length>, <length>)', syntax)).toBe(true);
	});

	it('should validate: skew functions', () => {
		expect(validate('skew(<angle>)', syntax)).toBe(true); // second arg optional
		expect(validate('skew(<angle>, <angle>)', syntax)).toBe(true);
		expect(validate('skewX(<angle>)', syntax)).toBe(true);
		expect(validate('skewY(<angle>)', syntax)).toBe(true);
	});

	it('should validate: matrix functions', () => {
		expect(validate('matrix(<number>, <number>, <number>, <number>, <number>, <number>)', syntax)).toBe(true);
		expect(validate('matrix3d(<number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>)', syntax)).toBe(true);
	});

	it('should validate: perspective function', () => {
		expect(validate('perspective(<length>)', syntax)).toBe(true);
		expect(validate('perspective(none)', syntax)).toBe(true);
	});

	it('should validate: multiple transform functions (space-separated)', () => {
		expect(validate('rotate(<angle>) scale(<number>, <number>)', syntax)).toBe(true);
		expect(validate('translateX(<length>) rotateZ(<angle>)', syntax)).toBe(true);
		expect(validate('scaleX(<number>) skewY(<angle>) rotate(<angle>)', syntax)).toBe(true);
	});

	it('should invalidate: empty, unknown keyword, plain type values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('<angle>', syntax)).toBe(false);
	});
});

describe('box-shadow', () => {
	const syntax = EFFECT_DEFINITIONS.find((def) => def.key === 'box-shadow')?.syntax;
	if (!syntax) throw new Error('Syntax not found for box-shadow');

	it('should validate: none (keyword inside shadow offset alternation)', () => {
		expect(validate('none', syntax)).toBe(true);
	});

	it('should validate: x/y offset lengths', () => {
		expect(validate('<length> <length>', syntax)).toBe(true);
	});

	it('should validate: offsets + blur radius', () => {
		expect(validate('<length> <length> <length>', syntax)).toBe(true);
	});

	it('should validate: color + offsets', () => {
		expect(validate('<color> <length> <length>', syntax)).toBe(true);
	});

	it('should validate: offsets + inset position', () => {
		expect(validate('<length> <length> inset', syntax)).toBe(true);
	});

	it('should validate: multiple shadows (comma-separated)', () => {
		expect(validate('<length> <length>, <color> <length> <length>', syntax)).toBe(true);
	});

	it('should invalidate: empty, single color, single percentage', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<color>', syntax)).toBe(false);
		expect(validate('<percentage>', syntax)).toBe(false);
	});
});

describe('opacity', () => {
	const syntax = EFFECT_DEFINITIONS.find((def) => def.key === 'opacity')?.syntax;
	if (!syntax) throw new Error('Syntax not found for opacity');

	it('should validate: number and percentage', () => {
		expect(validate('<number>', syntax)).toBe(true);
		expect(validate('<percentage>', syntax)).toBe(true);
	});

	it('should invalidate: empty, length, auto, multiple values', () => {
		expect(validate('', syntax)).toBe(false);
		expect(validate('<length>', syntax)).toBe(false);
		expect(validate('auto', syntax)).toBe(false);
		expect(validate('<number> <number>', syntax)).toBe(false);
	});
});
