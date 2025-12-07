// Utilities
import { findStyleShorthand } from '../shorthand';

// Types
import type { StyleShorthandRecord } from '@/src/core/block/style/types';

describe('findStyleShorthand', () => {
	it('returns found status for existing shorthand', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('padding', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toEqual(['padding-top', 'padding-right', 'padding-bottom', 'padding-left']);
	});

	it('rejects non-existent shorthand', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('margin', registeredShorthands);

		expect(result.status).toBe('not-found');
		expect(result).not.toHaveProperty('data');
	});

	it('returns shorthand with single longhand property', () => {
		const registeredShorthands: StyleShorthandRecord = { 'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'] };
		const result = findStyleShorthand('border-width', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toEqual(['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']);
	});

	it('returns shorthand with multiple longhand properties', () => {
		const registeredShorthands: StyleShorthandRecord = { margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('margin', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.length).toBe(4);
	});

	it('returns different shorthands from same record', () => {
		const registeredShorthands: StyleShorthandRecord = { 'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], 'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'], margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'] };
		const borderWidthResult = findStyleShorthand('border-width', registeredShorthands);
		const borderColorResult = findStyleShorthand('border-color', registeredShorthands);
		const marginResult = findStyleShorthand('margin', registeredShorthands);

		expect(borderWidthResult.status).toBe('found');
		expect(borderColorResult.status).toBe('found');
		expect(marginResult.status).toBe('found');

		if (borderWidthResult.status !== 'found' || borderColorResult.status !== 'found' || marginResult.status !== 'found') return;

		expect(borderWidthResult.data).toEqual(['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']);
		expect(borderColorResult.data).toEqual(['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']);
		expect(marginResult.data).toEqual(['margin-top', 'margin-right', 'margin-bottom', 'margin-left']);
	});

	it('rejects lookup from empty record', () => {
		const registeredShorthands: StyleShorthandRecord = {};
		const result = findStyleShorthand('padding', registeredShorthands);

		expect(result.status).toBe('not-found');
	});

	it('returns empty longhand array when present', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: [] };
		const result = findStyleShorthand('padding', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toEqual([]);
	});

	it('handles case-sensitive key lookup', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const resultLowercase = findStyleShorthand('padding', registeredShorthands);
		const resultUppercase = findStyleShorthand('Padding' as any, registeredShorthands);

		expect(resultLowercase.status).toBe('found');
		expect(resultUppercase.status).toBe('not-found');
	});

	it('returns shorthand with hyphenated key name', () => {
		const registeredShorthands: StyleShorthandRecord = { 'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'] };
		const result = findStyleShorthand('border-style', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toEqual(['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style']);
	});

	it('returns correct shorthand from large record', () => {
		const registeredShorthands: StyleShorthandRecord = { 'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], 'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'], 'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'], margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('border-color', registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toEqual(['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']);
		expect(result.data.length).toBe(4);
	});

	it('returns data property for found status', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('padding', registeredShorthands);

		expect(result).toHaveProperty('status');
		expect(result).toHaveProperty('data');
		expect(result.status).toBe('found');
	});

	it('omits data property for not-found status', () => {
		const registeredShorthands: StyleShorthandRecord = {};
		const result = findStyleShorthand('padding', registeredShorthands);

		expect(result).toHaveProperty('status');
		expect(result.status).toBe('not-found');
		expect(result).not.toHaveProperty('data');
	});

	it('returns same array instance on repeated lookups', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result1 = findStyleShorthand('padding', registeredShorthands);
		const result2 = findStyleShorthand('padding', registeredShorthands);

		if (result1.status !== 'found' || result2.status !== 'found') return;

		expect(result1.data).toEqual(result2.data);
	});

	it('handles shorthand with many properties', () => {
		const registeredShorthands: StyleShorthandRecord = { border: ['border-top', 'border-right', 'border-bottom', 'border-left', 'border-width', 'border-style', 'border-color'] } as any;
		const result = findStyleShorthand('border' as any, registeredShorthands);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.length).toBeGreaterThan(4);
	});

	it('rejects empty string key', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('' as any, registeredShorthands);

		expect(result.status).toBe('not-found');
	});

	it('preserves order of longhand properties', () => {
		const registeredShorthands: StyleShorthandRecord = { padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] };
		const result = findStyleShorthand('padding', registeredShorthands);

		if (result.status !== 'found') return;

		expect(result.data[0]).toBe('padding-top');
		expect(result.data[1]).toBe('padding-right');
		expect(result.data[2]).toBe('padding-bottom');
		expect(result.data[3]).toBe('padding-left');
	});
});
