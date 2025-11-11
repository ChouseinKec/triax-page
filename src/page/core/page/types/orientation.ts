/**
 * Human-readable name of the orientation
 */
export type OrientationName = string;

/**
 * Unique identifier for the orientation
 */
export type OrientationID = string;

/**
 * Unique value identifier for the orientation
 */
export type OrientationValue = string;

/**
 * Registry of all orientations by their ID.
 */
export type OrientationRecord = Record<string, OrientationInstance>;

/**
 * Defines the structure for orientation configurations in the page builder.
 * Orientations represent viewport rotation states for responsive design.
 */
export interface OrientationDefinition {
	/** Human-readable name of the orientation */
	name: OrientationName;
	/** Unique value identifier for the orientation */
	value: OrientationValue;
	/** Whether the orientation should be hidden from UI selectors */
	hidden?: boolean;
}

/**
 * Orientation instance with registered ID.
 * Extends OrientationDefinition with a unique identifier assigned during registration.
 */
export interface OrientationInstance extends OrientationDefinition {
	/** Unique identifier assigned during registration */
	id: OrientationID;
}
