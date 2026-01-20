import type { OptionDefinition } from "@/src/shared/components/types/option";

/** Props for the Option component */
export interface OptionProps extends OptionDefinition {
    /** Whether this option is currently selected */
    isSelected: boolean;
    /** Handler called when the option is selected */
    onChange: (value: string) => void;
    /** Optional style to apply to the option */
    prioritizeIcons?: boolean;
    /** Optional class name for custom styling */
    className?: string;
    
}
