import type { OptionData } from "@/types/option";

/**
 * Props for a single option item in a dropdown/select component.
 * Extends Option but omits the category property, as it is not needed for the individual option rendering.
 */
export interface OptionProps extends Omit<OptionData, 'category'> {
    /** Whether this option is currently selected */
    isSelected: boolean;

    /** Optional style to apply to the option */
    prioritizeIcons?: boolean;

    /** ARIA role for the option, can be 'radio', 'option', or 'menuitem' */
    ariaRole?: 'radio' | 'option' | 'menuitem';


    /** Handler called when the option is selected */
    onChange: (value: string) => void;
}
