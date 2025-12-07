// Utilities
import { findBlockMoveIntoIndex, findBlockMoveBeforeIndex, findBlockMoveAfterIndex } from '../move';

// Mock data
import { mockBlockInstance } from '@/src/shared/helpers/mock';

describe('findBlockMoveIntoIndex', () => {
	it('returns not-found when source is already a child of target', () => {
		const child = mockBlockInstance({ id: 'child', parentID: 'target' });
		const target = mockBlockInstance({ id: 'target', contentIDs: ['child'] });
		const result = findBlockMoveIntoIndex(child, target);

		expect(result.status).toBe('not-found');
	});

	it('returns index 0 when target has no children', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', contentIDs: [] });
		const result = findBlockMoveIntoIndex(source, target);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(0);
	});

	it('returns index after last child when target has children', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', contentIDs: ['child1', 'child2', 'child3'] });
		const result = findBlockMoveIntoIndex(source, target);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(3);
	});

	it('handles source moving to self', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other', contentIDs: ['child1'] });
		const result = findBlockMoveIntoIndex(source, source);

		expect(result.status).toBe('error');
	});

	it('preserves properties when finding move index', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other', tag: 'div' });
		const target = mockBlockInstance({ id: 'target', contentIDs: [] });
		const result = findBlockMoveIntoIndex(source, target);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(0);
	});
});

describe('findBlockMoveBeforeIndex', () => {
	it('returns error when target is not a child of parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', parentID: 'other' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const result = findBlockMoveBeforeIndex(source, target, parent);

		expect(result.status).toBe('error');
		if (result.status !== 'error') return;

		expect(result.error).toBe('Target block not found in parent.');
	});

	it('returns target index when source is from different parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'target', 'child3'] });
		const result = findBlockMoveBeforeIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(1);
	});

	it('returns not-found when source is immediately before target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['source', 'target', 'child3'] });
		const result = findBlockMoveBeforeIndex(source, target, parent);

		expect(result.status).toBe('not-found');
	});

	it('returns adjusted index when source is before target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['source', 'child2', 'target', 'child4'] });
		const result = findBlockMoveBeforeIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(1);
	});

	it('returns target index when source is after target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'target', 'source', 'child4'] });

		const result = findBlockMoveBeforeIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(1);
	});

	it('returns error when source is target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['source'] });

		const result = findBlockMoveBeforeIndex(source, source, parent);

		expect(result.status).toBe('error');
	});
});

describe('findBlockMoveAfterIndex', () => {
	it('returns error when target is not a child of parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', parentID: 'other' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('error');
		if (result.status !== 'error') return;

		expect(result.error).toBe('Target block not found in parent.');
	});

	it('returns target index + 1 when source is from different parent', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'target', 'child3'] });
		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(2); // target at 1, insert after = 2
	});

	it('returns not-found when source is immediately after target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'target', 'source'] });

		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('not-found');
	});

	it('returns adjusted index when source is before target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['source', 'child2', 'target', 'child4'] });
		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(2);
	});

	it('returns target index + 1 when source is after target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'target', 'child3', 'source'] });
		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(2);
	});

	it('returns error when source is target', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['source'] });

		const result = findBlockMoveAfterIndex(source, source, parent);

		expect(result.status).toBe('error');
	});

	it('preserves properties when finding move index', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other', tag: 'div' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['target'] });

		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(1);
	});

	it('handles target at end of parent contentIDs', () => {
		const source = mockBlockInstance({ id: 'source', parentID: 'other' });
		const target = mockBlockInstance({ id: 'target', parentID: 'parent' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'target'] });

		const result = findBlockMoveAfterIndex(source, target, parent);

		expect(result.status).toBe('found');
		if (result.status !== 'found') return;

		expect(result.data).toBe(3);
	});
});
