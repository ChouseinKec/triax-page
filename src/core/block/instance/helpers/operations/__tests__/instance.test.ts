// Utilities
import { createBlockStyles, createBlockAttributes, createBlock, detachBlockFromContentIDs, attachBlockToContentIDs, updateBlockParentID } from '../instance';

// Mock data
import { mockBlockDefinition, mockBlockInstance, mockBlockStyles } from '@/shared/helpers/mock';

describe('createBlockStyles', () => {
	it('returns defaults when no styles provided', () => {
		const blockStyles = mockBlockStyles();
		const blockDefaults = mockBlockStyles();
		const result = createBlockStyles(blockStyles, blockDefaults);

		expect(result).toEqual(blockDefaults);
	});

	it('merges provided styles with defaults', () => {
		const blockStyles = mockBlockStyles({ color: 'blue' });
		const blockDefaults = mockBlockStyles({ fontSize: '16px' });
		const result = createBlockStyles(blockStyles, blockDefaults);

		expect(result).toEqual({ all: { all: { all: { color: 'blue' } } } });
	});

	it('returns provided styles when no defaults', () => {
		const blockStyles = mockBlockStyles({ color: 'blue', fontSize: '20px' });
		const blockDefaults = mockBlockStyles();
		const result = createBlockStyles(blockStyles, blockDefaults);

		expect(result).toEqual({ all: { all: { all: { color: 'blue', fontSize: '20px' } } } });
	});

	it('overrides defaults with provided styles', () => {
		const blockStyles = mockBlockStyles({ color: 'blue', fontSize: '20px' });
		const blockDefaults = mockBlockStyles({ color: 'red', fontSize: '16px', margin: '10px' });
		const result = createBlockStyles(blockStyles, blockDefaults);

		expect(result).toEqual({ all: { all: { all: { color: 'blue', fontSize: '20px' } } } });
	});

	it('preserves inputs when merging styles', () => {
		const blockStyles = mockBlockStyles({ color: 'blue' });
		const blockDefaults = mockBlockStyles({ fontSize: '16px' });
		createBlockStyles(blockStyles, blockDefaults);

		expect(blockStyles).toEqual(mockBlockStyles({ color: 'blue' }));
		expect(blockDefaults).toEqual(mockBlockStyles({ fontSize: '16px' }));
	});
});

describe('createBlockAttributes', () => {
	it('returns defaults when no attributes provided', () => {
		const blockAttributes = {};
		const blockDefaults = { href: 'https://example.com', target: '_blank' };
		const result = createBlockAttributes(blockAttributes, blockDefaults);

		expect(result).toEqual({ href: 'https://example.com', target: '_blank' });
	});

	it('merges provided attributes with defaults', () => {
		const blockAttributes = { href: 'https://custom.com' };
		const blockDefaults = { href: 'https://example.com', target: '_blank' };
		const result = createBlockAttributes(blockAttributes, blockDefaults);

		expect(result).toEqual({ href: 'https://custom.com', target: '_blank' });
	});

	it('returns provided attributes when no defaults', () => {
		const blockAttributes = { href: 'https://custom.com', target: '_self' };
		const blockDefaults = {};
		const result = createBlockAttributes(blockAttributes, blockDefaults);

		expect(result).toEqual({ href: 'https://custom.com', target: '_self' });
	});

	it('preserves inputs when merging attributes', () => {
		const blockAttributes = { href: 'https://custom.com' };
		const blockDefaults = { target: '_blank' };
		createBlockAttributes(blockAttributes, blockDefaults);

		expect(blockAttributes).toEqual({ href: 'https://custom.com' });
		expect(blockDefaults).toEqual({ target: '_blank' });
	});
});

describe('createBlock', () => {
	it('creates block with defaults from definition', () => {
		const blockDef = mockBlockDefinition({ type: 'container', defaultTag: 'div', defaultStyles: { all: { all: { all: { color: 'red' } } } }, defaultAttributes: { class: 'container' } });
		const result = createBlock(blockDef, 'parent-id');

		expect(result.parentID).toBe('parent-id');
		expect(result.tag).toBe('div');
		expect(result.type).toBe('container');
		expect(result.contentIDs).toEqual([]);
		expect(result.styles).toEqual({ all: { all: { all: { color: 'red' } } } });
		expect(result.attributes).toEqual({ class: 'container' });
		expect(result.id).toBeDefined();
		expect(typeof result.id).toBe('string');
	});

	it('creates block with empty contentIDs', () => {
		const blockDef = mockBlockDefinition();
		const result = createBlock(blockDef, 'parent-id');

		expect(result.contentIDs).toEqual([]);
	});

	it('creates block with unique ID', () => {
		const blockDef = mockBlockDefinition();
		const result1 = createBlock(blockDef, 'parent-id');
		const result2 = createBlock(blockDef, 'parent-id');

		expect(result1.id).not.toBe(result2.id);
	});
});

describe('detachBlockFromContentIDs', () => {
	it('returns unchanged parent when child not in contentIDs', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const result = detachBlockFromContentIDs(parent, 'child3');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toEqual(parent);
	});

	it('removes child from contentIDs', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = detachBlockFromContentIDs(parent, 'child2');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child3']);
	});

	it('does not mutate original parent when removing', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		detachBlockFromContentIDs(parent, 'child1');

		expect(parent.contentIDs).toEqual(['child1', 'child2']);
	});

	it('removes first child from contentIDs', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = detachBlockFromContentIDs(parent, 'child1');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child2', 'child3']);
	});

	it('removes last child from contentIDs', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = detachBlockFromContentIDs(parent, 'child3');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2']);
	});

	it('removes only child leaving empty array', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1'] });
		const result = detachBlockFromContentIDs(parent, 'child1');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual([]);
	});
});

describe('attachBlockToContentIDs', () => {
	it('adds child at specified index', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child3'] });
		const result = attachBlockToContentIDs(parent, 'child2', 1);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('adds child at index 0 to empty contentIDs', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: [] });
		const result = attachBlockToContentIDs(parent, 'child1', 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1']);
	});

	it('adds child at beginning when index is 0', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child2', 'child3'] });
		const result = attachBlockToContentIDs(parent, 'child1', 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('adds child at end when index is length', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const result = attachBlockToContentIDs(parent, 'child3', 2);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('clamps negative index to 0', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child2', 'child3'] });
		const result = attachBlockToContentIDs(parent, 'child1', -5);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('clamps excessive index to length', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2'] });
		const result = attachBlockToContentIDs(parent, 'child3', 100);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child1', 'child2', 'child3']);
	});

	it('removes existing child before adding to prevent duplicates', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child2', 'child3'] });
		const result = attachBlockToContentIDs(parent, 'child2', 0);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.contentIDs).toEqual(['child2', 'child1', 'child3']);
		expect(result.data.contentIDs.length).toBe(3);
	});

	it('does not mutate original parent when attaching', () => {
		const parent = mockBlockInstance({ id: 'parent', contentIDs: ['child1', 'child3'] });
		attachBlockToContentIDs(parent, 'child2', 1);

		expect(parent.contentIDs).toEqual(['child1', 'child3']);
	});
});

describe('updateBlockParentID', () => {
	it('returns unchanged block when parentID is already the same', () => {
		const block = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const result = updateBlockParentID(block, 'parent');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data).toBe(block);
	});

	it('updates parentID to new value', () => {
		const block = mockBlockInstance({ id: 'child', parentID: 'old-parent' });
		const result = updateBlockParentID(block, 'new-parent');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parentID).toBe('new-parent');
		expect(result.data.id).toBe('child');
		expect(result.data).not.toBe(block);
	});

	it('updates parentID to empty string', () => {
		const block = mockBlockInstance({ id: 'child', parentID: 'parent' });
		const result = updateBlockParentID(block, '');

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(result.data.parentID).toBe('');
	});
});
