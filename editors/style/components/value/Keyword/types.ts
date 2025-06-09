import { OptionData } from '@/types/option';

/**
 * Props for the KeywordValue component.
 */
export interface KeywordValueProps {
	/** The current keyword value for the input (e.g., 'auto', 'inherit'). */
	value: string;
	/** The available keyword options for this input (for dropdowns, etc.). */
	options: OptionData[];
	/** Callback function to handle changes to the keyword value. */
	onChange: (value: string) => void;
}
