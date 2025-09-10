import type { OptionDefinition } from '@/types/option';

export interface OptionKeywordDefinition extends OptionDefinition {
	category: 'keyword';
	type: 'keyword';
}

export interface OptionFunctionDefinition extends OptionDefinition {
	category: 'function';
	type: 'function';
	syntax: string;
}

export interface OptionDimensionDefinition extends OptionDefinition {
	category: 'dimension';
	type: 'dimension';
	min?: number;
	max?: number;
}

export interface OptionGenericDefinition extends OptionDefinition {
	category: 'other';
	type: string;
	min?: number;
	max?: number;
}

export type StyleOptionDefinition = OptionGenericDefinition | OptionKeywordDefinition | OptionFunctionDefinition | OptionDimensionDefinition;
