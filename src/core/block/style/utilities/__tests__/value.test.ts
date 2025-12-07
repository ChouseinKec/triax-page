// Utilities
import { isValueKeyword, isValueFunction, isValueNumber, isValueInteger, isValueColor, isValueLink, isValueDimension, getValueType, getValueToken, getValueTokens, getValueDefaultType } from '@/src/core/block/style/utilities/value';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('isValueKeyword', () => {
	it('returns true for keywords', () => {
		expect(isValueKeyword('auto')).toBe(true);
		expect(isValueKeyword('none')).toBe(true);
	});
	it('returns false for non-keywords', () => {
		expect(isValueKeyword('10px')).toBe(false);
	});
});

describe('isValueFunction', () => {
	it('returns true for function values', () => {
		expect(isValueFunction('fit-content(10px)')).toBe(true);
		expect(isValueFunction('calc(100% - 1em)')).toBe(true);
	});
	it('returns false for non-functions', () => {
		expect(isValueFunction('auto')).toBe(false);
	});
});

describe('isValueNumber', () => {
	it('returns true for numbers', () => {
		expect(isValueNumber('10.5')).toBe(true);
	});
	it('returns false for non-numbers', () => {
		expect(isValueNumber('abc')).toBe(false);
	});
});

describe('isValueInteger', () => {
	it('returns true for integers', () => {
		expect(isValueInteger('10')).toBe(true);
	});
	it('returns false for non-integers', () => {
		expect(isValueInteger('10.5')).toBe(false);
	});
});

describe('isValueColor', () => {
	it('returns true for color values', () => {
		expect(isValueColor('#fff')).toBe(true);
		expect(isValueColor('rgb(0,0,0)')).toBe(true);
	});
	it('returns false for non-color values', () => {
		expect(isValueColor('10px')).toBe(false);
	});
});

describe('isValueLink', () => {
	it('returns true for link values', () => {
		expect(isValueLink('"https://example.com"')).toBe(true);
		expect(isValueLink('"/path/to/resource"')).toBe(true);
	});
	it('returns false for non-link values', () => {
		expect(isValueLink('auto')).toBe(false);
	});
});

describe('isValueDimension', () => {
	it('returns true for dimension values', () => {
		expect(isValueDimension('10px')).toBe(true);
		expect(isValueDimension('25%')).toBe(true);
		expect(isValueDimension('180deg')).toBe(true);
		expect(isValueDimension('1fr')).toBe(true);
	});
	it('returns false for non-dimension values', () => {
		expect(isValueDimension('auto')).toBe(false);
		expect(isValueDimension('10')).toBe(false);
	});
});

describe('getValueType', () => {
	it('returns type for supported values', () => {
		expect(getValueType('"https://example.com"')).toBe('link');
		expect(getValueType('10px')).toBe('dimension');
		expect(getValueType('auto')).toBe('keyword');
		expect(getValueType('#fff')).toBe('color');
		expect(getValueType('fit-content(10px)')).toBe('function');
		expect(getValueType('10')).toBe('integer');
		expect(getValueType('10.5')).toBe('number');
	});
	it('returns undefined for invalid input', () => {
		expect(getValueType({} as unknown as string)).toBeUndefined();
	});
});

describe('getValueToken', () => {
	it('returns token for supported values', () => {
		expect(getValueToken('10px')).toBe('<length>');
		expect(getValueToken('auto')).toBe('auto');
		expect(getValueToken('fit-content(10px)')).toBe('fit-content()');
		expect(getValueToken('10')).toBe('<integer>');
		expect(getValueToken('10.5')).toBe('<number>');
		expect(getValueToken('#fff')).toBe('<color>');
	});
	it('returns undefined for invalid input', () => {
		expect(getValueToken({} as unknown as string)).toBeUndefined();
	});
});

describe('getValueTokens', () => {
	it('returns tokens for values and filters unknowns', () => {
		const tokens = getValueTokens(['10px', 'auto', 'fit-content(10px)', '10']);
		expect(tokens).toEqual(['<length>', 'auto', 'fit-content()', '<integer>']);
	});
});

describe('getValueDefaultType', () => {
	it('returns prioritized type when available', () => {
		const optsDimension = [{ type: 'dimension' } as any, { type: 'keyword' } as any];
		expect(getValueDefaultType(optsDimension)).toBe('dimension');

		const optsKeyword = [{ type: 'keyword' } as any, { type: 'color' } as any];
		expect(getValueDefaultType(optsKeyword)).toBe('keyword');

		const optsColor = [{ type: 'color' } as any, { type: 'function' } as any];
		expect(getValueDefaultType(optsColor)).toBe('color');

		const optsFunction = [{ type: 'function' } as any];
		expect(getValueDefaultType(optsFunction)).toBe('function');
	});

	it('returns undefined when options are empty or invalid', () => {
		expect(getValueDefaultType([] as any)).toBeUndefined();
		expect(getValueDefaultType(undefined as any)).toBeUndefined();
	});
});
