// Utilities
import { isPanelIDValid, isPanelTitleValid, isPanelPositionValid, isPanelSizeValid, isPanelOrderValid, isPanelIconValid, isPanelLockedValid, isPanelOpenValid, isPanelDefinitionValid } from '@/src/core/layout/panel/utilities/panel';

// Panel ID validation: non-empty string checks
describe('isPanelIDValid', () => {
	// Accepts valid non-empty strings
	it('accepts valid non-empty strings', () => {
		expect(isPanelIDValid('properties-panel')).toBe(true);
		expect(isPanelIDValid('sidebar-1')).toBe(true);
	});

	// Rejects empty strings
	it('rejects empty strings', () => {
		expect(isPanelIDValid('')).toBe(false);
	});

	// Rejects non-string values
	it('rejects non-string values', () => {
		expect(isPanelIDValid(123)).toBe(false);
		expect(isPanelIDValid(null)).toBe(false);
		expect(isPanelIDValid(undefined)).toBe(false);
	});
});

// Panel title validation: non-empty string checks
describe('isPanelTitleValid', () => {
	// Accepts valid non-empty strings
	it('accepts valid non-empty strings', () => {
		expect(isPanelTitleValid('Properties Panel')).toBe(true);
		expect(isPanelTitleValid('Panel')).toBe(true);
	});

	// Rejects empty strings
	it('rejects empty strings', () => {
		expect(isPanelTitleValid('')).toBe(false);
	});

	// Rejects non-string values
	it('rejects non-string values', () => {
		expect(isPanelTitleValid(456)).toBe(false);
		expect(isPanelTitleValid(null)).toBe(false);
	});
});

// Panel position validation: object with top and left string properties
describe('isPanelPositionValid', () => {
	// Accepts valid position objects
	it('accepts valid position objects', () => {
		expect(isPanelPositionValid({ top: '10px', left: '20px' })).toBe(true);
		expect(isPanelPositionValid({ top: '0', left: '0' })).toBe(true);
	});

	// Rejects objects with non-string top or left
	it('rejects objects with non-string top or left', () => {
		expect(isPanelPositionValid({ top: 10, left: '20px' })).toBe(false);
		expect(isPanelPositionValid({ top: '10px', left: 20 })).toBe(false);
	});

	// Rejects objects missing required properties
	it('rejects objects missing required properties', () => {
		expect(isPanelPositionValid({ top: '10px' })).toBe(false);
		expect(isPanelPositionValid({ left: '20px' })).toBe(false);
		expect(isPanelPositionValid({})).toBe(false);
	});

	// Rejects non-object values
	it('rejects non-object values', () => {
		expect(isPanelPositionValid(null)).toBe(false);
		expect(isPanelPositionValid(undefined)).toBe(false);
		expect(isPanelPositionValid('position')).toBe(false);
	});
});

// Panel size validation: width, height (strings) and minWidth, minHeight (numbers)
describe('isPanelSizeValid', () => {
	// Accepts valid size objects
	it('accepts valid size objects', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200, minHeight: 300 })).toBe(true);
		expect(isPanelSizeValid({ width: '100%', height: '50%', minWidth: 0, minHeight: 0 })).toBe(true);
	});

	// Rejects objects with non-string width or height
	it('rejects objects with non-string width or height', () => {
		expect(isPanelSizeValid({ width: 300, height: '400px', minWidth: 200, minHeight: 300 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: 400, minWidth: 200, minHeight: 300 })).toBe(false);
	});

	// Rejects objects with non-number minWidth or minHeight
	it('rejects objects with non-number minWidth or minHeight', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: '200', minHeight: 300 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200, minHeight: '300' })).toBe(false);
	});

	// Rejects objects missing required properties
	it('rejects objects missing required properties', () => {
		expect(isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200 })).toBe(false);
		expect(isPanelSizeValid({ width: '300px', height: '400px' })).toBe(false);
		expect(isPanelSizeValid({})).toBe(false);
	});

	// Rejects non-object values
	it('rejects non-object values', () => {
		expect(isPanelSizeValid(null)).toBe(false);
		expect(isPanelSizeValid(undefined)).toBe(false);
		expect(isPanelSizeValid('size')).toBe(false);
	});
});

// Panel order validation: valid number (not NaN)
describe('isPanelOrderValid', () => {
	// Accepts valid numbers
	it('accepts valid numbers', () => {
		expect(isPanelOrderValid(0)).toBe(true);
		expect(isPanelOrderValid(5)).toBe(true);
		expect(isPanelOrderValid(-1)).toBe(true);
		expect(isPanelOrderValid(1.5)).toBe(true);
	});

	// Rejects NaN
	it('rejects NaN', () => {
		expect(isPanelOrderValid(NaN)).toBe(false);
	});

	// Rejects non-number values
	it('rejects non-number values', () => {
		expect(isPanelOrderValid('5')).toBe(false);
		expect(isPanelOrderValid(null)).toBe(false);
		expect(isPanelOrderValid(undefined)).toBe(false);
	});
});

// Panel icon validation: not null or undefined
describe('isPanelIconValid', () => {
	// Accepts any non-null/undefined values
	it('accepts any non-null/undefined values', () => {
		expect(isPanelIconValid({})).toBe(true);
		expect(isPanelIconValid('icon')).toBe(true);
		expect(isPanelIconValid(123)).toBe(true);
		expect(isPanelIconValid(() => {})).toBe(true);
	});

	// Rejects null and undefined
	it('rejects null and undefined', () => {
		expect(isPanelIconValid(null)).toBe(false);
		expect(isPanelIconValid(undefined)).toBe(false);
	});
});

// Panel locked state validation: boolean
describe('isPanelLockedValid', () => {
	// Accepts boolean values
	it('accepts boolean values', () => {
		expect(isPanelLockedValid(true)).toBe(true);
		expect(isPanelLockedValid(false)).toBe(true);
	});

	// Rejects non-boolean values
	it('rejects non-boolean values', () => {
		expect(isPanelLockedValid('true')).toBe(false);
		expect(isPanelLockedValid(1)).toBe(false);
		expect(isPanelLockedValid(null)).toBe(false);
	});
});

// Panel open state validation: boolean
describe('isPanelOpenValid', () => {
	// Accepts boolean values
	it('accepts boolean values', () => {
		expect(isPanelOpenValid(true)).toBe(true);
		expect(isPanelOpenValid(false)).toBe(true);
	});

	// Rejects non-boolean values
	it('rejects non-boolean values', () => {
		expect(isPanelOpenValid('false')).toBe(false);
		expect(isPanelOpenValid(0)).toBe(false);
		expect(isPanelOpenValid(null)).toBe(false);
	});
});

// Panel definition validation: object with all required properties
describe('isPanelDefinitionValid', () => {
	// Accepts valid panel definition
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

	// Rejects objects missing required properties
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

	// Rejects non-object values
	it('rejects non-object values', () => {
		expect(isPanelDefinitionValid(null)).toBe(false);
		expect(isPanelDefinitionValid(undefined)).toBe(false);
		expect(isPanelDefinitionValid('panel')).toBe(false);
	});

	// Accepts definitions with additional properties
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
