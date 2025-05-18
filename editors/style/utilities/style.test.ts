import { STYLE_VALUE, STYLE_VALUE_SYNTAX } from '@/editors/style/constants/types';
import {
	//
	extractNumber,
	extractLength,
	extractValue,
	extractFunction,
	extractSeparator,
	splitMultiValue,
	updateMultiValue,
	deleteMultiValue,
	isLengthScalable,
	isLengthKeyword,
	isLengthFunction,
	isFunctionVariable,
	isKeywordValid,
	isFunctionValid,
	isURLValid,
	getStyleOptionByValue,
} from './style';

describe('extractNumber', () => {
	// Basic cases
	it('should extract numeric value when the string starts with a number', () => {
		expect(extractNumber('10px')).toBe('10');
		expect(extractNumber('-10.5rem')).toBe('-10.5');
		expect(extractNumber('50%')).toBe('50');
		expect(extractNumber('0.123abc')).toBe('0.123');
	});

	// Non-numeric or invalid cases
	it('should return empty string for non-numeric or invalid cases', () => {
		expect(extractNumber('abc123')).toBe('');
		expect(extractNumber(' 10px')).toBe('');
		expect(extractNumber('')).toBe('');
		expect(extractNumber('px10')).toBe('');
		expect(extractNumber('--10px')).toBe('');
		expect(extractNumber('NaN')).toBe('');
	});

	// Edge cases with decimals and signs
	it('should handle decimal and sign edge cases', () => {
		expect(extractNumber('.5px')).toBe(''); // must start with digit
		expect(extractNumber('-0.0001px')).toBe('-0.0001');
		expect(extractNumber('+10px')).toBe(''); // does not handle '+' sign
		expect(extractNumber('10.10.10px')).toBe('10.10'); // stops at second decimal
	});

	// No suffix cases
	it('should return the number itself when no suffix is present', () => {
		expect(extractNumber('123')).toBe('123');
		expect(extractNumber('-456')).toBe('-456');
	});

	// Multiple numbers (only first occurrence at start is considered)
	it('should return only the first number when multiple numbers are present', () => {
		expect(extractNumber('10px20')).toBe('10');
	});
});

describe('extractLength', () => {
	it('should extract basic CSS lengths', () => {
		expect(extractLength('10px')).toBe('px');
		expect(extractLength('20%')).toBe('%');
		expect(extractLength('-3.5rem')).toBe('rem');
		expect(extractLength('0.5vh')).toBe('vh');
		expect(extractLength('100vw')).toBe('vw');
		expect(extractLength('10foo')).toBe('foo');
		expect(extractLength('10ms')).toBe('ms');
		expect(extractLength('10deg')).toBe('deg');
	});

	it('should handle hyphenated lengths (CSS keywords)', () => {
		expect(extractLength('max-content')).toBe('max-content');
		expect(extractLength('min-content')).toBe('min-content');
		expect(extractLength('fit-content(10px)')).toBe('fit-content()');
		expect(extractLength('repeat(2, 1fr)')).toBe('repeat()');
	});

	it('should handle parentheses functions correctly', () => {
		expect(extractLength('calc(100% - 10px)')).toBe('calc()');
		expect(extractLength('var(--padding)')).toBe('var()');
		expect(extractLength('url(image.png)')).toBe('url()');
	});

	it('should handle edge cases correctly', () => {
		expect(extractLength('vh10rem')).toBe('vh');
		expect(extractLength('10px-20rem')).toBe('px');
		expect(extractLength('10px20rem')).toBe('px');
		expect(extractLength('123')).toBe('');
		expect(extractLength('')).toBe('');
		expect(extractLength('  20em  ')).toBe('em');
	});
});

describe('extractValue', () => {
	// Basic function calls
	it('should return the value inside parentheses for basic function calls', () => {
		expect(extractValue('repeat(1,10px)')).toBe('1,10px');
		expect(extractValue('fit-content(10px)')).toBe('10px');
		expect(extractValue('scaleZ(1)')).toBe('1');
	});

	// Nested function calls
	it('should return the value inside parentheses, handling nested function calls', () => {
		expect(extractValue('minmax(min(0px,0px),0px)')).toBe('min(0px,0px),0px');
		expect(extractValue('repeat(1,minmax(1px,min(0px,0px)))')).toBe('1,minmax(1px,min(0px,0px))');
	});

	// Mathematical expressions
	it('should return the value inside parentheses for mathematical expressions', () => {
		expect(extractValue('calc(10px + 5px)')).toBe('10px + 5px');
		expect(extractValue('clamp(1px, 2px, 3px)')).toBe('1px, 2px, 3px');
	});

	// Non-function strings
	it('should return the original string for non-function input', () => {
		expect(extractValue('10px')).toBe('10px');
		expect(extractValue('no-parens')).toBe('no-parens');
	});

	// Multiple function calls/complex strings
	it('should return the original string for multiple function calls or complex strings', () => {
		expect(extractValue('10px 10px 10px rgba(1,1,1,1)')).toBe('10px 10px 10px rgba(1,1,1,1)');
		expect(extractValue('var(--placeholder) 0px 0px rgba(0,0,0,0)')).toBe('var(--placeholder) 0px 0px rgba(0,0,0,0)');
	});

	// Edge cases
	it('should handle edge cases correctly', () => {
		expect(extractValue('invalid(1,2')).toBe('invalid(1,2'); // unmatched parentheses
		expect(extractValue('empty()')).toBe(''); // empty parentheses
		expect(extractValue('(standalone)')).toBe('(standalone)'); // no function name
		expect(extractValue('')).toBe(''); // empty string
		expect(extractValue('   ')).toBe('   '); // whitespace
	});
});

describe('extractFunction', () => {
	// Single function wrappers
	it('should return the wrapper name for single function calls', () => {
		expect(extractFunction('var(--test)')).toBe('var');
		expect(extractFunction('rgba(0,0,0,0)')).toBe('rgba');
		expect(extractFunction('fit-content(10px)')).toBe('fit-content');
	});

	// Nested function wrappers
	it('should return the outermost wrapper name for nested function calls', () => {
		expect(extractFunction('repeat(1,minmax(min(var(--placeholder),0px),0px))')).toBe('repeat');
		expect(extractFunction('calc(var(--x) + 10px)')).toBe('calc');
	});

	// Non-wrapped values
	it('should return an empty string for non-wrapped values', () => {
		expect(extractFunction('10px')).toBe('');
		expect(extractFunction('0px 0px 0px rgba(0,0,0,0)')).toBe('');
		expect(extractFunction('var(--test) var(--test)')).toBe('');
	});

	// Edge cases
	it('should handle edge cases correctly', () => {
		expect(extractFunction('')).toBe(''); // empty string
		expect(extractFunction('   ')).toBe(''); // whitespace
		expect(extractFunction('invalid(name')).toBe(''); // unmatched parentheses
		expect(extractFunction('name(valid)extra')).toBe(''); // no valid wrapper
		expect(extractFunction('(standalone)')).toBe(''); // no valid function name
	});
});

describe('extractSeparator', () => {
	// Space-separated values
	it('should detect space as separator', () => {
		expect(extractSeparator('1px 2px 3px')).toBe(' ');
		expect(extractSeparator('red green blue')).toBe(' ');
	});

	// Comma-separated values
	it('should detect comma as separator', () => {
		expect(extractSeparator('red, green, blue')).toBe(',');
		expect(extractSeparator('1px,2px,3px')).toBe(',');
	});

	// Slash-separated values
	it('should detect slash as separator', () => {
		expect(extractSeparator('1/2/3')).toBe('/');
		expect(extractSeparator('Arial/sans-serif')).toBe('/');
	});

	// Mixed separators – first top-level one wins
	it('should return the first top-level separator in mixed input', () => {
		expect(extractSeparator('1px, 2px | 3px')).toBe(',');
		expect(extractSeparator('1px / 2px, 3px')).toBe(' ');
	});

	// Should ignore separators inside functions
	it('should ignore characters inside parentheses', () => {
		expect(extractSeparator('rgb(255, 0, 0), hsl(120, 100%, 50%)')).toBe(',');
		expect(extractSeparator('var(--space) var(--size)')).toBe(' ');
	});

	// Edge cases
	it('should return undefined when no clear separator is found', () => {
		expect(extractSeparator('')).toBeUndefined();
		expect(extractSeparator('no-separator')).toBeUndefined();
		expect(extractSeparator('(a,b,c)')).toBeUndefined();
		expect(extractSeparator('var(--value)var(--other)')).toBeUndefined();
		expect(extractSeparator('1px2px3px')).toBeUndefined();
	});

	it('should return undefined when :// is found', () => {
		expect(extractSeparator('https://google.com')).toBeUndefined();
		expect(extractSeparator('http://google.com')).toBeUndefined();
		expect(extractSeparator('ftp://google.com')).toBeUndefined();
	});

	// Separator outside of function call
	it('should detect separator if used outside of function', () => {
		expect(extractSeparator('a,b(c,d)e,f')).toBe(',');
	});
});

describe('splitMultiValue', () => {
	// Basic splitting with comma separator
	it('should split string by comma, ignoring parentheses', () => {
		expect(splitMultiValue('1px, 2px, 3px', ',')).toEqual(['1px', '2px', '3px']);
	});

	// Auto-detects space separator when none specified
	it('should split string by space if no separator provided', () => {
		expect(splitMultiValue('1px 2px 3px', ' ')).toEqual(['1px', '2px', '3px']);
	});

	// Preserves function contents
	it('should preserve function contents when splitting by comma', () => {
		expect(splitMultiValue('rgb(255,0,0), hsl(120,100%,50%)', ',')).toEqual(['rgb(255,0,0)', 'hsl(120,100%,50%)']);
	});

	// Handles nested parentheses
	it('should handle nested parentheses when splitting by comma', () => {
		expect(splitMultiValue('1px, calc(2px + (3px / 2)), 4px', ',')).toEqual(['1px', 'calc(2px + (3px / 2))', '4px']);
	});

	// Works with space separators
	it('should split by space and preserve content inside parentheses', () => {
		expect(splitMultiValue('red rgb(255 0 0) blue', ' ')).toEqual(['red', 'rgb(255 0 0)', 'blue']);
	});

	// Trims whitespace from results
	it('should trim whitespace from the result', () => {
		expect(splitMultiValue(' 1px , 2px , 3px ', ',')).toEqual(['1px', '2px', '3px']);
	});

	// Edge cases
	it('should return an empty array for an empty string', () => {
		expect(splitMultiValue('', ' ')).toEqual([]);
	});

	it('should return a single-element array when the input has no separators', () => {
		expect(splitMultiValue('value', ' ')).toEqual(['value']);
	});

	it('should handle cases where there are parentheses inside the string', () => {
		expect(splitMultiValue('a(b,c)d,e', ',')).toEqual(['a(b,c)d', 'e']);
	});

	// Complex CSS examples
	it('should handle CSS var() functions correctly', () => {
		expect(splitMultiValue('var(--x), var(--y), linear-gradient(red, blue)', ',')).toEqual(['var(--x)', 'var(--y)', 'linear-gradient(red, blue)']);
	});

	it('should split by slash correctly', () => {
		expect(splitMultiValue('1px 2px / 3px 4px', '/')).toEqual(['1px 2px', '3px 4px']);
	});
});

describe('updateMultiValue', () => {
	// Basic replacements
	it('should update a value in space-separated strings', () => {
		expect(updateMultiValue('1px 2px 3px', '4px', 1, ' ')).toBe('1px 4px 3px');
	});

	it('should update a value in comma-separated strings', () => {
		expect(updateMultiValue('red,green,blue', 'yellow', 2, ',')).toBe('red,green,yellow');
	});

	it('should update first item correctly', () => {
		expect(updateMultiValue('a b c', 'x', 0, ' ')).toBe('x b c');
	});

	// Function boundary awareness
	it('should not split inside functions like rgba()', () => {
		expect(updateMultiValue('rgba(255,0,0,1) 0px 0px', 'rgba(0,255,0,1)', 0, ' ')).toBe('rgba(0,255,0,1) 0px 0px');
	});

	it('should handle nested functions like calc()', () => {
		expect(updateMultiValue('calc(10px + 5px) var(--gap)', '20px', 1, ' ')).toBe('calc(10px + 5px) 20px');
	});

	// CSS variables
	it('should update values with CSS vars', () => {
		expect(updateMultiValue('var(--x) var(--y)', 'var(--z)', 1, ' ')).toBe('var(--x) var(--z)');
	});

	// Edge cases
	it('should return new value if input is empty', () => {
		expect(updateMultiValue('', 'value', 0, '')).toBe('value');
	});

	it('should replace sole value in single entry', () => {
		expect(updateMultiValue('single', 'new', 0, '')).toBe('new');
	});

	it('should not update if index is out of bounds', () => {
		expect(updateMultiValue('a b c', 'x', 5, ' ')).toBe('a b c');
	});

	// Complex CSS patterns
	it('should update mid-value with complex CSS functions', () => {
		expect(updateMultiValue('1px solid rgba(255,255,255,0.5)', 'dashed', 1, ' ')).toBe('1px dashed rgba(255,255,255,0.5)');
	});

	it('should update var() value with a long shadow replacement', () => {
		expect(updateMultiValue('var(--shadow) 0 0', '2px 2px 5px rgba(0,0,0,0.3)', 0, ' ')).toBe('2px 2px 5px rgba(0,0,0,0.3) 0 0');
	});

	// Custom separator
	it('should work with custom separator like |', () => {
		expect(updateMultiValue('left|top|right', 'center', 1, '|')).toBe('left|center|right');
	});

	// Auto-detect fallback separator
	it('should fallback to space if no separator is clear', () => {
		expect(updateMultiValue('abc', 'xyz', 0, ' ')).toBe('xyz');
	});
});

describe('deleteMultiValue', () => {
	// Basic deletions
	it('should delete the middle value from a space-separated string', () => {
		expect(deleteMultiValue('1px 2px 3px', 1, ' ')).toBe('1px 3px');
	});

	it('should delete the first value from a comma-separated string', () => {
		expect(deleteMultiValue('red,green,blue', 0, ',')).toBe('green,blue');
	});

	it('should delete the last value from a pipe-separated string', () => {
		expect(deleteMultiValue('left|top|right', 2, '|')).toBe('left|top');
	});

	// Preserving functions / parentheses
	it('should not split inside rgba() and delete correct value', () => {
		expect(deleteMultiValue('rgba(255,0,0,1) 0px 0px', 1, ' ')).toBe('rgba(255,0,0,1) 0px');
	});

	it('should preserve calc() and delete middle value', () => {
		expect(deleteMultiValue('calc(10px + 5px) var(--gap) 1rem', 1, ' ')).toBe('calc(10px + 5px) 1rem');
	});

	// CSS variables
	it('should delete var() usage cleanly', () => {
		expect(deleteMultiValue('var(--x) var(--y) var(--z)', 1, ' ')).toBe('var(--x) var(--z)');
	});

	// Edge cases
	it('should return an empty string if single value is deleted', () => {
		expect(deleteMultiValue('single', 0, ' ')).toBe('');
	});

	it('should return an empty string if input is empty', () => {
		expect(deleteMultiValue('', 0, ' ')).toBe('');
	});

	it('should return original string if index is out of bounds', () => {
		expect(deleteMultiValue('a b c', 5, ' ')).toBe('a b c');
	});

	// Complex CSS patterns
	it('should delete middle value and preserve rgba()', () => {
		expect(deleteMultiValue('1px solid rgba(255,255,255,0.5)', 1, ' ')).toBe('1px rgba(255,255,255,0.5)');
	});

	it('should delete var() and preserve remaining values', () => {
		expect(deleteMultiValue('var(--shadow) 0 0', 0, ' ')).toBe('0 0');
	});

	// Chained deletions
	it('should support chained deletions', () => {
		const firstPass = deleteMultiValue('1px 2px 3px 4px', 1, ' ');
		const secondPass = deleteMultiValue(firstPass, 2, ' ');
		expect(secondPass).toBe('1px 3px');
	});

	// Custom separators
	it('should handle different separators like slash', () => {
		expect(deleteMultiValue('1px/2px/3px', 1, '/')).toBe('1px/3px');
	});
});

describe('isLengthScalable', () => {
	it('returns true for valid CSS number+length formats', () => {
		expect(isLengthScalable('10px')).toBe(true);
		expect(isLengthScalable('-2.5rem')).toBe(true);
		expect(isLengthScalable('0.25%')).toBe(true);
		expect(isLengthScalable('100vw')).toBe(true);
		expect(isLengthScalable('-0.5em')).toBe(true);
	});

	it('returns false for strings missing numbers or lengths', () => {
		expect(isLengthScalable('px')).toBe(false);
		expect(isLengthScalable('10')).toBe(false);
		expect(isLengthScalable('0')).toBe(false);
	});

	it('returns false for improperly formatted values', () => {
		expect(isLengthScalable('10 px')).toBe(false);
		expect(isLengthScalable('10px ')).toBe(false);
		expect(isLengthScalable('10px;')).toBe(false);
		expect(isLengthScalable('10em10')).toBe(false);
		expect(isLengthScalable('10em-5')).toBe(false);
	});

	it('returns false for non-scalable CSS expressions and keywords', () => {
		expect(isLengthScalable('var(--x)')).toBe(false);
		expect(isLengthScalable('auto')).toBe(false);
	});
});

describe('isLengthKeyword', () => {
	it('returns true for valid letter-only or hyphenated CSS-like keywords', () => {
		expect(isLengthKeyword('auto')).toBe(true);
		expect(isLengthKeyword('inherit')).toBe(true);
		expect(isLengthKeyword('min-content')).toBe(true);
		expect(isLengthKeyword('flex-start')).toBe(true);
	});

	it('returns false for values with numbers or invalid characters', () => {
		expect(isLengthKeyword('100vw')).toBe(false);
		expect(isLengthKeyword('10px')).toBe(false);
		expect(isLengthKeyword('var(--x)')).toBe(false);
		expect(isLengthKeyword('min(1px)')).toBe(false);
		expect(isLengthKeyword('font_bold')).toBe(false);
		expect(isLengthKeyword('has space')).toBe(false);
		expect(isLengthKeyword('')).toBe(false);
	});

	it('returns false for non-string inputs', () => {
		expect(isLengthKeyword(null as never)).toBe(false);
		expect(isLengthKeyword(undefined as never)).toBe(false);
		expect(isLengthKeyword(123 as never)).toBe(false);
		expect(isLengthKeyword(true as never)).toBe(false);
		expect(isLengthKeyword({} as never)).toBe(false);
		expect(isLengthKeyword([] as never)).toBe(false);
	});
});

describe('isLengthFunction', () => {
	it('returns true for valid length-related function expressions', () => {
		expect(isLengthFunction('min(0px, 10px)')).toBe(true);
		expect(isLengthFunction('translateX(10px)')).toBe(true);
		expect(isLengthFunction('clamp(1px,2px,3px)')).toBe(true);
		expect(isLengthFunction('calc(100% - 10px)')).toBe(true);
		expect(isLengthFunction('var(--some-var)')).toBe(true);
	});

	it('returns false for excluded functions like rgb, hsl', () => {
		expect(isLengthFunction('rgb(255,0,0)')).toBe(false);
		expect(isLengthFunction('rgba(255,0,0,0.5)')).toBe(false);
		expect(isLengthFunction('hsl(120, 100%, 50%)')).toBe(false);
		expect(isLengthFunction('hsla(120, 100%, 50%, 0.5)')).toBe(false);
	});

	it('returns false for non-functional strings', () => {
		expect(isLengthFunction('10px')).toBe(false);
		expect(isLengthFunction('1rem')).toBe(false);
		expect(isLengthFunction('justify-center')).toBe(false);
		expect(isLengthFunction('')).toBe(false);
		expect(isLengthFunction('somefunction')).toBe(false);
		expect(isLengthFunction('min')).toBe(false); // no parentheses
	});

	it('returns false for malformed function strings', () => {
		expect(isLengthFunction('min(0px,')).toBe(false); // unclosed parentheses
		expect(isLengthFunction('clamp 1px,2px,3px)')).toBe(false); // missing opening paren
		expect(isLengthFunction('max 0px, 10px')).toBe(false); // no parentheses
	});
});

describe('isFunctionVariable', () => {
	it('returns true for valid CSS variable functions', () => {
		expect(isFunctionVariable('var(--primary-color)')).toBe(true);
		expect(isFunctionVariable('var(--spacing-md)')).toBe(true);
		expect(isFunctionVariable('var(--font-size, 16px)')).toBe(true);
		expect(isFunctionVariable('var(--color-500, #ffffff)')).toBe(true);
		expect(isFunctionVariable('var(--border-2px, 2px solid)')).toBe(true);
	});

	it('returns false for malformed variable names', () => {
		expect(isFunctionVariable('var(--)')).toBe(false);
		expect(isFunctionVariable('var(-invalid-name)')).toBe(false);
		expect(isFunctionVariable('var(--2-start-with-number)')).toBe(false);
		expect(isFunctionVariable('var(color-red)')).toBe(false);
		expect(isFunctionVariable('var(--color red)')).toBe(false);
	});

	it('returns false for invalid formatting or syntax', () => {
		expect(isFunctionVariable('var( --space )')).toBe(false);
		expect(isFunctionVariable('var(--valid-name, )')).toBe(false);
		expect(isFunctionVariable('var(--name,   )')).toBe(false);
		expect(isFunctionVariable('var(--name,)')).toBe(false);
		expect(isFunctionVariable('var(--name,    )')).toBe(false);
	});

	it('returns false for strings that don’t match function structure', () => {
		expect(isFunctionVariable('--primary-color')).toBe(false);
		expect(isFunctionVariable('var--primary-color')).toBe(false);
		expect(isFunctionVariable('variable(--primary-color)')).toBe(false);
		expect(isFunctionVariable('var()')).toBe(false);
		expect(isFunctionVariable('')).toBe(false);
	});
});

describe('isKeywordValid', () => {
	const options: STYLE_VALUE[] = [
		{
			name: 'block',
			value: 'block',
			syntax: 'keyword',
		},

		{
			name: 'flex',
			value: 'flex',
			syntax: 'keyword',
		},

		{
			name: 'center',
			value: 'center',
			syntax: 'keyword',
		},
	];
	it('returns true for valid CSS keywords in ALL_KEYWORDS', () => {
		// Example of valid keywords in the set

		expect(isKeywordValid('block', options)).toBe(true); // Assuming 'block' is in the set
		expect(isKeywordValid('flex', options)).toBe(true); // Assuming 'flex' is in the set
		expect(isKeywordValid('center', options)).toBe(true); // Assuming 'inline' is in the set
	});

	it('returns false for invalid CSS keywords not in ALL_KEYWORDS', () => {
		// Example of invalid keywords not in the set
		expect(isKeywordValid('invalidKeyword', options)).toBe(false);
		expect(isKeywordValid('nonexistent', options)).toBe(false);
		expect(isKeywordValid('xyz', options)).toBe(false);
	});
});

describe('isFunctionValid', () => {
	let option: STYLE_VALUE;

	describe('basic function patterns', () => {
		test.each([
			['url("https://google.com")', 'function(url)' as STYLE_VALUE_SYNTAX],
			['min(0px,0px)', 'function(length,length)' as STYLE_VALUE_SYNTAX],
			['max(0px,0px)', 'function(length,length)' as STYLE_VALUE_SYNTAX],
			['minmax(0px,0px)', 'function(length,length)' as STYLE_VALUE_SYNTAX],
			['fit-content(0px)', 'function(length)' as STYLE_VALUE_SYNTAX],
			['scaleZ(0)', 'function(number)' as STYLE_VALUE_SYNTAX],
			['repeat(1,0px)', 'function(number,length)' as STYLE_VALUE_SYNTAX],
			['clamp(0px,0px,0px)', 'function(length,length,length)' as STYLE_VALUE_SYNTAX],
		])('returns true for valid function: %s with syntax: %s', (value, syntax) => {
			option = { name: '', value: '', syntax };
			expect(isFunctionValid(value, option)).toBe(true);
		});
	});

	describe('nested functions', () => {
		it('returns true for nested repeat(1,minmax(0px,0px)) and fit-content()', () => {
			option = {
				name: 'repeat()',
				value: 'repeat(1,0px)',
				syntax: 'function(number,length)',
				lengths: [
					{ name: 'minmax()', value: 'minmax(0px,0px)', syntax: 'function(length,length)' },
					{ name: 'fit-content()', value: 'fit-content(0px)', syntax: 'function(length)' },
					{ name: 'var()', value: 'var(--placeholder)', syntax: 'variable' },
				],
			};

			expect(isFunctionValid('repeat(1,minmax(0px,0px))', option)).toBe(true);
			expect(isFunctionValid('repeat(1,fit-content(10px))', option)).toBe(true);
			expect(isFunctionValid('repeat(1,var(--placeholder))', option)).toBe(true);
		});

		it('returns true for minmax(min(0px,0px),0px)', () => {
			option = {
				name: 'minmax()',
				value: 'minmax(0px,0px)',
				syntax: 'function(length,length)',
				lengths: [
					{ name: 'min()', value: 'min(0px,0px)', syntax: 'function(length,length)' },
					{ name: 'px', value: '0px', syntax: 'length' },
				],
			};

			expect(isFunctionValid('minmax(0px,min(0px,0px))', option)).toBe(true);
		});

		it('returns true for deeply nested repeat(1,minmax(min(0px,var(--placeholder)),0px))', () => {
			option = {
				name: 'repeat()',
				value: 'repeat(1,px)',
				syntax: 'function(number,length)',
				lengths: [
					{
						name: 'minmax()',
						value: 'minmax(0px,0px)',
						syntax: 'function(length,length)',
						lengths: [
							{
								name: 'min()',
								value: 'min(0px,0px)',
								syntax: 'function(length,length)',
								lengths: [
									{ name: 'var()', value: 'var(--placeholder)', syntax: 'variable' },
									{ name: 'px', value: '0px', syntax: 'length' },
								],
							},
							{ name: 'px', value: '0px', syntax: 'length' },
						],
					},
				],
			};

			expect(isFunctionValid('repeat(1,minmax(min(0px,var(--placeholder)),0px))', option)).toBe(true);
		});
	});

	describe('invalid patterns', () => {
		test.each([
			['url("google.c")', 'function(url)' as STYLE_VALUE_SYNTAX],
			['url("google")', 'function(url)' as STYLE_VALUE_SYNTAX],
			['min()', 'function(length,length)' as STYLE_VALUE_SYNTAX],
			['repeat(1,)', 'function(number,length)' as STYLE_VALUE_SYNTAX],
			['clamp(0px)', 'function(length,length,length)' as STYLE_VALUE_SYNTAX],
			['scaleZ(a)', 'function(number)' as STYLE_VALUE_SYNTAX], // not a number
			['fit-content()', 'function(length)' as STYLE_VALUE_SYNTAX],
			['repeat(1,unknown(0px))', 'function(number,length)' as STYLE_VALUE_SYNTAX],
			['', 'function(length)' as STYLE_VALUE_SYNTAX],
		])('returns false for invalid input %s with pattern %s', (value, syntax) => {
			option = { name: '', value: '', syntax };
			expect(isFunctionValid(value, option)).toBe(false);
		});
	});
});

describe('isURLValid', () => {
	it('returns true for valid URLs', () => {
		// Standard URL formats
		expect(isURLValid('https://example.com')).toBe(true);
		expect(isURLValid('http://localhost:3000')).toBe(true);
		expect(isURLValid('https://sub.domain.co.uk/path?query=value')).toBe(true);
	});

	it('returns true for quoted URLs', () => {
		// URL wrapped in various quote types
		expect(isURLValid('"https://example.com"')).toBe(true);
		expect(isURLValid("'http://site.com'")).toBe(true);
	});

	it('returns false for invalid URLs', () => {
		// Malformed or incomplete URLs
		expect(isURLValid('`ftp://files.org`')).toBe(false);
		expect(isURLValid('https://user:pass@example.com')).toBe(false);

		expect(isURLValid('example.com')).toBe(false); // Missing protocol
		expect(isURLValid('https://')).toBe(false); // Missing domain
		expect(isURLValid('justastring')).toBe(false);
		expect(isURLValid('url("example.com")')).toBe(false); // CSS function syntax
	});

	it('returns false for empty or whitespace-only strings', () => {
		// Edge cases
		expect(isURLValid('')).toBe(false);
		expect(isURLValid('   ')).toBe(false);
		expect(isURLValid('\n\t')).toBe(false);
	});

	it('handles special cases correctly', () => {
		// URLs with special characters
		expect(isURLValid('https://example.com/pa%20th')).toBe(true);
		expect(isURLValid('"https://site.com/?q=search+term"')).toBe(true);
		expect(isURLValid('http://192.168.1.1')).toBe(true);
		expect(isURLValid('data:image/png;base64,...')).toBe(false); // Data URLs not typically handled by basic validation
	});
});

describe('getStyleOptionByValue', () => {
	// Basic numeric matches
	it('should find exact numeric matches', () => {
		const options: STYLE_VALUE[] = [
			{ value: '100', name: 'Thin', syntax: 'length' },
			{ value: '200', name: 'Bold', syntax: 'length' },
		];
		expect(getStyleOptionByValue('100', options)).toEqual({ value: '100', name: 'Thin', syntax: 'length' });
		expect(getStyleOptionByValue('200', options)).toEqual({ value: '200', name: 'Bold', syntax: 'length' });
	});

	// Basic non-numeric matches (length comparison)
	it('should match values with same length when non-numeric', () => {
		const options: STYLE_VALUE[] = [
			{ value: '10px', name: 'Small', syntax: 'length' },
			{ value: '10%', name: 'Medium', syntax: 'length' },
			{ value: 'auto', name: 'Auto', syntax: 'keyword' },
		];

		expect(getStyleOptionByValue('10px', options)).toEqual({ value: '10px', name: 'Small', syntax: 'length' });
		expect(getStyleOptionByValue('10%', options)).toEqual({ value: '10%', name: 'Medium', syntax: 'length' });
		expect(getStyleOptionByValue('auto', options)).toEqual({ value: 'auto', name: 'Auto', syntax: 'keyword' });
	});

	// No match cases
	it('should return undefined when no match found', () => {
		const options: STYLE_VALUE[] = [
			{ value: '20rem', name: 'Medium', syntax: 'length' },
			{ value: 'normal', name: 'Normal', syntax: 'keyword' },
			{ value: 'bold', name: 'Bold', syntax: 'keyword' },
		];
		expect(getStyleOptionByValue('italic', options)).toBeUndefined();
		expect(getStyleOptionByValue('100', options)).toBeUndefined();
		expect(getStyleOptionByValue('20%', options)).toBeUndefined();
	});

	// Single option cases
	it('should return the single option regardless of value', () => {
		const singleOption: STYLE_VALUE[] = [{ value: '400', name: 'Regular', syntax: 'number' }];
		expect(getStyleOptionByValue('100', singleOption)).toEqual({ value: '400', name: 'Regular', syntax: 'number' });
		expect(getStyleOptionByValue('abc', singleOption)).toEqual({ value: '400', name: 'Regular', syntax: 'number' });
	});

	// Edge cases
	it('should handle empty or invalid options', () => {
		expect(getStyleOptionByValue('100', [])).toBeUndefined();
		expect(getStyleOptionByValue('100', null as any)).toBeUndefined();
	});

	it('should handle empty or invalid values', () => {
		const options: STYLE_VALUE[] = [
			{ value: '10px', name: 'Small', syntax: 'length' },
			{ value: '20px', name: 'Large', syntax: 'length' },
		];
		expect(getStyleOptionByValue('', options)).toBeUndefined();
		expect(getStyleOptionByValue(null as any, options)).toBeUndefined();
	});

	// Mixed cases
	it('should handle mixed numeric and non-numeric options correctly', () => {
		const mixedOptions: STYLE_VALUE[] = [
			{ value: '100px', name: 'px', syntax: 'length' },
			{ value: '100', name: '100', syntax: 'length' },
			{ value: 'bold', name: 'Bold', syntax: 'keyword' },
		];

		expect(getStyleOptionByValue('100', mixedOptions)).toEqual({ value: '100', name: '100', syntax: 'length' });
		expect(getStyleOptionByValue('100px', mixedOptions)).toEqual({ value: '100px', name: 'px', syntax: 'length' });
		expect(getStyleOptionByValue('bold', mixedOptions)).toEqual({ value: 'bold', name: 'Bold', syntax: 'keyword' });
	});
});
