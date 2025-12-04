// Utilities
import { isTokenKeyword, isTokenDimension, isTokenInteger, isTokenNumber, isTokenFunction, isTokenColor, isTokenLink, getTokenType, getTokenCanonical, getTokenBase, getTokenRange, getTokenParam, getTokenValue, getTokenValues, expandTokens } from '@/src/core/block/style/utilities/token';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

// function, color, and link forms
describe('type guards', () => {
	it('detects keywords correctly', () => {
		expect(isTokenKeyword('auto')).toBe(true);
		expect(isTokenKeyword('fit-content')).toBe(true);
		expect(isTokenKeyword('10px')).toBe(false);
	});

	it('detects dimensions correctly', () => {
		expect(isTokenDimension('<length>')).toBe(true);
		expect(isTokenDimension('<percentage>')).toBe(true);
		expect(isTokenDimension('<angle>')).toBe(true);
		expect(isTokenDimension('<flex>')).toBe(true);
		expect(isTokenDimension('10px')).toBe(false);
	});

	it('detects integer and number tokens', () => {
		expect(isTokenInteger('<integer>')).toBe(true);
		expect(isTokenInteger('<number>')).toBe(false);
		expect(isTokenNumber('<number>')).toBe(true);
		expect(isTokenNumber('<integer>')).toBe(false);
	});

	it('detects function tokens', () => {
		expect(isTokenFunction('fit-content(10px)')).toBe(true);
		expect(isTokenFunction('calc(100% - 20px)')).toBe(true);
		expect(isTokenFunction('10px')).toBe(false);
	});

	it('detects color and link tokens', () => {
		expect(isTokenColor('<color>')).toBe(true);
		expect(isTokenColor('rgb(0 0 0)')).toBe(false);
		expect(isTokenLink('<link>')).toBe(true);
		expect(isTokenLink('https://example.com/img.png')).toBe(false);
	});
});

// Canonical/base/range/param: normalization and extraction helpers
describe('canonical/base/range/param', () => {
	it('canonicalizes tokens', () => {
		expect(getTokenCanonical('fit-content(<length> <percentage>)')).toBe('fit-content()');
		expect(getTokenCanonical('<length [0,10]>')).toBe('<length>');
		expect(getTokenCanonical('auto')).toBe('auto');
		expect(getTokenCanonical('10px')).toBeUndefined();
	});

	it('extracts base token', () => {
		expect(getTokenBase('<length [0,10]>')).toBe('length');
		expect(getTokenBase('fit-content(<length> <percentage>)')).toBe('fit-content');
		expect(getTokenBase('auto')).toBe('auto');
		expect(getTokenBase('10px')).toBeUndefined();
	});

	it('extracts range', () => {
		expect(getTokenRange('<length [0,10]>')).toBe('[0,10]');
		expect(getTokenRange('fit-content(<length> <percentage>)')).toBeUndefined();
	});

	it('extracts params for function and ranged tokens', () => {
		expect(getTokenParam('fit-content(<length> <percentage>)')).toEqual({ type: 'function', syntax: '<length> <percentage>' });
		expect(getTokenParam('<length [0,10]>')).toEqual({ type: 'range', min: 0, max: 10 });
		expect(getTokenParam('<number [1,15]>')).toEqual({ type: 'range', min: 1, max: 15 });
		expect(getTokenParam('auto')).toBeUndefined();
	});
});

// Classification: maps inputs to TokenTypes
describe('getTokenType', () => {
	it('returns correct token group', () => {
		expect(getTokenType('auto')).toBe('keyword');
		expect(getTokenType('<length>')).toBe('dimension');
		expect(getTokenType('fit-content(10px)')).toBe('function');
		expect(getTokenType('<integer>')).toBe('integer');
		expect(getTokenType('<number>')).toBe('number');
		expect(getTokenType('<link>')).toBe('link');
		expect(getTokenType('10px')).toBeUndefined();
	});
});

// Defaults and mapping: token default values and arrays
describe('values', () => {
	it('returns default value for token', () => {
		expect(getTokenValue('<length>')).toBeDefined();
		expect(getTokenValue('<color>')).toBeDefined();
		expect(getTokenValue('<number>')).toBeDefined();
		expect(getTokenValue('auto')).toBe('auto');
		expect(getTokenValue('10px')).toBeUndefined();
	});

	it('maps tokens to values and filters undefineds', () => {
		const vals = getTokenValues(['<length>', '<color>', '<angle>', '10px']);
		expect(vals).toEqual(expect.arrayContaining(['0px', '#ffffff', '0deg']));
		expect(vals.includes('10px')).toBe(false);
	});
});

// Expansion: recursive expansion and range propagation
describe('expandTokens', () => {
	it('expands known tokens recursively', () => {
		const res = expandTokens('auto || <ratio>');
		expect(res).toContain('auto || <number [0,∞]> [ / <number [0,∞]> ]');
	});

	it('propagates ranges to expanded tokens', () => {
		const res = expandTokens('<ratio [0,10]>');
		expect(res).toContain('<number [0,∞] [0,10]> [ / <number [0,∞] [0,10]> ]');
	});

	it('leaves unknown tokens as-is', () => {
		const res = expandTokens('foo || <bar>');
		expect(res).toBe('foo || <bar>');
	});
});
