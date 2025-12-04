// Tests for workbench utilities
import { isWorkbenchOrderValid, isWorkbenchTitleValid, isWorkbenchRenderValid, isWorkbenchIconValid, isWorkbenchIDValid, isWorkbenchDefinitionValid } from '../workbench';

describe('isWorkbenchOrderValid', () => {
	// Accepts valid numbers
	it('should accept valid positive numbers', () => {
		expect(isWorkbenchOrderValid(1)).toBe(true);
		expect(isWorkbenchOrderValid(100)).toBe(true);
	});

	// Accepts zero
	it('should accept zero', () => {
		expect(isWorkbenchOrderValid(0)).toBe(true);
	});

	// Accepts negative numbers
	it('should accept negative numbers', () => {
		expect(isWorkbenchOrderValid(-5)).toBe(true);
	});

	// Rejects NaN
	it('should reject NaN', () => {
		expect(isWorkbenchOrderValid(NaN)).toBe(false);
	});

	// Rejects non-number types
	it('should reject non-number types', () => {
		expect(isWorkbenchOrderValid('1')).toBe(false);
		expect(isWorkbenchOrderValid(null)).toBe(false);
		expect(isWorkbenchOrderValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchTitleValid', () => {
	// Accepts non-empty strings
	it('should accept non-empty strings', () => {
		expect(isWorkbenchTitleValid('Design')).toBe(true);
		expect(isWorkbenchTitleValid('Design Workbench')).toBe(true);
	});

	// Rejects empty strings
	it('should reject empty strings', () => {
		expect(isWorkbenchTitleValid('')).toBe(false);
	});

	// Rejects non-string types
	it('should reject non-string types', () => {
		expect(isWorkbenchTitleValid(123)).toBe(false);
		expect(isWorkbenchTitleValid(null)).toBe(false);
		expect(isWorkbenchTitleValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchRenderValid', () => {
	// Accepts functions
	it('should accept functions', () => {
		expect(isWorkbenchRenderValid(() => null)).toBe(true);
		expect(isWorkbenchRenderValid(function () {})).toBe(true);
	});

	// Rejects non-function types
	it('should reject non-function types', () => {
		expect(isWorkbenchRenderValid('render')).toBe(false);
		expect(isWorkbenchRenderValid(123)).toBe(false);
		expect(isWorkbenchRenderValid(null)).toBe(false);
		expect(isWorkbenchRenderValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchIconValid', () => {
	// Accepts non-null/non-undefined values
	it('should accept any non-null/non-undefined value', () => {
		expect(isWorkbenchIconValid({})).toBe(true);
		expect(isWorkbenchIconValid('icon')).toBe(true);
		expect(isWorkbenchIconValid(123)).toBe(true);
		expect(isWorkbenchIconValid(false)).toBe(true);
	});

	// Rejects null
	it('should reject null', () => {
		expect(isWorkbenchIconValid(null)).toBe(false);
	});

	// Rejects undefined
	it('should reject undefined', () => {
		expect(isWorkbenchIconValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchIDValid', () => {
	// Accepts non-empty strings
	it('should accept non-empty strings', () => {
		expect(isWorkbenchIDValid('design-workbench')).toBe(true);
		expect(isWorkbenchIDValid('wb1')).toBe(true);
	});

	// Rejects empty strings
	it('should reject empty strings', () => {
		expect(isWorkbenchIDValid('')).toBe(false);
	});

	// Rejects non-string types
	it('should reject non-string types', () => {
		expect(isWorkbenchIDValid(123)).toBe(false);
		expect(isWorkbenchIDValid(null)).toBe(false);
		expect(isWorkbenchIDValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchDefinitionValid', () => {
	// Accepts valid workbench definition
	it('should accept valid workbench definition with all required properties', () => {
		const validDefinition = {
			id: 'wb1',
			title: 'Design',
			icon: 'icon',
			order: 1,
			render: () => null,
		};
		expect(isWorkbenchDefinitionValid(validDefinition)).toBe(true);
	});

	// Accepts definition with extra properties
	it('should accept definition with extra properties', () => {
		const definitionWithExtra = {
			id: 'wb1',
			title: 'Design',
			icon: 'icon',
			order: 1,
			render: () => null,
			extra: 'property',
		};
		expect(isWorkbenchDefinitionValid(definitionWithExtra)).toBe(true);
	});

	// Rejects missing id
	it('should reject definition missing id property', () => {
		const missingId = {
			title: 'Design',
			icon: 'icon',
			order: 1,
			render: () => null,
		};
		expect(isWorkbenchDefinitionValid(missingId)).toBe(false);
	});

	// Rejects missing title
	it('should reject definition missing title property', () => {
		const missingTitle = {
			id: 'wb1',
			icon: 'icon',
			order: 1,
			render: () => null,
		};
		expect(isWorkbenchDefinitionValid(missingTitle)).toBe(false);
	});

	// Rejects missing icon
	it('should reject definition missing icon property', () => {
		const missingIcon = {
			id: 'wb1',
			title: 'Design',
			order: 1,
			render: () => null,
		};
		expect(isWorkbenchDefinitionValid(missingIcon)).toBe(false);
	});

	// Rejects missing order
	it('should reject definition missing order property', () => {
		const missingOrder = {
			id: 'wb1',
			title: 'Design',
			icon: 'icon',
			render: () => null,
		};
		expect(isWorkbenchDefinitionValid(missingOrder)).toBe(false);
	});

	// Rejects missing render
	it('should reject definition missing render property', () => {
		const missingRender = {
			id: 'wb1',
			title: 'Design',
			icon: 'icon',
			order: 1,
		};
		expect(isWorkbenchDefinitionValid(missingRender)).toBe(false);
	});

	// Rejects non-object types
	it('should reject non-object types', () => {
		expect(isWorkbenchDefinitionValid('definition')).toBe(false);
		expect(isWorkbenchDefinitionValid(123)).toBe(false);
		expect(isWorkbenchDefinitionValid(null)).toBe(false);
		expect(isWorkbenchDefinitionValid(undefined)).toBe(false);
	});
});
