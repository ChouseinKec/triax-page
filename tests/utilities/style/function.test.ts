import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';

describe('extractFunctionName', () => {
  it('extracts function name from valid CSS function', () => {
    expect(extractFunctionName('fit-content(100px)')).toBe('fit-content');
    expect(extractFunctionName('repeat(1,100px)')).toBe('repeat');
    expect(extractFunctionName('minmax(10px, 1fr)')).toBe('minmax');
    expect(extractFunctionName('rgb(255, 0, 0)')).toBe('rgb');
    expect(extractFunctionName('foo-bar(abc)')).toBe('foo-bar');
    expect(extractFunctionName('func123(abc)')).toBe('func123');
  });
  it('returns undefined for invalid function', () => {
    expect(extractFunctionName('notAFunction')).toBeUndefined();
    expect(extractFunctionName('foo bar(abc)')).toBeUndefined();
    expect(extractFunctionName('foo(')).toBe('foo'); // still matches, but incomplete
    expect(extractFunctionName('()')).toBeUndefined();
    expect(extractFunctionName('')).toBeUndefined();
  });
});

describe('extractFunctionValue', () => {
  it('extracts function value from valid CSS function', () => {
    expect(extractFunctionValue('fit-content(100px)')).toBe('100px');
    expect(extractFunctionValue('repeat(1,100px)')).toBe('1,100px');
    expect(extractFunctionValue('minmax(10px, 1fr)')).toBe('10px, 1fr');
    expect(extractFunctionValue('rgb(255, 0, 0)')).toBe('255, 0, 0');
    expect(extractFunctionValue('foo-bar(abc)')).toBe('abc');
    expect(extractFunctionValue('func123(abc)')).toBe('abc');
    expect(extractFunctionValue('foo()')).toBe('');
  });
  it('returns undefined for invalid function', () => {
    expect(extractFunctionValue('notAFunction')).toBeUndefined();
    expect(extractFunctionValue('foo bar(abc)')).toBeUndefined();
    expect(extractFunctionValue('()')).toBeUndefined();
    expect(extractFunctionValue('')).toBeUndefined();
  });
});
