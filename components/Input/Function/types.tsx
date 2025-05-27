import { STYLE_VALUE } from '@/editors/style/constants/types';


/**
 * FUNCTION_INPUT
 * @typedef {Object} FUNCTION_INPUT
 * @property {string} value - The current input value in string format.
 * @property {function} onChange - Callback triggered when the value changes.
 * @property {STYLE_VALUE[]} options - Available input style configurations.
 */
export type FUNCTION_INPUT = {
    /**
     * Current input value in string format
     * @type {string}
     */
    value: string;
    /**
     * Callback triggered when the value changes
     * @param {string} value - New input value
     */
    onChange: (value: string) => void;
    /**
     * Available input style configurations
     * @type {STYLE_VALUE[]}
     */
    options: STYLE_VALUE[];
};

