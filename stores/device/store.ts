import { create } from 'zustand';

// Types
import { DEVICE_STORE, DEVICE } from '@/stores/device/types';
import { devLog } from '@/utilities/dev';

// Defaults
const DEFAULT_DEVICES: DEVICE[] = [
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
const useDeviceStore = create<DEVICE_STORE>()((set, get) => ({
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
	 * @returns {DEVICE[]} - The sorted list of devices.
	 */
	getDevices: (): DEVICE[] => {
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
	 * @returns {DEVICE} - The current device object.
	 */
	getDevice: (): DEVICE => get().currentDevice,

	/**
	 * Sets the current device based on the provided value.
	 * Throws an error if the device value is invalid.
	 *
	 * @param {string} value - The value of the device to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setDevice: (value: string) => {
		const allDevices = get().allDevices;
		const _device = allDevices.find((dev) => {
			return dev.value === value;
		});

		if (!_device) {
			throw new Error(
				`Invalid device: ${value}. Available devices: ${allDevices
					.map((dev) => {
						return dev.name;
					})
					.join(',')}`
			);
		}

		set({ currentDevice: _device });
	},
}));

export default useDeviceStore;
