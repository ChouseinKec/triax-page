import { pickPanel } from '../panel';
import { mockPanelInstance } from '@/src/shared/helpers/mock';

// Types
import type { PanelRecord } from '@/src/core/layout/panel/types';

describe('pickPanel', () => {
	const mockPanel1 = mockPanelInstance({
		id: 'panel-1',
		title: 'Properties Panel',
		order: 0,
	});

	const mockPanel2 = mockPanelInstance({
		id: 'panel-2',
		title: 'Settings Panel',
		order: 1,
	});

	const mockPanels: PanelRecord = {
		'panel-1': mockPanel1,
		'panel-2': mockPanel2,
	};

	it('returns panel when id exists', () => {
		const result = pickPanel('panel-1', mockPanels);
		expect(result.success).toBe(true);

		if (!result.success) return;
		expect(result.data).toBe(mockPanel1);
	});

	it('returns error when id missing or unknown', () => {
		const missing = pickPanel('nonexistent-panel', mockPanels);
		expect(missing.success).toBe(false);

		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-panel');

		const emptyId = pickPanel('', mockPanels);
		expect(emptyId.success).toBe(false);
	});

	it('returns error when panel map empty', () => {
		const emptyMap = pickPanel('panel-1', {});
		expect(emptyMap.success).toBe(false);
	});

	it('returns data only on success and error only on failure', () => {
		const ok = pickPanel('panel-2', mockPanels);
		expect(ok.success).toBe(true);

		if (!ok.success) return;
		expect(ok).toHaveProperty('data');
		expect(ok).not.toHaveProperty('error');

		const fail = pickPanel('unknown', mockPanels);
		expect(fail.success).toBe(false);

		if (fail.success) return;
		expect(fail).toHaveProperty('error');
		expect(fail).not.toHaveProperty('data');
	});
});
