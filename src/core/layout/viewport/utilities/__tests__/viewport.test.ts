// Utilities
import { isViewportTitleValid, isViewportRenderValid, isViewportIDValid, isViewportDefinitionValid } from '@/src/core/layout/viewport/utilities/viewport';

describe('isViewportTitleValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isViewportTitleValid('Main Viewport')).toBe(true);
		expect(isViewportTitleValid('Editor')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isViewportTitleValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isViewportTitleValid(123)).toBe(false);
		expect(isViewportTitleValid(null)).toBe(false);
		expect(isViewportTitleValid(undefined)).toBe(false);
	});
});

describe('isViewportRenderValid', () => {
	it('accepts functions', () => {
		expect(isViewportRenderValid(() => {})).toBe(true);
		expect(isViewportRenderValid(function () {})).toBe(true);
		expect(isViewportRenderValid(async () => {})).toBe(true);
	});

	it('rejects non-function values', () => {
		expect(isViewportRenderValid('string')).toBe(false);
		expect(isViewportRenderValid(123)).toBe(false);
		expect(isViewportRenderValid(null)).toBe(false);
		expect(isViewportRenderValid({})).toBe(false);
	});
});

describe('isViewportIDValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isViewportIDValid('main-viewport')).toBe(true);
		expect(isViewportIDValid('editor-vp')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isViewportIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isViewportIDValid(456)).toBe(false);
		expect(isViewportIDValid(null)).toBe(false);
		expect(isViewportIDValid(undefined)).toBe(false);
	});
});

describe('isViewportDefinitionValid', () => {
	it('accepts valid viewport definition', () => {
		const viewport = {
			id: 'vp1',
			title: 'Main',
			render: () => {},
			workbenchID: 'design',
		};
		expect(isViewportDefinitionValid(viewport)).toBe(true);
	});

	it('rejects objects missing id', () => {
		expect(isViewportDefinitionValid({ title: 'Main', render: () => {}, workbenchID: 'design' })).toBe(false);
	});

	it('rejects objects missing title', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', render: () => {}, workbenchID: 'design' })).toBe(false);
	});

	it('rejects objects missing render', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', title: 'Main', workbenchID: 'design' })).toBe(false);
	});

	it('rejects objects missing workbenchID', () => {
		expect(isViewportDefinitionValid({ id: 'vp1', title: 'Main', render: () => {} })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isViewportDefinitionValid(null)).toBe(false);
		expect(isViewportDefinitionValid(undefined)).toBe(false);
		expect(isViewportDefinitionValid('viewport')).toBe(false);
		expect(isViewportDefinitionValid(123)).toBe(false);
	});

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
