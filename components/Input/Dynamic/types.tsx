import { STYLE_VALUE } from '@/editors/style/constants/types';

/**
 * Props for the DynamicInput component
 * 
 * @param {string} value - Current input value in string format
 * @param {(value: string) => void} onChange - Callback triggered when the value changes
 * @param {STYLE_VALUE[]} options - Available input style configurations
 */
export type DYNAMIC_INPUT = {
    value?: string;
    onChange?: (value: string) => void;
    type?: string;
    option?: STYLE_VALUE;
};

