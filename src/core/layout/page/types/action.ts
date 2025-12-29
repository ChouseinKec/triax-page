import { ReactNode } from 'react';

/**
 * Record of all PageActions by their ID.
 */
export type ActionRecord = Record<string, ActionDefinition>;

/**
 * Unique identifier for a PageAction
 */
export type ActionID = string;

/**
 * Order of the PageAction in the action list
 */
export type ActionOrder = number;

/**
 * The main component to render for the PageAction
 */
export type ActionRender = () => ReactNode;

/**
 * Interface for a PageAction instance.
 */
export interface ActionDefinition {
	/** Unique identifier for the action */
	id: ActionID;
	/** Priority of the action, used for sorting */
	order: ActionOrder;
	/** Content of the action */
	render: ActionRender;
}
