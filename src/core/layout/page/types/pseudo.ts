/**
 * Human-readable name of the pseudo state
 */
export type PseudoName = string;

/**
 * Unique identifier for the pseudo state
 */
export type PseudoKey = string;

/**
 * Defines the structure for pseudo state configurations in the page builder.
 * Pseudo states represent interactive states like hover, active, focus, etc.
 */
export interface PseudoDefinition {
	/** Human-readable name of the pseudo state */
	name: PseudoName;
	/** Unique key identifier for the pseudo state */
	key: PseudoKey;
	/** Whether the pseudo state should be hidden from UI selectors */
	hidden?: boolean;
}

/**
 * Registry of all pseudo states by their ID.
 */
export type PseudoDefinitionRecord = Record<PseudoKey, PseudoDefinition>;
