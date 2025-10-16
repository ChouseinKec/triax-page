import { ReactNode, ReactElement } from 'react';

/**
 * Unique identifier for the Workbench
 *
 *  Must be unique across all registered Workbenchs.
 *
 *  Used to reference the Workbench in the application.
 *
 *  Example: "main", "design", "code"
 */
export type WorkbenchID = string;

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
export type WorkbenchRegistry = Record<WorkbenchID, WorkbenchDefinition>;

/**
 * Children blocks to render inside the Workbench
 */
export type WorkbenchChildren = ReactNode;

/**
 * The main function to render for the Workbench
 */
export type WorkbenchRender = () => ReactNode;

/**
 * Defines the structure for workbench configurations in the page builder.
 *
 * Workbenches provide different editing contexts and toolsets.
 */
export interface WorkbenchDefinition {
	/** Unique identifier for the Workbench	 */
	id: WorkbenchID;
	/** Title of the Workbench */
	title: WorkbenchTitle;
	/** Icon of the Workbench, displayed in the UI */
	icon: WorkbenchIcon;
	/** Order of the Workbench in the selection list */
	order: WorkbenchOrder;
	/** The main component to render for the Workbench */
	render: WorkbenchRender;
}

