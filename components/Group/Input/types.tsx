import { STYLE_VALUE } from '@/editors/style/constants/types';

/**
 * Type definition for a dynamic input group
 * 
 * @param {string[]} values - Array of current values for each input in the group
 * @param {(value: string, index: number) => void} onChange - Callback to update a specific value at a given index
 * @param {STYLE_VALUE[]} options - Available style options used to guide rendering and parsing
 */
export type INPUT_GROUP = {
    values: string[];
    onChange: (value: string, index: number) => void;
    options: STYLE_VALUE[];
};
