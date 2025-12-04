// Utilities
import { isViewportTitleValid, isViewportRenderValid, isViewportIDValid, isViewportDefinitionValid } from '@/src/core/layout/viewport/utilities/viewport';

// Viewport title validation: non-empty string checks
describe('isViewportTitleValid', () => {
	// Accepts valid non-empty title strings
	it('accepts valid non-empty strings', () => {
		expect(isViewportTitleValid('Main Viewport')).toBe(true);
		expect(isViewportTitleValid('Editor')).toBe(true);
	});

	// Rejects empty strings
	it('rejects empty strings', () => {
		expect(isViewportTitleValid('')).toBe(false);
	});

	// Rejects non-string values
	it('rejects non-string values', () => {
		expect(isViewportTitleValid(123)).toBe(false);
		expect(isViewportTitleValid(null)).toBe(false);
		expect(isViewportTitleValid(undefined)).toBe(false);
	});
});

// Viewport render validation: function (React component) checks
describe('isViewportRenderValid', () => {
	// Accepts function values
	it('accepts functions', () => {
		expect(isViewportRenderValid(() => {})).toBe(true);
		expect(isViewportRenderValid(function () {})).toBe(true);
		expect(isViewportRenderValid(async () => {})).toBe(true);
	});

	// Rejects non-function values
	it('rejects non-function values', () => {
		expect(isViewportRenderValid('string')).toBe(false);
		expect(isViewportRenderValid(123)).toBe(false);
		expect(isViewportRenderValid(null)).toBe(false);
		expect(isViewportRenderValid({})).toBe(false);
	});
});

// Viewport ID validation: non-empty string checks
describe('isViewportIDValid', () => {
	// Accepts valid non-empty ID strings
	it('accepts valid non-empty strings', () => {
		expect(isViewportIDValid('main-viewport')).toBe(true);
		expect(isViewportIDValid('editor-vp')).toBe(true);
	});

	// Rejects empty strings
	it('rejects empty strings', () => {
		expect(isViewportIDValid('')).toBe(false);
	});

	// Rejects non-string values
	it('rejects non-string values', () => {
		expect(isViewportIDValid(456)).toBe(false);
		expect(isViewportIDValid(null)).toBe(false);
		expect(isViewportIDValid(undefined)).toBe(false);
	});
});

// Viewport definition validation: object with all required properties
describe('isViewportDefinitionValid', () => {
	// Accepts valid viewport definition with all required properties
	it('accepts valid viewport definition', () => {
		const viewport = {
			id: 'vp1',
			title: 'Main',
			render: () => {},
			workbenchID: 'design',
		};
		expect(isViewportDefinitionValid(viewport)).toBe(true);
	});

	// Rejects objects missing id property
	it('rejects objects missing id', () => {
		expect(isViewportDefinitionValid({ title: 'Main', render: () => {}, workbenchID: 'design' })).toBe(false);
	});

	// Rejects objects missing title property
	it('rejects objects missing title', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', render: () => {}, workbenchID: 'design' })).toBe(false);
	});

	// Rejects objects missing render property
	it('rejects objects missing render', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', title: 'Main', workbenchID: 'design' })).toBe(false);
	});

	// Rejects objects missing workbenchID property
	it('rejects objects missing workbenchID', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', title: 'Main', render: () => {} })).toBe(false);
	});

	// Rejects non-object values
	it('rejects non-object values', () => {
		expect(isViewportDefinitionValid(null)).toBe(false);
		expect(isViewportDefinitionValid(undefined)).toBe(false);
		expect(isViewportDefinitionValid('viewport')).toBe(false);
		expect(isViewportDefinitionValid(123)).toBe(false);
	});

	// Accepts definitions with additional properties
	it('accepts definitions with additional properties', () => {
		const viewport = {
			id: 'vp1',
			title: 'Main',
			render: () => {},
			workbenchID: 'design',
			extra: 'property',
		};
		expect(isViewportDefinitionValid(viewport)).toBe(true);
	});
});
