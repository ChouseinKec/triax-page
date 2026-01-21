// Utilities
import { findBlockAncestors } from '../ancestor';

// Mock data
import { mockBlockInstance } from '@/shared/helpers/mock';

describe('findBlockAncestors', () => {
	it('returns not-found when block has no parent', () => {
		const root = mockBlockInstance({ id: 'root', parentID: '' });
		const blocks = { root };
		const result = findBlockAncestors(root, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns single ancestor when block has only one parent', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: '' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child };
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(1);
		expect(result.data[0].id).toBe('parent');
	});

	it('returns ancestors in order from immediate parent upward', () => {
		const root = mockBlockInstance({ id: 'root', parentID: '' });
		const grandparent = mockBlockInstance({ id: 'grandparent', parentID: 'root' });
		const parent = mockBlockInstance({ id: 'parent', parentID: 'grandparent' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { root, grandparent, parent, child };
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(3);
		expect(result.data[0].id).toBe('parent');
		expect(result.data[1].id).toBe('grandparent');
		expect(result.data[2].id).toBe('root');
	});

	it('stops traversal when parent not found in store', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: 'root' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child }; // root is missing
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(1);
		expect(result.data[0].id).toBe('parent');
	});

	it('detects circular dependency in hierarchy', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child };
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('error');
		if (result.status !== 'error') return;

		expect(result.error).toBe('Circular dependency detected in block hierarchy.');
	});

	it('returns not-found when parent has no parent', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: '' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child };
		const result = findBlockAncestors(parent, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns not-found when blocks record is empty', () => {
		const root = mockBlockInstance({ id: 'root', parentID: '' });
		const blocks = {};
		const result = findBlockAncestors(root, blocks);

		expect(result.status).toBe('not-found');
	});

	it('stops traversal when ancestor not in store', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: 'missing-root' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const blocks = { parent, child };
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(1);
	});

	it('handles deep hierarchy with many ancestors', () => {
		const blocks: Record<string, any> = {};
		const ancestors = [];

		// Create a chain of 20 ancestors
		for (let i = 0; i < 20; i++) {
			const id = `level-${i}`;
			const parentID = i === 0 ? '' : `level-${i - 1}`;
			const block = mockBlockInstance({ id, parentID });
			blocks[id] = block;
			if (i > 0) ancestors.unshift(block);
		}

		const deepChild = mockBlockInstance({ id: 'child', parentID: 'level-9' });
		blocks.child = deepChild;

		const result = findBlockAncestors(deepChild, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(10);
		expect(result.data[0].id).toBe('level-9');
		expect(result.data[9].id).toBe('level-0');
	});

	it('detects self-referencing block', () => {
		const selfRef = mockBlockInstance({ id: 'self-ref', parentID: 'self-ref' });
		const blocks = { 'self-ref': selfRef };
		const result = findBlockAncestors(selfRef, blocks);

		expect(result.status).toBe('error');
		if (result.status !== 'error') return;

		expect(result.error).toContain('Circular dependency');
	});

	it('preserves all ancestor properties', () => {
		const parent = mockBlockInstance({ id: 'parent', parentID: '', tag: 'section', type: 'container' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', tag: 'div', type: 'block' });
		const blocks = { parent, child };
		const result = findBlockAncestors(child, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		const ancestorParent = result.data[0];
		expect(ancestorParent.id).toBe('parent');
		expect(ancestorParent.tag).toBe('section');
		expect(ancestorParent.type).toBe('container');
	});
});
