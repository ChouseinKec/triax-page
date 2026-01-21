import { validatePanelKey, validatePanelTitle, validatePanelPosition, validatePanelSize, validatePanelOrder, validatePanelIcon, validatePanelLocked, validatePanelOpen, validatePanelDefinition } from '../panel';
import { mockPanel, mockReactElement } from '@/shared/helpers/mock';

describe('validatePanelKey', () => {
	it('accepts valid panel ID', () => {
		const result = validatePanelKey('panel-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('panel-1');
	});

	it('rejects non-string values', () => {
		const results = [validatePanelKey(123), validatePanelKey(null), validatePanelKey(undefined), validatePanelKey({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePanelKey('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelTitle', () => {
	it('accepts valid panel title', () => {
		const result = validatePanelTitle('Properties Panel');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Properties Panel');
	});

	it('rejects non-string values', () => {
		const results = [validatePanelTitle(123), validatePanelTitle(null), validatePanelTitle(undefined), validatePanelTitle({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel title must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validatePanelTitle('');
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelPosition', () => {
	it('accepts valid panel position', () => {
		const position = { top: '0', left: '0' };
		const result = validatePanelPosition(position);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(position);
	});

	it('rejects non-object values', () => {
		const results = [validatePanelPosition('invalid'), validatePanelPosition(123), validatePanelPosition(null), validatePanelPosition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel position must be a valid object');
		});
	});

	it('rejects missing properties', () => {
		const results = [validatePanelPosition({}), validatePanelPosition({ top: '0' }), validatePanelPosition({ left: '0' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validatePanelPosition({ top: 0, left: '0' }), validatePanelPosition({ top: '0', left: 0 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validatePanelSize', () => {
	it('accepts valid panel size', () => {
		const size = { width: '300px', height: '400px', minWidth: 200, minHeight: 200 };
		const result = validatePanelSize(size);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(size);
	});

	it('rejects non-object values', () => {
		const results = [validatePanelSize('invalid'), validatePanelSize(123), validatePanelSize(null), validatePanelSize(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel size must be a valid object');
		});
	});

	it('rejects missing required properties', () => {
		const results = [validatePanelSize({}), validatePanelSize({ width: '300px' }), validatePanelSize({ minWidth: 200 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validatePanelSize({ width: 300, height: '400px', minWidth: 200, minHeight: 200 }), validatePanelSize({ width: '300px', height: 400, minWidth: 200, minHeight: 200 }), validatePanelSize({ width: '300px', height: '400px', minWidth: '200', minHeight: 200 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validatePanelOrder', () => {
	it('accepts valid panel order', () => {
		const result = validatePanelOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('accepts negative and positive numbers', () => {
		const results = [validatePanelOrder(-1), validatePanelOrder(100)];
		results.forEach((result) => {
			expect(result.valid).toBe(true);
		});
	});

	it('rejects non-number values', () => {
		const results = [validatePanelOrder('0'), validatePanelOrder(null), validatePanelOrder(undefined), validatePanelOrder({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel order must be a valid number');
		});
	});

	it('rejects NaN', () => {
		const result = validatePanelOrder(NaN);
		expect(result.valid).toBe(false);
	});
});

describe('validatePanelIcon', () => {
	it('accepts valid React element', () => {
		const icon = mockReactElement();
		const result = validatePanelIcon(icon);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(icon);
	});
});

describe('validatePanelLocked', () => {
	it('accepts boolean values', () => {
		const results = [validatePanelLocked(true), validatePanelLocked(false)];

		results.forEach((result) => {
			expect(result.valid).toBe(true);
		});
	});

	it('rejects non-boolean values', () => {
		const results = [validatePanelLocked('true'), validatePanelLocked(1), validatePanelLocked(null), validatePanelLocked(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel locked state must be a boolean');
		});
	});
});

describe('validatePanelOpen', () => {
	it('accepts boolean values', () => {
		const results = [validatePanelOpen(true), validatePanelOpen(false)];

		results.forEach((result) => {
			expect(result.valid).toBe(true);
		});
	});

	it('rejects non-boolean values', () => {
		const results = [validatePanelOpen('true'), validatePanelOpen(1), validatePanelOpen(null), validatePanelOpen(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Panel open state must be a boolean');
		});
	});
});

describe('validatePanelDefinition', () => {
	it('accepts valid panel definition', () => {
		const panel = mockPanel();
		const result = validatePanelDefinition(panel);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(panel);
	});

	it('rejects non-object values', () => {
		const results = [validatePanelDefinition('invalid'), validatePanelDefinition(123), validatePanelDefinition(null), validatePanelDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Panel definition');
		});
	});

	it('rejects missing required properties', () => {
		const panel = mockPanel();

		const results = [validatePanelDefinition({ ...panel, key: undefined }), validatePanelDefinition({ ...panel, title: undefined }), validatePanelDefinition({ ...panel, initialPosition: undefined }), validatePanelDefinition({ ...panel, initialSize: undefined }), validatePanelDefinition({ ...panel, order: undefined }), validatePanelDefinition({ ...panel, initialLocked: undefined }), validatePanelDefinition({ ...panel, initialOpen: undefined }), validatePanelDefinition({ ...panel, icon: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const panel = mockPanel();

		const results = [validatePanelDefinition({ ...panel, key: 123 }), validatePanelDefinition({ ...panel, title: null }), validatePanelDefinition({ ...panel, initialPosition: 'invalid' }), validatePanelDefinition({ ...panel, initialSize: {} }), validatePanelDefinition({ ...panel, order: 'zero' }), validatePanelDefinition({ ...panel, initialLocked: 'true' }), validatePanelDefinition({ ...panel, initialOpen: 1 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});