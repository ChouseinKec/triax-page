import { ReactElement } from 'react';
import { StyleValue } from '@/src/core/block/style/types/value';

/**
 * All valid CSS property names supported by the style system.
 * These correspond to official CSS property names (e.g. 'width', 'color', 'display').
 */
export type StyleKey = string;

/**
 * Description for a CSS property.
 */
export type StyleDescription = string;

/**
 * Icon name for a CSS property.
 * This should correspond to an icon in the icon set used by the UI library.
 */
export type StyleIcon = ReactElement;

/**
 * Icon lookup keyed by token/value for a property.
 */
export type StyleTokenIconMap = Record<StyleKey, StyleIcon>;

/**
 * CSS Value Definition Syntax string.
 * This is the syntax string that defines the valid values for this property.
 * It may contain data-type references like `<length>`, `<color>`, etc.
 * Taken from official CSS specifications.
 */
export type StyleSyntaxRaw = string;

/**
 * Parsed representation of a CSS property syntax.
 */
export type StyleSyntaxParsed = string[];

/**
 * Set of valid CSS property syntaxes.
 */
export type StyleSyntaxSet = Set<string>[];

/**
 * Extracted separator for a CSS property syntax.
 * This is used to determine how to join values correctly based on the syntax.
 */
export type StyleSyntaxSeparators = string[][];

/**
 * Represents a shorthand CSS property composed of multiple individual properties.
 */
export type StyleLonghand = StyleKey[];


/**
 * Represents a single CSS property definition, including its name, description, category,
 * and value definition syntax (raw, expanded, and parsed forms).
 */
export interface StyleDefinition {
	/**
	 * The name of the CSS property (e.g. 'color', 'font-size').
	 * This is used for matching against user input and for validation.
	 */
	key: StyleKey;

	/**
	 * A brief description of the CSS property.
	 */
	description: StyleDescription;

	/**
	 * CSS Value Definition Syntax string.
	 * This is the raw syntax string that defines the valid values for this property.
	 * It may contain data-type references like `<length>`, `<color>`, etc.
	 * Taken from official CSS specifications.
	 */
	syntax: StyleSyntaxRaw;

	/**
	 * Gets the parsed representation of the CSS property syntax.
	 */
	getSyntaxParsed(): StyleSyntaxParsed;

	/**
	 * Gets the normalized syntax for the CSS property.
	 */
	getSyntaxNormalized(): StyleSyntaxParsed;

	/**
	 * Gets the syntax set for the CSS property.
	 */
	getSyntaxSet(): StyleSyntaxSet;

	/**
	 * Gets the syntax separators for the CSS property.
	 */
	getSyntaxSeparators(): StyleSyntaxSeparators;

	/**
	 * Optional shorthand properties that this property is part of.
	 */
	longhand?: StyleLonghand;

	/**
	 * Optional map of token/value to icon elements for this property.
	 */
	icons?: StyleTokenIconMap;
}


export type StyleDefinitionRecord = Record<StyleKey, StyleDefinition>;

export type StyleRecord = Partial<Record<StyleKey, StyleValue>>;
