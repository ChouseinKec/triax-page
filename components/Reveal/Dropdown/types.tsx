export interface DropdownRevealProps {
    /** The content to display inside the dropdown. */
    children: React.ReactNode;
  
    /** If true, closes the dropdown when a selection is made. */
    closeOnChange?: boolean;
  
    /** Placeholder text to display when no value is selected. */
    placeholder?: string | React.ReactNode;

    /** If true, disables the dropdown interaction. */
    isDisabled?: boolean;

    /** Optional title for the dropdown button. */
    title?: string;

    /** Optional ARIA label for accessibility. */
    ariaLabel?: string;
};
