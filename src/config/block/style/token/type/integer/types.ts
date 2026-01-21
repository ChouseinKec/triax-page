// Types
import type { OptionDefinition } from '@/shared/components/types/option';

/** Props for number style value editor components. */
export type TokenIntegerProps = {
	/** Current numeric value as string */
	value: string;

	/** Available options for the number token */
	options: OptionDefinition[];

	/** Callback when the value changes */
	onChange: (value: string) => void;
};
