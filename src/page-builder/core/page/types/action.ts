import { ReactNode } from 'react';

/**
 * Record of all PageActions by their ID.
 */
export type BarActionRecord = Record<string, BarActionInstance>;

/**
 * Unique identifier for a PageAction
 */
export type BarActionID = string;

/**
 * Order of the PageAction in the action list
 */
export type BarActionOrder = number;

/**
 * The main component to render for the PageAction
 */
export type BarActionRender = () => ReactNode;

/**
 * Interface for a PageAction instance.
 */
export interface BarActionInstance {
	/** Unique identifier for the action */
	id: BarActionID;
	/** Priority of the action, used for sorting */
	order: BarActionOrder;
	/** Content of the action */
	render: BarActionRender;
}
