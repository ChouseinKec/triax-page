import type { OptionDefinition } from '@/src/shared/components/types/option';

/** Props for length style value editor components. */
export type TokenLengthProps = {
	/** Current length value */
	value: string;
	/** Available unit options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
