import type { OptionDefinition } from '@/types/option';

export interface CSSKeywordOptionDefinition extends OptionDefinition {
	category: 'keyword';
	type: 'keyword';
}

export interface CSSFunctionOptionDefinition extends OptionDefinition {
	category: 'function';
	type: 'function';
	syntax: string;
}

export interface CSSDimensionOptionDefinition extends OptionDefinition {
	category: 'dimension';
	type: 'dimension';
	min?: number;
	max?: number;
}

export interface CSSGenericOptionDefinition extends OptionDefinition {
	category: 'other';
	type: string;
	min?: number;
	max?: number;
}

export type CSSInputOptionDefinition = CSSGenericOptionDefinition | CSSKeywordOptionDefinition | CSSFunctionOptionDefinition | CSSDimensionOptionDefinition;
