// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { OptionFunctionDefinition } from '@/src/core/block/style/types/option';

// Utilities
import { extractFunctionName, extractFunctionArgs, extractFunctionValue, filterFunctionOptions, matchFunctionOption } from '@/src/core/block/style/utilities/function';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

	// Function parsing and matching: name, args, value extraction; filtering and matching options
	describe('extractFunctionName', () => {
		it.each([
			['fit-content(100px)', 'fit-content'],
			['repeat(1,100px)', 'repeat'],
			['minmax(10px, 20px)', 'minmax'],
			['not-a-function', undefined],
		])('%s → %p', (input, expected) => {
			expect(extractFunctionName(input)).toBe(expected);
		});
	});

    describe('extractFunctionArgs', () => {
		it.each([
			['fit-content(100px)', '100px'],
			['repeat(1,100px)', '1,100px'],
			['minmax(10px, 20px)', '10px, 20px'],
			['not-a-function', undefined],
		])('%s → %p', (input, expected) => {
			expect(extractFunctionArgs(input)).toBe(expected);
		});
	});

	describe('extractFunctionValue', () => {
		it('returns name and value parts', () => {
			expect(extractFunctionValue('fit-content(100px)')).toEqual({ name: 'fit-content', value: '100px' });
		});
		it('returns undefineds for invalid input', () => {
			expect(extractFunctionValue('x')).toEqual({ name: undefined, value: undefined });
		});
	});

	describe('filterFunctionOptions', () => {
		it('filters only function-category options', () => {
			const options: OptionDefinition[] = [{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' } as OptionFunctionDefinition, { category: 'other', name: 'auto', value: 'auto' } as OptionDefinition];
			const res = filterFunctionOptions(options);
			expect(res).toHaveLength(1);
			expect(res[0].name).toBe('repeat');
		});
	});

	describe('matchFunctionOption', () => {
		it('returns undefined for empty options', () => {
			expect(matchFunctionOption([], 'repeat(3, 2fr)')).toBeUndefined();
		});
		it('matches by value token when available', () => {
			const options: OptionFunctionDefinition[] = [
				{ category: 'function', name: 'repeat', value: 'repeat(2, 1fr)' },
				{ category: 'function', name: 'fit-content', value: 'fit-content(100px)' },
			] as OptionFunctionDefinition[];
			const res = matchFunctionOption(options, 'repeat(3, 2fr)');
			expect(res?.name).toBe('repeat');
		});
		it('falls back to first option when no match', () => {
			const options: OptionFunctionDefinition[] = [
				{ category: 'function', name: 'minmax', value: 'minmax(10px, 20px)' },
				{ category: 'function', name: 'fit-content', value: 'fit-content(100px)' },
			] as OptionFunctionDefinition[];
			const res = matchFunctionOption(options, 'clamp(1px, 2px, 3px)');
			expect(res?.name).toBe('minmax');
		});
	});
