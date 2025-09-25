import { extractFunctionName, extractFunctionArgs } from '@/src/page-builder/core/block/style/utilities/function';

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

describe('extractFunctionArgs', () => {
  it('extracts function value from valid CSS function', () => {
    expect(extractFunctionArgs('fit-content(100px)')).toBe('100px');
    expect(extractFunctionArgs('repeat(1,100px)')).toBe('1,100px');
    expect(extractFunctionArgs('minmax(10px, 1fr)')).toBe('10px, 1fr');
    expect(extractFunctionArgs('rgb(255, 0, 0)')).toBe('255, 0, 0');
    expect(extractFunctionArgs('foo-bar(abc)')).toBe('abc');
    expect(extractFunctionArgs('func123(abc)')).toBe('abc');
    expect(extractFunctionArgs('foo()')).toBe('');
  });
  it('returns undefined for invalid function', () => {
    expect(extractFunctionArgs('notAFunction')).toBeUndefined();
    expect(extractFunctionArgs('foo bar(abc)')).toBeUndefined();
    expect(extractFunctionArgs('()')).toBeUndefined();
    expect(extractFunctionArgs('')).toBeUndefined();
  });
});
