// Types
import type { OptionDefinition } from 'src/shared/components/types/option';

type OptionsSelectBase = {
    /** List of available options */
    options: OptionDefinition[];
    /** Enables search functionality within the dropdown (default: false) */
    searchable?: boolean;
    /** Whether to display options in groupable sections (default: false) */
    groupable?: boolean;
    /** Allows the selection to be cleared (default: true) */
    clearable?: boolean;
    /** Whether to prioritize icons over text in the dropdown options (default: false) */
    prioritizeIcons?: boolean;
};

/**
 * Props for the OptionsSelect component.
 */
export type OptionsSelectProps =
    | (OptionsSelectBase & {
        /** Allows multiple selections */
        multiselectable: true;
        /** The currently selected values */
        value: string[];
        /** Event handler triggered when the selected options change */
        onChange: (value: string[]) => void;
    })
    | (OptionsSelectBase & {
        /** Single selection mode (default) */
        multiselectable?: false;
        /** The currently selected value */
        value: string;
        /** Event handler triggered when the selected option changes */
        onChange: (value: string) => void;
    });
