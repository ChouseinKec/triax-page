import { CSSProperty } from '@/types/style/property';

/**
 * Props for the Value component in the style editor.
 */
export interface ValueProps {
	/** The CSS property definition as an object */
	property: CSSProperty;
	/** The current value of the property */
	value: string;
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
