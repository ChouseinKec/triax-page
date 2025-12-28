import { OptionDefinition } from "@/src/shared/components/types/option";

/** Props for function style value editor components. */
export type FunctionValueProps = {
	/** Current function value */
	value: string;
	/** Available function options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
