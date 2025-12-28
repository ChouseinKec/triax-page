// // Types
// import type { OptionDefinition } from '@/src/shared/components/types/option';

// // Utilities
// import { extractFunctionName, extractFunctionArgs, extractFunctionValue, filterFunctionOptions, matchFunctionOption } from '@/src/core/block/style/utilities/function';

// // Mock icons to avoid JSX in tests
// jest.mock('@/src/core/block/style/constants/icon', () => ({
// 	STYLE_ICON_DEFINITIONS: {},
// }));

// describe('extractFunctionName', () => {
// 	it.each([
// 		['fit-content(100px)', 'fit-content'],
// 		['repeat(1,100px)', 'repeat'],
// 		['minmax(10px, 20px)', 'minmax'],
// 	])('returns name from %s', (input, expected) => {
// 		expect(extractFunctionName(input)).toBe(expected);
// 	});

// 	it('returns name from clamp function', () => {
// 		expect(extractFunctionName('clamp(1px, 2px, 3px)')).toBe('clamp');
// 	});

// 	it('returns name from calc function', () => {
// 		expect(extractFunctionName('calc(100% - 20px)')).toBe('calc');
// 	});

// 	it('returns name from rgb color function', () => {
// 		expect(extractFunctionName('rgb(255, 0, 0)')).toBe('rgb');
// 	});

// 	it('returns name from rgba color function', () => {
// 		expect(extractFunctionName('rgba(255, 0, 0, 0.5)')).toBe('rgba');
// 	});

// 	it('returns name from gradient function', () => {
// 		expect(extractFunctionName('linear-gradient(90deg, red, blue)')).toBe('linear-gradient');
// 	});

// 	it('returns name from var custom property', () => {
// 		expect(extractFunctionName('var(--custom-prop)')).toBe('var');
// 	});

// 	it('returns undefined for non-function string', () => {
// 		expect(extractFunctionName('not-a-function')).toBe(undefined);
// 	});

// 	it('returns undefined for empty string', () => {
// 		expect(extractFunctionName('')).toBe(undefined);
// 	});

// 	it('returns undefined for plain keyword', () => {
// 		expect(extractFunctionName('auto')).toBe(undefined);
// 	});

// 	it('returns name even from incomplete parenthesis', () => {
// 		expect(extractFunctionName('repeat(1,100px')).toBe('repeat');
// 	});

// 	it('returns outer function name from nested functions', () => {
// 		expect(extractFunctionName('calc(var(--size) * 2)')).toBe('calc');
// 	});

// 	it('returns name from function with function as argument', () => {
// 		expect(extractFunctionName('repeat(auto-fit, minmax(200px, 1fr))')).toBe('repeat');
// 	});
// });

// describe('extractFunctionArgs', () => {
// 	it.each([
// 		['fit-content(100px)', '100px'],
// 		['repeat(1,100px)', '1,100px'],
// 		['minmax(10px, 20px)', '10px, 20px'],
// 	])('returns args from %s', (input, expected) => {
// 		expect(extractFunctionArgs(input)).toBe(expected);
// 	});

// 	it('returns args from single argument', () => {
// 		expect(extractFunctionArgs('var(--custom-prop)')).toBe('--custom-prop');
// 	});

// 	it('returns args with spacing variations', () => {
// 		expect(extractFunctionArgs('rgb( 255 , 0 , 0 )')).toBe(' 255 , 0 , 0 ');
// 	});

// 	it('returns args from color function', () => {
// 		expect(extractFunctionArgs('rgba(255, 0, 0, 0.5)')).toBe('255, 0, 0, 0.5');
// 	});

// 	it('returns args from calc function', () => {
// 		expect(extractFunctionArgs('calc(100% - 20px)')).toBe('100% - 20px');
// 	});

// 	it('returns args from clamp function', () => {
// 		expect(extractFunctionArgs('clamp(1px, 2px, 3px)')).toBe('1px, 2px, 3px');
// 	});

// 	it('presulterves nested function in args', () => {
// 		expect(extractFunctionArgs('repeat(auto-fit, minmax(200px, 1fr))')).toBe('auto-fit, minmax(200px, 1fr)');
// 	});

// 	it('presulterves calc with function calls', () => {
// 		expect(extractFunctionArgs('calc(var(--size) * 2)')).toBe('var(--size) * 2');
// 	});

// 	it('returns undefined for non-function string', () => {
// 		expect(extractFunctionArgs('not-a-function')).toBe(undefined);
// 	});

// 	it('returns undefined for empty string', () => {
// 		expect(extractFunctionArgs('')).toBe(undefined);
// 	});

// 	it('returns undefined for incomplete function', () => {
// 		expect(extractFunctionArgs('repeat(1,100px')).toBe(undefined);
// 	});

// 	it('returns undefined for function without args', () => {
// 		expect(extractFunctionArgs('keyword()')).toBe('');
// 	});
// });

// describe('extractFunctionValue', () => {
// 	it('returns both name and args for fit-content', () => {
// 		expect(extractFunctionValue('fit-content(100px)')).toEqual({ name: 'fit-content', value: '100px' });
// 	});

// 	it('returns both name and args for repeat', () => {
// 		expect(extractFunctionValue('repeat(2, 1fr)')).toEqual({ name: 'repeat', value: '2, 1fr' });
// 	});

// 	it('returns both name and args for minmax', () => {
// 		expect(extractFunctionValue('minmax(10px, 20px)')).toEqual({ name: 'minmax', value: '10px, 20px' });
// 	});

// 	it('returns both name and args for calc', () => {
// 		expect(extractFunctionValue('calc(100% - 20px)')).toEqual({ name: 'calc', value: '100% - 20px' });
// 	});

// 	it('returns both name and args for color function', () => {
// 		expect(extractFunctionValue('rgb(255, 0, 0)')).toEqual({ name: 'rgb', value: '255, 0, 0' });
// 	});

// 	it('extracts outer function with nested function in args', () => {
// 		const resultult = extractFunctionValue('repeat(auto-fit, minmax(200px, 1fr))');
// 		expect(resultult.name).toBe('repeat');
// 		expect(resultult.value).toContain('minmax');
// 	});

// 	it('extracts function with function as argument', () => {
// 		const resultult = extractFunctionValue('calc(var(--size) * 2)');
// 		expect(resultult.name).toBe('calc');
// 		expect(resultult.value).toContain('var(--size)');
// 	});

// 	it('returns undefineds for non-function string', () => {
// 		expect(extractFunctionValue('not-a-function')).toEqual({ name: undefined, value: undefined });
// 	});

// 	it('returns undefineds for empty string', () => {
// 		expect(extractFunctionValue('')).toEqual({ name: undefined, value: undefined });
// 	});

// 	it('returns undefineds for plain keyword', () => {
// 		expect(extractFunctionValue('auto')).toEqual({ name: undefined, value: undefined });
// 	});

// 	it('returns partial data for incomplete function', () => {
// 		const resultult = extractFunctionValue('repeat(1,100px');
// 		expect(resultult.name).toBe('repeat');
// 		expect(resultult.value).toBeUndefined();
// 	});

// 	it('returns object with correct properties on success', () => {
// 		const resultult = extractFunctionValue('minmax(10px, 20px)');
// 		expect(resultult).toHaveProperty('name');
// 		expect(resultult).toHaveProperty('value');
// 		expect(typeof resultult.name).toBe('string');
// 		expect(typeof resultult.value).toBe('string');
// 	});

// 	it('returns object with undefined properties on failure', () => {
// 		const resultult = extractFunctionValue('invalid');
// 		expect(resultult).toHaveProperty('name');
// 		expect(resultult).toHaveProperty('value');
// 		expect(resultult.name).toBeUndefined();
// 		expect(resultult.value).toBeUndefined();
// 	});
// });

// describe('filterFunctionOptions', () => {
// 	it('filters out non-function categories', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' } as OptionDefinition, { category: 'other', name: 'auto', value: 'auto' } as OptionDefinition];
// 		const result = filterFunctionOptions(options);

// 		expect(result).toHaveLength(1);
// 		expect(result[0].name).toBe('repeat');
// 	});

// 	it('filters multiple mixed options', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' } as OptionDefinition, { category: 'color', name: 'red', value: 'red' } as OptionDefinition, { category: 'function', name: 'minmax', value: 'minmax(10px, 20px)' } as OptionDefinition, { category: 'length', name: 'px', value: '10px' } as OptionDefinition];
// 		const result = filterFunctionOptions(options);

// 		expect(result).toHaveLength(2);
// 		expect(result[0].name).toBe('repeat');
// 		expect(result[1].name).toBe('minmax');
// 	});

// 	it('returns empty array for empty input', () => {
// 		expect(filterFunctionOptions([])).toHaveLength(0);
// 	});

// 	it('returns empty array when no function options', () => {
// 		const options: OptionDefinition[] = [{ category: 'color', name: 'red', value: 'red' } as OptionDefinition, { category: 'length', name: 'px', value: '10px' } as OptionDefinition];

// 		expect(filterFunctionOptions(options)).toHaveLength(0);
// 	});

// 	it('presulterves all function options when all are functions', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' } as OptionDefinition, { category: 'function', name: 'minmax', value: 'minmax(10px, 20px)' } as OptionDefinition, { category: 'function', name: 'fit-content', value: 'fit-content(100px)' } as OptionDefinition];
// 		const result = filterFunctionOptions(options);

// 		expect(result).toHaveLength(3);
// 	});

// 	it('returns typed OptionDefinition array', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' } as OptionDefinition];
// 		const result = filterFunctionOptions(options);

// 		expect(result[0]).toHaveProperty('category', 'function');
// 		expect(result[0]).toHaveProperty('name');
// 		expect(result[0]).toHaveProperty('value');
// 	});
// });

// describe('matchFunctionOption', () => {
// 	it('matches by function name token', () => {
// 		const options: OptionDefinition[] = [
// 			{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' },
// 			{ category: 'function', name: 'fit-content', value: 'fit-content(100px)' },
// 		] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'repeat(3, 2fr)');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('matches minmax function', () => {
// 		const options: OptionDefinition[] = [
// 			{ category: 'function', name: 'minmax', value: 'minmax(10px, 20px)' },
// 			{ category: 'function', name: 'fit-content', value: 'fit-content(100px)' },
// 		] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'minmax(5px, 10px)');
// 		expect(result?.name).toBe('minmax');
// 	});

// 	it('matches with different arguments', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'calc', value: 'calc(100% - 20px)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'calc(50% + 10px)');
// 		expect(result?.name).toBe('calc');
// 	});

// 	it('falls back to first option when no name match', () => {
// 		const options: OptionDefinition[] = [
// 			{ category: 'function', name: 'minmax', value: 'minmax(10px, 20px)' },
// 			{ category: 'function', name: 'fit-content', value: 'fit-content(100px)' },
// 		] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'clamp(1px, 2px, 3px)');
// 		expect(result?.name).toBe('minmax');
// 	});

// 	it('falls back to first when function name is unknown', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'unknown-func(arg)');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('returns undefined for empty options', () => {
// 		expect(matchFunctionOption([], 'repeat(3, 2fr)')).toBeUndefined();
// 	});

// 	it('falls back to first option for empty input', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, '');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('falls back to first option for invalid function', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'not-a-function');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('matches first option when input has incomplete function', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'repeat(3, 2fr');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('matches nested function by outer name', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(auto-fit, minmax(200px, 1fr))' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'repeat(auto-fill, minmax(100px, 2fr))');
// 		expect(result?.name).toBe('repeat');
// 	});

// 	it('matches calc with function arguments', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'calc', value: 'calc(var(--size) * 2)' }] as OptionDefinition[];

// 		const result = matchFunctionOption(options, 'calc(var(--other) + 10px)');
// 		expect(result?.name).toBe('calc');
// 	});

// 	it('returns typed OptionDefinition or undefined', () => {
// 		const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' }] as OptionDefinition[];
// 		const result = matchFunctionOption(options, 'repeat(3, 2fr)');
// 		if (!result) return;

// 		expect(result).toHaveProperty('category', 'function');
// 		expect(result).toHaveProperty('name');
// 		expect(result).toHaveProperty('value');
// 	});
// });
