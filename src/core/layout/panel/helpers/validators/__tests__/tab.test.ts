import { validatePanelTabID, validatePanelTabTitle, validatePanelTabComponent, validatePanelTabIcon, validatePanelTabOrder, validatePanelTabDefinition } from '../tab';
import { mockReactElement } from '@/src/shared/helpers/mock';

// Mock React component for testing
const mockComponent = () => null;

describe('validatePanelTabID', () => {
	it('accepts valid tab ID', () => {
		const result = validatePanelTabID('tab-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('tab-1');
	});

	it('rejects non-string values', () => {
		const results = [validatePanelTabID(123), validatePanelTabID(null), validatePanelTabID(undefined), validatePanelTabID({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePanelTabID('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelTabTitle', () => {
	it('accepts valid tab title', () => {
		const result = validatePanelTabTitle('Properties');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Properties');
	});

	it('rejects non-string values', () => {
		const results = [validatePanelTabTitle(123), validatePanelTabTitle(null), validatePanelTabTitle(undefined), validatePanelTabTitle({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab title must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePanelTabTitle('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelTabComponent', () => {
	it('accepts valid React component', () => {
		const result = validatePanelTabComponent(mockComponent);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(mockComponent);
	});

	it('accepts component function', () => {
		const component = () => null;
		const result = validatePanelTabComponent(component);

		expect(result.valid).toBe(true);
	});

	it('rejects non-function values', () => {
		const results = [validatePanelTabComponent('component'), validatePanelTabComponent(123), validatePanelTabComponent(null), validatePanelTabComponent(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab component must be a valid React component');
		});
	});
});

describe('validatePanelTabIcon', () => {
	it('accepts valid React element', () => {
		const icon = mockReactElement();
		const result = validatePanelTabIcon(icon);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(icon);
	});
});

describe('validatePanelTabOrder', () => {
	it('accepts valid tab order', () => {
		const result = validatePanelTabOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('accepts negative and positive numbers', () => {
		const results = [validatePanelTabOrder(-1), validatePanelTabOrder(100)];
		results.forEach((result) => {
			expect(result.valid).toBe(true);
		});
	});

	it('rejects non-number values', () => {
		const results = [validatePanelTabOrder('0'), validatePanelTabOrder(null), validatePanelTabOrder(undefined), validatePanelTabOrder({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Tab order must be a valid number');
		});
	});

	it('rejects NaN', () => {
		const result = validatePanelTabOrder(NaN);
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelTabDefinition', () => {
	it('accepts valid tab definition', () => {
		const tab = {
			id: 'tab-1',
			panelID: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const result = validatePanelTabDefinition(tab);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(tab);
	});

	it('rejects non-object values', () => {
		const results = [validatePanelTabDefinition('invalid'), validatePanelTabDefinition(123), validatePanelTabDefinition(null), validatePanelTabDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Invalid tab definition');
		});
	});

	it('rejects missing required properties', () => {
		const base = {
			id: 'tab-1',
			panelID: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const results = [validatePanelTabDefinition({ ...base, id: undefined }), validatePanelTabDefinition({ ...base, panelID: undefined }), validatePanelTabDefinition({ ...base, title: undefined }), validatePanelTabDefinition({ ...base, icon: undefined }), validatePanelTabDefinition({ ...base, component: undefined }), validatePanelTabDefinition({ ...base, order: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const base = {
			id: 'tab-1',
			panelID: 'panel-1',
			title: 'Properties',
			icon: mockReactElement(),
			component: mockComponent,
			order: 0,
		};

		const results = [validatePanelTabDefinition({ ...base, id: 123 }), validatePanelTabDefinition({ ...base, panelID: null }), validatePanelTabDefinition({ ...base, title: '' }), validatePanelTabDefinition({ ...base, component: 'string' }), validatePanelTabDefinition({ ...base, order: 'zero' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});
