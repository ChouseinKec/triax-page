// Utilities
import { isBarIDValid, isBarTitleValid, isBarPositionValid, isBarSizeValid, isBarDefinitionValid } from '@/src/core/layout/bar/utilities/bar';

// Bar ID validation: non-empty string checks
describe('isBarIDValid', () => {
	it('accepts non-empty strings', () => {
		expect(isBarIDValid('top-bar')).toBe(true);
		expect(isBarIDValid('sidebar-1')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isBarIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isBarIDValid(123)).toBe(false);
		expect(isBarIDValid(null)).toBe(false);
		expect(isBarIDValid(undefined)).toBe(false);
		expect(isBarIDValid({})).toBe(false);
	});

	it('rejects whitespace-only strings', () => {
		expect(isBarIDValid('   ')).toBe(false);
	});
});

// Bar title validation: non-empty string checks
describe('isBarTitleValid', () => {
	it('accepts non-empty strings', () => {
		expect(isBarTitleValid('Main Toolbar')).toBe(true);
		expect(isBarTitleValid('Sidebar')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isBarTitleValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isBarTitleValid(456)).toBe(false);
		expect(isBarTitleValid(null)).toBe(false);
	});

	it('rejects whitespace-only strings', () => {
		expect(isBarTitleValid('   ')).toBe(false);
	});
});

// Bar position validation: object with top and left string properties
describe('isBarPositionValid', () => {
	it('accepts position objects with string coords', () => {
		expect(isBarPositionValid({ top: '10px', left: '20px' })).toBe(true);
		expect(isBarPositionValid({ top: '0', left: '0' })).toBe(true);
	});

	it('rejects non-string coords', () => {
		expect(isBarPositionValid({ top: 10, left: '20px' })).toBe(false);
		expect(isBarPositionValid({ top: '10px', left: 20 })).toBe(false);
	});

	it('rejects missing top or left', () => {
		expect(isBarPositionValid({ top: '10px' })).toBe(false);
		expect(isBarPositionValid({ left: '20px' })).toBe(false);
		expect(isBarPositionValid({})).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isBarPositionValid(null)).toBe(false);
		expect(isBarPositionValid(undefined)).toBe(false);
		expect(isBarPositionValid('position')).toBe(false);
	});

	it('rejects extra keys without required ones', () => {
		expect(isBarPositionValid({ top: '10px', extra: 'x' } as any)).toBe(false);
	});
});

// Bar size validation: fixed width or auto (minWidth/maxWidth)
describe('isBarSizeValid', () => {
	it('accepts fixed width size', () => {
		expect(isBarSizeValid({ width: '200px' })).toBe(true);
		expect(isBarSizeValid({ width: '100%' })).toBe(true);
	});

	it('accepts auto size with minWidth and maxWidth', () => {
		expect(isBarSizeValid({ minWidth: '100px', maxWidth: '300px' })).toBe(true);
		expect(isBarSizeValid({ minWidth: '0', maxWidth: '100%' })).toBe(true);
	});

	it('rejects partial auto size', () => {
		expect(isBarSizeValid({ minWidth: '100px' })).toBe(false);
		expect(isBarSizeValid({ maxWidth: '300px' })).toBe(false);
	});

	it('rejects mixed fixed and auto properties', () => {
		expect(isBarSizeValid({ width: '200px', minWidth: '100px' })).toBe(false);
		expect(isBarSizeValid({ width: '200px', maxWidth: '300px' })).toBe(false);
	});

	it('rejects non-string width/minWidth/maxWidth', () => {
		expect(isBarSizeValid({ width: 200 })).toBe(false);
		expect(isBarSizeValid({ minWidth: 100, maxWidth: '300px' })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isBarSizeValid(null)).toBe(false);
		expect(isBarSizeValid(undefined)).toBe(false);
		expect(isBarSizeValid('200px')).toBe(false);
	});

	it('rejects empty objects', () => {
		expect(isBarSizeValid({})).toBe(false);
	});

	it('rejects width with whitespace only', () => {
		expect(isBarSizeValid({ width: '   ' } as any)).toBe(false);
	});
});

// Bar definition validation: object with all required properties
describe('isBarDefinitionValid', () => {
	it('accepts valid bar definition', () => {
		const bar = {
			id: 'bar1',
			title: 'Top Bar',
			position: { top: '0', left: '0' },
			size: { width: '100%' },
			workbenchID: 'main',
		};
		expect(isBarDefinitionValid(bar)).toBe(true);
	});

	it('rejects missing required properties', () => {
		const barNoId = { title: 'Top Bar', position: {}, size: {}, workbenchID: 'main' };
		expect(isBarDefinitionValid(barNoId)).toBe(false);

		const barNoTitle = { id: 'bar1', position: {}, size: {}, workbenchID: 'main' };
		expect(isBarDefinitionValid(barNoTitle)).toBe(false);

		const barNoPosition = { id: 'bar1', title: 'Top Bar', size: {}, workbenchID: 'main' };
		expect(isBarDefinitionValid(barNoPosition)).toBe(false);

		const barNoSize = { id: 'bar1', title: 'Top Bar', position: {}, workbenchID: 'main' };
		expect(isBarDefinitionValid(barNoSize)).toBe(false);

		const barNoWorkbench = { id: 'bar1', title: 'Top Bar', position: {}, size: {} };
		expect(isBarDefinitionValid(barNoWorkbench)).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isBarDefinitionValid(null)).toBe(false);
		expect(isBarDefinitionValid(undefined)).toBe(false);
		expect(isBarDefinitionValid('bar')).toBe(false);
		expect(isBarDefinitionValid(123)).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const bar = {
			id: 'bar1',
			title: 'Top Bar',
			position: { top: '0', left: '0' },
			size: { width: '100%' },
			workbenchID: 'main',
			extra: 'property',
		};
		expect(isBarDefinitionValid(bar)).toBe(true);
	});
});
