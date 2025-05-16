/**
 * Props for the ColorSelect component.
 * 
 * @param {string} [value] - Current selected color value (e.g., "#FF5733")
 * @param {(value: string) => void} [onChange] - Callback triggered when the color value changes
 * @param {string} [placeholder] - Placeholder text when no color is selected
*/
export type COLOR_SELECT = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};
