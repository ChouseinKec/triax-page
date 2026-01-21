// Utilities
import { isBarActionIDValid, isBarActionTitleValid, isBarActionOrderValid, isBarActionRenderValid, isBarActionInstanceValid } from '@/core/layout/bar/utilities/action';

// Action ID validation: non-empty string checks
describe('isBarActionIDValid', () => {
	it('accepts non-empty strings', () => {
		expect(isBarActionIDValid('save-action')).toBe(true);
		expect(isBarActionIDValid('action-123')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isBarActionIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isBarActionIDValid(123)).toBe(false);
		expect(isBarActionIDValid(null)).toBe(false);
		expect(isBarActionIDValid(undefined)).toBe(false);
		expect(isBarActionIDValid({})).toBe(false);
	});

	it('rejects whitespace-only strings', () => {
		expect(isBarActionIDValid('   ')).toBe(false);
	});
});

// Action title validation: non-empty string checks
describe('isBarActionTitleValid', () => {
	it('accepts non-empty strings', () => {
		expect(isBarActionTitleValid('Save File')).toBe(true);
		expect(isBarActionTitleValid('Action')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isBarActionTitleValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isBarActionTitleValid(456)).toBe(false);
		expect(isBarActionTitleValid(null)).toBe(false);
	});

	it('rejects whitespace-only strings', () => {
		expect(isBarActionTitleValid('   ')).toBe(false);
	});
});

// Action order validation: non-negative integer checks
describe('isBarActionOrderValid', () => {
	it('accepts non-negative integers', () => {
		expect(isBarActionOrderValid(0)).toBe(true);
		expect(isBarActionOrderValid(5)).toBe(true);
		expect(isBarActionOrderValid(100)).toBe(true);
	});

	it('rejects negative numbers', () => {
		expect(isBarActionOrderValid(-1)).toBe(false);
		expect(isBarActionOrderValid(-10)).toBe(false);
	});

	it('rejects non-integers', () => {
		expect(isBarActionOrderValid(1.5)).toBe(false);
		expect(isBarActionOrderValid(NaN)).toBe(false);
	});

	it('rejects non-number values', () => {
		expect(isBarActionOrderValid('5')).toBe(false);
		expect(isBarActionOrderValid(null)).toBe(false);
		expect(isBarActionOrderValid(undefined)).toBe(false);
	});

	it('rejects Infinity', () => {
		expect(isBarActionOrderValid(Infinity)).toBe(false);
	});
});

// Action render validation: function checks
describe('isBarActionRenderValid', () => {
	it('accepts functions', () => {
		expect(isBarActionRenderValid(() => {})).toBe(true);
		expect(isBarActionRenderValid(function () {})).toBe(true);
		expect(isBarActionRenderValid(async () => {})).toBe(true);
	});

	it('rejects non-function values', () => {
		expect(isBarActionRenderValid('function')).toBe(false);
		expect(isBarActionRenderValid(123)).toBe(false);
		expect(isBarActionRenderValid(null)).toBe(false);
		expect(isBarActionRenderValid({})).toBe(false);
	});
});

// Action instance validation: object with required properties
describe('isBarActionInstanceValid', () => {
	it('accepts valid action instance', () => {
		const action = {
			id: 'action1',
			title: 'Save',
			order: 1,
			render: () => {},
		};
		expect(isBarActionInstanceValid(action)).toBe(true);
	});

	it('rejects objects missing required properties', () => {
		expect(isBarActionInstanceValid({ id: 'action1', title: 'Save', order: 1 })).toBe(false);
		expect(isBarActionInstanceValid({ id: 'action1', title: 'Save', render: () => {} })).toBe(false);
		expect(isBarActionInstanceValid({ id: 'action1', order: 1, render: () => {} })).toBe(false);
		expect(isBarActionInstanceValid({ title: 'Save', order: 1, render: () => {} })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isBarActionInstanceValid(null)).toBe(false);
		expect(isBarActionInstanceValid(undefined)).toBe(false);
		expect(isBarActionInstanceValid('action')).toBe(false);
		expect(isBarActionInstanceValid(123)).toBe(false);
	});

	it('accepts instances with additional properties', () => {
		const action = {
			id: 'action1',
			title: 'Save',
			order: 1,
			render: () => {},
			extra: 'property',
		};
		expect(isBarActionInstanceValid(action)).toBe(true);
	});


});
