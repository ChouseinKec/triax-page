import type { OptionData } from "@/types/option";

/**
 * Props for a single option item in a dropdown/select component.
 * Extends Option but omits the category property, as it is not needed for the individual option rendering.
 */
export interface OptionProps extends Omit<OptionData, 'category'> {
    /** Whether this option is currently selected */
    isSelected: boolean;
    /** Handler called when the option is selected */
    onChange: (value: string) => void;
}
