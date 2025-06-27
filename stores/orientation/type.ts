/**
 * Represents an orientation used in responsive styling.
 *
 * @param {string} name - The display name of the orientation (e.g., 'Portrait').
 * @param {string} value - The internal value representing the orientation.
 */
export type Orientation = {
    name: string;
    value: string;
};

/**
 * Zustand store interface for managing the page editor state.
 * Provides device, orientation, and pseudo context for style editing.
 *
 * @param {Orientation[]} allOrientations - A list of all available orientations.
 * @param {Orientation} currentOrientation - The currently selected orientation.
 *
 * @param {() => Orientation[]} getOrientations - Returns all available orientations.
 * @param {() => Orientation} getOrientation - Returns the current orientation.
 * @param {(value: string) => void} setOrientation - Sets the current orientation by value.
 *
 */
export type useOrientationStoreProps = {
    allOrientations: Orientation[];
    currentOrientation: Orientation;

    getOrientations: () => Orientation[];
    getOrientation: () => Orientation;
    setOrientation: (value: string) => void;
};
