import { ReactNode } from 'react';

/** Represents a single option in a select/radio/dropdown component. */
export type OptionDefinition = {
	/** The display name of the option */
	name: string;
	/** The value of the option*/
	value: string;
	/** Optional category to group the option under */
	category?: string;
	/** Optional icon for the option (SVG element) */
	icon?: ReactNode;
} & {
	/** Allows any additional properties to be added dynamically */
	[key: string]: unknown;
};
