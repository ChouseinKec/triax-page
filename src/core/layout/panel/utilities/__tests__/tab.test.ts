// Utilities
import { isPanelTabIDValid, isPanelTabTitleValid, isPanelTabComponentValid, isPanelTabIconValid, isPanelTabOrderValid, isPanelTabDefinitionValid } from '@/src/core/layout/panel/utilities/tab';

describe('isPanelTabIDValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isPanelTabIDValid('properties-tab')).toBe(true);
		expect(isPanelTabIDValid('settings-tab')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPanelTabIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPanelTabIDValid(123)).toBe(false);
		expect(isPanelTabIDValid(null)).toBe(false);
		expect(isPanelTabIDValid(undefined)).toBe(false);
	});
});

describe('isPanelTabTitleValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isPanelTabTitleValid('Properties')).toBe(true);
		expect(isPanelTabTitleValid('Settings')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPanelTabTitleValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPanelTabTitleValid(456)).toBe(false);
		expect(isPanelTabTitleValid(null)).toBe(false);
	});
});

describe('isPanelTabComponentValid', () => {
	it('accepts functions', () => {
		expect(isPanelTabComponentValid(() => {})).toBe(true);
		expect(isPanelTabComponentValid(function () {})).toBe(true);
		expect(isPanelTabComponentValid(async () => {})).toBe(true);
	});

	it('rejects non-function values', () => {
		expect(isPanelTabComponentValid('component')).toBe(false);
		expect(isPanelTabComponentValid(123)).toBe(false);
		expect(isPanelTabComponentValid(null)).toBe(false);
		expect(isPanelTabComponentValid({})).toBe(false);
	});
});

describe('isPanelTabIconValid', () => {
	it('accepts any non-null/undefined values', () => {
		expect(isPanelTabIconValid({})).toBe(true);
		expect(isPanelTabIconValid('icon')).toBe(true);
		expect(isPanelTabIconValid(123)).toBe(true);
		expect(isPanelTabIconValid(() => {})).toBe(true);
	});

	it('rejects null and undefined', () => {
		expect(isPanelTabIconValid(null)).toBe(false);
		expect(isPanelTabIconValid(undefined)).toBe(false);
	});
});

describe('isPanelTabOrderValid', () => {
	it('accepts valid numbers', () => {
		expect(isPanelTabOrderValid(0)).toBe(true);
		expect(isPanelTabOrderValid(3)).toBe(true);
		expect(isPanelTabOrderValid(-1)).toBe(true);
		expect(isPanelTabOrderValid(2.5)).toBe(true);
	});

	it('rejects NaN', () => {
		expect(isPanelTabOrderValid(NaN)).toBe(false);
	});

	it('rejects non-number values', () => {
		expect(isPanelTabOrderValid('3')).toBe(false);
		expect(isPanelTabOrderValid(null)).toBe(false);
		expect(isPanelTabOrderValid(undefined)).toBe(false);
	});
});

describe('isPanelTabDefinitionValid', () => {
	it('accepts valid tab definition', () => {
		const tab = {
			id: 'tab1',
			title: 'Settings',
			component: () => {},
			icon: {},
			order: 1,
			panelID: 'panel1',
		};
		expect(isPanelTabDefinitionValid(tab)).toBe(true);
	});

	it('rejects objects missing required properties', () => {
		const tabNoId = { title: 'Settings', component: () => {}, icon: {}, order: 1, panelID: 'panel1' };
		expect(isPanelTabDefinitionValid(tabNoId)).toBe(false);

		const tabNoTitle = { id: 'tab1', component: () => {}, icon: {}, order: 1, panelID: 'panel1' };
		expect(isPanelTabDefinitionValid(tabNoTitle)).toBe(false);

		const tabNoComponent = { id: 'tab1', title: 'Settings', icon: {}, order: 1, panelID: 'panel1' };
		expect(isPanelTabDefinitionValid(tabNoComponent)).toBe(false);

		const tabNoIcon = { id: 'tab1', title: 'Settings', component: () => {}, order: 1, panelID: 'panel1' };
		expect(isPanelTabDefinitionValid(tabNoIcon)).toBe(false);

		const tabNoOrder = { id: 'tab1', title: 'Settings', component: () => {}, icon: {}, panelID: 'panel1' };
		expect(isPanelTabDefinitionValid(tabNoOrder)).toBe(false);

		const tabNoPanelID = { id: 'tab1', title: 'Settings', component: () => {}, icon: {}, order: 1 };
		expect(isPanelTabDefinitionValid(tabNoPanelID)).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isPanelTabDefinitionValid(null)).toBe(false);
		expect(isPanelTabDefinitionValid(undefined)).toBe(false);
		expect(isPanelTabDefinitionValid('tab')).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const tab = {
			id: 'tab1',
			title: 'Settings',
			component: () => {},
			icon: {},
			order: 1,
			panelID: 'panel1',
			extra: 'property',
		};
		expect(isPanelTabDefinitionValid(tab)).toBe(true);
	});
});
