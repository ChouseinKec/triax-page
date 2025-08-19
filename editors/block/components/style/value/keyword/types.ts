import { OptionDefinition } from '@/types/option';

export interface KeywordValueProps {
	/** The current keyword value for the input (e.g., 'auto', 'inherit'). */
	value: string;

	/** The available keyword options for this input (for dropdowns, etc.). */
	options: OptionDefinition[];
	
	/** Callback function to handle changes to the keyword value. */
	onChange: (value: string) => void;
}
