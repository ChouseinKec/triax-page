import type { StyleDefinition } from '@/src/core/block/style/types';

/** Props for style value components.*/
export interface BlockStyleValue {
	/** Current value of the style property */
	value: string;
	/** The CSS property definition as an object */
	property: StyleDefinition;
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
