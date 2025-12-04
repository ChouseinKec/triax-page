// Utilities
import { generateStyleKey } from '@/src/core/block/style/utilities/key';

// Key generation: compose property keys with optional position and suffix
describe('generateStyleKey', () => {
	// Returns base property when no position or suffix provided
	it('returns base property when no position or suffix', () => {
		expect(generateStyleKey('color')).toBe('color');
		expect(generateStyleKey('display')).toBe('display');
	});

	// Returns property-suffix when only suffix provided
	it('returns property-suffix when only suffix provided', () => {
		expect(generateStyleKey('background', undefined, 'color')).toBe('background-color');
		expect(generateStyleKey('font', undefined, 'size')).toBe('font-size');
	});

	// Returns property-position when only position provided
	it('returns property-position when only position provided', () => {
		expect(generateStyleKey('padding', 'top')).toBe('padding-top');
		expect(generateStyleKey('margin', 'left')).toBe('margin-left');
	});

	// Returns property-position-suffix when both position and suffix provided
	it('returns property-position-suffix when both provided', () => {
		expect(generateStyleKey('border', 'top', 'width')).toBe('border-top-width');
		expect(generateStyleKey('border', 'left', 'style')).toBe('border-left-style');
	});
});
