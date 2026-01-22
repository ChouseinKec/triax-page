// // Utilities
// import { isTokenKeyword, isTokenLength, isTokenInteger, isTokenNumber, isTokenFunction, isTokenColor, isTokenLink, getTokenType, getTokenCanonical, getTokenBase, getTokenRange, getTokenParam, getTokenValue, getTokenValues, expandTokens } from '@/core/block/style/instance/utilities/token';

// // Mock icons to avoid JSX in tests
// jest.mock('@/core/block/style/constants/icon', () => ({
// 	STYLE_ICON_DEFINITIONS: {},
// }));

// describe('isTokenKeyword', () => {
// 	it('returns true for keywords', () => {
// 		expect(isTokenKeyword('auto')).toBe(true);
// 		expect(isTokenKeyword('fit-content')).toBe(true);
// 	});
// 	it('returns false for non-keywords', () => {
// 		expect(isTokenKeyword('10px')).toBe(false);
// 	});
// });

// describe('isTokenLength', () => {
// 	it('returns true for length tokens', () => {
// 		expect(isTokenLength('<length>')).toBe(true);
// 		expect(isTokenLength('<percentage>')).toBe(true);
// 		expect(isTokenLength('<angle>')).toBe(true);
// 		expect(isTokenLength('<flex>')).toBe(true);
// 	});
// 	it('returns false for non-length tokens', () => {
// 		expect(isTokenLength('10px')).toBe(false);
// 	});
// });

// describe('isTokenInteger', () => {
// 	it('returns true for integer token', () => {
// 		expect(isTokenInteger('<integer>')).toBe(true);
// 	});
// 	it('returns false for non-integer token', () => {
// 		expect(isTokenInteger('<number>')).toBe(false);
// 	});
// });

// describe('isTokenNumber', () => {
// 	it('returns true for number token', () => {
// 		expect(isTokenNumber('<number>')).toBe(true);
// 	});
// 	it('returns false for non-number token', () => {
// 		expect(isTokenNumber('<integer>')).toBe(false);
// 	});
// });

// describe('isTokenFunction', () => {
// 	it('returns true for function token', () => {
// 		expect(isTokenFunction('fit-content(10px)')).toBe(true);
// 		expect(isTokenFunction('calc(100% - 20px)')).toBe(true);
// 	});
// 	it('returns false for non-function token', () => {
// 		expect(isTokenFunction('10px')).toBe(false);
// 	});
// });

// describe('isTokenColor', () => {
// 	it('returns true for color token', () => {
// 		expect(isTokenColor('<color>')).toBe(true);
// 	});
// 	it('returns false for non-color token', () => {
// 		expect(isTokenColor('rgb(0 0 0)')).toBe(false);
// 	});
// });

// describe('isTokenLink', () => {
// 	it('returns true for link token', () => {
// 		expect(isTokenLink('<link>')).toBe(true);
// 	});
// 	it('returns false for non-link token', () => {
// 		expect(isTokenLink('https://example.com/img.png')).toBe(false);
// 	});
// });

// describe('getTokenCanonical', () => {
// 	it('returns canonical form for tokens', () => {
// 		expect(getTokenCanonical('fit-content(<length> <percentage>)')).toBe('fit-content()');
// 		expect(getTokenCanonical('<length [0,10]>')).toBe('<length>');
// 		expect(getTokenCanonical('auto')).toBe('auto');
// 	});
// 	it('returns undefined for non-token', () => {
// 		expect(getTokenCanonical('10px')).toBeUndefined();
// 	});
// });

// describe('getTokenBase', () => {
// 	it('returns base for tokens', () => {
// 		expect(getTokenBase('<length [0,10]>')).toBe('length');
// 		expect(getTokenBase('fit-content(<length> <percentage>)')).toBe('fit-content');
// 		expect(getTokenBase('auto')).toBe('auto');
// 	});
// 	it('returns undefined for non-token', () => {
// 		expect(getTokenBase('10px')).toBeUndefined();
// 	});
// });

// describe('getTokenRange', () => {
// 	it('returns range for ranged tokens', () => {
// 		expect(getTokenRange('<length [0,10]>')).toBe('[0,10]');
// 	});
// 	it('returns undefined for non-ranged tokens', () => {
// 		expect(getTokenRange('fit-content(<length> <percentage>)')).toBeUndefined();
// 	});
// });

// describe('getTokenParam', () => {
// 	it('returns params for function and ranged tokens', () => {
// 		expect(getTokenParam('fit-content(<length> <percentage>)')).toEqual({ type: 'function', syntax: '<length> <percentage>' });
// 		expect(getTokenParam('<length [0,10]>')).toEqual({ type: 'range', min: 0, max: 10 });
// 		expect(getTokenParam('<number [1,15]>')).toEqual({ type: 'range', min: 1, max: 15 });
// 	});
// 	it('returns undefined for non-token', () => {
// 		expect(getTokenParam('auto')).toBeUndefined();
// 	});
// });

// describe('getTokenType', () => {
// 	it('returns token type for valid tokens', () => {
// 		expect(getTokenType('auto')).toBe('keyword');
// 		expect(getTokenType('<length>')).toBe('length');
// 		expect(getTokenType('fit-content(10px)')).toBe('function');
// 		expect(getTokenType('<integer>')).toBe('integer');
// 		expect(getTokenType('<number>')).toBe('number');
// 		expect(getTokenType('<link>')).toBe('link');
// 	});
// 	it('returns undefined for non-token', () => {
// 		expect(getTokenType('10px')).toBeUndefined();
// 	});
// });

// describe('getTokenValue', () => {
// 	it('returns default value for token', () => {
// 		expect(getTokenValue('<length>')).toBeDefined();
// 		expect(getTokenValue('<color>')).toBeDefined();
// 		expect(getTokenValue('<number>')).toBeDefined();
// 		expect(getTokenValue('auto')).toBe('auto');
// 	});
// 	it('returns undefined for non-token', () => {
// 		expect(getTokenValue('10px')).toBeUndefined();
// 	});
// });

// describe('getTokenValues', () => {
// 	it('returns array of default values for tokens', () => {
// 		const vals = getTokenValues(['<length>', '<color>', '<angle>', '10px']);
// 		expect(vals).toEqual(expect.arrayContaining(['0px', '#ffffff', '0deg']));
// 		expect(vals.includes('10px')).toBe(false);
// 	});
// });

// describe('expandTokens', () => {
// 	it('returns expanded tokens for known tokens', () => {
// 		const res = expandTokens('auto || <ratio>');
// 		expect(res).toContain('auto || <number [0,∞]> [ / <number [0,∞]> ]');
// 	});
// 	it('propagates ranges to expanded tokens', () => {
// 		const res = expandTokens('<ratio [0,10]>');
// 		expect(res).toContain('<number [0,∞] [0,10]> [ / <number [0,∞] [0,10]> ]');
// 	});
// 	it('returns input for unknown tokens', () => {
// 		const res = expandTokens('foo || <bar>');
// 		expect(res).toBe('foo || <bar>');
// 	});
// 	it('handles empty string', () => {
// 		expect(expandTokens('')).toBe('');
// 	});
// });
