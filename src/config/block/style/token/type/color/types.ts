// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';

/** Props for color style value editor components. */
export type ColorValueProps = {
	/** Current color value */
	value: string;
	/** Callback when the color changes */
	onChange: (value: string) => void;
	/** Options for the color picker (optional) */
	options?: OptionDefinition[];
};
