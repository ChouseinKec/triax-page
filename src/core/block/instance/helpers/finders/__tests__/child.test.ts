// Utilities
import { findBlockChildIndex, findBlockFirstChild, findBlockLastChild } from '../child';

// Mock data
import { mockBlockInstance } from '@/src/shared/helpers/mock';

describe('findBlockChildIndex', () => {
	it('returns not-found when child not in parent contentIDs', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['other-child'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('not-found');
	});

	it('returns index 0 for first child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child', 'child2', 'child3'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(0);
	});

	it('returns correct index for middle child', () => {
		const child = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(1);
	});

	it('returns correct index for last child', () => {
		const child = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(2);
	});

	it('returns index 0 for only child', () => {
		const child = mockBlockInstance({ id: 'only-child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['only-child'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(0);
	});

	it('returns not-found for non-existent child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['other'] });
		const result = findBlockChildIndex(child, parent);

		expect(result.status).toBe('not-found');
	});
});

describe('findBlockFirstChild', () => {
	it('returns not-found when parent has no children', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = findBlockFirstChild(parent, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns first child when parent has one child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockFirstChild(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child');
	});

	it('returns first child when parent has multiple children', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockFirstChild(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child1');
	});

	it('handles empty contentIDs array', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = findBlockFirstChild(parent, blocks);

		expect(result.status).toBe('not-found');
	});
});

describe('findBlockLastChild', () => {
	it('returns not-found when parent has no children', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = findBlockLastChild(parent, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns last child when parent has one child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockLastChild(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child');
	});

	it('returns last child when parent has multiple children', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockLastChild(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child3');
	});

	it('returns error when child in contentIDs not in blocks', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['missing-child'] });
		const blocks = { parent };
		const result = findBlockLastChild(parent, blocks);

		expect(result.status).toBe('error');
	});

	it('preserves child properties', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', tag: 'span', type: 'element' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockLastChild(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.tag).toBe('span');
		expect(result.data.type).toBe('element');
	});

	it('first and last child are same when parent has one child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const resultFirst = findBlockFirstChild(parent, blocks);
		const resultLast = findBlockLastChild(parent, blocks);

		expect(resultFirst.status).toBe('found');
		expect(resultLast.status).toBe('found');
		if (resultFirst.status !== 'found' || resultLast.status !== 'found') return;

		expect(resultFirst.data.id).toBe(resultLast.data.id);
		expect(resultFirst.data.id).toBe('child');
	});
});
