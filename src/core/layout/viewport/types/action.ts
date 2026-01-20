// Typse
import type { ComponentType } from 'react';
import type { ViewKey } from './viewport';

/**
 * Unique identifier for a Viewport Action
 */
export type ActionKey = string;

/**
 * Order of the Viewport Action in the action list
 */
export type ActionOrder = number;


/**
 * The main component to render for the Viewport Action
 */
export type ActionComponent = ComponentType;

/**
 * Render function for the Viewport Action
 */
export type ActionRender = (context?: any) => React.ReactElement;

/**
 * Title of the Viewport Action
*/
export type ActionTitle = string;

/**
 * Interface for a Viewport Action instance.
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

export type ActionDefinitionRecord = Record<ActionKey, ActionDefinition>;
