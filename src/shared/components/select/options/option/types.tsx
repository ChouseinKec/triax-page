import type { OptionDefinition } from "@/src/shared/components/types/option";

export interface OptionProps extends OptionDefinition {
    /** Whether this option is currently selected */
    isSelected: boolean;

    /** Optional style to apply to the option */
    prioritizeIcons?: boolean;

    /** Handler called when the option is selected */
    onChange: (value: string) => void;

    /** Optional class name for custom styling */
    className?: string;
}
