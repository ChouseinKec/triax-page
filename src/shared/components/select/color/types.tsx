/** Props for the ColorSelect component. */
export type ColorSelectProps = {
    /** The current color value in RGBA format. */
    value: string;
    /** Callback function to handle color changes.*/
    onChange: (value: string) => void;

};
