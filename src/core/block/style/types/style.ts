import { ReactElement } from 'react';
import { StyleValue } from '@/src/core/block/style/types/value';

/**
 * All valid CSS property names supported by the style system.
 * These correspond to official CSS property names (e.g. 'width', 'color', 'display').
 */
export type StyleKey =
	| 'display'
	| 'flex-direction'
	| 'flex-wrap'
	| 'flex-flow'
	| 'flex-grow'
	| 'flex-shrink'
	| 'flex-basis'
	| 'justify-content'
	| 'align-items'
	| 'align-content'
	| 'justify-items'
	| 'grid-auto-flow'
	| 'grid-template-columns'
	| 'grid-template-rows'
	| 'grid-auto-columns'
	| 'grid-auto-rows'
	| 'row-gap'
	| 'column-gap'
	| 'gap'
	| 'direction'
	| 'box-sizing'
	| 'object-fit'
	| 'object-position'
	| 'float'
	| 'clear'
	| 'visibility'
	| 'width'
	| 'min-width'
	| 'max-width'
	| 'height'
	| 'min-height'
	| 'max-height'
	| 'aspect-ratio'
	| 'overflow'
	| 'scroll-behavior'
	| 'overscroll-behavior'
	| 'scroll-snap-type'
	| 'scroll-snap-align'
	| 'scroll-snap-stop'
	| 'scroll-margin'
	| 'scroll-margin-block'
	| 'scroll-margin-inline'
	| 'scroll-padding'
	| 'scroll-padding-block'
	| 'scroll-padding-inline'
	| 'position'
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'z-index'
	| 'padding-top'
	| 'padding-right'
	| 'padding-bottom'
	| 'padding-left'
	| 'padding'
	| 'margin-top'
	| 'margin-right'
	| 'margin-bottom'
	| 'margin-left'
	| 'margin'
	| 'background'
	| 'background-color'
	| 'background-image'
	| 'background-position'
	| 'background-size'
	| 'background-repeat'
	| 'background-clip'
	| 'background-origin'
	| 'background-blend-mode'
	| 'background-attachment'
	| 'mask-image'
	| 'mask-position'
	| 'mask-size'
	| 'mask-repeat'
	| 'mask-clip'
	| 'mask-origin'
	| 'mask-mode'
	| 'mask-type'
	| 'mask-composite'
	| 'border-width'
	| 'border-style'
	| 'border-color'
	| 'border-top-width'
	| 'border-right-width'
	| 'border-bottom-width'
	| 'border-left-width'
	| 'border-top-style'
	| 'border-right-style'
	| 'border-bottom-style'
	| 'border-left-style'
	| 'border-top-color'
	| 'border-right-color'
	| 'border-bottom-color'
	| 'border-left-color'
	| 'border-radius'
	| 'border-top-left-radius'
	| 'border-top-right-radius'
	| 'border-bottom-right-radius'
	| 'border-bottom-left-radius'
	| 'border-image-source'
	| 'border-image-slice'
	| 'border-image-width'
	| 'border-image-outset'
	| 'border-image-repeat'
	| 'outline-width'
	| 'outline-style'
	| 'outline-color'
	| 'outline-offset'
	| 'font-family'
	| 'font-size'
	| 'font-weight'
	| 'font-style'
	| 'line-height'
	| 'color'
	| 'text-indent'
	| 'text-shadow'
	| 'text-overflow'
	| 'text-orientation'
	| 'text-align'
	| 'text-decoration'
	| 'text-transform'
	| 'text-align-last'
	| 'text-combine-upright'
	| 'white-space'
	| 'word-break'
	| 'writing-mode'
	| 'letter-spacing'
	| 'line-break'
	| 'word-spacing'
	| 'column-count'
	| 'column-width'
	| 'column-rule-width'
	| 'column-rule-style'
	| 'column-rule-color'
	| 'break-before'
	| 'break-inside'
	| 'break-after'
	| 'column-span'
	| 'column-fill'
	| 'filter'
	| 'backdrop-filter'
	| 'transform'
	| 'box-shadow'
	| 'opacity';

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
export type StyleTokenIconMap = Record<string, StyleIcon>;

/**
 * CSS Value Definition Syntax string.
 * This is the syntax string that defines the valid values for this property.
 * It may contain data-type references like `<length>`, `<color>`, etc.
 * Taken from official CSS specifications.
 */
export type StyleSyntax = string;

/**
 * Extracted separator for a CSS property syntax.
 * This is used to determine how to join values correctly based on the syntax.
 */
export type StyleSeparator = string;

/**
 * Represents a single CSS property definition, including its name, description, category,
 * and value definition syntax (raw, expanded, and parsed forms).
 */
export interface StyleDefinition {
	/**
	 * The name of the CSS property (e.g. 'color', 'font-size').
	 * This is used for matching against user input and for validation.
	 */
	name: StyleKey;

	/**
	 * A brief description of the CSS property.
	 */
	description: StyleDescription;

	/**
	 * Optional icon for the property itself (used in UI lists).
	 */
	icon?: StyleIcon;

	/**
	 * Optional map of token/value to icon elements for this property.
	 */
	icons?: StyleTokenIconMap;

	/**
	 * CSS Value Definition Syntax string.
	 * This is the raw syntax string that defines the valid values for this property.
	 * It may contain data-type references like `<length>`, `<color>`, etc.
	 * Taken from official CSS specifications.
	 */
	syntaxRaw: StyleSyntax;

	/**
	 * Expanded CSS Value Definition Syntax string (all datas expanded).
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxExpanded: StyleSyntax;

	/**
	 * Parsed representation of the CSS Value Definition Syntax string.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxParsed: StyleSyntax[];

	/**
	 * Set of each token available in each slot of the syntax.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxSet: Set<StyleSyntax>[];

	/**
	 * Normalized syntax representation for easier comparison and validation.
	 * This is a simplified version of the syntax that removes unnecessary separators, ranges,
	 * and normalizes function calls.
	 */
	syntaxNormalized: StyleSyntax[];

	/**
	 * Extracted separators for each variation in the syntax.
	 * This is used to determine how to join values correctly based on the syntax.
	 */
	syntaxSeparators: StyleSeparator[][];
}

export type StyleRecord = Partial<Record<StyleKey, StyleValue>>;

/**
 *  Definition for a CSS shorthand property, listing its longhand components.
 */
export type StyleShorthandDefinition = StyleKey[];

/**
 * Record mapping shorthand StyleKeys to their corresponding longhand StyleKeys.
 */
export type StyleShorthandRecord = Partial<Record<StyleKey, StyleShorthandDefinition>>;
