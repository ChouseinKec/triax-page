/**
 * Props for the DropdownReveal component.
 * 
 * @param {React.ReactNode} children - Content to be shown in the dropdown
 * @param {boolean} [closeOnChange] - If true, closes dropdown when children update
 * @param {string} [value] - Current display value for the dropdown
 * @param {React.CSSProperties} [toggleStyle] - Optional inline style for the toggle element
 * @param {string} [placeholder] - Placeholder text shown when value is empty
 * @param {boolean} [isDisabled] - If true, disables interaction with the dropdown
*/
export type DROPDOWN_REVEAL = {
    children: React.ReactNode;
    closeOnChange?: boolean;
    value?: string;
    toggleStyle?: React.CSSProperties;
    placeholder?: string;
    isDisabled?: boolean;
};
