/**
 * Represents a atomic terminal token in a CSS value.
 * Terminals are the base units like identifiers (e.g., `center`)
 * or data types (e.g., `<length>`, `<color>`).
 */
export interface ValueTokenTerminal {
	/** Discriminant for the token type. */
	type: 'terminal';
	/** Normalized canonical name or value. */
	terminal: string;
	/** The original raw value string for this terminal token. */
	value: Value;
}

/**
 * Represents a CSS function call token.
 * Contains the function name and a nested list of parsed argument tokens.
 */
export interface ValueTokenFunction {
	/** Discriminant for the token type. */
	type: 'function';
	/** Normalized function name including trailing parentheses. */
	terminal: string;
	/** The original raw function name without parentheses. */
	function: string;
	/** The parsed tokens representing the function's internal arguments. */
	tokens: ValueToken[];
	/** The original raw value string for this function token. */
	value: Value;
}

/**
 * Represents a group of repeated value tokens collapsed from a `SlotGroup`.
 *
 * Produced by `groupValueTokens` when a flat `ValueToken[]` is restructured
 * to mirror a matched `Variation`. Each entry in `tokens` corresponds to one
 * repetition of the group's repeating unit (e.g. each keyword in a `+`-multiplied
 * alternative like `[start | end | near]+`).
 */
export interface ValueTokenGroup {
	/** Discriminant for the token type. */
	type: 'group';
	/** The flat tokens consumed by this group slot. */
	tokens: ValueToken[];
}

/**
 * Represents a CSS combinator used to relate components.
 * Common combinators include whitespace (sequence), comma (enumeration), and slash (separation).
 */
export interface ValueTokenCombinator {
	/** Discriminant for the token type. */
	type: 'combinator';
	/** The literal combinator character. */
	combinator: string;
}

/**
 * Represents a literal symbol or operator within a value.
 * Typically used for mathematical operators or fixed punctuation that doesn't
 * act as a structural combinator.
 */
export interface ValueTokenLiteral {
	/** Discriminant for the token type. */
	type: 'literal';
	/** The raw literal string. */
	literal: string;
}

/**
 * Union of all supported token types within a parsed CSS value.
 */
export type ValueToken = ValueTokenLiteral | ValueTokenTerminal | ValueTokenFunction | ValueTokenCombinator | ValueTokenGroup;

/**
 * An ordered array of per-repetition token arrays produced by splitting a
 * repeated group value on its combinator character.
 *
 * Mirrors the naming convention `ValueToken` → `ValueToken[]` → `ValueTokenSegments`:
 * each element is one repetition unit (`ValueToken[]`) of the repeated group.
 *
 * @see splitValueTokens
 * @see mergeValueTokens
 */
export type ValueTokenSegments = ValueToken[][];

/**
 * Represents a raw CSS style value as a string before normalization or tokenization.
 */
export type Value = string;
