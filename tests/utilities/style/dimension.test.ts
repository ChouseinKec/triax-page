import { extractDimensionNumber, extractDimensionUnit, isValueDimension, getDimensionType } from '@/editors/block/utilities/style/dimension';

describe('extractDimensionNumber', () => {
  it('extracts number from dimension', () => {
    expect(extractDimensionNumber('10px')).toBe('10');
    expect(extractDimensionNumber('-5.5em')).toBe('-5.5');
    expect(extractDimensionNumber('0.1rem')).toBe('0.1');
    expect(extractDimensionNumber('25%')).toBe('25');
    expect(extractDimensionNumber('1e3px')).toBe('1e3');
    expect(extractDimensionNumber('auto')).toBeUndefined();
    expect(extractDimensionNumber('px')).toBeUndefined();
  });
});

describe('extractDimensionUnit', () => {
  it('extracts unit from dimension', () => {
    expect(extractDimensionUnit('10px')).toBe('px');
    expect(extractDimensionUnit('-5.5em')).toBe('em');
    expect(extractDimensionUnit('0.1rem')).toBe('rem');
    expect(extractDimensionUnit('25%')).toBe('%');
    expect(extractDimensionUnit('1e3px')).toBe('px');
    expect(extractDimensionUnit('auto')).toBeUndefined();
    expect(extractDimensionUnit('10')).toBe('');
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


