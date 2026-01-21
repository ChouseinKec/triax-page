// Utilities
import { isBlockChildAllowed, hasBlockForbiddenAncestor, doesBlockElementExceeds, doesBlockElementViolatesOrder } from '../rules';

// Mock data
import { mockBlockDefinition, mockElementDefinition, mockBlockInstance } from '@/shared/helpers/mock';

describe('isBlockChildAllowed', () => {
	it('returns true with no restrictions', () => {
		const blockDef = mockBlockDefinition();
		const result = isBlockChildAllowed(blockDef, 'p');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});

	it('returns true when child tag is allowed', () => {
		const blockDef = mockBlockDefinition({ allowedChildren: ['p', 'span', 'h1'] });
		const result1 = isBlockChildAllowed(blockDef, 'p');
		const result2 = isBlockChildAllowed(blockDef, 'span');

		expect(result1.success).toBe(true);
		expect(result2.success).toBe(true);
		if (!result1.success || !result2.success) return;

		expect(result1.passed).toBe(true);
		expect(result2.passed).toBe(true);
	});

	it('returns false when child tag is not allowed', () => {
		const blockDef = mockBlockDefinition({ allowedChildren: ['p', 'span'] });
		const result = isBlockChildAllowed(blockDef, 'div');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});
});

describe('hasBlockForbiddenAncestor', () => {
	it('returns false with no forbidden ancestors', () => {
		const elementDef = mockElementDefinition();
		const parent = mockBlockInstance({ id: 'parent', tag: 'div' });
		const blocks = { parent };
		const result = hasBlockForbiddenAncestor(elementDef, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns false when ancestors are not forbidden', () => {
		const elementDef = mockElementDefinition({ forbiddenAncestors: ['section', 'article'] });
		const grandparent = mockBlockInstance({ id: 'grandparent', tag: 'div', parentID: '' });
		const parent = mockBlockInstance({ id: 'parent', tag: 'div', parentID: 'grandparent' });
		const blocks = { grandparent, parent };
		const result = hasBlockForbiddenAncestor(elementDef, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns true when ancestor is forbidden', () => {
		const elementDef = mockElementDefinition({ forbiddenAncestors: ['body'] });
		const root = mockBlockInstance({ id: 'root', tag: 'div', parentID: '' });
		const body = mockBlockInstance({ id: 'body', tag: 'body', parentID: 'root' });
		const parent = mockBlockInstance({ id: 'parent', tag: 'div', parentID: 'body' });
		const blocks = { root, body, parent };
		const result = hasBlockForbiddenAncestor(elementDef, parent, blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});
});

describe('doesBlockElementExceeds', () => {
	it('returns false with no element limits', () => {
		const blockDef = mockBlockDefinition();
		const parent = mockBlockInstance({ contentIDs: [] });
		const blocks = {};
		const result = doesBlockElementExceeds(blockDef, parent, 'p', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns false when element count is below limit', () => {
		const blockDef = mockBlockDefinition({ uniqueChildren: { h1: 1, h2: 2 } });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const blocks = { parent };
		const result = doesBlockElementExceeds(blockDef, parent, 'h2', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns true when element count meets limit', () => {
		const blockDef = mockBlockDefinition({ uniqueChildren: { h1: 1, h2: 2 } });
		const child1 = mockBlockInstance({ id: 'child1', tag: 'h1' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1'] });
		const blocks = { parent, child1 };
		const result = doesBlockElementExceeds(blockDef, parent, 'h1', blocks);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});

	it('excludes specified block ID from count', () => {
		const blockDef = mockBlockDefinition({ uniqueChildren: { h1: 1, h2: 2 } });
		const child1 = mockBlockInstance({ id: 'child1', tag: 'h1' });
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1'] });
		const blocks = { parent, child1 };
		const result = doesBlockElementExceeds(blockDef, parent, 'h1', blocks, 'child1');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});
});

describe('doesBlockElementViolatesOrder', () => {
	it('returns false with no ordering rules', () => {
		const blockDef = mockBlockDefinition();
		const parent = mockBlockInstance({ contentIDs: [] });
		const blocks = {};
		const result = doesBlockElementViolatesOrder(blockDef, parent, 'p', blocks, 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns false when insertion respects order', () => {
		const blockDef = mockBlockDefinition({ orderedChildren: [['h1'], ['p', 'span'], ['footer']] });
		const child1 = mockBlockInstance({ id: 'child1', tag: 'h1' });
		const child2 = mockBlockInstance({ id: 'child2', tag: 'span' });
		const parent = mockBlockInstance({ contentIDs: ['child1', 'child2'] });
		const blocks = { parent, child1, child2 };
		const result = doesBlockElementViolatesOrder(blockDef, parent, 'p', blocks, 2);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(false);
	});

	it('returns true when insertion violates order', () => {
		const blockDef = mockBlockDefinition({ orderedChildren: [['h1'], ['p', 'span'], ['footer']] });
		const child1 = mockBlockInstance({ id: 'child1', tag: 'p' });
		const parent = mockBlockInstance({ contentIDs: ['child1'] });
		const blocks = { parent, child1 };
		const result = doesBlockElementViolatesOrder(blockDef, parent, 'h1', blocks, 1);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.passed).toBe(true);
	});
});
