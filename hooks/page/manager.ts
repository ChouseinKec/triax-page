import { useCallback, ReactNode } from 'react';

// Types
import type { Device, DeviceName } from '@/types/page/device';

// Store
import usePageStore from '@/stores/page/store';

interface PageManager {
	getDevice: () => Device;
	setDevice: (device: DeviceName) => void;
	getDevices: () => Device[];
}

export const usePageManager = (): PageManager => {
	const device = usePageStore((state) => state.currentDevice);
	const devices = usePageStore((state) => state.allDevices);

	const setStoreDevice = usePageStore((state) => state.setDevice);

	const getDevice = useCallback(() => {
		return device;
	}, [device]);

	const setDevice = useCallback(
		(device: DeviceName) => {
			setStoreDevice(device);
		},
		[setStoreDevice]
	);

	const getDevices = useCallback(() => {
		return devices;
	}, [devices]);

	return {
		getDevice,
		setDevice,
		getDevices,
	};
};
