import type { StylePropertyData } from '@/types/style/property';

export interface ValueProps {
	/** The CSS property definition as an object */
	property: StylePropertyData;

	/** The current value of the property */
	value: string;
	
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
