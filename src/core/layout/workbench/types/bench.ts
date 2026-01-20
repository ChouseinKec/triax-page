import { ReactNode, ReactElement, ComponentType } from 'react';

/**
 * Unique identifier for the Workbench
 * Must be unique across all registered Workbenchs.
 * Used to reference the Workbench in the application.
 */
export type BenchKey = string;

/**
 * Title of the Workbench
 */
export type BenchName = string;

/**
 * Icon of the Workbench, displayed in the UI
 */
export type BenchIcon = string | ReactElement | ReactNode;

/**
 * Order of the Workbench in the selection list
 */
export type BenchOrder = number;

/**
 * Registry of all Workbenchs by their ID.
 */
export type BenchRegistry = Record<BenchKey, BenchDefinition>;

/**
 * Props for the main component to render for the Workbench
 */
export type BenchComponentProps = {};

/**
 * The main component to render for the Workbench
 */
export type BenchComponent = ComponentType<BenchComponentProps>;

/**
 * Defines the structure for workbench configurations in the page builder.
 * Workbenches provide different editing contexts and toolsets.
 */
export interface BenchDefinition {
	/** Unique identifier for the Workbench	 */
	key: BenchKey;
	/** Name of the Workbench */
	name: BenchName;
	/** Icon of the Workbench, displayed in the UI */
	icon: BenchIcon;
	/** Order of the Workbench in the selection list */
	order: BenchOrder;
	/** The main component to render for the Workbench */
	component: BenchComponent;
}

/**
 * Record type for storing multiple BenchDefinitions keyed by their BenchKey.
 */
export type BenchDefinitionRecord = Record<BenchKey, BenchDefinition>;
