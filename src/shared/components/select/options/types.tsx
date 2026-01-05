// Types
import type { OptionDefinition } from 'src/shared/components/types/option';

/**
 * Props for the OptionsSelect component.
 */
export interface OptionsSelectProps {
    /** The currently selected value */
    value: string;
    /** List of available options */
    options: OptionDefinition[];
    /** Event handler triggered when the selected option changes */
    onChange: (value: string) => void;
    /** Enables search functionality within the dropdown (default: false) */
    searchable?: boolean;
    /** Whether to display options in groupable sections (default: false) */
    groupable?: boolean;
    /** Allows the selection to be cleared (default: true) */
    clearable?: boolean;
    /** Whether to prioritize icons over text in the dropdown options (default: false) */
    prioritizeIcons?: boolean;

}
