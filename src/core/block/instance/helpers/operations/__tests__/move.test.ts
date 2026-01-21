// Utilities
import { moveBlock } from '../move';

// Mock data
import { mockBlockInstance } from '@/shared/helpers/mock';

describe('moveBlock', () => {
	it('moves block into new parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: [] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source', 'sibling'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, sibling: mockBlockInstance({ id: 'sibling', parentID: 'parent-1' }) };
		const result = moveBlock(source, targetParent, blocks, 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['source'].parentID).toBe('parent-2');
		expect(result.data['parent-2'].contentIDs).toEqual(['source']);
		expect(result.data['parent-1'].contentIDs).toEqual(['sibling']);
	});

	it('inserts block at target index', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: ['child-1', 'child-2'] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, 'child-1': mockBlockInstance({ id: 'child-1', parentID: 'parent-2' }), 'child-2': mockBlockInstance({ id: 'child-2', parentID: 'parent-2' }) };
		const result = moveBlock(source, targetParent, blocks, 1);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['parent-2'].contentIDs).toEqual(['child-1', 'source', 'child-2']);
	});

	it('rejects when source parent missing', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'non-existent' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: [] });
		const blocks = { source, 'parent-2': targetParent };
		const result = moveBlock(source, targetParent, blocks, 0);

		expect(result.success).toBe(false);
	});

	it('rejects when target parent missing', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'non-existent', contentIDs: [] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const blocks = { source, 'parent-1': sourceParent };
		const result = moveBlock(source, targetParent, blocks, 0);

		expect(result.success).toBe(false);
	});

	it('removes source from previous siblings', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: [] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first', 'source', 'last'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, first: mockBlockInstance({ id: 'first', parentID: 'parent-1' }), last: mockBlockInstance({ id: 'last', parentID: 'parent-1' }) };
		const result = moveBlock(source, targetParent, blocks, 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['parent-1'].contentIDs).toEqual(['first', 'last']);
		expect(result.data['parent-2'].contentIDs).toEqual(['source']);
	});

	it('reorders within the same parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['first', 'source', 'second', 'third'] });
		const blocks = { source, parent, first: mockBlockInstance({ id: 'first', parentID: 'parent' }), second: mockBlockInstance({ id: 'second', parentID: 'parent' }), third: mockBlockInstance({ id: 'third', parentID: 'parent' }) };
		const result = moveBlock(source, parent, blocks, 3);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parent.contentIDs).toEqual(['first', 'second', 'third', 'source']);
	});

	it('clamps negative target index to start', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: ['child-1', 'child-2'] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, 'child-1': mockBlockInstance({ id: 'child-1', parentID: 'parent-2' }), 'child-2': mockBlockInstance({ id: 'child-2', parentID: 'parent-2' }) };
		const result = moveBlock(source, targetParent, blocks, -5);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['parent-2'].contentIDs).toEqual(['source', 'child-1', 'child-2']);
	});

	it('clamps oversized target index to end', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: ['child-1'] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, 'child-1': mockBlockInstance({ id: 'child-1', parentID: 'parent-2' }) };
		const result = moveBlock(source, targetParent, blocks, 99);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data['parent-2'].contentIDs).toEqual(['child-1', 'source']);
	});

	it('keeps children attached when moving source', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1', contentIDs: ['child-1', 'child-2'] });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: [] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const childOne = mockBlockInstance({ id: 'child-1', parentID: 'source' });
		const childTwo = mockBlockInstance({ id: 'child-2', parentID: 'source' });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent, 'child-1': childOne, 'child-2': childTwo };
		const result = moveBlock(source, targetParent, blocks, 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.source.contentIDs).toEqual(['child-1', 'child-2']);
		expect(result.data['child-1'].parentID).toBe('source');
		expect(result.data['child-2'].parentID).toBe('source');
	});

	it('does not mutate original blocks record', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent-1' });
		const targetParent = mockBlockInstance({ id: 'parent-2', contentIDs: [] });
		const sourceParent = mockBlockInstance({ id: 'parent-1', contentIDs: ['source'] });
		const blocks = { source, 'parent-1': sourceParent, 'parent-2': targetParent };
		const originalBlocksCopy = JSON.stringify(blocks);

		moveBlock(source, targetParent, blocks, 0);

		expect(JSON.stringify(blocks)).toBe(originalBlocksCopy);
	});
});
