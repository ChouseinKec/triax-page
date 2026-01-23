import type { ComponentType } from 'react';
import type { BenchKey } from './bench';

/**
 * Unique identifier for action components associated with a BenchEditor.
 */
export type ActionKey = string;

/**
 * Props for action components associated with a BenchEditor.
 */
export type ActionComponent = ComponentType;

/**
 * Title type for action definitions.
 */
export type ActionTitle = string;

/**
 * Order type for action definitions.
 */
export type ActionOrder = number;

/**
 * Defines the structure for action definitions associated with a BenchEditor.
 */
export interface ActionDefinition {
	/**	Unique key identifying the action. */
	key: ActionKey;
	/** Title of the action. */
	title: ActionTitle;
	/** Order of the action in relation to other actions. */
	order: ActionOrder;
	/** Key of the bench to which this action belongs. */
	benchKey: BenchKey;
	/** Component representing the action's UI. */
	component: ActionComponent;
}

/**
 * Record type for storing multiple ActionDefinitions keyed by their ActionKey.
 */
export type RegisteredActions = Record<ActionKey, ActionDefinition>;
