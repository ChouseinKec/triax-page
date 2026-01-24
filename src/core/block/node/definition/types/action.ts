// Types
import type { ComponentType } from 'react';
import type { NodeKey } from './definition';

/**
 * Unique identifier for a Node Action
 */
export type ActionKey = string;

/**
 * Order of the Node Action in the action list
 */
export type ActionOrder = number;

/**
 * The main component to render for the Node Action
 */
export type ActionComponent = ComponentType;

/**
 * Render function for the Node Action
 */
export type ActionRender = (context?: any) => React.ReactElement;

/**
 * Title of the Node Action
 */
export type ActionTitle = string;

/**
 * Interface for a Node Action instance.
 */
export interface ActionDefinition {
	/** Unique key identifying the action. */
	key: ActionKey;
	/** Title of the action. */
	title: ActionTitle;
	/** Order of the action in relation to other actions. */
	order: ActionOrder;
	/** Key of the node to which this action belongs. */
	nodeKey: NodeKey;
	/** Component representing the action's UI. */
	component: ActionComponent;
}

export type RegisteredActions = Record<ActionKey, ActionDefinition>;