// Utilities
import { validateBlockID, validateBlockType, validateBlockTag, validateBlockAvailableTags, validateBlockRender, validateBlockAllowedChildren, validateBlockCategory, validateBlockIcon, validateBlockInstance, validateBlockDefinition } from '..';

// Mock data
import { mockBlockInstance, mockBlockDefinition } from '@/src/shared/helpers/mock';

// Mock icons to avoid JSX in tests
jest.mock('@/src/core/block/style/constants/icon', () => ({
	STYLE_ICON_DEFINITIONS: {},
}));

describe('validateBlockID', () => {
	it('accepts valid string id', () => {
		const result = validateBlockID('block-123');
		expect(result.valid).toBe(true);

		if (!result.valid) return;

		expect(result.value).toBe('block-123');
	});

	it('returns same id value', () => {
		const result = validateBlockID('test-id-456');
		expect(result.valid).toBe(true);
		if (!result.valid) return;
		expect(result.value).toBe('test-id-456');
	});

	it('rejects empty string', () => {
		const result = validateBlockID('');
		expect(result.valid).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(validateBlockID(123).valid).toBe(false);
		expect(validateBlockID(null).valid).toBe(false);
		expect(validateBlockID(undefined).valid).toBe(false);
		expect(validateBlockID({}).valid).toBe(false);
	});

	it('accepts id with special characters', () => {
		const result = validateBlockID('block_123-test.id');
		expect(result.valid).toBe(true);
	});
});

describe('validateBlockType', () => {
	it('accepts valid string type', () => {
		const result = validateBlockType('container');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('container');
	});

	it('rejects empty string', () => {
		const result = validateBlockType('');
		expect(result.valid).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(validateBlockType(123).valid).toBe(false);
		expect(validateBlockType(null).valid).toBe(false);
	});

	it('accepts different valid types', () => {
		expect(validateBlockType('text').valid).toBe(true);
		expect(validateBlockType('image').valid).toBe(true);
		expect(validateBlockType('markdown').valid).toBe(true);
	});
});

describe('validateBlockTag', () => {
	it('accepts valid html tags', () => {
		expect(validateBlockTag('div').valid).toBe(true);
		expect(validateBlockTag('span').valid).toBe(true);
		expect(validateBlockTag('p').valid).toBe(true);
	});

	it('rejects invalid tags with message', () => {
		const result = validateBlockTag('invalid-tag');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('Invalid block tag');
	});

	it('rejects non-string values', () => {
		expect(validateBlockTag(123).valid).toBe(false);
	});

	it('returns valid tag in value field', () => {
		const result = validateBlockTag('section');
		expect(result.valid).toBe(true);
		if (!result.valid) return;
		expect(result.value).toBe('section');
	});
});

describe('validateBlockAvailableTags', () => {
	it('accepts array of valid tags', () => {
		const result = validateBlockAvailableTags(['div', 'span', 'p']);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(['div', 'span', 'p']);
	});

	it('rejects empty array', () => {
		const result = validateBlockAvailableTags([]);

		expect(result.valid).toBe(false);
		if (!result.valid) return;

		expect(result.value).toEqual([]);
	});

	it('rejects array with invalid tags', () => {
		const result = validateBlockAvailableTags(['div', 'invalid-tag']);
		expect(result.valid).toBe(false);
	});

	it('rejects non-array values', () => {
		expect(validateBlockAvailableTags('div').valid).toBe(false);
		expect(validateBlockAvailableTags(null).valid).toBe(false);
	});

	it('accepts single tag in array', () => {
		const result = validateBlockAvailableTags(['div']);
		expect(result.valid).toBe(true);
	});

	it('rejects if any tag is invalid', () => {
		const result = validateBlockAvailableTags(['div', 'span', 'not-a-tag', 'p']);
		expect(result.valid).toBe(false);
	});
});

describe('validateBlockRender', () => {
	it('accepts function', () => {
		const fn = () => null;
		const result = validateBlockRender(fn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(fn);
	});

	it('returns same function reference', () => {
		const fn = (props: any) => 'rendered';
		const result = validateBlockRender(fn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(fn);
	});

	it('rejects non-function values', () => {
		expect(validateBlockRender('not a function').valid).toBe(false);
		expect(validateBlockRender(123).valid).toBe(false);
		expect(validateBlockRender({}).valid).toBe(false);
		expect(validateBlockRender(null).valid).toBe(false);
	});

	it('accepts arrow functions', () => {
		const result = validateBlockRender(() => ({ children: null }));
		expect(result.valid).toBe(true);
	});

	it('accepts async functions', () => {
		const result = validateBlockRender(async () => null);
		expect(result.valid).toBe(true);
	});
});

describe('validateBlockAllowedChildren', () => {
	it('accepts null as no restrictions', () => {
		const result = validateBlockAllowedChildren(null);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual([]);
	});

	it('accepts array of valid types', () => {
		const result = validateBlockAllowedChildren(['container', 'text', 'image']);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(['container', 'text', 'image']);
	});

	it('accepts empty array for no children', () => {
		const result = validateBlockAllowedChildren([]);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual([]);
	});

	it('rejects non-array non-null values', () => {
		expect(validateBlockAllowedChildren('container').valid).toBe(false);
		expect(validateBlockAllowedChildren(123).valid).toBe(false);
	});

	it('rejects array with invalid types', () => {
		const result = validateBlockAllowedChildren(['container', 123]);
		expect(result.valid).toBe(false);
	});

	it('accepts single type in array', () => {
		const result = validateBlockAllowedChildren(['text']);
		expect(result.valid).toBe(true);
	});

	it('rejects undefined', () => {
		const result = validateBlockAllowedChildren(undefined);
		expect(result.valid).toBe(false);
	});
});

describe('validateBlockCategory', () => {
	it('returns category when valid', () => {
		const result = validateBlockCategory('layout');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('layout');
	});

	it('accepts different valid categories', () => {
		expect(validateBlockCategory('basic').valid).toBe(true);
		expect(validateBlockCategory('advanced').valid).toBe(true);
		expect(validateBlockCategory('custom').valid).toBe(true);
	});

	it('rejects empty string', () => {
		const result = validateBlockCategory('');
		expect(result.valid).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(validateBlockCategory(123).valid).toBe(false);
		expect(validateBlockCategory(null).valid).toBe(false);
		expect(validateBlockCategory({}).valid).toBe(false);
	});

	it('rejects undefined', () => {
		const result = validateBlockCategory(undefined);
		expect(result.valid).toBe(false);
	});
});

describe('validateBlockIcon', () => {
	it('returns same element instance when valid', () => {
		const element = { $$typeof: Symbol.for('react.element') } as any;
		const result = validateBlockIcon(element);
		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(element);
	});

	it('rejects non-element values', () => {
		expect(validateBlockIcon('not an element').valid).toBe(false);
		expect(validateBlockIcon(123).valid).toBe(false);
		expect(validateBlockIcon({}).valid).toBe(false);
	});

	it('rejects null', () => {
		expect(validateBlockIcon(null).valid).toBe(false);
	});

	it('rejects undefined', () => {
		expect(validateBlockIcon(undefined).valid).toBe(false);
	});
});

describe('validateBlockInstance', () => {
	it('returns same instance when valid', () => {
		const instance = mockBlockInstance();
		const result = validateBlockInstance(instance);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(instance);
	});

	it('rejects missing required properties', () => {
		const instance = mockBlockInstance();
		const incomplete = { ...instance };
		delete (incomplete as any).id;

		const result = validateBlockInstance(incomplete);
		expect(result.valid).toBe(false);
	});

	it('rejects invalid type', () => {
		const instance = mockBlockInstance({ type: '' });
		const result = validateBlockInstance(instance);
		expect(result.valid).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(validateBlockInstance('not an object').valid).toBe(false);
		expect(validateBlockInstance(null).valid).toBe(false);
		expect(validateBlockInstance(123).valid).toBe(false);
	});

	it('accepts instance with valid attributes', () => {
		const instance = mockBlockInstance({ attributes: { id: 'test-id', class: 'test-class' } });
		const result = validateBlockInstance(instance);
		expect(result.valid).toBe(true);
	});

	it('accepts instance with valid styles', () => {
		const instance = mockBlockInstance({ styles: { all: { all: { all: { color: 'red' } } } } });
		const result = validateBlockInstance(instance);
		expect(result.valid).toBe(true);
	});

	it('accepts instance with empty contentIDs array', () => {
		const instance = mockBlockInstance({ contentIDs: [] });
		const result = validateBlockInstance(instance);
		expect(result.valid).toBe(true);
	});

	it('accepts instance with populated contentIDs array', () => {
		const instance = mockBlockInstance({ contentIDs: ['child-1', 'child-2'] });
		const result = validateBlockInstance(instance);
		expect(result.valid).toBe(true);
	});

	it('rejects instance missing parentID when required', () => {
		const instance = mockBlockInstance();
		const incomplete = { ...instance };
		delete (incomplete as any).parentID;

		const result = validateBlockInstance(incomplete);
		expect(result.valid).toBe(false);
	});
});

describe('validateBlockDefinition', () => {
	it('returns same definition instance when valid', () => {
		const definition = mockBlockDefinition();
		const result = validateBlockDefinition(definition);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(definition);
	});

	it('rejects missing required properties', () => {
		const definition = mockBlockDefinition();
		const incomplete = { ...definition };
		delete (incomplete as any).type;

		const result = validateBlockDefinition(incomplete);
		expect(result.valid).toBe(false);
	});

	it('rejects invalid type', () => {
		const definition = mockBlockDefinition({ type: '' });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(false);
	});

	it('rejects invalid defaultTag', () => {
		const definition = mockBlockDefinition({ defaultTag: 'invalid-tag' as any });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(false);
	});

	it('rejects invalid availableTags', () => {
		const definition = mockBlockDefinition({ availableTags: ['div', 'invalid-tag'] as any });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(false);
	});

	it('rejects non-function render', () => {
		const definition = mockBlockDefinition({ render: 'not a function' as any });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(validateBlockDefinition('not an object').valid).toBe(false);
		expect(validateBlockDefinition(null).valid).toBe(false);
	});

	it('accepts null allowedChildren', () => {
		const definition = mockBlockDefinition({ allowedChildren: null });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(true);
	});

	it('accepts multiple availableTags', () => {
		const definition = mockBlockDefinition({ availableTags: ['div', 'span', 'p'] });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(true);
	});

	it('accepts definition with defaultStyles', () => {
		const definition = mockBlockDefinition({ defaultStyles: { all: { all: { all: { color: 'blue' } } } } });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(true);
	});

	it('accepts definition with defaultAttributes', () => {
		const definition = mockBlockDefinition({ defaultAttributes: { id: 'default-id' } });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(true);
	});

	it('accepts definition with allowedChildren array', () => {
		const definition = mockBlockDefinition({ allowedChildren: ['p', 'span'] });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(true);
	});

	it('rejects when defaultTag is not in availableTags', () => {
		const definition = mockBlockDefinition({ defaultTag: 'div', availableTags: ['span', 'p'] });
		const result = validateBlockDefinition(definition);
		
		expect(result.valid).toBe(false);
	});

	it('rejects when availableTags is empty array', () => {
		const definition = mockBlockDefinition({ availableTags: [] });
		const result = validateBlockDefinition(definition);
		expect(result.valid).toBe(false);
	});
});
