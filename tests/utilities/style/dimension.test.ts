import { extractNumber, extractUnit, isValueDimension, getDimensionType, clampDimension } from '@/utilities/style/dimension';

describe('extractNumber', () => {
  it('extracts number from dimension', () => {
    expect(extractNumber('10px')).toBe('10');
    expect(extractNumber('-5.5em')).toBe('-5.5');
    expect(extractNumber('0.1rem')).toBe('0.1');
    expect(extractNumber('25%')).toBe('25');
    expect(extractNumber('1e3px')).toBe('1e3');
    expect(extractNumber('auto')).toBeUndefined();
    expect(extractNumber('px')).toBeUndefined();
  });
});

describe('extractUnit', () => {
  it('extracts unit from dimension', () => {
    expect(extractUnit('10px')).toBe('px');
    expect(extractUnit('-5.5em')).toBe('em');
    expect(extractUnit('0.1rem')).toBe('rem');
    expect(extractUnit('25%')).toBe('%');
    expect(extractUnit('1e3px')).toBe('px');
    expect(extractUnit('auto')).toBeUndefined();
    expect(extractUnit('10')).toBe('');
  });
});

describe('isValueDimension', () => {
  it('validates dimension values', () => {
    expect(isValueDimension('10px')).toBe(true);
    expect(isValueDimension('25%')).toBe(true);
    expect(isValueDimension('180deg')).toBe(true);
    expect(isValueDimension('1fr')).toBe(true);
    expect(isValueDimension('auto')).toBe(false);
    expect(isValueDimension('10')).toBe(false);
    expect(isValueDimension('px')).toBe(false);
    expect(isValueDimension('')).toBe(false);
  });
});

describe('getDimensionType', () => {
  it('returns correct dimension group', () => {
    expect(getDimensionType('10px')).toBe('length');
    expect(getDimensionType('25%')).toBe('percentage');
    expect(getDimensionType('180deg')).toBe('angle');
    expect(getDimensionType('1fr')).toBe('flex');
    expect(getDimensionType('auto')).toBeUndefined();
    expect(getDimensionType('10')).toBeUndefined();
  });
});

describe('clampDimension', () => {
  it('clamps value to max px', () => {
    expect(clampDimension('12px', 10)).toBe('10px');
    expect(clampDimension('5px', 10)).toBe('5px');
    expect(clampDimension('20px')).toBe('15px');
    expect(clampDimension('2.5px', 3)).toBe('2.5px');
    expect(clampDimension('auto', 10)).toBeUndefined();
    expect(clampDimension(undefined as any, 10)).toBeUndefined();
  });
});
