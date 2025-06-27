/**
 * Represents a device used in responsive styling.
 *
 * @param {string} name - The name of the device (e.g., 'Desktop').
 * @param {string} value - The internal value representing the device.
 * @param {string} media - The associated media query for the device.
 * @param {string} orientation - The default orientation for this device.
 */
export type Device = {
    name: string;
    value: string;
    media: string;
    orientation: string;
};

/**
 * Zustand store interface for managing device state.
 *
 * @param {Device[]} allDevices - A list of all available devices.
 * @param {Device} currentDevice - The currently selected device.

 * @param {() => Device[]} getDevices - Returns all available devices.
 * @param {() => Device} getDevice - Returns the current device.
 * @param {(value: string) => void} setDevice - Sets the current device by value.
 */
export type useDeviceStoreProps = {
    allDevices: Device[];
    currentDevice: Device;
   
    getDevices: () => Device[];
    getDevice: () => Device;
    setDevice: (value: string) => void;

};
