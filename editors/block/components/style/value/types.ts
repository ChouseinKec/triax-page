import type { CSSPropertyDefinition } from '@/types/block/style/property';

export interface ValueProps {
	/** The CSS property definition as an object */
	property: CSSPropertyDefinition;

	/** The current value of the property */
	value: string;
	
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
