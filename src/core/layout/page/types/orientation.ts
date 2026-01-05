// Types
import type { OptionDefinition } from 'src/shared/components/types/option';

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
export interface OrientationDefinition extends OptionDefinition {
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
