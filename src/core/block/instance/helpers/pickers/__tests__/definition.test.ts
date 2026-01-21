// Utilities
import { pickBlockDefinition } from '../definition';

// Mock data
import { mockBlockDefinition } from '@/shared/helpers/mock';

describe('pickBlockDefinition', () => {
	it('returns definition when found', () => {
		const definition = mockBlockDefinition({ type: 'container' });
		const registry = { container: definition };
		const result = pickBlockDefinition('container', registry);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(definition);
	});

	it('returns same instance from registry', () => {
		const definition = mockBlockDefinition({ type: 'container' });
		const registry = { container: definition };
		const result = pickBlockDefinition('container', registry);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(definition);
	});

	it('returns correct definition from multiple types', () => {
		const containerDef = mockBlockDefinition({ type: 'container' });
		const textDef = mockBlockDefinition({ type: 'text', name: 'Text Block' });
		const imageDef = mockBlockDefinition({ type: 'image', name: 'Image Block' });
		const registry = { container: containerDef, text: textDef, image: imageDef };
		const result = pickBlockDefinition('text', registry);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(textDef);
		expect(result.data.name).toBe('Text Block');
	});

	it('rejects when type not found in registry', () => {
		const registry = {};
		const result = pickBlockDefinition('non-existent', registry);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('non-existent');
	});

	it('includes type in error message', () => {
		const registry = { container: mockBlockDefinition({ type: 'container' }) };
		const result = pickBlockDefinition('missing-type', registry);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('missing-type');
	});

	it('handles empty type string when registered', () => {
		const definition = mockBlockDefinition({ type: '' });
		const registry = { '': definition };
		const result = pickBlockDefinition('', registry);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(definition);
	});

	it('rejects empty type when not registered', () => {
		const registry = { container: mockBlockDefinition({ type: 'container' }) };
		const result = pickBlockDefinition('', registry);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('not registered');
	});

	it('is case-sensitive for type lookup', () => {
		const definition = mockBlockDefinition({ type: 'Container' });
		const registry = { Container: definition };
		const result = pickBlockDefinition('container', registry);

		expect(result.success).toBe(false);
	});

	it('rejects with descriptive error for unregistered type', () => {
		const registry = {};
		const result = pickBlockDefinition('button', registry);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('not registered');
		expect(result.error).toContain('button');
	});
});
