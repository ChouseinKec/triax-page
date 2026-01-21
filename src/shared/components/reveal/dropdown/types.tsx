import { Anchor } from "@/shared/components/reveal/float/types";

/** Props for the DropdownReveal component */
export interface DropdownRevealProps {
    /** The content to display inside the dropdown. */
    children: React.ReactNode;
    /** If true, closes the dropdown when a selection is made. */
    closeOnChange?: boolean;
    /** Placeholder text to display */
    placeholder?: string | React.ReactNode;
    /** If true, disables the dropdown interaction. */
    isDisabled?: boolean;
    /** Optional title for the dropdown button. */
    title?: string;
    /** Optional styles for the dropdown content. */
    className?: string;
    /** Optional anchor position for the float. */
    anchor?: Anchor;
    /** Optional offset in pixels for the floating element */
    offset?: number;
};
