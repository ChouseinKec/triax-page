// Utilities
import { validateBarID, validateBarTitle, validateBarPosition, validateBarSize, validateBarDefinition } from '../bar';
import { mockBarInstance } from '@/src/shared/helpers/mock';

describe('validateBarID', () => {
	it('accepts valid bar ID', () => {
		const result = validateBarID('bar-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('bar-1');
	});

	it('rejects non-string values', () => {
		const results = [validateBarID(123), validateBarID(null), validateBarID(undefined), validateBarID({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Bar ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateBarID('');
		expect(result.valid).toBe(false);
	});
});

describe('validateBarTitle', () => {
	it('accepts valid bar title', () => {
		const result = validateBarTitle('Top Bar');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Top Bar');
	});

	it('rejects non-string values', () => {
		const results = [validateBarTitle(123), validateBarTitle(null), validateBarTitle(undefined), validateBarTitle({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Bar title must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateBarTitle('');
		expect(result.valid).toBe(false);
	});
});

describe('validateBarPosition', () => {
	it('accepts valid bar position', () => {
		const position = { top: '0', left: '0' };
		const result = validateBarPosition(position);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(position);
	});

	it('rejects non-object values', () => {
		const results = [validateBarPosition('invalid'), validateBarPosition(123), validateBarPosition(null), validateBarPosition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Bar position must be a valid object');
		});
	});

	it('rejects missing properties', () => {
		const results = [validateBarPosition({}), validateBarPosition({ top: '0' }), validateBarPosition({ left: '0' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validateBarPosition({ top: 0, left: '0' }), validateBarPosition({ top: '0', left: 0 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validateBarSize', () => {
	it('accepts valid fixed size', () => {
		const size = { width: '100%' };
		const result = validateBarSize(size);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(size);
	});

	it('accepts valid auto size', () => {
		const size = { minWidth: '200px', maxWidth: '400px' };
		const result = validateBarSize(size);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(size);
	});

	it('rejects non-object values', () => {
		const results = [validateBarSize('invalid'), validateBarSize(123), validateBarSize(null), validateBarSize(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Bar size must be a valid object');
		});
	});

	it('rejects missing required properties', () => {
		const results = [validateBarSize({}), validateBarSize({ minWidth: '200px' }), validateBarSize({ maxWidth: '400px' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validateBarSize({ width: 100 }), validateBarSize({ minWidth: 200, maxWidth: '400px' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validateBarDefinition', () => {
	it('accepts valid bar definition', () => {
		const bar = mockBarInstance();
		const result = validateBarDefinition(bar);

		expect(result.valid).toBe(true);
		if (!result.valid) return;
        
		expect(result.value).toEqual(bar);
	});

	it('rejects non-object values', () => {
		const results = [validateBarDefinition('invalid'), validateBarDefinition(123), validateBarDefinition(null), validateBarDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Bar definition');
		});
	});

	it('rejects missing required properties', () => {
		const bar = mockBarInstance();

		const results = [
			validateBarDefinition({ ...bar, id: undefined }),
			validateBarDefinition({ ...bar, title: undefined }),
			validateBarDefinition({ ...bar, position: undefined }),
			validateBarDefinition({ ...bar, size: undefined }),
			validateBarDefinition({ ...bar, workbenchID: undefined }),
		];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const bar = mockBarInstance();

		const results = [
			validateBarDefinition({ ...bar, id: 123 }),
			validateBarDefinition({ ...bar, title: null }),
			validateBarDefinition({ ...bar, position: 'invalid' }),
			validateBarDefinition({ ...bar, size: {} }),
			validateBarDefinition({ ...bar, workbenchID: [] }),
		];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});
