// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { StyleValue, StyleDefinitionRecord, StyleKey, UnitDefinitionRecord } from '@/src/core/block/style/types';

/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 */
export type TokenKey = string | '<number>' | '<integer>' | '<percentage>' | '<length>' | '<angle>' | '<flex>' | '<link>' | '<length-percentage>' | '<color>' | '<track-list>' | '<track-size>' | '<track-breadth>' | '<inflexible-breadth>' | '<track-repeat>' | '<overflow-block>' | '<ratio>' | '<image>' | '<transform-function>' | '<translate3d>' | '<rotate3d>' | '<scale3d>' | '<skew>' | '<perspective>' | '<generic-family>' | '<generic-complete>' | '<generic-incomplete>' | '<text-decoration-line>' | '<text-decoration-style>' | '<text-decoration-color>' | '<text-decoration-thickness>' | '<bg-size>' | '<bg-position>' | '<bg-image>' | '<mix-blend-mode>' | '<position>' | '<border-image-source>' | '<border-image-slice>' | '<border-image-width>' | '<border-image-outset>' | '<border-image-repeat>' | '<filter-function>' | '<spread-shadow>' | '<box-shadow-position>' | '<box-shadow-color>' | '<box-shadow-offset>' | '<box-shadow-blur>' | '<box-shadow-spread>';

/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 */
export type TokenTypeKey = string | 'composed' | 'keyword' | 'function' | 'length' | 'number' | 'integer' | 'color' | 'link';

/**
 * Represents the parameters for a CSS data type token.
 */
export type TokenParam = {
	/** Allows any additional properties to be added dynamically */
	[key: string]: unknown;
};

/**
 * Represents the default value for a CSS data type token.
 */
export type TokenDefault = string;

/**
 * Represents the syntax definition for a CSS data type token. (e.g. '<number [0,25]>')
 */
export type TokenRaw = string;

/**
 * Represents the canonical form of a CSS data type token.
 * 'fit-content(10px)' -> 'fit-content()'
 */
export type TokenCanonical = string;

/**
 * Represents the base form of a CSS data type token.
 * 'fit-content(10px)' -> 'fit-content'
 */
export type TokenBase = string;

/**
 *  Represents the priority of a CSS data type token.
 */
export type TokenPriority = number;

/**
 * Function type for matching a value against a CSS data type token.
 */
export type TokenGetValueTypeFn = (styleValue: StyleValue) => string | undefined;

/**
 * Function type for matching a value against a CSS data type token key.
 */
export type TokenGetTokenTypeFn = (tokenCanonical: TokenCanonical) => string | undefined;

/**
 * Function type for converting a CSS data type token to its value tokens.
 */
export type TokenGetValueTokenFn = (styleValue: StyleValue) => string | undefined;

/**
 * Function type for converting a CSS data type token to its canonical form.
 */
export type TokenGetTokenCanonicalFn = (tokenRaw: TokenRaw) => TokenCanonical | undefined;

export type TokenOptionParams = {
	tokenDefinitions: TokenDefinitionRecord;
	tokenTypeDefinitions: TokenTypeDefinitionRecord;
	styleDefinitions: StyleDefinitionRecord;
	unitDefinitions: UnitDefinitionRecord;

	tokenRaw: TokenRaw;
	tokenCanonical: TokenCanonical;
	tokenBase: TokenBase;
	styleKey: StyleKey;
};

/**
 * Function type for creating an OptionDefinition for a CSS data type token.
 */
export type TokenCreateOptionFn = (params: TokenOptionParams) => OptionDefinition | OptionDefinition[] | undefined;

/**
 * Function type for extracting parameters from a CSS data type token syntax.
 */
export type TokenGetTokenParamFn = (tokenSyntax: TokenRaw) => TokenParam | undefined;

/**
 * Function type for rendering a CSS data type token value.
 */
export type TokenGetTokenComponent =  (value: StyleValue, onChange: (value: StyleValue) => void, options: OptionDefinition[]) => React.ReactElement;

/**
 * Represents a single CSS data type definition, including its name and syntax.
 */
export interface TokenDefinition {
	/** The canonical name of the CSS data type (e.g. '<number>', '<length>'). */
	key: TokenKey;

	/** The value definition syntax for this data type (may reference other data types). */
	syntax: TokenRaw;

	/** The type of this token (e.g., 'number', 'color'). */
	type: TokenTypeKey;

	/** The default value for this data type, if any. */
	default?: TokenDefault;
}

export interface TokenTypeDefinition {
	/** The canonical name of the CSS data type (e.g. '<number>', '<length>'). */
	key: TokenTypeKey;

	/** The priority of this token type when determining defaults. Lower numbers indicate higher priority. */
	priority: TokenPriority;

	/** Function to render a value of this token type. */
	getTokenComponent: TokenGetTokenComponent;

	/** Function to convert a token syntax to its canonical form. */
	getTokenCanonical: TokenGetTokenCanonicalFn;

	/** Function to match a value against this token type. */
	getValueType: TokenGetValueTypeFn;

	/** Function to match a token key against this token type. */
	getTokenType: TokenGetTokenTypeFn;

	/** Function to convert a token to its default value. */
	getValueToken: TokenGetValueTokenFn;

	/** Function to extract parameters from the token syntax. */
	getTokenParam?: TokenGetTokenParamFn;

	/** Function to create an option for this token type. */
	createOption: TokenCreateOptionFn;
}

/**
 * Record mapping TokenKey to TokenDefinition
 */
export type TokenDefinitionRecord = Record<TokenKey, TokenDefinition>;

/**
 * Record mapping TokenTypeKey to TokenTypeDefinition
 */
export type TokenTypeDefinitionRecord = Record<TokenTypeKey, TokenTypeDefinition>;
