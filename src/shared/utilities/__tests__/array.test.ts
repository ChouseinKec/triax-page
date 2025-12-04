// Utilities
import { generateCrossProduct, generateAllSubsets, generatePermutations, getColumnSets, groupBy, mergeArrays } from '../array';

describe('generateCrossProduct', () => {
	// Returns empty array of empty arrays when input is empty
	it('should return [[]] for empty array of arrays', () => {
		expect(generateCrossProduct([])).toEqual([[]]);
	});

	// Generates cross product of two arrays
	it('should generate cross product of two arrays', () => {
		const result = generateCrossProduct([
			['1', '2'],
			['a', 'b'],
		]);
		expect(result).toEqual([
			['1', 'a'],
			['1', 'b'],
			['2', 'a'],
			['2', 'b'],
		]);
	});

	// Generates cross product of three arrays
	it('should generate cross product of three arrays', () => {
		const result = generateCrossProduct([['1', '2'], ['a'], ['x', 'y']]);
		expect(result).toEqual([
			['1', 'a', 'x'],
			['1', 'a', 'y'],
			['2', 'a', 'x'],
			['2', 'a', 'y'],
		]);
	});

	// Generates cross product with single-element arrays
	it('should handle single-element arrays', () => {
		const result = generateCrossProduct([[1], [2], [3]]);
		expect(result).toEqual([[1, 2, 3]]);
	});

	// Generates cross product with one empty array in the list
	it('should return empty result when one array is empty', () => {
		const result = generateCrossProduct([['1', '2'], [], ['a']]);
		expect(result).toEqual([]);
	});
});

describe('generateAllSubsets', () => {
	// Returns only empty set for empty array
	it('should return [[]] for empty array', () => {
		expect(generateAllSubsets([])).toEqual([[]]);
	});

	// Generates all subsets of single element array
	it('should generate all subsets of single element array', () => {
		const result = generateAllSubsets(['a']);
		expect(result).toEqual([[], ['a']]);
	});

	// Generates all subsets of two element array
	it('should generate all subsets of two element array', () => {
		const result = generateAllSubsets(['a', 'b']);
		expect(result).toEqual([[], ['a'], ['b'], ['a', 'b']]);
	});

	// Generates all subsets of three element array
	it('should generate all subsets of three element array', () => {
		const result = generateAllSubsets(['a', 'b', 'c']);
		expect(result).toHaveLength(8);
		expect(result).toContainEqual([]);
		expect(result).toContainEqual(['a']);
		expect(result).toContainEqual(['b']);
		expect(result).toContainEqual(['c']);
		expect(result).toContainEqual(['a', 'b']);
		expect(result).toContainEqual(['a', 'c']);
		expect(result).toContainEqual(['b', 'c']);
		expect(result).toContainEqual(['a', 'b', 'c']);
	});

	// Generates 2^n subsets for array of length n
	it('should generate 2^n subsets for array of length n', () => {
		const result = generateAllSubsets([1, 2, 3, 4]);
		expect(result).toHaveLength(16);
	});
});

describe('generatePermutations', () => {
	// Returns empty permutation for empty array
	it('should return [[]] for empty array', () => {
		expect(generatePermutations([])).toEqual([[]]);
	});

	// Generates single permutation for single element array
	it('should return single permutation for single element', () => {
		expect(generatePermutations(['a'])).toEqual([['a']]);
	});

	// Generates all permutations of two element array
	it('should generate all permutations of two element array', () => {
		const result = generatePermutations(['a', 'b']);
		expect(result).toEqual([
			['a', 'b'],
			['b', 'a'],
		]);
	});

	// Generates all permutations of three element array
	it('should generate all permutations of three element array', () => {
		const result = generatePermutations(['a', 'b', 'c']);
		expect(result).toHaveLength(6);
		expect(result).toContainEqual(['a', 'b', 'c']);
		expect(result).toContainEqual(['a', 'c', 'b']);
		expect(result).toContainEqual(['b', 'a', 'c']);
		expect(result).toContainEqual(['b', 'c', 'a']);
		expect(result).toContainEqual(['c', 'a', 'b']);
		expect(result).toContainEqual(['c', 'b', 'a']);
	});

	// Generates n! permutations for array of length n
	it('should generate n! permutations for array of length n', () => {
		const result = generatePermutations(['a', 'b', 'c', 'd']);
		expect(result).toHaveLength(24);
	});
});

describe('getColumnSets', () => {
	// Returns empty array for empty rows
	it('should return empty array for empty rows', () => {
		expect(getColumnSets([])).toEqual([]);
	});

	// Extracts unique values from columns
	it('should extract unique values from each column', () => {
		const result = getColumnSets([
			['a', 'b'],
			['a', 'c'],
			['d', 'b'],
		]);
		expect(result).toEqual([
			['a', 'd'],
			['b', 'c'],
		]);
	});

	// Handles single row
	it('should handle single row', () => {
		const result = getColumnSets([['x', 'y', 'z']]);
		expect(result).toEqual([['x'], ['y'], ['z']]);
	});

	// Handles rows with different lengths
	it('should handle rows with different lengths', () => {
		const result = getColumnSets([['a', 'b', 'c'], ['d']]);
		expect(result).toHaveLength(3);
		expect(result[0]).toContainEqual('a');
		expect(result[0]).toContainEqual('d');
	});

	// Preserves order of first appearance
	it('should preserve order of first appearance', () => {
		const result = getColumnSets([
			['z', 'y'],
			['x', 'w'],
		]);
		expect(result[0]).toEqual(['z', 'x']);
		expect(result[1]).toEqual(['y', 'w']);
	});

	// Handles numeric values
	it('should handle numeric values in columns', () => {
		const result = getColumnSets([
			[1, 2],
			[1, 3],
			[2, 2],
		]);
		expect(result).toEqual([
			[1, 2],
			[2, 3],
		]);
	});
});

describe('groupBy', () => {
	// Groups objects by property
	it('should group objects by a given property', () => {
		const result = groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type');
		expect(result).toEqual({
			a: [{ type: 'a' }, { type: 'a' }],
			b: [{ type: 'b' }],
		});
	});

	// Returns empty object for empty array
	it('should return empty object for empty array', () => {
		expect(groupBy([], 'type')).toEqual({});
	});

	// Groups with numeric property values
	it('should group objects with numeric property values', () => {
		const result = groupBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id');
		expect(result).toEqual({
			'1': [{ id: 1 }, { id: 1 }],
			'2': [{ id: 2 }],
		});
	});

	// Groups with boolean property values
	it('should group objects with boolean property values', () => {
		const result = groupBy([{ active: true }, { active: false }, { active: true }], 'active');
		expect(result).toEqual({
			true: [{ active: true }, { active: true }],
			false: [{ active: false }],
		});
	});

	// Groups objects with multiple properties
	it('should group objects by one property while preserving others', () => {
		const result = groupBy(
			[
				{ type: 'a', value: 1 },
				{ type: 'a', value: 2 },
				{ type: 'b', value: 3 },
			],
			'type'
		);
		expect(result['a']).toHaveLength(2);
		expect(result['b']).toHaveLength(1);
		expect(result['a'][0]).toEqual({ type: 'a', value: 1 });
	});

	// Preserves insertion order within groups
	it('should preserve insertion order within groups', () => {
		const result = groupBy(
			[
				{ type: 'a', order: 1 },
				{ type: 'b', order: 2 },
				{ type: 'a', order: 3 },
			],
			'type'
		);
		expect(result['a']).toEqual([
			{ type: 'a', order: 1 },
			{ type: 'a', order: 3 },
		]);
	});
});

describe('mergeArrays', () => {
	// Fills undefined values with reference array values
	it('should fill undefined values with reference array', () => {
		const result = mergeArrays([undefined, 'b', undefined], ['a', 'b', 'c']);
		expect(result).toEqual(['a', 'b', 'c']);
	});

	// Fills null values with reference array values
	it('should fill null values with reference array', () => {
		const result = mergeArrays([null, 'b', null], ['a', 'b', 'c']);
		expect(result).toEqual(['a', 'b', 'c']);
	});

	// Fills empty strings with reference array values
	it('should fill empty strings with reference array', () => {
		const result = mergeArrays(['', 'b', ''], ['a', 'b', 'c']);
		expect(result).toEqual(['a', 'b', 'c']);
	});

	// Preserves non-empty values in target
	it('should preserve non-empty values from target array', () => {
		const result = mergeArrays(['x', 'b', 'y'], ['a', 'b', 'c']);
		expect(result).toEqual(['x', 'b', 'y']);
	});

	// Handles mixed undefined, null, and empty string
	it('should handle mixed undefined, null, and empty string', () => {
		const result = mergeArrays([undefined, null, '', 'd'], ['a', 'b', 'c', 'd']);
		expect(result).toEqual(['a', 'b', 'c', 'd']);
	});

	// Handles target array shorter than reference
	it('should handle target array shorter than reference', () => {
		const result = mergeArrays(['x'], ['a', 'b', 'c']);
		expect(result).toEqual(['x', 'b', 'c']);
	});

	// Returns array of same length as reference
	it('should return array of same length as reference array', () => {
		const result = mergeArrays([undefined, undefined], ['a', 'b', 'c']);
		expect(result).toHaveLength(3);
	});

	// Handles numeric values
	it('should handle numeric values in arrays', () => {
		const result = mergeArrays([undefined, 2, null], [1, 2, 3]);
		expect(result).toEqual([1, 2, 3]);
	});
});
