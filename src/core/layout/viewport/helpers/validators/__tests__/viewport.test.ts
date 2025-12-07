// Utilities
import { validateViewportID, validateViewportTitle, validateViewportRender, validateViewport } from '../viewport';

describe('validateViewportID', () => {
	it('accepts valid viewport ID', () => {
		const result = validateViewportID('viewport-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('viewport-1');
	});

	it('rejects non-string values', () => {
		const results = [validateViewportID(123), validateViewportID(null), validateViewportID(undefined), validateViewportID({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Viewport ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateViewportID('');
		expect(result.valid).toBe(false);
	});
});

describe('validateViewportTitle', () => {
	it('accepts valid viewport title', () => {
		const result = validateViewportTitle('Main Viewport');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Main Viewport');
	});

	it('rejects non-string values', () => {
		const results = [validateViewportTitle(123), validateViewportTitle(null), validateViewportTitle(undefined), validateViewportTitle({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Viewport title must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateViewportTitle('');
		expect(result.valid).toBe(false);
	});
});

describe('validateViewportRender', () => {
	it('accepts valid render function', () => {
		const renderFn = () => null;
		const result = validateViewportRender(renderFn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(renderFn);
	});

	it('accepts component function', () => {
		const render = function ViewportComponent() {
			return null;
		};
		const result = validateViewportRender(render);
		expect(result.valid).toBe(true);
	});

	it('rejects non-function values', () => {
		const results = [validateViewportRender('render'), validateViewportRender(123), validateViewportRender(null), validateViewportRender(undefined), validateViewportRender({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Viewport render must be a valid function');
		});
	});
});

describe('validateViewport', () => {
	it('accepts valid viewport definition', () => {
		const viewport = { id: 'viewport-1', title: 'Main Viewport', workbenchID: 'default', render: () => null };
		const result = validateViewport(viewport);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(viewport);
	});

	it('rejects non-object values', () => {
		const results = [validateViewport('invalid'), validateViewport(123), validateViewport(null), validateViewport(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Viewport definition');
		});
	});

	it('rejects missing required properties', () => {
		const base = { id: 'viewport-1', title: 'Main Viewport', workbenchID: 'default', render: () => null };
		const results = [validateViewport({ ...base, id: undefined }), validateViewport({ ...base, title: undefined }), validateViewport({ ...base, workbenchID: undefined }), validateViewport({ ...base, render: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const base = { id: 'viewport-1', title: 'Main Viewport', workbenchID: 'default', render: () => null };
		const results = [validateViewport({ ...base, id: 123 }), validateViewport({ ...base, title: null }), validateViewport({ ...base, workbenchID: [] }), validateViewport({ ...base, render: 'not-a-function' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});
