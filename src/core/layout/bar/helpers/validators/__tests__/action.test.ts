import { validateBarActionID, validateBarActionTitle, validateBarActionOrder, validateBarActionRender, validateBarActionInstance } from '../action';
import { mockBarActionInstance } from '@/src/shared/helpers/mock';

describe('validateBarActionID', () => {
	it('accepts string id', () => {
		const result = validateBarActionID('action-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('action-1');
	});

	it('accepts alphanumeric id with dashes', () => {
		const result = validateBarActionID('action-save-123');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('action-save-123');
	});

	it('accepts id with underscores', () => {
		const result = validateBarActionID('action_delete_btn');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('action_delete_btn');
	});

	it('accepts uuid-style id', () => {
		const result = validateBarActionID('550e8400-e29b-41d4-a716-446655440000');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('550e8400-e29b-41d4-a716-446655440000');
	});

	it('accepts single character id', () => {
		const result = validateBarActionID('a');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('a');
	});

	it('rejects empty string', () => {
		const result = validateBarActionID('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects null', () => {
		const result = validateBarActionID(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBarActionID(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
	it('rejects whitespace-only string', () => {
		const result = validateBarActionID('   ');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateBarActionTitle', () => {
	it('accepts title string', () => {
		const result = validateBarActionTitle('Save');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Save');
	});

	it('accepts multi-word title', () => {
		const result = validateBarActionTitle('Save Document');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Save Document');
	});

	it('accepts title with special characters', () => {
		const result = validateBarActionTitle('Save & Exit');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Save & Exit');
	});

	it('accepts title with numbers', () => {
		const result = validateBarActionTitle('Action 123');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Action 123');
	});

	it('rejects empty string', () => {
		const result = validateBarActionTitle('');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects number', () => {
		const result = validateBarActionTitle(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('valid string');
	});

	it('rejects null', () => {
		const result = validateBarActionTitle(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBarActionTitle(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects object', () => {
		const result = validateBarActionTitle({ title: 'Save' });

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects array', () => {
		const result = validateBarActionTitle(['Save']);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects boolean', () => {
		const result = validateBarActionTitle(false);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
	it('rejects whitespace-only string', () => {
		const result = validateBarActionTitle('   ');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateBarActionOrder', () => {
	it('accepts positive integer', () => {
		const result = validateBarActionOrder(1);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(1);
	});

	it('accepts zero', () => {
		const result = validateBarActionOrder(0);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(0);
	});

	it('rejects negative integer', () => {
		const result = validateBarActionOrder(-1);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('valid number');
	});

	it('rejects decimal number', () => {
		const result = validateBarActionOrder(1.5);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('valid number');
	});

	it('accepts large number', () => {
		const result = validateBarActionOrder(999999);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(999999);
	});

	it('rejects string', () => {
		const result = validateBarActionOrder('1');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('valid number');
	});

	it('rejects null', () => {
		const result = validateBarActionOrder(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBarActionOrder(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects NaN', () => {
		const result = validateBarActionOrder(NaN);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects object', () => {
		const result = validateBarActionOrder({ order: 1 });

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects array', () => {
		const result = validateBarActionOrder([1]);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects boolean', () => {
		const result = validateBarActionOrder(true);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
	it('rejects Infinity', () => {
		const result = validateBarActionOrder(Infinity);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateBarActionRender', () => {
	it('accepts function', () => {
		const renderFn = () => null;
		const result = validateBarActionRender(renderFn);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe(renderFn);
	});

	it('rejects string', () => {
		const result = validateBarActionRender('render');

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('valid function');
	});

	it('rejects number', () => {
		const result = validateBarActionRender(123);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects null', () => {
		const result = validateBarActionRender(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects undefined', () => {
		const result = validateBarActionRender(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects object', () => {
		const result = validateBarActionRender({ render: () => null });

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects array', () => {
		const result = validateBarActionRender([() => null]);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});

	it('rejects boolean', () => {
		const result = validateBarActionRender(true);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});

describe('validateBarActionInstance', () => {
	it('accepts complete action instance', () => {
		const action = mockBarActionInstance({
			id: 'action-1',
			title: 'Save',
			order: 1,
			render: () => null,
		});
		const result = validateBarActionInstance(action);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(action);
	});

	it('accepts action with all properties', () => {
		const action = mockBarActionInstance({
			id: 'action-delete',
			title: 'Delete Item',
			order: 5,
			render: () => ({} as any),
		});
		const result = validateBarActionInstance(action);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value.id).toBe('action-delete');
		expect(result.value.title).toBe('Delete Item');
		expect(result.value.order).toBe(5);
	});

	it('rejects null', () => {
		const result = validateBarActionInstance(null);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('not a valid object');
	});

	it('rejects undefined', () => {
		const result = validateBarActionInstance(undefined);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toContain('not a valid object');
	});
	it('rejects missing required fields', () => {
		const result = validateBarActionInstance({ id: 'x', title: 'y' } as any);

		expect(result.valid).toBe(false);
		if (result.valid) return;

		expect(result.message).toBeDefined();
	});
});
