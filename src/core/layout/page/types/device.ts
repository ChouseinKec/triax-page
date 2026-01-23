/**
 * Represents the human-readable name of a device (e.g., 'iphone-14', 'desktop-fhd').
 */
export type DeviceName = string;

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
	/** Minimum width in pixels for this device range */
	min: number;
	/** Maximum width in pixels for this device range (can be Infinity for unbounded) */
	max: number;
};

/**
 * Defines the template dimensions for a device viewport.
 * - width: The width in pixels of the device screen.
 * - height: The height in pixels of the device screen.
 */
export type DeviceViewEditor = {
	/** Width in pixels of the device screen */
	width: number;
	/** Height in pixels of the device screen */
	height: number;
};

export type DeviceKey = string;

/**
 * Defines the structure for device configurations in the page builder.
 * Devices represent different viewport sizes and categories for responsive design.
 */
export interface DeviceDefinition {
	/** Human-readable name of the device */
	name: DeviceName;
	/** Unique key identifier for the device */
	key: DeviceKey;
	/** Category of the device (e.g., phone, tablet, desktop) */
	category: DeviceCategory;
	/** Media query breakpoints for this device */
	media: DeviceMedia;
	/** Template dimensions for the device viewport */
	template: DeviceViewEditor;
	/** Whether the device should be hidden from UI selectors */
	hidden?: boolean;
}

/**
 * Registry of all devices by their key.
 */
export type DeviceRecord = Record<DeviceKey, DeviceDefinition>;
