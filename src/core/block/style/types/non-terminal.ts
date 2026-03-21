export type NonTerminalKey = string;

export type NonTerminalValue = string;

/**
 * Represents a non-terminal definition in CSS syntax.
 */
export interface NonTerminalDefinition {
	/** The canonical name of the non-terminal (e.g. '<url>', '<gradient>'). */
	key: NonTerminalKey;

	/** The expansion syntax string (e.g. '<url()> | <src()>'). */
	value: NonTerminalValue;
}

export type NonTerminalDefinitionRecord = Record<NonTerminalKey, NonTerminalDefinition>;
