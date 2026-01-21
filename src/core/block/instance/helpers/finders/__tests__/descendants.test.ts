// Utilities
import { findBlockLastDescendant, findBlockDescendants } from '../descendants';

// Mock data
import { mockBlockInstance } from '@/shared/helpers/mock';

describe('findBlockLastDescendant', () => {
	it('returns block itself when it has no children', () => {
		const leaf = mockBlockInstance({ id: 'leaf', contentIDs: [] });
		const blocks = { leaf };
		const result = findBlockLastDescendant(leaf, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('leaf');
	});

	it('returns last child when parent has one child with no grandchildren', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: [] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockLastDescendant(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child');
	});

	it('returns deepest last descendant following last-child chain', () => {
		const grandchild1 = mockBlockInstance({ id: 'grandchild1', parentID: 'child2', contentIDs: [] });
		const grandchild2 = mockBlockInstance({ id: 'grandchild2', parentID: 'child2', contentIDs: [] });
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent', contentIDs: [] });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent', contentIDs: ['grandchild1', 'grandchild2'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2, grandchild1, grandchild2 };
		const result = findBlockLastDescendant(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('grandchild2');
	});

	it('returns deepest descendant in deep hierarchy', () => {
		const greatgrandchild = mockBlockInstance({ id: 'greatgrandchild', parentID: 'grandchild', contentIDs: [] });
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child', contentIDs: ['greatgrandchild'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'root', contentIDs: ['grandchild'] });
		const root = mockBlockInstance({ id: 'root', contentIDs: ['child'] });
		const blocks = { root, child, grandchild, greatgrandchild };
		const result = findBlockLastDescendant(root, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('greatgrandchild');
	});

	it('returns parent when child in contentIDs not in blocks', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['missing-child'] });
		const blocks = { parent };
		const result = findBlockLastDescendant(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('parent');
	});

	it('stops at missing child and returns current block', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['missing-grandchild'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockLastDescendant(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('child');
	});

	it('preserves descendant properties', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', tag: 'div', type: 'element', contentIDs: [] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockLastDescendant(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.tag).toBe('div');
		expect(result.data.type).toBe('element');
	});

	it('returns last descendant with multiple branches', () => {
		const gc1 = mockBlockInstance({ id: 'gc1', parentID: 'c1', contentIDs: [] });
		const gc2 = mockBlockInstance({ id: 'gc2', parentID: 'c2', contentIDs: [] });
		const gc3 = mockBlockInstance({ id: 'gc3', parentID: 'c2', contentIDs: [] });
		const c1 = mockBlockInstance({ id: 'c1', parentID: 'root', contentIDs: ['gc1'] });
		const c2 = mockBlockInstance({ id: 'c2', parentID: 'root', contentIDs: ['gc2', 'gc3'] });
		const root = mockBlockInstance({ id: 'root', contentIDs: ['c1', 'c2'] });
		const blocks = { root, c1, c2, gc1, gc2, gc3 };
		const result = findBlockLastDescendant(root, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data.id).toBe('gc3');
	});
});

describe('findBlockDescendants', () => {
	it('returns not-found when block has no children', () => {
		const leaf = mockBlockInstance({ id: 'leaf', contentIDs: [] });
		const blocks = { leaf };
		const result = findBlockDescendants(leaf, blocks);

		expect(result.status).toBe('not-found');
	});

	it('returns single child when parent has one child with no grandchildren', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: [] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = findBlockDescendants(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(1);
		expect(result.data[0].id).toBe('child');
	});

	it('returns all children when parent has multiple children', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent', contentIDs: [] });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent', contentIDs: [] });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent', contentIDs: [] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = findBlockDescendants(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(3);
		const ids = result.data.map((b) => b.id);

		expect(ids).toContain('child1');
		expect(ids).toContain('child2');
		expect(ids).toContain('child3');
	});

	it('returns all descendants including grandchildren', () => {
		const grandchild1 = mockBlockInstance({ id: 'grandchild1', parentID: 'child2', contentIDs: [] });
		const grandchild2 = mockBlockInstance({ id: 'grandchild2', parentID: 'child2', contentIDs: [] });
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent', contentIDs: [] });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent', contentIDs: ['grandchild1', 'grandchild2'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2, grandchild1, grandchild2 };
		const result = findBlockDescendants(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(4);
		const ids = result.data.map((b) => b.id);

		expect(ids).toContain('child1');
		expect(ids).toContain('child2');
		expect(ids).toContain('grandchild1');
		expect(ids).toContain('grandchild2');
	});

	it('returns all descendants in deep hierarchy', () => {
		const greatgrandchild = mockBlockInstance({ id: 'greatgrandchild', parentID: 'grandchild', contentIDs: [] });
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child', contentIDs: ['greatgrandchild'] });
		const child = mockBlockInstance({ id: 'child', parentID: 'root', contentIDs: ['grandchild'] });
		const root = mockBlockInstance({ id: 'root', contentIDs: ['child'] });
		const blocks = { root, child, grandchild, greatgrandchild };
		const result = findBlockDescendants(root, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(3);
		const ids = result.data.map((b) => b.id);

		expect(ids).toContain('child');
		expect(ids).toContain('grandchild');
		expect(ids).toContain('greatgrandchild');
	});

	it('error when child in contentIDs not in blocks', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['missing-child'] });
		const blocks = { parent };
		const result = findBlockDescendants(parent, blocks);

		expect(result.status).toBe('error');
		if (result.status !== 'error') return;

		expect(result.error).toContain('Failed to find descendants');
	});

	it('preserves descendant properties', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent', tag: 'span', type: 'text', contentIDs: [] });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent', tag: 'div', type: 'element', contentIDs: [] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2 };
		const result = findBlockDescendants(parent, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		const child1Result = result.data.find((b) => b.id === 'child1');
		const child2Result = result.data.find((b) => b.id === 'child2');

		expect(child1Result).toBeDefined();
		expect(child2Result).toBeDefined();
		if (!child1Result || !child2Result) return;

		expect(child1Result.tag).toBe('span');
		expect(child1Result.type).toBe('text');
		expect(child2Result.tag).toBe('div');
		expect(child2Result.type).toBe('element');
	});

	it('maintains order of descendants in depth-first traversal', () => {
		const gc1 = mockBlockInstance({ id: 'gc1', parentID: 'c1', contentIDs: [] });
		const gc2 = mockBlockInstance({ id: 'gc2', parentID: 'c2', contentIDs: [] });
		const c1 = mockBlockInstance({ id: 'c1', parentID: 'root', contentIDs: ['gc1'] });
		const c2 = mockBlockInstance({ id: 'c2', parentID: 'root', contentIDs: ['gc2'] });
		const root = mockBlockInstance({ id: 'root', contentIDs: ['c1', 'c2'] });
		const blocks = { root, c1, c2, gc1, gc2 };
		const result = findBlockDescendants(root, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		const ids = result.data.map((b) => b.id);

		expect(ids).toEqual(['c2', 'gc2', 'c1', 'gc1']);
	});

	it('handles large tree with many descendants', () => {
		const blocks: Record<string, any> = {};
		const root = mockBlockInstance({ id: 'root', contentIDs: [] });
		blocks.root = root;

		const contentIDs: string[] = [];
		const numChildren = 20;
		for (let i = 0; i < numChildren; i++) {
			const id = `child${i}`;
			contentIDs.push(id);
			blocks[id] = mockBlockInstance({ id, parentID: 'root', contentIDs: [] });
		}
		root.contentIDs = contentIDs;

		const result = findBlockDescendants(root, blocks);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toHaveLength(numChildren);
		for (let i = 0; i < numChildren; i++) {
			expect(result.data.map((b) => b.id)).toContain(`child${i}`);
		}
	});
});
