// Utilities
import { detachBlockFromParent, attachBlockToParent, deleteBlockFromTree, addBlockToTree, cloneBlock, duplicateBlockInTree, overwriteBlockInTree } from '../tree';

// Mock data
import { mockBlockInstance } from '@/shared/helpers/mock';

describe('detachBlockFromParent', () => {
	it('returns parent without detached child', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = detachBlockFromParent(child, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual([]);
		expect(result.data.child.parentID).toBe('orphan');
	});

	it('removes only the requested child id', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child', 'child2'] });
		const blocks = { parent, child };
		const result = detachBlockFromParent(child, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child.parentID).toBe('orphan');
		expect(result.data.parent.contentIDs).toEqual(['child1', 'child2']);
	});

	it('handles child absent from parent list', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['other'] });
		const other = mockBlockInstance({ id: 'other', parentID: 'parent' });
		const blocks = { parent, child, other };
		const result = detachBlockFromParent(child, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['other']);
		expect(result.data.child.parentID).toBe('orphan');
	});

	it('preserves remaining siblings', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = detachBlockFromParent(child2, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child1', 'child3']);
	});
});

describe('attachBlockToParent', () => {
	it('inserts child at target index', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'orphan' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent, child };
		const result = attachBlockToParent(child, parent, 0, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child']);
		expect(result.data.child.parentID).toBe('parent');
	});

	it('appends child when index is end', () => {
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'orphan' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child3 };
		const result = attachBlockToParent(child3, parent, 2, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child1', 'child2', 'child3']);
		expect(result.data.child3.parentID).toBe('parent');
	});

	it('inserts child at start when index is zero', () => {
		const child0 = mockBlockInstance({ id: 'child0', parentID: 'orphan' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child0 };
		const result = attachBlockToParent(child0, parent, 0, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child0', 'child1', 'child2']);
		expect(result.data.child0.parentID).toBe('parent');
	});

	it('updates child parentID to match parent', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'old-parent' });
		const parent = mockBlockInstance({ id: 'new-parent', contentIDs: [] });
		const blocks = { parent, child };
		const result = attachBlockToParent(child, parent, 0, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child.parentID).toBe('new-parent');
	});

	it('clamps negative target index to start', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'orphan' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['one', 'two'] });
		const blocks = { parent, child, one: mockBlockInstance({ id: 'one', parentID: 'parent' }), two: mockBlockInstance({ id: 'two', parentID: 'parent' }) };
		const result = attachBlockToParent(child, parent, -3, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child', 'one', 'two']);
	});

	it('clamps oversized target index to end', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'orphan' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['one'] });
		const blocks = { parent, child, one: mockBlockInstance({ id: 'one', parentID: 'parent' }) };
		const result = attachBlockToParent(child, parent, 9, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['one', 'child']);
	});
});

describe('deleteBlockFromTree', () => {
	it('removes leaf block only', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = deleteBlockFromTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child).toBeUndefined();
		expect(result.data.parent).toBeDefined();
	});

	it('removes block and descendants', () => {
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['grandchild'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child, grandchild };
		const result = deleteBlockFromTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child).toBeUndefined();
		expect(result.data.grandchild).toBeUndefined();
		expect(result.data.parent).toBeDefined();
	});

	it('removes deep descendant tree', () => {
		const greatgrandchild = mockBlockInstance({ id: 'greatgrandchild', parentID: 'grandchild1' });
		const grandchild1 = mockBlockInstance({ id: 'grandchild1', parentID: 'child', contentIDs: ['greatgrandchild'] });
		const grandchild2 = mockBlockInstance({ id: 'grandchild2', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['grandchild1', 'grandchild2'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child, grandchild1, grandchild2, greatgrandchild };
		const result = deleteBlockFromTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child).toBeUndefined();
		expect(result.data.grandchild1).toBeUndefined();
		expect(result.data.grandchild2).toBeUndefined();
		expect(result.data.greatgrandchild).toBeUndefined();
		expect(result.data.parent).toBeDefined();
	});

	it('preserves siblings outside deleted subtree', () => {
		const sibling = mockBlockInstance({ id: 'sibling', parentID: 'parent' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child', 'sibling'] });
		const blocks = { parent, child, sibling };
		const result = deleteBlockFromTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child).toBeUndefined();
		expect(result.data.parent).toBeDefined();
		expect(result.data.sibling).toBeDefined();
	});

	it('rejects when descendant lookup fails', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['missing'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = deleteBlockFromTree(child, blocks);

		expect(result.success).toBe(false);
	});
});

describe('addBlockToTree', () => {
	it('adds block to empty parent', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = addBlockToTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;
		expect(result.data.child).toBeDefined();
		expect(result.data.parent.contentIDs).toContain('child');
	});

	it('appends block at end of parent', () => {
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent };
		const result = addBlockToTree(child3, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('returns block in store', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = addBlockToTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.child).toEqual(child);
	});

	it('rejects when parent is missing', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'missing-parent' });
		const blocks = {};
		const result = addBlockToTree(child, blocks);

		expect(result.success).toBe(false);
	});
});

describe('cloneBlock', () => {
	it('returns clone when block has no children', () => {
		const block = mockBlockInstance({ id: 'original', parentID: 'parent', tag: 'div' });
		const blocks = { original: block };
		const result = cloneBlock(block, blocks);

		expect(result.clonedInstance.id).not.toBe('original');
		expect(result.clonedInstance.tag).toBe('div');
		expect(result.clonedInstance.parentID).toBe('parent');
		expect(result.clonedInstance.contentIDs).toEqual([]);
	});

	it('clones children recursively', () => {
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['grandchild'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child, grandchild };
		const result = cloneBlock(child, blocks);

		expect(result.clonedInstance.id).not.toBe('child');
		expect(result.clonedInstance.contentIDs).toHaveLength(1);
		expect(result.clonedInstance.contentIDs[0]).not.toBe('grandchild');
		expect(result.clonedBlocks[result.clonedInstance.contentIDs[0]]).toBeDefined();
	});

	it('assigns new unique ids to clones', () => {
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2 };
		const result = cloneBlock(parent, blocks);
		const allIds = [result.clonedInstance.id, ...result.clonedInstance.contentIDs];
		const uniqueIds = new Set(allIds);

		expect(allIds.length).toBe(uniqueIds.size);
		expect(allIds).not.toContain('parent');
		expect(allIds).not.toContain('child1');
		expect(allIds).not.toContain('child2');
	});

	it('accepts overriding parent id', () => {
		const block = mockBlockInstance({ id: 'original', parentID: 'old-parent' });
		const blocks = { original: block };
		const result = cloneBlock(block, blocks, 'new-parent');

		expect(result.clonedInstance.parentID).toBe('new-parent');
	});

	it('preserves original parent when override missing', () => {
		const block = mockBlockInstance({ id: 'original', parentID: 'parent' });
		const blocks = { original: block };
		const result = cloneBlock(block, blocks);

		expect(result.clonedInstance.parentID).toBe('parent');
	});

	it('returns cloned blocks record', () => {
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['grandchild'] });
		const blocks = { child, grandchild };
		const result = cloneBlock(child, blocks);

		expect(Object.keys(result.clonedBlocks)).toHaveLength(2);
		expect(result.clonedBlocks[result.clonedInstance.id]).toBeDefined();
	});

	it('handles missing child references gracefully', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['missing'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = cloneBlock(parent, blocks);

		expect(result.clonedInstance.contentIDs).toHaveLength(1);
	});
});

describe('duplicateBlockInTree', () => {
	it('inserts duplicate immediately after source', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child };
		const result = duplicateBlockInTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toHaveLength(2);
		expect(result.data.parent.contentIDs[0]).toBe('child');
		expect(result.data.parent.contentIDs[1]).not.toBe('child');
	});

	it('duplicates block with all descendants', () => {
		const grandchild = mockBlockInstance({ id: 'grandchild', parentID: 'child' });
		const child = mockBlockInstance({ id: 'child', parentID: 'parent', contentIDs: ['grandchild'] });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child'] });
		const blocks = { parent, child, grandchild };
		const result = duplicateBlockInTree(child, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Object.keys(result.data).length).toBeGreaterThan(3);
	});

	it('keeps existing siblings order', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const blocks = { parent, child1, child2, child3 };
		const result = duplicateBlockInTree(child2, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toHaveLength(4);
		expect(result.data.parent.contentIDs[0]).toBe('child1');
		expect(result.data.parent.contentIDs[1]).toBe('child2');
		expect(result.data.parent.contentIDs[3]).toBe('child3');
	});

	it('rejects when parent is missing', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'missing-parent' });
		const blocks = { child };
		const result = duplicateBlockInTree(child, blocks);

		expect(result.success).toBe(false);
	});

	it('rejects when source is not a child of parent', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent, child };
		const result = duplicateBlockInTree(child, blocks);

		expect(result.success).toBe(false);
	});
});

describe('overwriteBlockInTree', () => {
	it('overwrites target with source structure', () => {
		const source = mockBlockInstance({ id: 'source', parentID: '', tag: 'span', contentIDs: [] });
		const target = mockBlockInstance({ id: 'target', parentID: 'target-parent', tag: 'div', contentIDs: [] });
		const targetParent = mockBlockInstance({ id: 'target-parent', parentID: '', contentIDs: ['target'] });
		const blocks = { source, target, 'target-parent': targetParent };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.target.tag).toBe('span');
		expect(result.data.target.parentID).toBe('target-parent');
		expect(result.data.target.id).toBe('target');
	});

	it('clones source children into target', () => {
		const sourceChild = mockBlockInstance({ id: 'source-child', parentID: 'source', contentIDs: [] });
		const source = mockBlockInstance({ id: 'source', parentID: '', contentIDs: ['source-child'] });
		const target = mockBlockInstance({ id: 'target', parentID: 'target-parent', contentIDs: [] });
		const targetParent = mockBlockInstance({ id: 'target-parent', parentID: '', contentIDs: ['target'] });
		const blocks = { source, 'source-child': sourceChild, target, 'target-parent': targetParent };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.target.contentIDs).toHaveLength(1);
		expect(result.data.target.contentIDs[0]).not.toBe('source-child');
	});

	it('preserves target id and parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: '', contentIDs: [] });
		const target = mockBlockInstance({ id: 'target', parentID: 'target-parent', contentIDs: [] });
		const targetParent = mockBlockInstance({ id: 'target-parent', parentID: '', contentIDs: ['target'] });
		const blocks = { source, target, 'target-parent': targetParent };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.target.id).toBe('target');
		expect(result.data.target.parentID).toBe('target-parent');
	});

	it('keeps target position in parent contentIDs', () => {
		const source = mockBlockInstance({ id: 'source', parentID: '', contentIDs: [] });
		const target = mockBlockInstance({ id: 'target', parentID: 'target-parent', contentIDs: [] });
		const targetParent = mockBlockInstance({ id: 'target-parent', parentID: '', contentIDs: ['child1', 'target', 'child3'] });
		const blocks = { source, target, 'target-parent': targetParent };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['target-parent'].contentIDs).toEqual(['child1', 'target', 'child3']);
	});

	it('rejects when target parent is missing', () => {
		const source = mockBlockInstance({ id: 'source', parentID: '', contentIDs: [] });
		const target = mockBlockInstance({ id: 'target', parentID: 'missing-parent', contentIDs: [] });
		const blocks = { source, target };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(false);
	});

	it('rejects when target is not in parent contentIDs', () => {
		const source = mockBlockInstance({ id: 'source', parentID: '', contentIDs: [] });
		const target = mockBlockInstance({ id: 'target', parentID: 'target-parent', contentIDs: [] });
		const targetParent = mockBlockInstance({ id: 'target-parent', parentID: '', contentIDs: [] });
		const blocks = { source, target, 'target-parent': targetParent };
		const result = overwriteBlockInTree(source, target, blocks);

		expect(result.success).toBe(false);
	});
});
