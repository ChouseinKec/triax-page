import { create } from 'zustand';

// Types
import { useDeviceStoreProps, Device } from '@/stores/device/types';

// Defaults
const DEFAULT_DEVICES: Device[] = [
	{ name: 'default', value: 'default', media: 'min-width: 0px', orientation: 'portrait' },
	{ name: 'mobile', value: 'mobile', media: 'max-width: 767px', orientation: 'portrait' }, // mobile in portrait
	{ name: 'tablet', value: 'tablet', media: 'min-width: 768px; max-width: 1024px', orientation: 'landscape' }, // tablet in landscape
	{ name: 'desktop', value: 'desktop', media: 'min-width: 1200px', orientation: 'portrait' }, // desktop (no specific orientation)
];

/**
 * Helper function to parse and extract the numeric values from a media query.
 * This function is used to compare and sort devices based on their media query values.
 *
 * @param {string} query - The media query string (e.g., "min-width: 768px").
 * @returns {number} - The numeric value extracted from the media query, or 0 if not found.
 */
function getNumericValue(query: string): number {
	const minMatch = query.match(/min-width:\s*(\d+)px/);
	const maxMatch = query.match(/max-width:\s*(\d+)px/);

	if (minMatch) return parseInt(minMatch[1]);
	if (maxMatch) return parseInt(maxMatch[1]);

	return 0; // Default to 0 if no width is specified
}

/**
 * Zustand store for managing  device state.
 * Provides functions for selecting and manipulating the current device.
 */
const useDeviceStore = create<useDeviceStoreProps>()((set, get) => ({
	/**
	 * The currently selected device.
	 */
	currentDevice: DEFAULT_DEVICES[0],

	/**
	 * List of all available devices.
	 */
	allDevices: DEFAULT_DEVICES,

	/**
	 * Retrieves and sorts all available devices by their media query values.
	 *
	 * @returns {Device[]} - The sorted list of devices.
	 */
	getDevices: (): Device[] => {
		const devices = get().allDevices;
		return devices.sort((a, b) => {
			const aValue = getNumericValue(a.media);
			const bValue = getNumericValue(b.media);
			return aValue - bValue;
		});
	},

	/**
	 * Retrieves the currently selected device.
	 *
	 * @returns {Device} - The current device object.
	 */
	getDevice: (): Device => get().currentDevice,

	/**
	 * Sets the current device based on the provided value.
	 * Throws an error if the device value is invalid.
	 *
	 * @param {string} value - The value of the device to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setDevice: (value: string) => {
		const allDevices = get().allDevices;
		const device = allDevices.find((dev) => {
			return dev.value === value;
		});

		if (!device) {
			throw new Error(`Invalid device: ${value}. Available devices: ${allDevices.map((dev) => dev.name).join(',')}`);
		}

		// Only update if the device actually changed
		if (get().currentDevice.value !== device.value) {
			set({ currentDevice: device });
		}
	},
}));

export default useDeviceStore;
