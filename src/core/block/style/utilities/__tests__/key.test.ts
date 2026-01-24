// Utilities
import { generateStyleKey } from '@/core/block/style/utilities/key';

describe('generateStyleKey', () => {
	it('returns base property', () => {
		expect(generateStyleKey('color')).toBe('color');
	});

	it('ignores undefined position and suffix', () => {
		expect(generateStyleKey('display', undefined, undefined)).toBe('display');
	});

	it('appends suffix with hyphen', () => {
		expect(generateStyleKey('background', undefined, 'color')).toBe('background-color');
	});

	it('supports different suffixes', () => {
		expect(generateStyleKey('font', undefined, 'weight')).toBe('font-weight');
	});

	it('appends position with hyphen', () => {
		expect(generateStyleKey('padding', 'top')).toBe('padding-top');
	});

	it('differentiates positions', () => {
		const top = generateStyleKey('margin', 'top');
		const bottom = generateStyleKey('margin', 'bottom');
		expect(top).not.toBe(bottom);
	});

	it('combines property-position-suffix in order', () => {
		expect(generateStyleKey('border', 'top', 'width')).toBe('border-top-width');
	});

	it('supports compound positions', () => {
		expect(generateStyleKey('border', 'top-left', 'radius')).toBe('border-top-left-radius');
	});

	it('returns kebab-case strings', () => {
		const result = generateStyleKey('border', 'top', 'width');
		expect(result).toBe('border-top-width');
	});

	it('returns string type for any combination', () => {
		const result = generateStyleKey('border', 'left', 'style');
		expect(typeof result).toBe('string');
	});

	it('generates consistent key for same inputs', () => {
		const a = generateStyleKey('color');
		const b = generateStyleKey('color');
		expect(a).toBe(b);
	});

	it('returns defined string for empty suffix', () => {
		const result = generateStyleKey('margin', 'top', '');
		expect(result).toBe('margin-top');
	});
});
