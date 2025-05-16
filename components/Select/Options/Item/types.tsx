/**
 * Props for an individual option in the dropdown, with additional state and event handling.
 * 
 * @param {string} name - The display name of the option
 * @param {string} value - The value of the option
 * @param {string} [icon] - Optional icon for the option
 * @param {React.CSSProperties} [style] - Optional inline style for the option
 * @param {boolean} isSelected - Whether the option is currently selected
 * @param {(value: string) => void} onChange - Event handler triggered when the option is selected
*/
export type OPTIONS_SELECT_ITEM = {
    name: string;
    value: string;
    icon?: string;
    style?: React.CSSProperties;
    isSelected: boolean;

    onChange: (value: string) => void;
};
