import { ReactNode } from 'react';

/**
 * Record of all PageActions by their ID.
 */
export type PageActionRecord = Record<string, PageActionInstance>;

/**
 * Unique identifier for a PageAction
 */
export type PageActionID = string;

/**
 * Order of the PageAction in the action list
 */
export type PageActionOrder = number;

/**
 * The main component to render for the PageAction
 */
export type PageActionRender = () => ReactNode;

/**
 * Interface for a PageAction instance.
 */
export interface PageActionInstance {
	/** Unique identifier for the action */
	id: PageActionID;
	/** Priority of the action, used for sorting */
	order: PageActionOrder;
	/** Content of the action */
	render: PageActionRender;
}
