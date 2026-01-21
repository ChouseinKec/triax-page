import type { OptionDefinition } from '@/shared/components/types/option';

/** Props for keyword style value editor components. */
export type TokenKeywordProps = {
	/** Current keyword value */
	value: string;
	/** Available keyword options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
