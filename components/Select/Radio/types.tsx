import type { OptionData } from '@/types/option';

/**
 * Props for the RadioSelect component.
 * Defines a set of radio button options for the user to choose from.
 * 
 * @param {string} value - The currently selected value from the radio options.
 * @param {Option[]} options - An array of available options to display in the radio button group.
 * @param {(value: string) => void} onChange - Callback triggered when the selected radio button changes.
*/
export type RadioSelectProps = {
    value: string;
    options: OptionData[];
    onChange: (value: string) => void;
};

