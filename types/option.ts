import type { CSSProperties, ReactElement } from 'react';
import type { CSSDimensionGroups } from './style/dimension';
import type { CSSIcons } from '@/constants/style/icon';
/** Represents a single option in a select/radio/dropdown component. */
export interface OptionData {
	/** The display name of the option */
	name: string;
	/** The value of the option (used for selection) */
	value: string;
	/** Optional category to group the option under */
	category?: string;
	/** Optional icon for the option (SVG element) */
	icon?: ReactElement;
	/** Optional inline style for the option */
	style?: CSSProperties;
}

export interface KeywordOptionData extends OptionData {
	category: 'keyword';
}

export interface FunctionOptionData extends OptionData {
	category: 'function';
	syntax: string;
}

/**
 * Represents a CSS dimension option, which can include units like 'px', '%', 'rem', etc.
 */
export interface DimensionOptionData extends OptionData {
	category: 'dimension';
	type: CSSDimensionGroups;
	min?: number;
	max?: number;
}

export interface OtherOptionData extends OptionData {
	category: 'other';
	min?: number;
	max?: number;
}

export type InputOptionData = OtherOptionData | KeywordOptionData | FunctionOptionData | DimensionOptionData;
