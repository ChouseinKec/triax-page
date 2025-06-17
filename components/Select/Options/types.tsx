import type { OptionData } from "@/types/option";
/**
 * Props for the OptionsSelect component.
 */
export interface OptionsSelectProps {
    /** The currently selected value */
    value: string;
    /** List of available options */
    options: OptionData[];
    /** Enables search functionality within the dropdown (default: false) */
    searchable?: boolean;
    /** Whether to display options in grouped sections (default: false) */
    grouped?: boolean;
    /** Event handler triggered when the selected option changes */
    onChange: (value: string) => void;
}
