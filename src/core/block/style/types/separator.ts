/**
 * Represents a style separator key.
 */
export type SeparatorKey = string;

/**
 * Represents a style separator value.
 */
export type SeparatorValue = string;

/**
 * Defines the possible separators used in CSS style values.
 */
export interface SeparatorDefinition {
	/** The key representing the style separator */
	key: SeparatorKey;
	
	/** The value representing the style separator */
	value: SeparatorValue;
}

/**
 * A record mapping style separator keys to their definitions.
*/
export type SeparatorDefinitionRecord = Record<SeparatorKey, SeparatorDefinition>;
