import { ReactNode } from 'react';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Represents the size of the LayoutBar.
 */
export type BarSize = {
	/** Current width of the LayoutBar (in any CSS unit) */
	width: string;
	/** Current height of the LayoutBar (in any CSS unit) */
	height: string;
};

/**
 * Represents the position of the LayoutBar on the screen.
 */
export type BarPosition = {
	/** Distance from the top of the viewport (in any CSS unit) */
	top: string;
	/** Distance from the left of the viewport (in any CSS unit) */
	left: string;
};

/**
 * Unique identifier for the LayoutBar
 */
export type BarID = string;

/**
 * Title of the LayoutBar
 */
export type BarTitle = string;


/**
 * Interface for LayoutBar definition used in the layout system.
 * Defines the structure and properties of a LayoutBar.
 * This is used to register LayoutBars in the layout context.
 */
export interface BarDefinition {
	/**
	 * Unique identifier for the LayoutBar
	 */
	id: BarID;

	/**
	 * Title of the LayoutBar, displayed in the header
	 * @default "LayoutBar"
	 */
	title: BarTitle;

	/**
	 * Position of the LayoutBar on the screen
	 */
	position: BarPosition;

	/**
	 * Size of the LayoutBar
	 * @default { width: '25%', height: '35px' }
	 */
	size: BarSize;

	/**
	 * Optional Workbench identifier for the LayoutBar
	 * Used to differentiate LayoutBars in different Workbenchs
	 */
	workbenchID: WorkbenchID;


}

/**
 * Unique identifier for a bar action
 */
export type ActionID = string;

/**
 * Display title of a bar action
 */
export type ActionTitle = string;

/**
 * Order value for sorting bar actions within a bar
 */
export type ActionOrder = number;

/**
 * Render function for a bar action content
 */
export type ActionRender = () => ReactNode;

/**
 * Represents an action within a LayoutBar.
 * This defines the structure of an action that can be registered in a LayoutBar.
 * This is used to render the content of the LayoutBar.
 */
export interface ActionInstance {
	/** Unique identifier for the action */
	id: ActionID;

	/** Title of the action */
	title: ActionTitle;
	/** Priority of the action, used for sorting */
	order: ActionOrder;
	/** Content of the action */
	render: ActionRender;
}

/**
 * Record of all bar actions by their ID.
 */
export type ActionRecord = Record<ActionID, ActionInstance>;

/**
 * Record of all LayoutBars by their ID.
 */
export type BarRecord = Record<BarID, BarInstance>;

/**
 * Interface for a LayoutBar instance.
 * This extends the BarDefinition with the actions to be displayed.
 * This is used to render the LayoutBar in the layout.
 */
export interface BarInstance extends BarDefinition {
	/** The actions (bar items) to render inside the bar */
	actions: ActionRecord;
}
