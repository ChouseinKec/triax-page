import { pickBarActions } from '../action';
import { mockBarInstance, mockBarActionInstance } from '@/src/shared/helpers/mock';

// Types
import type { BarRecord } from '@/src/core/layout/bar/types';

describe('pickBarActions', () => {
	const mockAction1 = mockBarActionInstance({
		id: 'action-1',
		title: 'Save',
		order: 0,
	});

	const mockAction2 = mockBarActionInstance({
		id: 'action-2',
		title: 'Delete',
		order: 1,
	});

	const mockBar1 = mockBarInstance({
		id: 'bar-1',
		title: 'Top Bar',
		actions: {
			'action-1': mockAction1,
			'action-2': mockAction2,
		},
	});

	const mockBar2 = mockBarInstance({
		id: 'bar-2',
		title: 'Bottom Bar',
		actions: {},
	});

	const mockBars: BarRecord = {
		'bar-1': mockBar1,
		'bar-2': mockBar2,
	};

	it('returns actions when bar exists with actions', () => {
		const result = pickBarActions('bar-1', mockBars);

		expect(result.success).toBe(true);
		if (!result.success) return;

		expect(Array.isArray(result.data)).toBe(true);
		expect(result.data).toHaveLength(2);
		expect(result.data).toContain(mockAction1);
		expect(result.data).toContain(mockAction2);
	});

	it('returns empty array when bar exists with no actions', () => {
		const result = pickBarActions('bar-2', mockBars);

		expect(result.success).toBe(true);
		if (!result.success) return;
        
		expect(Array.isArray(result.data)).toBe(true);
		expect(result.data).toHaveLength(0);
	});

	it('returns error when bar id missing or unknown', () => {
		const missing = pickBarActions('nonexistent-bar', mockBars);
		expect(missing.success).toBe(false);

		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-bar');

		const emptyId = pickBarActions('', mockBars);
		expect(emptyId.success).toBe(false);
	});

	it('returns error when bar map empty', () => {
		const emptyMap = pickBarActions('bar-1', {});
		expect(emptyMap.success).toBe(false);
	});

	it('returns data array only on success and error only on failure', () => {
		const ok = pickBarActions('bar-1', mockBars);
		expect(ok.success).toBe(true);

		if (!ok.success) return;
		expect(ok).toHaveProperty('data');
		expect(ok).not.toHaveProperty('error');
		expect(Array.isArray(ok.data)).toBe(true);

		const fail = pickBarActions('unknown', mockBars);
		expect(fail.success).toBe(false);

		if (fail.success) return;
		expect(fail).toHaveProperty('error');
		expect(fail).not.toHaveProperty('data');
	});
});
