import { OptionDefinition } from '@/src/shared/components/types/option';

/**
 * Style option representing a keyword value.
 */
export interface OptionKeywordDefinition extends OptionDefinition {
	category: 'keyword';
	type: 'keyword';
}

/**
 * Style option representing a function value.
 */
export interface OptionFunctionDefinition extends OptionDefinition {
	category: 'function';
	type: 'function';
	syntax: string;
}

/**
 * Style option representing a dimension value.
 */
export interface OptionDimensionDefinition extends OptionDefinition {
	category: 'dimension';
	type: 'dimension';
	min?: number;
	max?: number;
}

/**
 * Style option representing a generic value.
 */
export interface OptionGenericDefinition extends OptionDefinition {
	category: 'other';
	type: string;
	min?: number;
	max?: number;
}

/**
 * Union type for all style option definitions.
 */
export type StyleOptionDefinition = OptionGenericDefinition | OptionKeywordDefinition | OptionFunctionDefinition | OptionDimensionDefinition;
