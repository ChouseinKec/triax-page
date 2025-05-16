/**
 * Represents an orientation used in responsive styling.
 *
 * @param {string} name - The display name of the orientation (e.g., 'Portrait').
 * @param {string} value - The internal value representing the orientation.
 */
export type ORIENTATION = {
    name: string;
    value: string;
};

/**
 * Zustand store interface for managing the page editor state.
 * Provides device, orientation, and pseudo context for style editing.
 *
 * @param {ORIENTATION[]} allOrientations - A list of all available orientations.
 * @param {ORIENTATION} currentOrientation - The currently selected orientation.
 *
 * @param {() => ORIENTATION[]} getOrientations - Returns all available orientations.
 * @param {() => ORIENTATION} getOrientation - Returns the current orientation.
 * @param {(value: string) => void} setOrientation - Sets the current orientation by value.
 *
 */
export type ORIENTATION_STORE = {
    allOrientations: ORIENTATION[];
    currentOrientation: ORIENTATION;

    getOrientations: () => ORIENTATION[];
    getOrientation: () => ORIENTATION;
    setOrientation: (value: string) => void;
};
