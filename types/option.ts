import type { ReactNode } from 'react';

/** Represents a single option in a select/radio/dropdown component. */
export interface OptionData {
	/** The display name of the option */
	name: string;
	/** The value of the option*/
	value: string;
	/** Optional category to group the option under */
	category?: string;
	/** Optional icon for the option (SVG element) */
	icon?: ReactNode;
}

export interface KeywordOptionData extends OptionData {
	category: 'keyword';
	type: 'keyword';
}

export interface FunctionOptionData extends OptionData {
	category: 'function';
	type: 'function';
	syntax: string;
}

export interface DimensionOptionData extends OptionData {
	category: 'dimension';
	type: 'dimension';
	min?: number;
	max?: number;
}

export interface OtherOptionData extends OptionData {
	category: 'other';
	type: string;
	min?: number;
	max?: number;
}

export type InputOptionData = OtherOptionData | KeywordOptionData | FunctionOptionData | DimensionOptionData;
