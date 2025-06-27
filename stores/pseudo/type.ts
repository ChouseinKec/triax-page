/**
 * Represents a pseudo-selector used in style states.
 *
 * @param {string} name - The display name of the pseudo state (e.g., 'Hover').
 * @param {string} value - The internal value of the pseudo state (e.g., ':hover').
 */
export type Pseudo = {
    name: string;
    value: string;
};

/**
 * Zustand store interface for managing the page editor state.
 * Provides device, orientation, and pseudo context for style editing.
 *
 */
export type usePseudoStoreProps = {
    allPseudos: Pseudo[];
    currentPseudo: Pseudo;

    getPseudos: () => Pseudo[];
    getPseudo: () => Pseudo;
    setPseudo: (value: string) => void;
};