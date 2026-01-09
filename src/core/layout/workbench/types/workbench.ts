import { ReactNode, ReactElement, ComponentType } from 'react';

/**
 * Unique identifier for the Workbench
 * Must be unique across all registered Workbenchs.
 * Used to reference the Workbench in the application.
 */
export type WorkbenchKey = string;

/**
 * Title of the Workbench
 */
export type WorkbenchTitle = string;

/**
 * Icon of the Workbench, displayed in the UI
 */
export type WorkbenchIcon = string | ReactElement | ReactNode;

/**
 * Order of the Workbench in the selection list
 */
export type WorkbenchOrder = number;

/**
 * Registry of all Workbenchs by their ID.
 */
export type WorkbenchRegistry = Record<WorkbenchKey, WorkbenchDefinition>;

/**
 * Props for the main component to render for the Workbench
 */
export type WorkbenchComponentProps = { children: ReactNode };

/**
 * The main component to render for the Workbench
 */
export type WorkbenchComponent = ComponentType<WorkbenchComponentProps>;

/**
 * Defines the structure for workbench configurations in the page builder.
 * Workbenches provide different editing contexts and toolsets.
 */
export interface WorkbenchDefinition {
	/** Unique identifier for the Workbench	 */
	key: WorkbenchKey;
	/** Title of the Workbench */
	title: WorkbenchTitle;
	/** Icon of the Workbench, displayed in the UI */
	icon: WorkbenchIcon;
	/** Order of the Workbench in the selection list */
	order: WorkbenchOrder;
	/** The main component to render for the Workbench */
	component: WorkbenchComponent;
}
