
/**
 * Name of the initialization step
 */
export type StepName = string;

/**
 * Function to execute for the initialization step
 */
export type StepFunction = () => Promise<void> | void;

/**
 * Description of the initialization step
 */
export type StepDescription = string;

/**
 * Defines the structure for initialization steps in the page builder.
 * Init steps execute sequentially during application startup to configure REGISTRY_DEFINITIONS and state.
 */
export interface Step {
	/** Name of the initialization step */
	name: StepName;
	/** Function to execute for the initialization step */
	init: StepFunction;
	/** Description of what the initialization step does */
	description: StepDescription;
}
