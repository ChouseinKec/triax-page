import type { OptionData } from '@/types/option';

/**
 * Props for the RadioSelect component.
 * Defines a set of radio button options for the user to choose from.
*/
export type RadioSelectProps = {
    /** The currently selected value from the radio options. */
    value: string;

    /** The list of options available for selection. */
    options: OptionData[];

    /** Callback function to handle changes in the selected value. */
    onChange: (value: string) => void;

    /** Optional class name for custom styling. */
    className?: string;
};

