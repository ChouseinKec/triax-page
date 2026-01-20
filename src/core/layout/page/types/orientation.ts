/**
 * Human-readable name of the orientation
 */
export type OrientationName = string;

/**
 * Unique identifier for the orientation
 */
export type OrientationKey = string;

/**
 * Defines the structure for orientation configurations in the page builder.
 * Orientations represent viewport rotation states for responsive design.
 */
export interface OrientationDefinition {
	/** Human-readable name of the orientation */
	name: OrientationName;
	/** Unique key identifier for the orientation */
	key: OrientationKey;
	/** Whether the orientation is hidden from selection */
	hidden?: boolean;
}

/**
 * Registry of all orientations by their ID.
 */
export type OrientationDefinitionRecord = Record<OrientationKey, OrientationDefinition>;
