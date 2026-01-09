// Typse
import type { ComponentType } from 'react';
import type { ViewportID } from './viewport';

/**
 * Unique identifier for a Viewport Action
 */
export type ActionID = string;

/**
 * Order of the Viewport Action in the action list
 */
export type ActionOrder = number;

/**
 * The main component to render for the Viewport Action
 */
export type ActionComponent = ComponentType;

/**
 * Interface for a Viewport Action instance.
 */
export interface ActionDefinition {
	/** Unique identifier for the action */
	id: ActionID;

	/** Associated viewport ID */
	viewport: ViewportID;

	/** Priority of the action, used for sorting */
	order: ActionOrder;
	/** Content of the action */
	component: ActionComponent;
}

export type ActionDefinitionRecord = Record<string, ActionDefinition>;
