// Types
import type { OptionDefinition } from 'src/shared/components/types/option';

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
 * This is the internal key used by the system - stores, managers, dropdowns, and UI components.
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
export type DeviceViewport = {
	/** Width in pixels of the device screen */
	width: number;
	/** Height in pixels of the device screen */
	height: number;
};

/**
 * Defines the structure for device configurations in the page builder.
 * Devices represent different viewport sizes and categories for responsive design.
 */
export interface DeviceDefinition extends OptionDefinition {
	/** Media query breakpoints for this device */
	media: DeviceMedia;
	/** Template dimensions for the device viewport */
	template: DeviceViewport;
	/** Whether the device should be hidden from UI selectors */
	hidden?: boolean;
}

/**
 * Device instance with registered ID.
 * Extends DeviceDefinition with a unique identifier assigned during registration.
 */
export interface DeviceInstance extends DeviceDefinition {
	/** Unique identifier assigned during registration */
	id: DeviceID;
}

/**
 * Registry of all devices by their ID.
 */
export type DeviceRecord = Record<DeviceID, DeviceInstance>;
