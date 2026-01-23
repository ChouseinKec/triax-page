// Typse
import type { ComponentType } from 'react';
import type { ViewKey } from './viewport';

/**
 * Unique identifier for a ViewEditor Action
 */
export type ActionKey = string;

/**
 * Order of the ViewEditor Action in the action list
 */
export type ActionOrder = number;


/**
 * The main component to render for the ViewEditor Action
 */
export type ActionComponent = ComponentType;

/**
 * Render function for the ViewEditor Action
 */
export type ActionRender = (context?: any) => React.ReactElement;

/**
 * Title of the ViewEditor Action
*/
export type ActionTitle = string;

/**
 * Interface for a ViewEditor Action instance.
 */
export interface ActionDefinition {
	/**	Unique key identifying the action. */
	key: ActionKey;
	/** Title of the action. */
	title: ActionTitle;
	/** Order of the action in relation to other actions. */
	order: ActionOrder;
	/** Key of the bench to which this action belongs. */
	viewKey: ViewKey;
	/** Component representing the action's UI. */
	component: ActionComponent;
}

export type RegisteredActions = Record<ActionKey, ActionDefinition>;
