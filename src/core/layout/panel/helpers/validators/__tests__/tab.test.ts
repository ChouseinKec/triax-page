import { validateTabKey, validateTabTitle, validateTabComponent, validateTabIcon, validateTabOrder, validateTabDefinition } from '../tab';
import { mockReactElement } from '@/shared/helpers/mock';

// Mock React component for testing
const mockComponent = () => null;

describe('validateTabKey', () => {
	it('accepts valid tab ID', () => {
		const result = validateTabKey('tab-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('tab-1');
	});

	it('rejects non-string values', () => {
		const results = [validateTabKey(123), validateTabKey(null), validateTabKey(undefined), validateTabKey({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateTabKey('');
		expect(result.valid).toBe(false);
	});
});

describe('validateTabTitle', () => {
	it('accepts valid tab title', () => {
		const result = validateTabTitle('Properties');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Properties');
	});

	it('rejects non-string values', () => {
		const results = [validateTabTitle(123), validateTabTitle(null), validateTabTitle(undefined), validateTabTitle({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab title must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateTabTitle('');
		expect(result.valid).toBe(false);
	});
});

describe('validateTabComponent', () => {
	it('accepts valid React component', () => {
		const result = validateTabComponent(mockComponent);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(mockComponent);
	});

	it('accepts component function', () => {
		const component = () => null;
		const result = validateTabComponent(component);

		expect(result.valid).toBe(true);
	});

	it('rejects non-function values', () => {
		const results = [validateTabComponent('component'), validateTabComponent(123), validateTabComponent(null), validateTabComponent(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab component must be a valid React component');
		});
	});
});

describe('validateTabIcon', () => {
	it('accepts valid React element', () => {
		const icon = mockReactElement();
		const result = validateTabIcon(icon);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(icon);
	});
});

describe('validateTabOrder', () => {
	it('accepts valid tab order', () => {
		const result = validateTabOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('accepts negative and positive numbers', () => {
		const results = [validateTabOrder(-1), validateTabOrder(100)];
		results.forEach((result) => {
			expect(result.valid).toBe(true);
		});
	});

	it('rejects non-number values', () => {
		const results = [validateTabOrder('0'), validateTabOrder(null), validateTabOrder(undefined), validateTabOrder({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab order must be a valid number');
		});
	});

	it('rejects NaN', () => {
		const result = validateTabOrder(NaN);
		expect(result.valid).toBe(false);
	});
});

describe('validateTabDefinition', () => {
	it('accepts valid tab definition', () => {
		const tab = {
			id: 'tab-1',
			panelKey: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const result = validateTabDefinition(tab);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(tab);
	});

	it('rejects non-object values', () => {
		const results = [validateTabDefinition('invalid'), validateTabDefinition(123), validateTabDefinition(null), validateTabDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Invalid tab definition');
		});
	});

	it('rejects missing required properties', () => {
		const base = {
			id: 'tab-1',
			panelKey: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const results = [validateTabDefinition({ ...base, id: undefined }), validateTabDefinition({ ...base, panelKey: undefined }), validateTabDefinition({ ...base, title: undefined }), validateTabDefinition({ ...base, icon: undefined }), validateTabDefinition({ ...base, component: undefined }), validateTabDefinition({ ...base, order: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const base = {
			id: 'tab-1',
			panelKey: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const results = [validateTabDefinition({ ...base, id: 123 }), validateTabDefinition({ ...base, panelKey: null }), validateTabDefinition({ ...base, title: '' }), validateTabDefinition({ ...base, component: 'string' }), validateTabDefinition({ ...base, order: 'zero' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});
