/**
 * Human-readable name of the pseudo state
 */
export type PseudoName = string;

/**
 * Unique value identifier for the pseudo state
 */
export type PseudoValue = string;

/**
 * Unique identifier for the pseudo state
 */
export type PseudoID = string;

/**
 * Registry of all pseudo states by their ID.
 */
export type PseudoRecord = Record<PseudoID, PseudoInstance>;

/**
 * Defines the structure for pseudo state configurations in the page builder.
 * Pseudo states represent interactive states like hover, active, focus, etc.
 */
export interface PseudoDefinition {
	/** Human-readable name of the pseudo state */
	name: PseudoName;
	/** Unique value identifier for the pseudo state */
	value: PseudoValue;
	/** Whether the pseudo state should be hidden from UI selectors */
	hidden?: boolean;
}

/**
 * Pseudo state instance with registered ID.
 * Extends PseudoDefinition with a unique identifier assigned during registration.
 */
export interface PseudoInstance extends PseudoDefinition {
	/** Unique identifier assigned during registration */
	id: PseudoID;
}
