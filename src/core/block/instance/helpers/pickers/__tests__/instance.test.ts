// Utilities
import { pickBlockInstance, pickBlockInstances, pickBlockContent } from '../instance';

// Mock data
import { mockBlockInstance } from '@/src/shared/helpers/mock';

describe('pickBlockInstance', () => {
	it('returns block instance when found', () => {
		const block = mockBlockInstance({ id: 'test-1' });
		const blocks = { 'test-1': block };
		const result = pickBlockInstance('test-1', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(block);
	});

	it('returns same instance from collection', () => {
		const block = mockBlockInstance({ id: 'test-1' });
		const blocks = { 'test-1': block };
		const result = pickBlockInstance('test-1', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(block);
	});

	it('rejects when block not found in collection', () => {
		const blocks = {};
		const result = pickBlockInstance('non-existent', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('non-existent');
	});

	it('includes block id in error message', () => {
		const blocks = { 'test-1': mockBlockInstance({ id: 'test-1' }) };
		const result = pickBlockInstance('missing-id', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('missing-id');
	});

	it('handles empty block id string', () => {
		const block = mockBlockInstance({ id: '' });
		const blocks = { '': block };
		const result = pickBlockInstance('', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(block);
	});
});

describe('pickBlockInstances', () => {
	it('returns empty array when no ids provided', () => {
		const blocks = { 'test-1': mockBlockInstance({ id: 'test-1' }) };
		const result = pickBlockInstances([], blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([]);
	});

	it('returns blocks in requested order', () => {
		const block1 = mockBlockInstance({ id: 'test-1' });
		const block2 = mockBlockInstance({ id: 'test-2' });
		const block3 = mockBlockInstance({ id: 'test-3' });
		const blocks = { 'test-1': block1, 'test-2': block2, 'test-3': block3 };
		const result = pickBlockInstances(['test-1', 'test-2', 'test-3'], blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([block1, block2, block3]);
	});

	it('reorders blocks regardless of storage order', () => {
		const block1 = mockBlockInstance({ id: 'test-1' });
		const block2 = mockBlockInstance({ id: 'test-2' });
		const block3 = mockBlockInstance({ id: 'test-3' });
		const blocks = { 'test-1': block1, 'test-2': block2, 'test-3': block3 };
		const result = pickBlockInstances(['test-3', 'test-1', 'test-2'], blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([block3, block1, block2]);
	});

	it('rejects when any block is missing', () => {
		const block1 = mockBlockInstance({ id: 'test-1' });
		const blocks = { 'test-1': block1 };
		const result = pickBlockInstances(['test-1', 'missing'], blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('missing');
	});

	it('accepts duplicate ids in request', () => {
		const block1 = mockBlockInstance({ id: 'test-1' });
		const blocks = { 'test-1': block1 };
		const result = pickBlockInstances(['test-1', 'test-1'], blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.length).toBe(2);
		expect(result.data[0]).toBe(block1);
		expect(result.data[1]).toBe(block1);
	});

	it('handles multiple duplicates correctly', () => {
		const block1 = mockBlockInstance({ id: 'test-1' });
		const block2 = mockBlockInstance({ id: 'test-2' });
		const blocks = { 'test-1': block1, 'test-2': block2 };
		const result = pickBlockInstances(['test-1', 'test-2', 'test-1', 'test-2', 'test-1'], blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual([block1, block2, block1, block2, block1]);
	});
});

describe('pickBlockContent', () => {
	it('returns content when block has field', () => {
		const content = { text: 'Hello World' };
		const block = mockBlockInstance({ id: 'test-1', content });
		const blocks = { 'test-1': block };

		const result = pickBlockContent('test-1', blocks);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(content);
	});

	it('returns same content instance', () => {
		const content = { text: 'Hello World' };
		const block = mockBlockInstance({ id: 'test-1', content });
		const blocks = { 'test-1': block };

		const result = pickBlockContent('test-1', blocks);
		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(content);
	});

	it('returns empty object when content is empty', () => {
		const content = {};
		const block = mockBlockInstance({ id: 'test-1', content });
		const blocks = { 'test-1': block };
		const result = pickBlockContent('test-1', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual({});
	});

	it('rejects when block not found', () => {
		const blocks = {};
		const result = pickBlockContent('non-existent', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('non-existent');
	});

	it('rejects when block has no content field', () => {
		const block = mockBlockInstance({ id: 'test-1' });
		const blocks = { 'test-1': block };
		const result = pickBlockContent('test-1', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('test-1');
	});

	it('includes block id in error for missing content', () => {
		const block = mockBlockInstance({ id: 'special-block' });
		const blocks = { 'special-block': block };
		const result = pickBlockContent('special-block', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('special-block');
	});

	it('handles null content field as missing', () => {
		const block = mockBlockInstance({ id: 'test-1' });
		block.content = null as any;
		const blocks = { 'test-1': block };
		const result = pickBlockContent('test-1', blocks);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.error).toContain('test-1');
	});
});
