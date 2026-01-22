import type { StyleDefinition } from '@/core/block/style/definition/types';

/** Props for style value components.*/
export interface BlockStyleValue {
	/** Current value of the style styleDefinition */
	value: string;
	/** The CSS styleDefinition definition as an object */
	styleDefinition: StyleDefinition;
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
