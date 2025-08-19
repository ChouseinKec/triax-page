import type { HTMLPropertyDefinition } from "@/types/block/attribute/property";

export interface ValueProps {
	/** The CSS property definition as an object */
	property: HTMLPropertyDefinition;

	/** The current value of the property */
	value: string;
	
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
