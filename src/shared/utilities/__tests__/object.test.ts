import { pluckUnique, groupBy } from '../object';

describe('pluckUnique', () => {
  it('should return unique values for a given property', () => {
    const array = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 },
      { type: 'c', value: 4 },
    ];
    const result = pluckUnique(array, 'type');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty array', () => {
    const result = pluckUnique([], 'type');
    expect(result).toEqual([]);
  });

  it('should handle array with single item', () => {
    const array = [{ type: 'a', value: 1 }];
    const result = pluckUnique(array, 'type');
    expect(result).toEqual(['a']);
  });
});

describe('groupBy', () => {
  it('should group objects by a given property', () => {
    const array = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 },
      { type: 'c', value: 4 },
    ];
    const result = groupBy(array, 'type');
    expect(result).toEqual({
      a: [
        { type: 'a', value: 1 },
        { type: 'a', value: 3 },
      ],
      b: [{ type: 'b', value: 2 }],
      c: [{ type: 'c', value: 4 }],
    });
  });

  it('should handle empty array', () => {
    const result = groupBy([], 'type');
    expect(result).toEqual({});
  });

  it('should handle array with single item', () => {
    const array = [{ type: 'a', value: 1 }];
    const result = groupBy(array, 'type');
    expect(result).toEqual({
      a: [{ type: 'a', value: 1 }],
    });
  });
});