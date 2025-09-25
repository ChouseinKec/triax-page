import { getValueType, getValueTokens, getValueToken } from '@/src/page-builder/core/block/style/utilities';

describe('getValueType', () => {
  it('detects keyword', () => {
    expect(getValueType('auto')).toBe('keyword');
    expect(getValueType('inherit')).toBe('keyword');
  });
  it('detects function', () => {
    expect(getValueType('fit-content(10px)')).toBe('function');
    expect(getValueType('minmax(10px, 1fr)')).toBe('function');
  });
  it('detects dimension', () => {
    expect(getValueType('10px')).toBe('dimension');
    expect(getValueType('25%')).toBe('dimension');
  });
  it('detects color', () => {
    expect(getValueType('#fff')).toBe('color');
    expect(getValueType('rgba(255, 0, 0)')).toBe('color');
    expect(getValueType('hsl(120, 100%, 50%)')).toBe('color');
  });
  it('detects integer', () => {
    expect(getValueType('10')).toBe('integer');
    expect(getValueType('-5')).toBe('integer');
  });
  it('detects number', () => {
    expect(getValueType('10.5')).toBe('number');
    expect(getValueType('-0.1')).toBe('number');
  });
  it('detects link', () => {
    expect(getValueType('"https://example.com"')).toBe('link');
    expect(getValueType('"/foo/bar"')).toBe('link');
  });
  it('returns undefined for unknown', () => {
    expect(getValueType('')).toBeUndefined();
  });
});

describe('getValueToken', () => {
  it('returns canonical token for value', () => {
    expect(getValueToken('10px')).toBe('<length>');
    expect(getValueToken('auto')).toBe('auto');
    expect(getValueToken('fit-content(10px)')).toBe('fit-content()');
    expect(getValueToken('10')).toBe('<integer>');
    expect(getValueToken('10.5')).toBe('<number>');
    expect(getValueToken('#fff')).toBe('<color>');
    expect(getValueToken('rgba(255, 0, 0)')).toBe('<color>');
    expect(getValueToken('"https://example.com"')).toBeUndefined();
    expect(getValueToken('')).toBeUndefined();
  });
});

describe('getValueTokens', () => {
  it('returns array of canonical tokens', () => {
    expect(getValueTokens(['10px', 'auto', 'fit-content(10px)', '10'])).toEqual(['<length>', 'auto', 'fit-content()', '<integer>']);
    expect(getValueTokens(['#fff', 'rgba(255, 0, 0)', '10.5'])).toEqual(['<color>', '<color>', '<number>']);
    expect(getValueTokens(['', ''])).toEqual([]);
  });
});
