import type { OptionData } from "@/types/option";

export interface OptionProps extends OptionData {
    /** Whether this option is currently selected */
    isSelected: boolean;

    /** Optional style to apply to the option */
    prioritizeIcons?: boolean;

    /** ARIA role for the option, can be 'radio', 'option', or 'menuitem' */
    ariaRole?: 'radio' | 'option' | 'menuitem';

    /** Handler called when the option is selected */
    onChange: (value: string) => void;
}
