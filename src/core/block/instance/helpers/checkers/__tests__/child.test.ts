// Utilities
import { isBlockChild, isBlockLastChild, isBlockFirstChild } from '../child';

// Mock data
import { mockBlockInstance } from '@/src/shared/helpers/mock';

describe('isBlockChild', () => {
	it('returns true when block is direct child', () => {
		const firstChild = mockBlockInstance({ id: 'first-child', parentID: 'parent-1', tag: 'div' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first-child'] });
		const result = isBlockChild(firstChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});

	it('returns true for all children in parent', () => {
		const child1 = mockBlockInstance({ id: 'child1', parentID: 'parent-1', tag: 'div' });
		const child2 = mockBlockInstance({ id: 'child2', parentID: 'parent-1', tag: 'p' });
		const child3 = mockBlockInstance({ id: 'child3', parentID: 'parent-1', tag: 'span' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['child1', 'child2', 'child3'] });

		const result1 = isBlockChild(child1, parent);
		const result2 = isBlockChild(child2, parent);
		const result3 = isBlockChild(child3, parent);
		if (!result1.success || !result2.success || !result3.success) return;

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		expect(result3.success).toBe(true);
	});

	it('returns false when block is not a child', () => {
		const notChild = mockBlockInstance({ id: 'not-child', parentID: 'other-parent', tag: 'div' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: [] });
		const result = isBlockChild(notChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});
});

describe('isBlockLastChild', () => {
	it('returns true when block is last child', () => {
		const lastChild = mockBlockInstance({ id: 'last-child', parentID: 'parent-1', tag: 'span' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first-child', 'last-child'] });
		const result = isBlockLastChild(lastChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});

	it('returns false when block is not last child', () => {
		const firstChild = mockBlockInstance({ id: 'first-child', parentID: 'parent-1', tag: 'div' });
		const middleChild = mockBlockInstance({ id: 'middle-child', parentID: 'parent-1', tag: 'p' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first-child', 'middle-child', 'last-child'] });

		const result1 = isBlockLastChild(firstChild, parent);
		const result2 = isBlockLastChild(middleChild, parent);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		if (!result1.success || !result2.success) return;

		expect(result1.passed).toBe(false);
		expect(result2.passed).toBe(false);
	});

	it('returns false when block is not a child', () => {
		const notChild = mockBlockInstance({ id: 'not-child', parentID: 'other-parent', tag: 'div' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['child1', 'child2'] });
		const result = isBlockLastChild(notChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns true for only child', () => {
		const onlyChild = mockBlockInstance({ id: 'only-child', parentID: 'parent-2', tag: 'span' });
		const parentWithOneChild = mockBlockInstance({ id: 'parent-2', contentIDs: ['only-child'] });
		const result = isBlockLastChild(onlyChild, parentWithOneChild);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});
});

describe('isBlockFirstChild', () => {
	it('returns true when block is first child', () => {
		const firstChild = mockBlockInstance({ id: 'first-child', parentID: 'parent-1', tag: 'div' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first-child', 'last-child'] });
		const result = isBlockFirstChild(firstChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});

	it('returns false when block is not first child', () => {
		const middleChild = mockBlockInstance({ id: 'middle-child', parentID: 'parent-1', tag: 'p' });
		const lastChild = mockBlockInstance({ id: 'last-child', parentID: 'parent-1', tag: 'span' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['first-child', 'middle-child', 'last-child'] });

		const result1 = isBlockFirstChild(middleChild, parent);
		const result2 = isBlockFirstChild(lastChild, parent);

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		if (!result1.success || !result2.success) return;

		expect(result1.passed).toBe(false);
		expect(result2.passed).toBe(false);
	});

	it('returns false when block is not a child', () => {
		const notChild = mockBlockInstance({ id: 'not-child', parentID: 'other-parent', tag: 'div' });
		const parent = mockBlockInstance({ id: 'parent-1', contentIDs: ['child1', 'child2'] });
		const result = isBlockFirstChild(notChild, parent);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	// Returns true for only child
	it('returns true for only child', () => {
		const onlyChild = mockBlockInstance({ id: 'only-child-2', parentID: 'parent-3', tag: 'span' });
		const parentWithOneChild = mockBlockInstance({ id: 'parent-3', contentIDs: ['only-child-2'] });
		const result = isBlockFirstChild(onlyChild, parentWithOneChild);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});
});
