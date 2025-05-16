/**
 * Represents a device used in responsive styling.
 *
 * @param {string} name - The name of the device (e.g., 'Desktop').
 * @param {string} value - The internal value representing the device.
 * @param {string} media - The associated media query for the device.
 * @param {string} orientation - The default orientation for this device.
 */
export type DEVICE = {
    name: string;
    value: string;
    media: string;
    orientation: string;
};

/**
 * Zustand store interface for managing device state.
 *
 * @param {DEVICE[]} allDevices - A list of all available devices.
 * @param {DEVICE} currentDevice - The currently selected device.

 * @param {() => DEVICE[]} getDevices - Returns all available devices.
 * @param {() => DEVICE} getDevice - Returns the current device.
 * @param {(value: string) => void} setDevice - Sets the current device by value.
 */
export type DEVICE_STORE = {
    allDevices: DEVICE[];
    currentDevice: DEVICE;
   
    getDevices: () => DEVICE[];
    getDevice: () => DEVICE;
    setDevice: (value: string) => void;

};
