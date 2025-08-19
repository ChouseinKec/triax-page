import { OptionDefinition } from '@/types/option';

export interface ListProps {
	/** The current value of the property */
	value: string;

	/** The available options for the property */
	options: OptionDefinition[];

	/** Callback when the value changes */
	onChange: (value: string) => void;
}
