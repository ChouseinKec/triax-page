export interface NumberProps {
	/** The current value of the property */
	value: string;
	
	/** Callback when the value changes */
	onChange: (value: string) => void;
}
