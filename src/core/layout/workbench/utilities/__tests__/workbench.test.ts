// Tests for workbench utilities
import { isWorkbenchOrderValid, isWorkbenchTitleValid, isWorkbenchRenderValid, isWorkbenchIconValid, isWorkbenchIDValid, isWorkbenchDefinitionValid } from '../workbench';
import { mockWorkbenchInstance } from '@/src/shared/helpers/mock';

describe('isWorkbenchOrderValid', () => {
	it('accepts valid positive numbers', () => {
		expect(isWorkbenchOrderValid(1)).toBe(true);
		expect(isWorkbenchOrderValid(100)).toBe(true);
	});

	it('accepts zero', () => {
		expect(isWorkbenchOrderValid(0)).toBe(true);
	});

	it('accepts negative numbers', () => {
		expect(isWorkbenchOrderValid(-5)).toBe(true);
	});

	it('rejects NaN', () => {
		expect(isWorkbenchOrderValid(NaN)).toBe(false);
	});

	it('rejects non-number types', () => {
		expect(isWorkbenchOrderValid('1')).toBe(false);
		expect(isWorkbenchOrderValid(null)).toBe(false);
		expect(isWorkbenchOrderValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchTitleValid', () => {
	it('accepts non-empty strings', () => {
		expect(isWorkbenchTitleValid('Design')).toBe(true);
		expect(isWorkbenchTitleValid('Design Workbench')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isWorkbenchTitleValid('')).toBe(false);
	});

	it('rejects non-string types', () => {
		expect(isWorkbenchTitleValid(123)).toBe(false);
		expect(isWorkbenchTitleValid(null)).toBe(false);
		expect(isWorkbenchTitleValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchRenderValid', () => {
	it('accepts functions', () => {
		expect(isWorkbenchRenderValid(() => null)).toBe(true);
		expect(isWorkbenchRenderValid(function () {})).toBe(true);
	});

	it('rejects non-function types', () => {
		expect(isWorkbenchRenderValid('render')).toBe(false);
		expect(isWorkbenchRenderValid(123)).toBe(false);
		expect(isWorkbenchRenderValid(null)).toBe(false);
		expect(isWorkbenchRenderValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchIconValid', () => {
	it('accepts any non-null/non-undefined value', () => {
		expect(isWorkbenchIconValid({})).toBe(true);
		expect(isWorkbenchIconValid('icon')).toBe(true);
		expect(isWorkbenchIconValid(123)).toBe(true);
		expect(isWorkbenchIconValid(false)).toBe(true);
	});

	it('rejects null', () => {
		expect(isWorkbenchIconValid(null)).toBe(false);
	});

	it('rejects undefined', () => {
		expect(isWorkbenchIconValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchIDValid', () => {
	it('accepts non-empty strings', () => {
		expect(isWorkbenchIDValid('design-workbench')).toBe(true);
		expect(isWorkbenchIDValid('wb1')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isWorkbenchIDValid('')).toBe(false);
	});

	it('rejects non-string types', () => {
		expect(isWorkbenchIDValid(123)).toBe(false);
		expect(isWorkbenchIDValid(null)).toBe(false);
		expect(isWorkbenchIDValid(undefined)).toBe(false);
	});
});

describe('isWorkbenchDefinitionValid', () => {
	it('accepts valid workbench definition with all required properties', () => {
		const validDefinition = mockWorkbenchInstance();
		expect(isWorkbenchDefinitionValid(validDefinition)).toBe(true);
	});

	it('accepts definition with extra properties', () => {
		const definitionWithExtra = mockWorkbenchInstance({ extra: 'property' } as any);
		expect(isWorkbenchDefinitionValid(definitionWithExtra)).toBe(true);
	});

	it('rejects definition missing id property', () => {
		const missingId = mockWorkbenchInstance();
		delete (missingId as any).id;
		expect(isWorkbenchDefinitionValid(missingId)).toBe(false);
	});

	it('rejects definition missing title property', () => {
		const missingTitle = mockWorkbenchInstance();
		delete (missingTitle as any).title;
		expect(isWorkbenchDefinitionValid(missingTitle)).toBe(false);
	});

	it('rejects definition missing icon property', () => {
		const missingIcon = mockWorkbenchInstance();
		delete (missingIcon as any).icon;
		expect(isWorkbenchDefinitionValid(missingIcon)).toBe(false);
	});

	it('rejects definition missing order property', () => {
		const missingOrder = mockWorkbenchInstance();
		delete (missingOrder as any).order;
		expect(isWorkbenchDefinitionValid(missingOrder)).toBe(false);
	});

	it('rejects definition missing render property', () => {
		const missingRender = mockWorkbenchInstance();
		delete (missingRender as any).render;
		expect(isWorkbenchDefinitionValid(missingRender)).toBe(false);
	});

	it('rejects non-object types', () => {
		expect(isWorkbenchDefinitionValid('definition')).toBe(false);
		expect(isWorkbenchDefinitionValid(123)).toBe(false);
		expect(isWorkbenchDefinitionValid(null)).toBe(false);
		expect(isWorkbenchDefinitionValid(undefined)).toBe(false);
	});
});
