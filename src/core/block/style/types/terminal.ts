// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { ValueToken, Value, StyleKey } from '@/core/block/style/types';

/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 */
export type TerminalKey = string;

/**
 * Represents the parameters for a CSS data type token.
 */
export type TerminalParam = {
	/** Allows any additional properties to be added dynamically */
	[key: string]: any;
};

/**
 * Represents the default value for a CSS data type token.
 */
export type TerminalDefault = string;

export type TerminalToken = string;

/**
 *  Represents the priority of a CSS data type token.
 */
export type TerminalPriority = number;

/**
 * Function type for converting a CSS data type token to its value tokens.
 */
export type TerminalMatchValueFn = (value: Value) => TerminalToken | undefined;

export type TerminalMatchTokenFn = (terminalToken: TerminalToken) => TerminalKey | undefined;

/**
 * Function type for creating an OptionDefinition for a CSS data type token.
 */
export type TerminalCreateOptionFn = (terminalToken: TerminalToken, terminalParam: TerminalParam, styleKey: StyleKey) => OptionDefinition | OptionDefinition[] | undefined;

export type TerminalGetDefaultFn = (terminalToken: TerminalToken) => TerminalDefault | undefined;

/**
 * Props for terminal CSS data type editor components.
 */
export type TerminalComponentProps = {
	value: Value;
	options: OptionDefinition[];
	terminalDefinitions: TerminalDefinition[];
	/** Called when the user edits the value in-place. Terminal key stays the same. */
	onChangeValue: (value: string | null) => void;
	/** Called when the user switches type via the options dropdown. Terminal key comes from the selected option. */
	onChangeOption: (value: string | null) => void;
};

/**
 * Function type for rendering a CSS data type token value.
 */
export type TerminalGetComponentFn = (props: TerminalComponentProps) => React.ReactElement;

/**
 * Represents a single CSS data type definition, including its name and syntax.
 */
export interface TerminalDefinition {
	/** The canonical name of the CSS data type (e.g. '<number>', '<length>'). */
	key: TerminalKey;

	/** The priority of this token type when determining defaults. Lower numbers indicate higher priority. */
	priority: TerminalPriority;

	/** Function to render a value of this token type. */
	getComponent: TerminalGetComponentFn;

	/** Function to get the default value for this token type. */
	getDefault: TerminalGetDefaultFn;

	/** Function to match a CSS value to this token type. */
	matchValue: TerminalMatchValueFn;

	/** Function to match a raw token string to this terminal type. */
	matchToken: TerminalMatchTokenFn;

	/** Function to create an option for this token type. */
	createOption: TerminalCreateOptionFn;
}

/**
 * Record mapping TerminalKey to TerminalDefinition
 */
export type TerminalDefinitionRecord = Record<TerminalKey, TerminalDefinition>;
