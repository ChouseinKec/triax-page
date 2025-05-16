import { OPTIONS_SELECT_OPTION } from '@/components/Select/Options/types';

/**
 * Props for the RadioSelect component.
 * Defines a set of radio button options for the user to choose from.
 * 
 * @param {string} value - The currently selected value from the radio options.
 * @param {OPTIONS_SELECT_OPTION[]} options - An array of available options to display in the radio button group.
 * @param {(value: string) => void} onChange - Callback triggered when the selected radio button changes.
*/
export type RADIO_SELECT = {
    value: string;
    options: OPTIONS_SELECT_OPTION[];
    onChange: (value: string) => void;
};

export type { OPTIONS_SELECT_OPTION };
