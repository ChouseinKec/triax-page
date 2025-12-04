// Utilities
import { extractDimensionNumber, extractDimensionUnit, extractDimensionRange, extractDimensionValues, extractDimensionDefaults, getDimensionType } from '@/src/core/block/style/utilities/dimension';

// Number/unit/range helpers for dimension values and type inference
describe('extractDimensionNumber', () => {
	it.each([
		['10px', '10'],
		['25%', '25'],
		['0.1rem', '0.1'],
		['-12em', '-12'],
		['1e3px', '1e3'],
		['+4.5vh', '+4.5'],
		['auto', undefined],
	])('%s → %p', (input, expected) => {
		expect(extractDimensionNumber(input)).toBe(expected);
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
		['42', ''],
		['auto', undefined],
	])('%s → %p', (input, expected) => {
		expect(extractDimensionUnit(input)).toBe(expected);
	});
});

describe('extractDimensionRange', () => {
	it('returns Infinity bounds when missing', () => {
		expect(extractDimensionRange([{}])).toEqual({ min: -Infinity, max: Infinity });
	});
	it('returns first option min/max when present', () => {
		expect(extractDimensionRange([{ min: 0, max: 100 }])).toEqual({ min: 0, max: 100 });
	});
});

describe('extractDimensionValues', () => {
	it('extracts both number and unit', () => {
		expect(extractDimensionValues('12px')).toEqual({ number: '12', unit: 'px' });
	});
	it('handles value without unit', () => {
		expect(extractDimensionValues('42')).toEqual({ number: '42', unit: '' });
	});
	it('returns undefined for non-numeric values', () => {
		expect(extractDimensionValues('auto')).toEqual({ number: undefined, unit: undefined });
	});
});

describe('extractDimensionDefaults', () => {
	it('prefers first dimension category unit', () => {
		expect(extractDimensionDefaults([{ category: 'dimension', name: 'rem' }])).toEqual({ unit: 'rem', number: '0' });
	});
	it('falls back to px and 0', () => {
		expect(extractDimensionDefaults([{ category: 'color', name: 'red' }])).toEqual({ unit: 'px', number: '0' });
	});
});

describe('getDimensionType', () => {
	it.each([
		['10px', 'length'],
		['25%', 'percentage'],
		['180deg', 'angle'],
		['1fr', 'flex'],
		['auto', undefined],
	])('%s → %p', (input, expected) => {
		expect(getDimensionType(input as string)).toBe(expected);
	});
});
