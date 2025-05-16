import {
	//
	isLetters,
	isNumeric,
	extractBetween,
	clearSpaces,
	isCamelCase,
	canCamelCase,
	toCamelCase,
} from './string';

describe('isLetters', () => {
	it('returns true for alphabetic strings with internal hyphens only', () => {
		expect(isLetters('auto')).toBe(true);
		expect(isLetters('inherit')).toBe(true);
		expect(isLetters('min-content')).toBe(true);
		expect(isLetters('A-B-C')).toBe(true);
		expect(isLetters('flex-start-center')).toBe(true);
		expect(isLetters('z')).toBe(true);
	});

	it('returns false for strings starting or ending with hyphens', () => {
		expect(isLetters('-auto')).toBe(false);
		expect(isLetters('bold-')).toBe(false);
		expect(isLetters('-a-b')).toBe(false);
		expect(isLetters('a-b-')).toBe(false);
	});

	it('returns false for strings with numbers or symbols', () => {
		expect(isLetters('min(1px)')).toBe(false);
		expect(isLetters('var(--x)')).toBe(false);
		expect(isLetters('100vw')).toBe(false);
		expect(isLetters('font_bold')).toBe(false);
		expect(isLetters('has space')).toBe(false);
		expect(isLetters('')).toBe(false);
	});

	it('returns false for non-string types', () => {
		expect(isLetters(123)).toBe(false);
		expect(isLetters(null)).toBe(false);
		expect(isLetters(undefined)).toBe(false);
		expect(isLetters(true)).toBe(false);
		expect(isLetters({})).toBe(false);
		expect(isLetters([])).toBe(false);
	});
});

describe('isNumeric', () => {
	it('should return false for non-string/non-number inputs', () => {
		expect(isNumeric(true)).toBe(false); // boolean
		expect(isNumeric(NaN)).toBe(false); // NaN
		expect(isNumeric(Infinity)).toBe(false); // Infinity
		expect(isNumeric(-Infinity)).toBe(false); // -Infinity
		expect(isNumeric(new Date())).toBe(false); // date object
		expect(isNumeric([])).toBe(false); // empty array
		expect(isNumeric({})).toBe(false); // object
		expect(isNumeric(undefined)).toBe(false); // undefined
		expect(isNumeric(null)).toBe(false); // null
	});

	it('should return true for finite numbers', () => {
		expect(isNumeric(123)).toBe(true); // valid number
		expect(isNumeric(0)).toBe(true); // zero
		expect(isNumeric(-100)).toBe(true); // negative number
	});

	it('should return false for NaN and Infinity', () => {
		expect(isNumeric(NaN)).toBe(false); // NaN
		expect(isNumeric(Infinity)).toBe(false); // Infinity
	});

	it('should return true for numeric strings', () => {
		expect(isNumeric('123')).toBe(true); // string with number
		expect(isNumeric('  456.78  ')).toBe(true); // string with number and whitespace
		expect(isNumeric('0')).toBe(true); // string with zero
	});

	it('should return false for non-numeric strings', () => {
		expect(isNumeric('abc')).toBe(false); // non-numeric string
		expect(isNumeric('123abc')).toBe(false); // mixed string
		expect(isNumeric(' ')).toBe(false); // space
	});

	it('should return true for valid number values as strings', () => {
		expect(isNumeric('123.45')).toBe(true); // valid decimal
		expect(isNumeric('  -99  ')).toBe(true); // valid negative number
	});
});

describe('extractBetween', () => {
	// Simple extraction
	it('should extract text between specified start and end symbols', () => {
		expect(extractBetween('hello(world)', '(', ')')).toBe('world');
		expect(extractBetween('array[0]', '[', ']')).toBe('0');
		expect(extractBetween('{key: value}', '{', '}')).toBe('key: value');
	});

	// Nested structures
	it('should handle nested structures and return the correct extracted value', () => {
		expect(extractBetween('translateX(var(--sm))', '(', ')')).toBe('var(--sm)');
		expect(extractBetween('data[value[5]]', '[', ']')).toBe('value[5]');
		expect(extractBetween('nested({a:1})', '{', '}')).toBe('a:1');
	});

	// Edge cases
	it('should handle edge cases correctly', () => {
		expect(extractBetween('no delimiters', '[', ']')).toBeNull(); // No delimiters
		expect(extractBetween('unbalanced(value', '(', ')')).toBeNull(); // Unbalanced parentheses
		expect(extractBetween('wrong)order(', '(', ')')).toBeNull(); // Wrong order of delimiters
		expect(extractBetween('', '{', '}')).toBeNull(); // Empty string
		expect(extractBetween('same[]', '[', '[')).toBeNull(); // Invalid delimiters (same start and end)
		expect(extractBetween('nested((a))', '(', ')')).toBe('(a)'); // Nested parentheses
	});

	// Real-world CSS examples
	it('should extract correct text from real-world CSS examples', () => {
		expect(extractBetween('var(--primary-color)', '(', ')')).toBe('--primary-color');
		expect(extractBetween('calc(100% - 2rem)', '(', ')')).toBe('100% - 2rem');
		expect(extractBetween("url('image.png')", '(', ')')).toBe("'image.png'");
	});
});

describe('clearSpaces', () => {
	// Basic usage
	it('should remove all spaces between words', () => {
		expect(clearSpaces('  hello  world  ')).toBe('helloworld');
	});

	it('should remove all spaces between characters', () => {
		expect(clearSpaces('a b c d e')).toBe('abcde');
	});

	// Preserve non-space characters
	it('should preserve commas and numbers', () => {
		expect(clearSpaces('1,2,3,4')).toBe('1,2,3,4');
	});

	it('should preserve hyphens', () => {
		expect(clearSpaces('a-b-c')).toBe('a-b-c');
	});

	// Handle all whitespace characters
	it('should remove tabs', () => {
		expect(clearSpaces('hello\tworld')).toBe('helloworld');
	});

	it('should remove newlines', () => {
		expect(clearSpaces('hello\nworld')).toBe('helloworld');
	});

	it('should remove carriage return and newline combos', () => {
		expect(clearSpaces('hello\r\nworld')).toBe('helloworld');
	});

	// Edge cases
	it('should return empty string if input is empty', () => {
		expect(clearSpaces('')).toBe('');
	});

	it('should return empty string if input is only spaces', () => {
		expect(clearSpaces('    ')).toBe('');
	});

	it('should return empty string if input is whitespace of different types', () => {
		expect(clearSpaces(' \t\n\r ')).toBe('');
	});

	// Real-world scenarios
	it('should compact CSS-like strings by removing spaces', () => {
		expect(clearSpaces('  font-size: 16px;  ')).toBe('font-size:16px;');
		expect(clearSpaces('background-color: #ffffff;')).toBe('background-color:#ffffff;');
		expect(clearSpaces('  margin : 0 auto ; ')).toBe('margin:0auto;');
	});

	// Preserve special characters
	it('should preserve math and punctuation symbols', () => {
		expect(clearSpaces('a + b = c')).toBe('a+b=c');
	});

	it('should preserve email format', () => {
		expect(clearSpaces('user@example.com')).toBe('user@example.com');
	});
});

describe('isCamelCase', () => {
	// Valid cases
	test('returns true for valid camelCase', () => {
		expect(isCamelCase('camelCase')).toBe(true);
		expect(isCamelCase('htmlElement')).toBe(true);
		expect(isCamelCase('aLongVariableName')).toBe(true);
		expect(isCamelCase('camelCASE')).toBe(true);
		expect(isCamelCase('aB')).toBe(true);
	});

	test('returns true for valid lowercase words', () => {
		expect(isCamelCase('width')).toBe(true);
		expect(isCamelCase('height')).toBe(true);
		expect(isCamelCase('x')).toBe(true);
		expect(isCamelCase('a')).toBe(true);
	});

	// Invalid cases
	test('returns false for strings starting with uppercase', () => {
		expect(isCamelCase('CamelCase')).toBe(false);
	});

	test('returns false for strings with special characters', () => {
		expect(isCamelCase('camel-case')).toBe(false);
		expect(isCamelCase('camel case')).toBe(false);
		expect(isCamelCase('camel_case')).toBe(false);
		expect(isCamelCase('camel@Case')).toBe(false);
	});

	test('returns false for strings with numbers', () => {
		expect(isCamelCase('camel1Case')).toBe(false);
	});

	test('returns false for empty string', () => {
		expect(isCamelCase('')).toBe(false);
	});
});

describe('canCamelCase', () => {
	// Strings that CAN be camelCased
	test('returns true for strings with hyphens', () => {
		expect(canCamelCase('background-color')).toBe(true);
		expect(canCamelCase('a-b')).toBe(true);
		expect(canCamelCase('-')).toBe(true);
	});

	test('returns true for strings with spaces', () => {
		expect(canCamelCase('font size')).toBe(true);
		expect(canCamelCase(' ')).toBe(true);
	});

	test('returns true for strings with special characters', () => {
		expect(canCamelCase('border*width')).toBe(true);
		expect(canCamelCase('padding&margin')).toBe(true);
		expect(canCamelCase('hello@world')).toBe(true);
		expect(canCamelCase('money$bags')).toBe(true);
		expect(canCamelCase('crazy#hash')).toBe(true);
		expect(canCamelCase('try!this')).toBe(true);
	});

	// Strings that CANNOT be camelCased
	test('returns false for strings that are already camelCase or plain', () => {
		expect(canCamelCase('backgroundColor')).toBe(false);
		expect(canCamelCase('width')).toBe(false);
		expect(canCamelCase('camelCase')).toBe(false);
		expect(canCamelCase('')).toBe(false);
	});

	test('returns false for strings with underscores', () => {
		expect(canCamelCase('a_b')).toBe(false);
		expect(canCamelCase('snake_case')).toBe(false);
	});
});

describe('toCamelCase', () => {
	// Basic conversions
	test('converts hyphen-separated strings to camelCase', () => {
		expect(toCamelCase('background-color')).toBe('backgroundColor');
		expect(toCamelCase('font-size')).toBe('fontSize');
		expect(toCamelCase('border-width')).toBe('borderWidth');
	});

	test('converts space-separated strings to camelCase', () => {
		expect(toCamelCase('font size')).toBe('fontSize');
		expect(toCamelCase('border radius')).toBe('borderRadius');
	});

	test('converts strings with multiple separators to camelCase', () => {
		expect(toCamelCase('border-top-width')).toBe('borderTopWidth');
		expect(toCamelCase('margin-right-size')).toBe('marginRightSize');
		expect(toCamelCase('a-b-c')).toBe('aBC');
	});

	// Edge cases
	test('removes leading/trailing whitespace before conversion', () => {
		expect(toCamelCase('  padding  ')).toBe('padding');
	});

	test('handles vendor prefixes', () => {
		expect(toCamelCase('-webkit-transform')).toBe('webkitTransform');
	});

	test('returns empty string unchanged', () => {
		expect(toCamelCase('')).toBe('');
	});

	// Already camelCased or non-transformable
	test('returns camelCase or simple lowercase as is', () => {
		expect(toCamelCase('backgroundColor')).toBe('backgroundColor');
		expect(toCamelCase('fontSize')).toBe('fontSize');
		expect(toCamelCase('borderStyle')).toBe('borderStyle');
		expect(toCamelCase('width')).toBe('width');
	});

	test('returns numeric strings unchanged', () => {
		expect(toCamelCase('123')).toBe('123');
	});

	// Complex punctuation
	test('converts special character separation to camelCase', () => {
		expect(toCamelCase('padding&margin')).toBe('paddingMargin');
		expect(toCamelCase('font@size')).toBe('fontSize');
		expect(toCamelCase('hello!world')).toBe('helloWorld');
		expect(toCamelCase('crazy#hash')).toBe('crazyHash');
	});
});
