// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { DeviceDefinition, DeviceKey } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredDevice } from '@/src/core/layout/page/registries';

/**
 * Reactive hook to get the currently selected device instance for page queries.
 */
export function useSelectedDevice(): DeviceDefinition | undefined {
	const selectedDeviceKey = usePageStore((state) => state.selected.deviceKey);
	return getRegisteredDevice(selectedDeviceKey);
}

/**
 * Reactive hook to get the currently selected device ID for page queries.
 */
export function useSelectedDeviceKey(): DeviceKey {
	return usePageStore((state) => state.selected.deviceKey);
}

/**
 * Reactive hook to check if a specific device is currently selected.
 */
export function useIsDeviceSelected(deviceKey: DeviceKey): boolean {
	const selectedDeviceKey = useSelectedDeviceKey();
	return selectedDeviceKey === deviceKey;
}
