// Utilities
import { findBlockNextSibling, findBlockPreviousSibling, findBlockNextParentSibling } from '../sibling';

// Mock data
import { mockBlockInstance } from '@/src/shared/helpers/mock';

describe('findBlockNextSibling', () => {
	it('returns not-found when block is last child', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2 };
		const result = findBlockNextSibling(child2, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns next sibling when it exists', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockNextSibling(child1, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child2');
	});

	it('returns next sibling for middle child', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockNextSibling(child2, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child3');
	});

	it('returns not-found when block is only child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockNextSibling(child, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns error when parent missing from blocks', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { child };
		const result = findBlockNextSibling(child, blocks);

		expect(result.status).toBe('error');
	});

	it('returns error when next sibling missing from blocks', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1 };
		const result = findBlockNextSibling(child1, blocks);

		expect(result.status).toBe('error');
	});
});

describe('findBlockPreviousSibling', () => {
	it('returns not-found when block is first child', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2 };
		const result = findBlockPreviousSibling(child1, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns previous sibling when it exists', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockPreviousSibling(child3, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child2');
	});

	it('returns previous sibling for middle child', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockPreviousSibling(child2, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child1');
	});

	it('returns not-found when block is only child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockPreviousSibling(child, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns error when parent missing from blocks', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { child };
		const result = findBlockPreviousSibling(child, blocks);

		expect(result.status).toBe('error');
	});

	it('returns error when previous sibling missing from blocks', () => {
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child2 };
		const result = findBlockPreviousSibling(child2, blocks);

		expect(result.status).toBe('error');
	});
});

describe('findBlockNextParentSibling', () => {
	it('returns not-found when no ancestors have next siblings', () => {
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: '', contentIDs: ['parent'] });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { grandparent, parent, child };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns immediate parent next sibling when it exists', () => {
		const uncle = mockBlockInstance({ id: 'uncle', parentID: 'grandparent' });
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: '', contentIDs: ['parent', 'uncle'] });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { grandparent, parent, child, uncle };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('uncle');
	});

	it('returns grandparent next sibling when parent has no next sibling', () => {
		const greatuncle = mockBlockInstance({ id: 'greatuncle', parentID: 'root' });
		const root = mockBlockInstance({ id: 'root', parentID: '', contentIDs: ['grandparent', 'greatuncle'] });
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: 'root', contentIDs: ['parent'] });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { root, grandparent, parent, child, greatuncle };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('greatuncle');
	});

	it('returns not-found when block has no ancestors', () => {
		const root = mockBlockInstance({ id: 'root', parentID: '' });
		const blocks = { root };
		const result = findBlockNextParentSibling(root, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns first ancestor sibling found in chain', () => {
		const sibling = mockBlockInstance({ id: 'sibling', parentID: 'grandparent' });
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: 'root', contentIDs: ['parent', 'sibling'] });
		const root = mockBlockInstance({ id: 'root', parentID: '', contentIDs: ['grandparent'] });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { root, grandparent, parent, child, sibling };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('sibling');
	});

	it('returns not-found when ancestor missing from blocks', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: 'missing', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns error when ancestor sibling missing from blocks', () => {
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: 'root', contentIDs: ['parent', 'sibling'] });
		const root = mockBlockInstance({ id: 'root', parentID: '', contentIDs: ['grandparent'] });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent', contentIDs: ['child'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { root, grandparent, parent, child };
		const result = findBlockNextParentSibling(child, blocks);

		expect(result.status).toBe('error');
	});
});
