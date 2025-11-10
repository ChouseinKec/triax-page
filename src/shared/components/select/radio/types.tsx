import type { OptionDefinition } from '@/src/shared/components/types/option';

/** Props for the RadioSelect component. */
export type RadioSelectProps = {
    /** The currently selected value from the radio options. */
    value: string;
    /** The list of options available for selection. */
    options: OptionDefinition[];
    /** Callback function to handle changes in the selected value. */
    onChange: (value: string) => void;
    /** Optional class name for custom styling. */
    className?: string;
    /** Optional flag to prioritize icons over text in the options. */
    prioritizeIcons?: boolean;
    /** Allows the selection to be cleared (default: true) */
    clearable?: boolean;
};

