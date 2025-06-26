/**
 * Props for the ColorSelect component.
*/
export type ColorSelectProps = {
    /**
     * The current color value in RGBA format.
     */
    value?: string;
    /**
    * Placeholder text for the color picker toggle.
    */
    placeholder?: string;
    /**
     * Callback function to handle color changes.
     * @param value - The new color value in RGBA format.
     */
    onChange?: (value: string) => void;

};
