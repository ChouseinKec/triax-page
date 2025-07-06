/**
 * Props for the DropdownReveal component.
 *
 * @property children - The content to display inside the dropdown.
 * @property closeOnChange - If true, closes the dropdown when a selection is made.
 * @property value - The currently selected value (if controlled).
 * @property buttonStyle - Custom style for the dropdown trigger/button.
 * @property placeholder - Placeholder text to display when no value is selected.
 * @property isDisabled - If true, disables the dropdown interaction.
 */
export interface DropdownRevealProps {
    /** The content to display inside the dropdown. */
    children: React.ReactNode;
    /** If true, closes the dropdown when a selection is made. */
    closeOnChange?: boolean;
    /** The currently selected value (if controlled). */
    value?: string;
    /** Custom style for the dropdown trigger/button. */
    buttonStyle?: React.CSSProperties;
    /** Placeholder text to display when no value is selected. */
    placeholder?: string | React.ReactNode;
    /** Force the placeholder to be shown even when a value is selected. */
    forcePlaceholder?: boolean;
    /** If true, disables the dropdown interaction. */
    isDisabled?: boolean;
    /** Optional title for the dropdown button. */
    buttonTitle?: string;
};
