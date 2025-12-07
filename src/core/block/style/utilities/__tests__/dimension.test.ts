// Utilities
import { extractDimensionNumber, extractDimensionUnit, extractDimensionRange, extractDimensionValues, extractDimensionDefaults, getDimensionType } from '@/src/core/block/style/utilities/dimension';

describe('extractDimensionNumber', () => {
	it.each([
		['10px', '10'],
		['25%', '25'],
		['0.1rem', '0.1'],
		['-12em', '-12'],
		['1e3px', '1e3'],
		['+4.5vh', '+4.5'],
		['0px', '0'],
		['-100px', '-100'],
		['1e-2px', '1e-2'],
	])('returns number from dimension string', (input, expected) => {
		expect(extractDimensionNumber(input)).toBe(expected);
	});

	it.each(['auto', '', 'unset'])('rejects non-numeric input', (input) => {
		expect(extractDimensionNumber(input)).toBeUndefined();
	});

	it('handles scientific notation and signs', () => {
		expect(extractDimensionNumber('+1e-2px')).toBe('+1e-2');
		expect(extractDimensionNumber('-1e2em')).toBe('-1e2');
	});
});

describe('extractDimensionUnit', () => {
	it.each([
		['10px', 'px'],
		['25%', '%'],
		['0.1rem', 'rem'],
		['-12em', 'em'],
		['1e3px', 'px'],
		['+4.5vh', 'vh'],
		['0.5em', 'em'],
		['1e2px', 'px'],
	])('returns unit from dimension string', (input, expected) => {
		expect(extractDimensionUnit(input)).toBe(expected);
	});

	it.each(['42', '0', '3.14'])('returns empty string for unitless value', (input) => {
		expect(extractDimensionUnit(input)).toBe('');
	});

	it.each(['auto', 'inherit', 'initial'])('rejects keyword', (input) => {
		expect(extractDimensionUnit(input)).toBeUndefined();
	});
});

describe('extractDimensionRange', () => {
	it('returns Infinity bounds if min/max missing', () => {
		expect(extractDimensionRange([{}])).toEqual({ min: -Infinity, max: Infinity });
	});

	it('returns min/max from first option', () => {
		expect(extractDimensionRange([{ min: 0, max: 100 }])).toEqual({ min: 0, max: 100 });
	});

	it('handles min-only or max-only', () => {
		expect(extractDimensionRange([{ min: 0 }])).toEqual({ min: 0, max: Infinity });
		expect(extractDimensionRange([{ max: 100 }])).toEqual({ min: -Infinity, max: 100 });
	});

	it('handles multiple options, takes first', () => {
		expect(
			extractDimensionRange([
				{ min: 0, max: 100 },
				{ min: 10, max: 50 },
			])
		).toEqual({ min: 0, max: 100 });
	});

	it('handles negative and zero bounds', () => {
		expect(extractDimensionRange([{ min: -100, max: 100 }])).toEqual({ min: -100, max: 100 });
		expect(extractDimensionRange([{ min: 0, max: 0 }])).toEqual({ min: 0, max: 0 });
	});

	it('returns Infinity bounds for empty array', () => {
		expect(extractDimensionRange([])).toEqual({ min: -Infinity, max: Infinity });
	});
});

describe('extractDimensionValues', () => {
	it.each([
		['12px', { number: '12', unit: 'px' }],
		['50%', { number: '50', unit: '%' }],
		['1.5rem', { number: '1.5', unit: 'rem' }],
		['-5em', { number: '-5', unit: 'em' }],
		['0.1rem', { number: '0.1', unit: 'rem' }],
		['1e2px', { number: '1e2', unit: 'px' }],
		['+10px', { number: '+10', unit: 'px' }],
	])('returns number and unit from dimension string', (input, expected) => {
		expect(extractDimensionValues(input)).toEqual(expected);
	});

	it.each([
		['42', { number: '42', unit: '' }],
		['0', { number: '0', unit: '' }],
		['-10', { number: '-10', unit: '' }],
	])('handles unitless values', (input, expected) => {
		expect(extractDimensionValues(input)).toEqual(expected);
	});

	it.each(['auto', 'inherit', '', 'initial'])('rejects non-numeric token', (input) => {
		expect(extractDimensionValues(input)).toEqual({ number: undefined, unit: undefined });
	});
});

describe('extractDimensionDefaults', () => {
	it('returns px/0 for non-dimension or empty options', () => {
		expect(extractDimensionDefaults([{ category: 'color', name: 'red' }])).toEqual({ unit: 'px', number: '0' });
		expect(extractDimensionDefaults([])).toEqual({ unit: 'px', number: '0' });
	});

	it('returns first dimension from mixed categories', () => {
		expect(
			extractDimensionDefaults([
				{ category: 'color', name: 'red' },
				{ category: 'dimension', name: 'em' },
				{ category: 'dimension', name: 'rem' },
			])
		).toEqual({ unit: 'em', number: '0' });
	});
});

describe('getDimensionType', () => {
	it.each([
		['10px', 'length'],
		['25%', 'percentage'],
		['180deg', 'angle'],
		['1fr', 'flex'],
		['2em', 'length'],
		['100vh', 'length'],
		['0.5em', 'length'],
		['0px', 'length'],
		['1e2px', 'length'],
		['-10px', 'length'],
	])('returns type for dimension string', (input, expected) => {
		expect(getDimensionType(input as string)).toBe(expected);
	});

	it.each(['auto', 'inherit', 'initial', '0'])('rejects non-dimension token', (input) => {
		expect(getDimensionType(input as string)).toBeUndefined();
	});
});
