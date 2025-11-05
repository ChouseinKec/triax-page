/**
 * Name of the initialization step
 */
export type InitStepName = string;

/**
 * Function to execute for the initialization step
 */
export type InitStepFunction = () => Promise<void> | void;

/**
 * Description of the initialization step
 */
export type InitStepDescription = string;

/**
 * Defines the structure for initialization steps in the page builder.
 * Init steps execute sequentially during application startup to configure registries and state.
 */
export interface InitStep {
	/** Name of the initialization step */
	name: InitStepName;
	/** Function to execute for the initialization step */
	init: InitStepFunction;
	/** Whether the step is required (optional steps may be skipped on failure) */
	required?: boolean;
	/** Description of what the initialization step does */
	description?: InitStepDescription;
}
