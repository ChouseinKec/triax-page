// Utilities
import { pickBlockAttributes } from '../attribute';
import { mockBlockAttributes, mockBlockInstance } from '@/src/shared/helpers/mock';

// Types
import type { BlockInstanceRecord } from '@/src/core/block/instance/types';

// Mock data
const mockBlockID = 'block-1';
const mockAttributes = mockBlockAttributes({
	id: 'btn-1',
	class: 'primary',
	title: 'Click me',
});

const testBlockInstance = mockBlockInstance({
	id: mockBlockID,
	parentID: 'root',
	type: 'test',
	tag: 'div',
	attributes: mockAttributes,
});

describe('pickBlockAttributes', () => {
	it('picks attributes from block', () => {
		const storedBlocks = { [mockBlockID]: testBlockInstance };
		const result = pickBlockAttributes(mockBlockID, storedBlocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(mockAttributes);
	});

	it('picks empty attributes object', () => {
		const emptyAttributes = mockBlockAttributes();
		const blockWithEmptyAttrs = mockBlockInstance({ id: mockBlockID, attributes: emptyAttributes });
		const storedBlocks = { [mockBlockID]: blockWithEmptyAttrs };
		const result = pickBlockAttributes(mockBlockID, storedBlocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual({});
	});

	it('rejects missing blockID in store', () => {
		const storedBlocks = {};
		const result = pickBlockAttributes(mockBlockID, storedBlocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('not found');
	});

	it('rejects missing attributes property', () => {
		const blockWithoutAttrs = mockBlockInstance({ id: mockBlockID, attributes: undefined });
		const storedBlocks = { [mockBlockID]: blockWithoutAttrs };

		const result = pickBlockAttributes(mockBlockID, storedBlocks);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('Block attributes not found');
		}
	});

	it('picks from different block IDs', () => {
		const blockID1 = 'block-1';
		const blockID2 = 'block-2';
		const attrs1 = mockBlockAttributes({ id: 'elem-1', class: 'active' });
		const attrs2 = mockBlockAttributes({ id: 'elem-2', class: 'inactive' });
		const storedBlocks = { [blockID1]: mockBlockInstance({ id: blockID1, attributes: attrs1 }), [blockID2]: mockBlockInstance({ id: blockID2, attributes: attrs2 }) };
		const result1 = pickBlockAttributes(blockID1, storedBlocks);
		const result2 = pickBlockAttributes(blockID2, storedBlocks);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);

		if (!result1.success || !result2.success) return;

		expect(result1.data).toEqual(attrs1);
		expect(result2.data).toEqual(attrs2);
	});

	it('returns correct error message format', () => {
		const storedBlocks = {};
		const testBlockID = 'test-block-id';
		const result = pickBlockAttributes(testBlockID, storedBlocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('test-block-id');
	});
});
