import React from "react";

/**
 * Type for an individual option in the dropdown.
 * 
 * @param {string} name - The display name of the option
 * @param {string} value - The value of the option
 * @param {string} [category] - Optional category to group the option under
 * @param {string} [icon] - Optional icon for the option
 * @param {React.CSSProperties} [style] - Optional inline style for the option
*/
export type OPTIONS_SELECT_OPTION = {
    name: string;
    value: string;
    category?: string;
    icon?: string;
    style?: React.CSSProperties;
};

/**
 * Props for the OptionsSelect component.
 * 
 * @param {string} value - The currently selected value
 * @param {OPTIONS_SELECT_OPTION[]} options - List of available options
 * @param {(value: string) => void} onChange - Event handler triggered when the selected option changes
 * @param {boolean} [hasSearch=false] - Enables search functionality within the dropdown (default: false)
 * @param {boolean} [isGrouped=false] - Whether to display options in grouped sections (default: false)
*/
export type OPTIONS_SELECT = {
    value: string;
    options: OPTIONS_SELECT_OPTION[];
    onChange: (value: string) => void;
    hasSearch?: boolean;
    isGrouped?: boolean;
};
