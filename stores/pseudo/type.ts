/**
 * Represents a pseudo-selector used in style states.
 *
 * @param {string} name - The display name of the pseudo state (e.g., 'Hover').
 * @param {string} value - The internal value of the pseudo state (e.g., ':hover').
 */
export type PSEUDO = {
    name: string;
    value: string;
};

/**
 * Zustand store interface for managing the page editor state.
 * Provides device, orientation, and pseudo context for style editing.
 *
 */
export type PSEUDO_STORE = {
    allPseudos: PSEUDO[];
    currentPseudo: PSEUDO;

    getPseudos: () => PSEUDO[];
    getPseudo: () => PSEUDO;
    setPseudo: (value: string) => void;
};