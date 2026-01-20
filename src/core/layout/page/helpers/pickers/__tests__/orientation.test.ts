// Utilities
import { pickOrientation } from '../orientation';
import { mockOrientationInstance } from '@/src/shared/helpers/mock';

// Types
import type { OrientationDefinitionRecord } from '@/src/core/layout/page/types';

describe('pickOrientation', () => {
	const mockOrientation1 = mockOrientationInstance({
		id: 'orientation-1',
		name: 'Portrait',
		value: 'portrait',
	});

	const mockOrientation2 = mockOrientationInstance({
		id: 'orientation-2',
		name: 'Landscape',
		value: 'landscape',
	});

	const mockOrientations: OrientationDefinitionRecord = {
		'orientation-1': mockOrientation1,
		'orientation-2': mockOrientation2,
	};

	it('returns orientation when id exists', () => {
		const result = pickOrientation('orientation-1', mockOrientations);
		expect(result.success).toBe(true);

		if (!result.success) return;
		expect(result.data).toBe(mockOrientation1);
	});

	it('returns error when id missing or unknown', () => {
		const missing = pickOrientation('nonexistent-orientation', mockOrientations);
		expect(missing.success).toBe(false);

		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-orientation');

		const emptyId = pickOrientation('', mockOrientations);
		expect(emptyId.success).toBe(false);
	});

	it('returns error when orientation map empty', () => {
		const emptyMap = pickOrientation('orientation-1', {});
		expect(emptyMap.success).toBe(false);
	});

	it('returns data only on success and error only on failure', () => {
		const ok = pickOrientation('orientation-2', mockOrientations);
		expect(ok.success).toBe(true);

		if (!ok.success) return;
		expect(ok).toHaveProperty('data');
		expect(ok).not.toHaveProperty('error');

        const fail = pickOrientation('unknown', mockOrientations);
		expect(fail.success).toBe(false);
        if (fail.success) return;

		expect(fail).toHaveProperty('error');
		expect(fail).not.toHaveProperty('data');
	});
});
