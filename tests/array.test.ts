import { generateCrossProduct, generateAllSubsets, generatePermutations } from '@/utilities/array/array';


describe('generateCrossProduct', () => {
	it('returns cross product of two arrays', () => {
		expect(
			generateCrossProduct([
				['1', '2'],
				['a', 'b'],
			])
		).toEqual([
			['1', 'a'],
			['1', 'b'],
			['2', 'a'],
			['2', 'b'],
		]);
	});
	it('returns cross product of three arrays', () => {
		expect(
			generateCrossProduct([
				['1', '2'],
				['a', 'b'],
				['x', 'y'],
			])
		).toEqual([
			['1', 'a', 'x'],
			['1', 'a', 'y'],
			['1', 'b', 'x'],
			['1', 'b', 'y'],
			['2', 'a', 'x'],
			['2', 'a', 'y'],
			['2', 'b', 'x'],
			['2', 'b', 'y'],
		]);
	});
	it('returns [[]] for empty input', () => {
		expect(generateCrossProduct([])).toEqual([[]]);
	});
});

describe('generateAllSubsets', () => {
	it('returns all subsets of a 2-element array', () => {
		const result = generateAllSubsets(['a', 'b']);
		expect(result).toEqual([[], ['a'], ['b'], ['a', 'b']]);
	});
	it('returns all subsets of a 3-element array', () => {
		const result = generateAllSubsets(['a', 'b', 'c']);
		expect(result).toEqual([[], ['a'], ['b'], ['a', 'b'], ['c'], ['a', 'c'], ['b', 'c'], ['a', 'b', 'c']]);
	});
	it('returns [[]] for empty array', () => {
		expect(generateAllSubsets([])).toEqual([[]]);
	});
});

describe('generatePermutations', () => {
	it('returns all permutations of a 2-element array', () => {
		expect(generatePermutations(['a', 'b'])).toEqual([
			['a', 'b'],
			['b', 'a'],
		]);
	});
	it('returns all permutations of a 3-element array', () => {
		expect(generatePermutations(['a', 'b', 'c'])).toEqual([
			['a', 'b', 'c'],
			['a', 'c', 'b'],
			['b', 'a', 'c'],
			['b', 'c', 'a'],
			['c', 'a', 'b'],
			['c', 'b', 'a'],
		]);
	});
	it('returns [[]] for empty array', () => {
		expect(generatePermutations([])).toEqual([[]]);
	});
});
