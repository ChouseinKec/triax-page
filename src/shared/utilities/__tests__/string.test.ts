// Utilities
import { splitAdvanced, joinAdvanced, extractBetween, toKebabCase } from '../string';

describe('splitAdvanced', () => {
	// Splits by single separator
	it('should split by single separator', () => {
		const result = splitAdvanced('a|b|c', '|');
		expect(result).toEqual(['a', 'b', 'c']);
	});

	// Splits by multiple separators
	it('should split by multiple separators', () => {
		const result = splitAdvanced('a b|c d', ['|', ' ']);
		expect(result).toEqual(['a', 'b', 'c', 'd']);
	});

	// Does not split inside square brackets
	it('should not split inside square brackets', () => {
		const result = splitAdvanced('a [b|c] d|e', ['|', ' ']);
		expect(result).toEqual(['a', '[b|c]', 'd', 'e']);
	});

	// Does not split inside round brackets/parentheses
	it('should not split inside parentheses', () => {
		const result = splitAdvanced('x(y z) a|b', [' ', '|']);
		expect(result).toEqual(['x(y z)', 'a', 'b']);
	});

	// Does not split inside angle brackets
	it('should not split inside angle brackets', () => {
		const result = splitAdvanced('a <b> c|d', ['|', ' ']);
		expect(result).toEqual(['a', '<b>', 'c', 'd']);
	});

	// Does not split inside curly braces
	it('should not split inside curly braces', () => {
		const result = splitAdvanced('a {b|c} d|e', ['|', ' ']);
		expect(result).toEqual(['a', '{b|c}', 'd', 'e']);
	});

	// Does not split inside quotes
	it('should not split inside quoted strings', () => {
		const result = splitAdvanced('foo "bar baz"|qux', ['|', ' ']);
		expect(result).toEqual(['foo', '"bar baz"', 'qux']);
	});

	// Handles nested brackets
	it('should handle nested brackets correctly', () => {
		const result = splitAdvanced('a [b [c] d]|e', '|');
		expect(result).toEqual(['a [b [c] d]', 'e']);
	});

	// Handles mixed bracket types
	it('should handle mixed bracket types', () => {
		const result = splitAdvanced('a [b (c {d})] e|f', '|');
		expect(result).toEqual(['a [b (c {d})] e', 'f']);
	});

	// Returns empty array for empty string
	it('should return empty array for empty string', () => {
		const result = splitAdvanced('', '|');
		expect(result).toEqual([]);
	});

	// Trims whitespace from results
	it('should trim whitespace from results', () => {
		const result = splitAdvanced('  a  |  b  |  c  ', '|');
		expect(result).toEqual(['a', 'b', 'c']);
	});

	// Handles no matching separators
	it('should handle string with no matching separators', () => {
		const result = splitAdvanced('abc', '|');
		expect(result).toEqual(['abc']);
	});
});

describe('joinAdvanced', () => {
	// Joins values with corresponding separators
	it('should join values with corresponding separators', () => {
		const result = joinAdvanced(['a', 'b', 'c'], [' ', '|']);
		expect(result).toEqual('a b|c');
	});

	// Uses space separator when no separators provided
	it('should use space separator when no separators provided', () => {
		const result = joinAdvanced(['a', 'b', 'c'], []);
		expect(result).toEqual('a b c');
	});

	// Handles single value
	it('should handle single value', () => {
		const result = joinAdvanced(['a'], []);
		expect(result).toEqual('a');
	});

	// Handles fewer separators than values
	it('should handle fewer separators than values', () => {
		const result = joinAdvanced(['a', 'b', 'c'], ['|']);
		expect(result).toEqual('a|bc');
	});

	// Trims trailing whitespace
	it('should trim trailing whitespace', () => {
		const result = joinAdvanced(['a', 'b'], [' ']);
		expect(result).toBe('a b');
	});

	// Handles empty array
	it('should handle empty array', () => {
		const result = joinAdvanced([], []);
		expect(result).toEqual('');
	});

	// Handles numeric-like string values
	it('should handle numeric-like string values', () => {
		const result = joinAdvanced(['10px', 'auto'], [' ']);
		expect(result).toEqual('10px auto');
	});
});

describe('extractBetween', () => {
	// Extracts content between parentheses
	it('should extract content between parentheses', () => {
		const result = extractBetween('text (content) more', '()');
		expect(result).toBe('content');
	});

	// Extracts first occurrence between parentheses
	it('should extract first occurrence between parentheses', () => {
		const result = extractBetween('text (content1) more (content2) end', '()');
		expect(result).toBe('content1');
	});

	// Handles nested parentheses
	it('should handle nested parentheses correctly', () => {
		const result = extractBetween('outer (inner (nested) content) more', '()');
		expect(result).toBe('inner (nested) content');
	});

	// Extracts content between square brackets
	it('should extract content between square brackets', () => {
		const result = extractBetween('data [array1] text [array2]', '[]');
		expect(result).toBe('array1');
	});

	// Extracts content between curly braces
	it('should extract content between curly braces', () => {
		const result = extractBetween('config {prop: value} end', '{}');
		expect(result).toBe('prop: value');
	});

	// Extracts content between angle brackets
	it('should extract content between angle brackets', () => {
		const result = extractBetween('type <Generic> name', '<>');
		expect(result).toBe('Generic');
	});

	// Returns undefined when no matching symbols
	it('should return undefined when no matching symbols found', () => {
		const result = extractBetween('text without symbols', '()');
		expect(result).toBeUndefined();
	});

	// Returns undefined for unmatched opening symbol
	it('should return undefined for unmatched opening symbol', () => {
		const result = extractBetween('text (unmatched', '()');
		expect(result).toBeUndefined();
	});

	// Handles empty content between symbols
	it('should handle empty content between symbols', () => {
		const result = extractBetween('text () more', '()');
		expect(result).toBe('');
	});

	// Handles multiple nested levels
	it('should handle deeply nested symbols', () => {
		const result = extractBetween('a (b (c (d) e) f) g', '()');
		expect(result).toBe('b (c (d) e) f');
	});
});

describe('toKebabCase', () => {
	// Converts camelCase to kebab-case
	it('should convert camelCase to kebab-case', () => {
		expect(toKebabCase('myVariableName')).toBe('my-variable-name');
		expect(toKebabCase('camelCaseString')).toBe('camel-case-string');
	});

	// Converts PascalCase to kebab-case
	it('should convert PascalCase to kebab-case', () => {
		expect(toKebabCase('MyClassName')).toBe('my-class-name');
	});

	// Converts spaces to hyphens
	it('should convert spaces to hyphens', () => {
		expect(toKebabCase('hello world')).toBe('hello-world');
		expect(toKebabCase('multiple spaced words')).toBe('multiple-spaced-words');
	});

	// Converts underscores to hyphens
	it('should convert underscores to hyphens', () => {
		expect(toKebabCase('hello_world')).toBe('hello-world');
		expect(toKebabCase('snake_case_string')).toBe('snake-case-string');
	});

	// Handles multiple consecutive spaces/underscores
	it('should handle multiple consecutive spaces/underscores', () => {
		expect(toKebabCase('hello   world')).toBe('hello-world');
		expect(toKebabCase('hello___world')).toBe('hello-world');
	});

	// Converts mixed case with spaces and underscores
	it('should handle mixed case with spaces and underscores', () => {
		expect(toKebabCase('MyVariable Name')).toBe('my-variable-name');
		expect(toKebabCase('Hello_World_Test')).toBe('hello-world-test');
	});

	// Converts already lowercase strings
	it('should handle already lowercase strings', () => {
		expect(toKebabCase('hello')).toBe('hello');
		expect(toKebabCase('hello-world')).toBe('hello-world');
	});

	// Handles uppercase only
	it('should handle uppercase only', () => {
		expect(toKebabCase('HELLO')).toBe('hello');
	});

	// Handles empty strings
	it('should handle empty strings', () => {
		expect(toKebabCase('')).toBe('');
	});

	// Handles single character
	it('should handle single character', () => {
		expect(toKebabCase('a')).toBe('a');
		expect(toKebabCase('A')).toBe('a');
	});
});
