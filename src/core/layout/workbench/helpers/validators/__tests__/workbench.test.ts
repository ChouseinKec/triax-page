// Utilities
import { validateWorkbenchID, validateWorkbenchTitle, validateWorkbenchOrder, validateWorkbenchRender, validateWorkbenchIcon, validateWorkbench } from '../workbench';
import { mockWorkbenchInstance, mockReactElement } from '@/src/shared/helpers/mock';

describe('validateWorkbenchID', () => {
	it('returns valid result for non-empty string', () => {
		const result = validateWorkbenchID('workbench-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('workbench-1');
	});

	it('rejects empty string', () => {
		const result = validateWorkbenchID('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects non-string values', () => {
		const result = validateWorkbenchID(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateWorkbenchID(null);
		const resultUndefined = validateWorkbenchID(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateWorkbenchOrder', () => {
	it('returns valid result for number', () => {
		const result = validateWorkbenchOrder(5);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(5);
	});

	it('returns valid result for zero', () => {
		const result = validateWorkbenchOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('returns valid result for negative number', () => {
		const result = validateWorkbenchOrder(-10);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(-10);
	});

	it('rejects NaN', () => {
		const result = validateWorkbenchOrder(NaN);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid number');
	});

	it('rejects non-number values', () => {
		const result = validateWorkbenchOrder('5');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid number');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateWorkbenchOrder(null);
		const resultUndefined = validateWorkbenchOrder(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateWorkbenchTitle', () => {
	it('returns valid result for non-empty string', () => {
		const result = validateWorkbenchTitle('My Workbench');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('My Workbench');
	});

	it('rejects empty string', () => {
		const result = validateWorkbenchTitle('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects non-string values', () => {
		const result = validateWorkbenchTitle(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateWorkbenchTitle(null);
		const resultUndefined = validateWorkbenchTitle(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateWorkbenchRender', () => {
	it('returns valid result for function', () => {
		const renderFn = () => null;
		const result = validateWorkbenchRender(renderFn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(renderFn);
	});

	it('returns valid result for React component function', () => {
		const Component = () => null as any;
		const result = validateWorkbenchRender(Component);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(Component);
	});

	it('rejects non-function values', () => {
		const result = validateWorkbenchRender('function');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid function');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateWorkbenchRender(null);
		const resultUndefined = validateWorkbenchRender(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateWorkbenchIcon', () => {
	it('returns valid result for string icon', () => {
		const result = validateWorkbenchIcon('icon-name');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('icon-name');
	});

	it('returns valid result for React element', () => {
		const element = mockReactElement();
		const result = validateWorkbenchIcon(element);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(element);
	});

	it('returns valid result for object (ReactNode)', () => {
		const node = { key: 'value' };
		const result = validateWorkbenchIcon(node);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(node);
	});

	it('rejects null', () => {
		const result = validateWorkbenchIcon(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be valid');
	});

	it('rejects undefined', () => {
		const result = validateWorkbenchIcon(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be valid');
	});
});

describe('validateWorkbench', () => {
	it('returns valid result for complete workbench instance', () => {
		const workbench = mockWorkbenchInstance();
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toHaveProperty('id');
		expect(result.value).toHaveProperty('title');
		expect(result.value).toHaveProperty('icon');
		expect(result.value).toHaveProperty('order');
		expect(result.value).toHaveProperty('render');
	});

	it('rejects non-object values', () => {
		const result = validateWorkbench('not-an-object');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be an object');
	});

	it('rejects object missing required properties', () => {
		const result = validateWorkbench({ id: 'test', title: 'Test' });
		expect(result.valid).toBe(false);
	});

	it('rejects invalid id in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ id: '' });
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('ID');
	});

	it('rejects invalid title in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ title: '' });
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('title');
	});

	it('rejects invalid order in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ order: NaN });
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('order');
	});

	it('rejects invalid render in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ render: 'not-a-function' as any });
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('render');
	});

	it('rejects invalid icon in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ icon: null as any });
		const result = validateWorkbench(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('icon');
	});
});
