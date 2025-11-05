/**
 * Represents the unique identifier for a device.
 */
export type DeviceID = string;

/**
 * Represents the human-readable name of a device (e.g., 'iphone-14', 'desktop-fhd').
 */
export type DeviceName = string;

/**
 * Represents the unique value identifier for a device (e.g., 'iphone-14', 'desktop-fhd').
 * This is the internal key used by the system - stores, managers, dropdowns, and UI components
 * work with device values for selection, storage, and display logic.
 */
export type DeviceValue = string;

/**
 * Represents the category of a device (e.g., 'phone', 'tablet', 'desktop').
 */
export type DeviceCategory = string;

/**
 * Defines the media query breakpoints for a device.
 * - min: Minimum width in pixels for this device range.
 * - max: Maximum width in pixels for this device range (can be Infinity for unbounded).
 */
export type DeviceMedia = {
	min: number;
	max: number;
};

/**
 * Defines the template dimensions for a device viewport.
 * - width: The width in pixels of the device screen.
 * - height: The height in pixels of the device screen.
 */
export type DeviceTemplate = {
	width: number;
	height: number;
};

export type DeviceRecord = Record<DeviceID, DeviceInstance>;

/**
 * Complete definition of a device, including its name, media queries, template, and category.
 */
export interface DeviceDefinition {
	name: DeviceName;
	value: DeviceValue;
	media: DeviceMedia;
	template: DeviceTemplate;
	category: DeviceCategory;
	hidden?: boolean;
}

export interface DeviceInstance extends DeviceDefinition {
	id: DeviceID;
}
