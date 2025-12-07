// Utilities
import { isPanelIDValid, isPanelTitleValid, isPanelPositionValid, isPanelSizeValid, isPanelOrderValid, isPanelIconValid, isPanelLockedValid, isPanelOpenValid, isPanelDefinitionValid } from '@/src/core/layout/panel/utilities/panel';

describe('isPanelIDValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isPanelIDValid('properties-panel')).toBe(true);
		expect(isPanelIDValid('sidebar-1')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPanelIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPanelIDValid(123)).toBe(false);
		expect(isPanelIDValid(null)).toBe(false);
		expect(isPanelIDValid(undefined)).toBe(false);
	});
});

describe('isPanelTitleValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isPanelTitleValid('Properties Panel')).toBe(true);
		expect(isPanelTitleValid('Panel')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isPanelTitleValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isPanelTitleValid(456)).toBe(false);
		expect(isPanelTitleValid(null)).toBe(false);
	});
});

describe('isPanelPositionValid', () => {
	it('accepts valid position objects', () => {
		expect(isPanelPositionValid({ top: '10px', left: '20px' })).toBe(true);
		expect(isPanelPositionValid({ top: '0', left: '0' })).toBe(true);
	});

	it('rejects objects with non-string top or left', () => {
		expect(isPanelPositionValid({ top: 10, left: '20px' })).toBe(false);
		expect(isPanelPositionValid({ top: '10px', left: 20 })).toBe(false);
	});

	it('rejects objects missing required properties', () => {
		expect(isPanelPositionValid({ top: '10px' })).toBe(false);
		expect(isPanelPositionValid({ left: '20px' })).toBe(false);
		expect(isPanelPositionValid({})).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isPanelPositionValid(null)).toBe(false);
		expect(isPanelPositionValid(undefined)).toBe(false);
		expect(isPanelPositionValid('position')).toBe(false);
	});
});

describe('isPanelSizeValid', () => {
	it('accepts valid size objects', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200, minHeight: 300 })).toBe(true);
		expect(isPanelSizeValid({ width: '100%', height: '50%', minWidth: 0, minHeight: 0 })).toBe(true);
	});

	it('rejects objects with non-string width or height', () => {
		expect(isPanelSizeValid({ width: 300, height: '400px', minWidth: 200, minHeight: 300 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: 400, minWidth: 200, minHeight: 300 })).toBe(false);
	});

	it('rejects objects with non-number minWidth or minHeight', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: '200', minHeight: 300 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200, minHeight: '300' })).toBe(false);
	});

	it('rejects objects missing required properties', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: '400px' })).toBe(false);
		expect(isPanelSizeValid({})).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isPanelSizeValid(null)).toBe(false);
		expect(isPanelSizeValid(undefined)).toBe(false);
		expect(isPanelSizeValid('size')).toBe(false);
	});
});

describe('isPanelOrderValid', () => {
	it('accepts valid numbers', () => {
		expect(isPanelOrderValid(0)).toBe(true);
		expect(isPanelOrderValid(5)).toBe(true);
		expect(isPanelOrderValid(-1)).toBe(true);
		expect(isPanelOrderValid(1.5)).toBe(true);
	});

	it('rejects NaN', () => {
		expect(isPanelOrderValid(NaN)).toBe(false);
	});

	it('rejects non-number values', () => {
		expect(isPanelOrderValid('5')).toBe(false);
		expect(isPanelOrderValid(null)).toBe(false);
		expect(isPanelOrderValid(undefined)).toBe(false);
	});
});

describe('isPanelIconValid', () => {
	it('accepts any non-null/undefined values', () => {
		expect(isPanelIconValid({})).toBe(true);
		expect(isPanelIconValid('icon')).toBe(true);
		expect(isPanelIconValid(123)).toBe(true);
		expect(isPanelIconValid(() => {})).toBe(true);
	});

	it('rejects null and undefined', () => {
		expect(isPanelIconValid(null)).toBe(false);
		expect(isPanelIconValid(undefined)).toBe(false);
	});
});

describe('isPanelLockedValid', () => {
	it('accepts boolean values', () => {
		expect(isPanelLockedValid(true)).toBe(true);
		expect(isPanelLockedValid(false)).toBe(true);
	});

	it('rejects non-boolean values', () => {
		expect(isPanelLockedValid('true')).toBe(false);
		expect(isPanelLockedValid(1)).toBe(false);
		expect(isPanelLockedValid(null)).toBe(false);
	});
});

describe('isPanelOpenValid', () => {
	it('accepts boolean values', () => {
		expect(isPanelOpenValid(true)).toBe(true);
		expect(isPanelOpenValid(false)).toBe(true);
	});

	it('rejects non-boolean values', () => {
		expect(isPanelOpenValid('false')).toBe(false);
		expect(isPanelOpenValid(0)).toBe(false);
		expect(isPanelOpenValid(null)).toBe(false);
	});
});

describe('isPanelDefinitionValid', () => {
	it('accepts valid panel definition', () => {
		const panel = {
			id: 'panel1',
			title: 'Panel',
			order: 1,
			icon: {},
			workbenchID: 'main',
			initialPosition: { top: '0', left: '0' },
			initialSize: { width: '300px', height: '400px', minWidth: 200, minHeight: 300 },
			initialLocked: false,
			initialOpen: true,
		};
		expect(isPanelDefinitionValid(panel)).toBe(true);
	});

	it('rejects objects missing required properties', () => {
		const panelNoId = {
			title: 'Panel',
			order: 1,
			icon: {},
			workbenchID: 'main',
			initialPosition: {},
			initialSize: {},
			initialLocked: false,
			initialOpen: true,
		};
		expect(isPanelDefinitionValid(panelNoId)).toBe(false);

		const panelNoTitle = {
			id: 'panel1',
			order: 1,
			icon: {},
			workbenchID: 'main',
			initialPosition: {},
			initialSize: {},
			initialLocked: false,
			initialOpen: true,
		};
		expect(isPanelDefinitionValid(panelNoTitle)).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isPanelDefinitionValid(null)).toBe(false);
		expect(isPanelDefinitionValid(undefined)).toBe(false);
		expect(isPanelDefinitionValid('panel')).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const panel = {
			id: 'panel1',
			title: 'Panel',
			order: 1,
			icon: {},
			workbenchID: 'main',
			initialPosition: { top: '0', left: '0' },
			initialSize: { width: '300px', height: '400px', minWidth: 200, minHeight: 300 },
			initialLocked: false,
			initialOpen: true,
			extra: 'property',
		};
		expect(isPanelDefinitionValid(panel)).toBe(true);
	});
});
