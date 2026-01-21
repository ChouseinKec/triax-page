// Utilities
import { validateBenchKey, validateBenchTitle, validateBenchOrder, validateBenchComponent, validateBenchIcon, validateBenchDefinition } from '../bench';
import { mockWorkbenchInstance, mockReactElement } from '@/shared/helpers/mock';

describe('validateBenchKey', () => {
	it('returns valid result for non-empty string', () => {
		const result = validateBenchKey('workbench-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('workbench-1');
	});

	it('rejects empty string', () => {
		const result = validateBenchKey('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects non-string values', () => {
		const result = validateBenchKey(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateBenchKey(null);
		const resultUndefined = validateBenchKey(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateBenchOrder', () => {
	it('returns valid result for number', () => {
		const result = validateBenchOrder(5);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(5);
	});

	it('returns valid result for zero', () => {
		const result = validateBenchOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('returns valid result for negative number', () => {
		const result = validateBenchOrder(-10);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(-10);
	});

	it('rejects NaN', () => {
		const result = validateBenchOrder(NaN);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid number');
	});

	it('rejects non-number values', () => {
		const result = validateBenchOrder('5');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid number');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateBenchOrder(null);
		const resultUndefined = validateBenchOrder(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateBenchTitle', () => {
	it('returns valid result for non-empty string', () => {
		const result = validateBenchTitle('My Workbench');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('My Workbench');
	});

	it('rejects empty string', () => {
		const result = validateBenchTitle('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects non-string values', () => {
		const result = validateBenchTitle(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid string');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateBenchTitle(null);
		const resultUndefined = validateBenchTitle(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateBenchComponent', () => {
	it('returns valid result for function', () => {
		const renderFn = () => null;
		const result = validateBenchComponent(renderFn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(renderFn);
	});

	it('returns valid result for React component function', () => {
		const Component = () => null as any;
		const result = validateBenchComponent(Component);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(Component);
	});

	it('rejects non-function values', () => {
		const result = validateBenchComponent('function');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be a valid function');
	});

	it('rejects null or undefined', () => {
		const resultNull = validateBenchComponent(null);
		const resultUndefined = validateBenchComponent(undefined);
		expect(resultNull.valid).toBe(false);
		expect(resultUndefined.valid).toBe(false);
	});
});

describe('validateBenchIcon', () => {
	it('returns valid result for string icon', () => {
		const result = validateBenchIcon('icon-name');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('icon-name');
	});

	it('returns valid result for React element', () => {
		const element = mockReactElement();
		const result = validateBenchIcon(element);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(element);
	});

	it('returns valid result for object (ReactNode)', () => {
		const node = { key: 'value' };
		const result = validateBenchIcon(node);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(node);
	});

	it('rejects null', () => {
		const result = validateBenchIcon(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be valid');
	});

	it('rejects undefined', () => {
		const result = validateBenchIcon(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be valid');
	});
});

describe('validateBenchDefinition', () => {
	it('returns valid result for complete workbench instance', () => {
		const workbench = mockWorkbenchInstance();
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toHaveProperty('id');
		expect(result.value).toHaveProperty('title');
		expect(result.value).toHaveProperty('icon');
		expect(result.value).toHaveProperty('order');
		expect(result.value).toHaveProperty('render');
	});

	it('rejects non-object values', () => {
		const result = validateBenchDefinition('not-an-object');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('must be an object');
	});

	it('rejects object missing required properties', () => {
		const result = validateBenchDefinition({ id: 'test', title: 'Test' });
		expect(result.valid).toBe(false);
	});

	it('rejects invalid id in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ key: '' });
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('ID');
	});

	it('rejects invalid title in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ title: '' });
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('title');
	});

	it('rejects invalid order in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ order: NaN });
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('order');
	});

	it('rejects invalid render in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ component: 'not-a-function' as any });
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('render');
	});

	it('rejects invalid icon in otherwise valid object', () => {
		const workbench = mockWorkbenchInstance({ icon: null as any });
		const result = validateBenchDefinition(workbench);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('icon');
	});
});
