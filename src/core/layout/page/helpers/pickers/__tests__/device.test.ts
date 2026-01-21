// Utilities
import { pickDevice } from '../device';
import { mockDeviceInstance } from '@/shared/helpers/mock';

// Types
import type { DeviceRecord } from '@/core/layout/page/types';

describe('pickDevice', () => {
	const mockDevice1 = mockDeviceInstance({
		id: 'device-1',
		name: 'Mobile',
		value: 'mobile',
		media: { min: 0, max: 767 },
		template: { width: 375, height: 667 },
		category: 'phone',
	});

	const mockDevice2 = mockDeviceInstance({
		id: 'device-2',
		name: 'Tablet',
		value: 'tablet',
		media: { min: 768, max: 1023 },
		template: { width: 768, height: 1024 },
		category: 'tablet',
	});

	const mockDevices: DeviceRecord = {
		'device-1': mockDevice1,
		'device-2': mockDevice2,
	};

	it('returns device when id exists', () => {
		const result = pickDevice('device-1', mockDevices);
		expect(result.success).toBe(true);

		if (!result.success) return;
		expect(result.data).toBe(mockDevice1);
	});

	it('returns error when id missing or unknown', () => {
		const missing = pickDevice('nonexistent-device', mockDevices);
		expect(missing.success).toBe(false);

		if (missing.success) return;
		expect(missing.error).toContain('nonexistent-device');

		const emptyId = pickDevice('', mockDevices);
		expect(emptyId.success).toBe(false);
	});

	it('returns error when device map empty', () => {
		const emptyMap = pickDevice('device-1', {});
		expect(emptyMap.success).toBe(false);
	});

	it('returns data only on success and error only on failure', () => {
		const ok = pickDevice('device-2', mockDevices);
		expect(ok.success).toBe(true);
		if (!ok.success) return;

		expect(ok).toHaveProperty('data');
		expect(ok).not.toHaveProperty('error');

		const fail = pickDevice('unknown', mockDevices);
		expect(fail.success).toBe(false);
		if (!fail.success) return;

		expect(fail).toHaveProperty('error');
		expect(fail).not.toHaveProperty('data');
	});
});
