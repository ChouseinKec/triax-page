// Types
import type { OptionDefinition } from '@/shared/components/types/option';

/** Props for link style value editor components.*/
export type TokenLinkProps = {
	/** Current URL value */
	value: string;
	/** Callback when the URL changes */
	onChange: (value: string) => void;
	/** Options for the link input (optional) */
	options?: OptionDefinition[];
};
