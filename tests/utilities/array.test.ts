import { generateCrossProduct, generateAllSubsets, generatePermutations, getColumnSets, groupBy, mergeArrays } from '@/utilities/array';


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

describe('getColumnSets', () => {
  it('returns unique values for each column', () => {
    const rows = [
      ['a', 'b'],
      ['a', 'c'],
      ['d', 'b']
    ];
    expect(getColumnSets(rows)).toEqual([
      ['a', 'd'],
      ['b', 'c']
    ]);
  });
  it('handles uneven row lengths', () => {
    const rows = [
      ['a', 'b', 'x'],
      ['a', 'c'],
      ['d', 'b', 'y']
    ];
    expect(getColumnSets(rows)).toEqual([
      ['a', 'd'],
      ['b', 'c'],
      ['x', 'y']
    ]);
  });
  it('returns [] for empty input', () => {
    expect(getColumnSets([])).toEqual([]);
  });
});

describe('groupBy', () => {
  it('groups objects by property', () => {
    const arr = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 }
    ];
    expect(groupBy(arr, 'type')).toEqual({
      a: [
        { type: 'a', value: 1 },
        { type: 'a', value: 3 }
      ],
      b: [
        { type: 'b', value: 2 }
      ]
    });
  });
  it('handles empty array', () => {
    expect(groupBy([], 'type')).toEqual({});
  });
});

describe('mergeArrays', () => {
  it('fills missing values from reference', () => {
    expect(mergeArrays([undefined, 'b', null, ''], ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
    expect(mergeArrays(['x'], ['a', 'b', 'c'])).toEqual(['x', 'b', 'c']);
  });
  it('preserves existing values', () => {
    expect(mergeArrays(['x', 'y', 'z'], ['a', 'b', 'c'])).toEqual(['x', 'y', 'z']);
  });
  it('handles empty target', () => {
    expect(mergeArrays([], ['a', 'b'])).toEqual(['a', 'b']);
  });
  it('handles empty reference', () => {
    expect(mergeArrays(['x', undefined], [])).toEqual([]);
  });
});
