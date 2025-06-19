import type { ValueSeparators } from '@/types/style/value';

// Core display properties
type DisplayProperties = 'display' | 'visibility' | 'opacity' | 'box-sizing' | 'aspect-ratio' | 'float' | 'clear';

// Flex & Grid properties
type FlexProperties = 'flex-direction' | 'flex-wrap' | 'flex-flow' | 'flex-grow' | 'flex-shrink' | 'flex-basis';
type FlexAlignmentProperties = 'justify-content' | 'align-items' | 'align-content' | 'align-self' | 'justify-items' | 'justify-self' | 'place-content' | 'place-items' | 'place-self';
type GridProperties = 'grid-auto-flow' | 'grid-template-columns' | 'grid-template-rows' | 'grid-auto-columns' | 'grid-auto-rows' | 'grid-column-gap' | 'grid-row-gap' | 'gap' | 'row-gap' | 'column-gap';

// Size & dimension properties
type SizeProperties = 'width' | 'min-width' | 'max-width' | 'height' | 'min-height' | 'max-height';
type OverflowProperties = 'overflow' | 'overflow-x' | 'overflow-y';

// Position & spacing properties
type PositionProperties = 'position' | 'top' | 'right' | 'bottom' | 'left' | 'z-index';
type SpacingProperties = 'padding' | 'padding-top' | 'padding-right' | 'padding-bottom' | 'padding-left' | 'margin' | 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left';

// Background & border properties
type BackgroundProperties = 'background-color' | 'background-image' | 'background-position' | 'background-size' | 'background-repeat' | 'background-attachment' | 'background-clip' | 'background-origin' | 'background-blend-mode';
type BorderProperties = 'border' | 'border-width' | 'border-style' | 'border-color' | 'border-top' | 'border-right' | 'border-bottom' | 'border-left' | 'border-top-width' | 'border-right-width' | 'border-bottom-width' | 'border-left-width' | 'border-top-style' | 'border-right-style' | 'border-bottom-style' | 'border-left-style' | 'border-top-color' | 'border-right-color' | 'border-bottom-color' | 'border-left-color' | 'border-radius' | 'border-top-left-radius' | 'border-top-right-radius' | 'border-bottom-right-radius' | 'border-bottom-left-radius';
type OutlineProperties = 'outline' | 'outline-width' | 'outline-style' | 'outline-color' | 'outline-offset';

// Text & font properties
type FontProperties = 'font-family' | 'font-size' | 'font-weight' | 'font-style' | 'font-variant' | 'font-stretch' | 'line-height' | 'letter-spacing' | 'word-spacing';
type TextProperties = 'color' | 'text-align' | 'text-decoration' | 'text-decoration-line' | 'text-decoration-color' | 'text-decoration-style' | 'text-decoration-thickness' | 'text-transform' | 'text-indent' | 'text-shadow' | 'text-overflow' | 'white-space' | 'word-break' | 'line-break' | 'writing-mode' | 'text-orientation' | 'direction';

// Column properties
type ColumnProperties = 'column-count' | 'column-width' | 'column-gap' | 'column-rule' | 'column-rule-width' | 'column-rule-style' | 'column-rule-color' | 'column-span' | 'column-fill' | 'break-before' | 'break-inside' | 'break-after';

// Visual effects
type EffectProperties = 'box-shadow' | 'text-shadow' | 'opacity' | 'filter' | 'backdrop-filter' | 'mix-blend-mode' | 'clip-path' | 'mask' | 'mask-image' | 'mask-mode' | 'mask-position' | 'mask-size' | 'mask-repeat' | 'mask-origin' | 'mask-clip' | 'mask-composite';

// Transform & transition properties
type TransformProperties = 'transform' | 'transform-origin' | 'transform-style';
type TransitionProperties = 'transition' | 'transition-property' | 'transition-duration' | 'transition-timing-function' | 'transition-delay';

// Animation properties
type AnimationProperties = 'animation' | 'animation-name' | 'animation-duration' | 'animation-timing-function' | 'animation-delay' | 'animation-iteration-count' | 'animation-direction' | 'animation-fill-mode' | 'animation-play-state';

// Other properties
type ObjectProperties = 'object-fit' | 'object-position';
type ListProperties = 'list-style' | 'list-style-type' | 'list-style-position' | 'list-style-image';
type CursorProperties = 'cursor' | 'pointer-events';
type ScrollProperties = 'scroll-behavior' | 'scroll-margin' | 'scroll-padding' | 'scroll-snap-type' | 'scroll-snap-align';

/**
 * All valid CSS property names supported by the style system.
 * These correspond to official CSS property names (e.g. 'width', 'color', 'display').
 * Used for type-safe property lookup and validation.
 */
export type CSSProperties = SizeProperties | FlexProperties | FlexAlignmentProperties | DisplayProperties | GridProperties | OverflowProperties | PositionProperties | SpacingProperties | BackgroundProperties | BorderProperties | OutlineProperties | FontProperties | TextProperties | ColumnProperties | EffectProperties | TransformProperties | TransitionProperties | AnimationProperties | ObjectProperties | ListProperties | CursorProperties | ScrollProperties;

/**
 * All valid CSS property categories for grouping and filtering in the UI.
 * These correspond to logical groupings of CSS properties (e.g. 'display', 'size', 'font').
 */
export type CSSPropertyCategories = 'display' | 'size' | 'overflow' | 'flex' | 'grid' | 'position' | 'spacing' | 'background' | 'border' | 'outline' | 'font' | 'text' | 'column' | 'effect' | 'transform' | 'transition' | 'animation' | 'object' | 'list' | 'cursor' | 'scroll';

/**
 * Represents a single CSS property definition, including its name, description, category,
 * and value definition syntax (raw, expanded, and parsed forms).
 * Used for property lookup, validation, and UI rendering.
 */
export interface CSSProperty {
	/**
	 * The name of the CSS property (e.g. 'color', 'font-size').
	 * This is used for matching against user input and for validation.
	 */
	name: string;

	/**
	 * A brief description of the CSS property.
	 */
	description: string;

	/**
	 * The CSS property category.
	 * This is used for grouping properties in the UI and for validation logic.
	 */
	category: CSSPropertyCategories;

	/**
	 * The default value for this property.
	 * This is used for initial rendering and validation.
	 */
	initialValue: string;

	/**
	 * CSS Value Definition Syntax string.
	 * This is the raw syntax string that defines the valid values for this property.
	 * It may contain data-type references like `<length>`, `<color>`, etc.
	 * Taken from official CSS specifications.
	 */
	syntaxRaw: string;

	/**
	 * Expanded CSS Value Definition Syntax string (all datas expanded).
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxExpanded: string;

	/**
	 * Parsed representation of the CSS Value Definition Syntax string.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxParsed: Set<string>;

	/**
	 * Set of each token available in each slot of the syntax.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxSet: Set<string>[];

	/**
	 * Normalized syntax representation for easier comparison and validation.
	 * This is a simplified version of the syntax that removes unnecessary separators, ranges,
	 * and normalizes function calls.
	 */
	syntaxNormalized: Set<string>;

	/**
	 * Extracted separators for each variation in the syntax.
	 * This is used to determine how to join values correctly based on the syntax.
	 */
	syntaxSeparators: Set<ValueSeparators>[];
}
