import { STYLE_VALUE } from '@/editors/style/constants/types';

/**
 * Props for the DynamicInput component
 * 
 * @param {string} value - Current input value in string format
 * @param {(value: string) => void} onChange - Callback triggered when the value changes
 * @param {STYLE_VALUE[]} options - Available input style configurations
 */
export type FUNCTION_INPUT = {
    value: string;
    onChange: (value: string) => void;
    options: STYLE_VALUE[];
};

