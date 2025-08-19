import type { BooleanMap } from "@/types/block/attribute/value";

export interface BooleanProps {
	/** The current value of the property */
	value: string;
	
	/** Callback when the value changes */
	onChange: (value: string) => void;

	/** Optional mapping for display values */
	options?: BooleanMap;
}
