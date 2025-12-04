// Utilities
import { isValueKeyword, isValueFunction, isValueNumber, isValueInteger, isValueColor, isValueLink, isValueDimension, getValueType, getValueToken, getValueTokens, getValueDefaultType } from '@/src/core/block/style/utilities/value';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

// Format checks: validate keyword/function/number/integer/color/link/dimension detection
describe('format checks', () => {
	it('validates keywords', () => {
		expect(isValueKeyword('auto')).toBe(true);
		expect(isValueKeyword('none')).toBe(true);
		expect(isValueKeyword('10px')).toBe(false);
	});

	it('validates functions', () => {
		expect(isValueFunction('fit-content(10px)')).toBe(true);
		expect(isValueFunction('calc(100% - 1em)')).toBe(true);
		expect(isValueFunction('auto')).toBe(false);
	});

	it('validates numbers and integers', () => {
		expect(isValueNumber('10.5')).toBe(true);
		expect(isValueInteger('10')).toBe(true);
		expect(isValueInteger('10.5')).toBe(false);
	});

	it('validates color values', () => {
		expect(isValueColor('#fff')).toBe(true);
		expect(isValueColor('rgb(0,0,0)')).toBe(true);
		expect(isValueColor('10px')).toBe(false);
	});

	it('validates link values', () => {
		expect(isValueLink('"https://example.com"')).toBe(true);
		expect(isValueLink('"/path/to/resource"')).toBe(true);
		expect(isValueLink('auto')).toBe(false);
	});

	it('validates dimension values', () => {
		expect(isValueDimension('10px')).toBe(true);
		expect(isValueDimension('25%')).toBe(true);
		expect(isValueDimension('180deg')).toBe(true);
		expect(isValueDimension('1fr')).toBe(true);
		expect(isValueDimension('auto')).toBe(false);
		expect(isValueDimension('10')).toBe(false);
	});
});

// Type detection: ensure priority order and guard non-string inputs
describe('type detection', () => {
	it('detects the correct value type', () => {
		expect(getValueType('"https://example.com"')).toBe('link');
		expect(getValueType('10px')).toBe('dimension');
		expect(getValueType('auto')).toBe('keyword');
		expect(getValueType('#fff')).toBe('color');
		expect(getValueType('fit-content(10px)')).toBe('function');
		expect(getValueType('10')).toBe('integer');
		expect(getValueType('10.5')).toBe('number');
		expect(getValueType({} as unknown as string)).toBeUndefined();
	});
});

// Token conversion: map values to tokens and arrays filtering unknowns
describe('token conversion', () => {
    it('converts values to tokens', () => {
		expect(getValueToken('10px')).toBe('<length>');
		expect(getValueToken('auto')).toBe('auto');
		expect(getValueToken('fit-content(10px)')).toBe('fit-content()');
		expect(getValueToken('10')).toBe('<integer>');
		expect(getValueToken('10.5')).toBe('<number>');
		expect(getValueToken('#fff')).toBe('<color>');
		expect(getValueToken({} as unknown as string)).toBeUndefined();
	});

	it('maps arrays of values to tokens, filtering unknowns', () => {
		const tokens = getValueTokens(['10px', 'auto', 'fit-content(10px)', '10']);
		expect(tokens).toEqual(['<length>', 'auto', 'fit-content()', '<integer>']);
	});
});

// Default type selection: prioritized type fallback based on available options
describe('default type selection', () => {
	// Prioritizes types in order: dimension > keyword > color > function
	it('prioritizes types in order: dimension > keyword > color > function', () => {
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
