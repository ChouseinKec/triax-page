// Utilities
import { pickBar, pickBarsByWorkbench } from '../bar';
import { mockBarInstance } from '@/src/shared/helpers/mock';

// Types
import type { BarRecord } from '@/src/core/layout/bar/types';

describe('pickBar', () => {
	const mockBar1 = mockBarInstance({ id: 'bar-1', workbenchKey: 'workbench-1', position: { top: '0', left: '0' } });
	const mockBar2 = mockBarInstance({ id: 'bar-2', workbenchKey: 'workbench-1', position: { top: '0', left: '100px' } });
	const mockBar3 = mockBarInstance({ id: 'bar-3', workbenchKey: 'workbench-2', position: { top: '0', left: '200px' } });

	const mockAllBars: BarRecord = {
		'bar-1': mockBar1,
		'bar-2': mockBar2,
		'bar-3': mockBar3,
	};

	it('returns bar when id exists', () => {
		const result = pickBar('bar-1', mockAllBars);
		expect(result.success).toBe(true);
		if (!result.success) return;
		expect(result.data).toBe(mockBar1);
	});

	it('returns error when id missing or unknown', () => {
		const missing = pickBar('nonexistent-bar', mockAllBars);
		expect(missing.success).toBe(false);
		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-bar');

		const emptyId = pickBar('', mockAllBars);
		expect(emptyId.success).toBe(false);
	});

	it('returns data only on success and error only on failure', () => {
		const ok = pickBar('bar-2', mockAllBars);
		expect(ok.success).toBe(true);
		if (ok.success) {
			expect(ok).toHaveProperty('data');
			expect(ok).not.toHaveProperty('error');
		}

		const fail = pickBar('unknown', mockAllBars);
		expect(fail.success).toBe(false);
		if (!fail.success) {
			expect(fail).toHaveProperty('error');
			expect(fail).not.toHaveProperty('data');
		}
	});
});

describe('pickBarsByWorkbench', () => {
	const mockBar1 = mockBarInstance({ id: 'bar-1', workbenchKey: 'workbench-1', position: { top: '0', left: '0' } });
	const mockBar2 = mockBarInstance({ id: 'bar-2', workbenchKey: 'workbench-1', position: { top: '0', left: '100px' } });
	const mockBar3 = mockBarInstance({ id: 'bar-3', workbenchKey: 'workbench-2', position: { top: '0', left: '200px' } });
	const mockBar4 = mockBarInstance({ id: 'bar-4', workbenchKey: 'workbench-2', position: { top: '0', left: '300px' } });

	const mockAllBars: BarRecord = {
		'bar-1': mockBar1,
		'bar-2': mockBar2,
		'bar-3': mockBar3,
		'bar-4': mockBar4,
	};

	it('returns bars for a workbench', () => {
		const result = pickBarsByWorkbench('workbench-1', mockAllBars);
		expect(result.success).toBe(true);
		if (!result.success) return;
		expect(result.data).toHaveLength(2);
		expect(result.data).toEqual(expect.arrayContaining([mockBar1, mockBar2]));
	});

	it('returns empty array when no bars match', () => {
		const none = pickBarsByWorkbench('workbench-3', mockAllBars);
		expect(none.success).toBe(true);
		if (!none.success) return;
		expect(none.data).toEqual([]);
	});

	it('handles empty workbench id and empty map', () => {
		const emptyId = pickBarsByWorkbench('', mockAllBars);
		expect(emptyId.success).toBe(true);
		if (emptyId.success) expect(emptyId.data).toEqual([]);

		const emptyMap = pickBarsByWorkbench('workbench-1', {});
		expect(emptyMap.success).toBe(true);
		if (emptyMap.success) expect(emptyMap.data).toEqual([]);
	});

	it('filters bars strictly by workbenchKey', () => {
		const result = pickBarsByWorkbench('workbench-2', mockAllBars);
		expect(result.success).toBe(true);
		if (!result.success) return;
		expect(result.data.every((bar) => bar.workbenchKey === 'workbench-2')).toBe(true);
		expect(result.data.map((bar) => bar.id).sort()).toEqual(['bar-3', 'bar-4']);
	});

	it('returns data only on success', () => {
		const result = pickBarsByWorkbench('workbench-1', mockAllBars);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result).toHaveProperty('data');
			expect(result).not.toHaveProperty('error');
		}
	});
});
