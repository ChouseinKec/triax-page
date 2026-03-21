/** Props for the GradientSelect component. */
export type GradientSelectProps = {
    /** The current CSS gradient string (e.g. `linear-gradient(to right, red, blue)`). */
    value: string;
    /** Callback fired when the gradient value changes. */
    onChange: (value: string) => void;
};
