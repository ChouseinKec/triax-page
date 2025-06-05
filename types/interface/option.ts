// types/option.ts
import type { CSSProperties } from 'react';

/** Represents a single option in a select/radio/dropdown component. */
export interface OptionData {
	/** The display name of the option */
	name: string;
	/** The value of the option (used for selection) */
	value: string;
	/** Optional category to group the option under */
	category?: string;
	/** Optional icon for the option (SVG element) */
	icon?: React.ReactNode;
	/** Optional inline style for the option */
	style?: CSSProperties;
}
