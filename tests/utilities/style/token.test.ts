import { getTokenValue, getTokenValues, getTokenType, getTokenCanonical, getTokenBase, getTokenRange, getTokenParam } from '@/src/page-builder/core/block/style/utilities/token';

describe('getTokenType', () => {
	it('detects keyword', () => {
		expect(getTokenType('auto')).toBe('keyword');
		expect(getTokenType('fit-content')).toBe('keyword');
	});
	it('detects dimension', () => {
		expect(getTokenType('<length>')).toBe('dimension');
		expect(getTokenType('<percentage>')).toBe('dimension');
	});
	it('detects color', () => {
		expect(getTokenType('<color>')).toBe('color');
	});
	it('detects function', () => {
		expect(getTokenType('fit-content(10px)')).toBe('function');
	});
	it('detects integer', () => {
		expect(getTokenType('<integer>')).toBe('integer');
	});
	it('detects number', () => {
		expect(getTokenType('<number>')).toBe('number');
	});
	it('detects link', () => {
		expect(getTokenType('<link>')).toBe('link');
	});
	it('returns undefined for unknown', () => {
		expect(getTokenType('10px')).toBeUndefined();
	});
});

describe('getTokenCanonical', () => {
	it('returns canonical for function', () => {
		expect(getTokenCanonical('fit-content(<length> <percentage>)')).toBe('fit-content()');
	});
	it('returns canonical for dimension', () => {
		expect(getTokenCanonical('<length [0,10]>')).toBe('<length>');
	});
	it('returns canonical for keyword', () => {
		expect(getTokenCanonical('auto')).toBe('auto');
	});
	it('returns undefined for unknown', () => {
		expect(getTokenCanonical('10px')).toBeUndefined();
	});
});

describe('getTokenBase', () => {
	it('returns base for dimension', () => {
		expect(getTokenBase('<length [0,10]>')).toBe('length');
	});
	it('returns base for function', () => {
		expect(getTokenBase('fit-content(<length> <percentage>)')).toBe('fit-content');
	});
	it('returns base for keyword', () => {
		expect(getTokenBase('auto')).toBe('auto');
	});
	it('returns undefined for unknown', () => {
		expect(getTokenBase('10px')).toBeUndefined();
	});
});

describe('getTokenRange', () => {
	it('extracts range from dimension', () => {
		expect(getTokenRange('<length [0,10]>')).toBe('[0,10]');
		expect(getTokenRange('<integer [0,10]>')).toBe('[0,10]');
		expect(getTokenRange('<number [0,10]>')).toBe('[0,10]');
	});
	it('returns undefined if no range', () => {
		expect(getTokenRange('<length>')).toBeUndefined();
	});
});

describe('getTokenParam', () => {
	it('extracts function param', () => {
		expect(getTokenParam('fit-content(<length> <percentage>)')).toEqual({ syntax: '<length> <percentage>' });
	});
	it('extracts dimension param', () => {
		expect(getTokenParam('<length [0,10]>')).toEqual({ min: 0, max: 10 });
	});
	it('extracts number param', () => {
		expect(getTokenParam('<number [0,15]>')).toEqual({ min: 0, max: 15 });
	});
	it('extracts integer param', () => {
		expect(getTokenParam('<integer [1,5]>')).toEqual({ min: 1, max: 5 });
	});
	it('returns undefined for unknown', () => {
		expect(getTokenParam('auto')).toBeUndefined();
	});
});

describe('getTokenValue', () => {
	it('returns default value for known token', () => {
		expect(getTokenValue('<length>')).toBe('0px');
		expect(getTokenValue('<color>')).toBe('#ffffff');
		expect(getTokenValue('<angle>')).toBe('0deg');
		expect(getTokenValue('<percentage>')).toBe('0%');
		expect(getTokenValue('<number>')).toBe('0.0');
		expect(getTokenValue('<integer>')).toBe('0');
		expect(getTokenValue('<flex>')).toBe('1fr');
		expect(getTokenValue('<ratio>')).toBe('1/1');
		expect(getTokenValue('<link>')).toBe('"https://example.com/image.png"');
	});
	
    it('returns keyword as value', () => {
		expect(getTokenValue('auto')).toBe('auto');
	});

	it('returns undefined for unknown', () => {
		expect(getTokenParam('')).toBeUndefined();
	});
});

describe('getTokenValues', () => {
	it('returns default values for array of tokens', () => {
		expect(getTokenValues(['<length>', '<color>', '<angle>'])).toEqual(['0px', '#ffffff', '0deg']);
		expect(getTokenValues(['<number>', '<integer>'])).toEqual(['0.0', '0']);
	});
});
