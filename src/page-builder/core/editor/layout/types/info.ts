import { ReactNode } from 'react';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Represents the size of the LayoutInfo.
 */
export type InfoSize = {
	/** Width of the LayoutInfo (in any CSS unit) */
	width: string;
	/** Height of the LayoutInfo (in any CSS unit) */
	height: string;
};

/**
 * Represents the grid layout configuration for the LayoutInfo.
 */
export type InfoGrid = {
	/** Number of columns in the grid */
	columns: number;
	/** Number of rows in the grid */
	rows: number;
};

/**
 * Represents the position of the LayoutInfo on the screen.
 */
export type InfoPosition = {
	/** Distance from the top of the viewport (in any CSS unit) */
	top: string;
	/** Distance from the left of the viewport (in any CSS unit) */
	left: string;
};

/**
 * Unique identifier for the LayoutInfo
 */
export type InfoID = string;

/**
 * Title of the LayoutInfo
 */
export type InfoTitle = string;

/**
 * Interface for LayoutInfo definition used in the layout system.
 * Defines the structure and properties of a LayoutInfo for displaying static information.
 * This is used to register LayoutInfos in the layout context.
 */
export interface InfoDefinition {
	/** Unique identifier for the LayoutInfo */
	id: InfoID;
	/** Title of the LayoutInfo, displayed in the header */
	title: InfoTitle;
	/** Position of the LayoutInfo on the screen */
	position: InfoPosition;
	/** Size of the LayoutInfo */
	size: InfoSize;
	/** Grid layout configuration for displaying data */
	grid: InfoGrid;
	/** Workbench identifier for the LayoutInfo */
	workbenchID: WorkbenchID;
}

/**
 * Interface for a LayoutInfo instance.
 * This extends the InfoDefinition with the data items to be displayed.
 * This is used to render the LayoutInfo in the layout.
 */
export interface InfoInstance extends InfoDefinition {
	/** The data items to render inside the info */
	data: InfoDataRecord;
}

/**
 * Unique identifier for an info data item
 */
export type InfoDataID = string;

/**
 * Order value for sorting info data items within an info
 */
export type InfoDataOrder = number;

/**
 * Render function for an info data item content
 */
export type InfoDataRender = () => ReactNode;

/**
 * Represents a data item within a LayoutInfo.
 * This defines the structure of a data item that can be registered in a LayoutInfo.
 * This is used to render the content of the LayoutInfo.
 */
export interface InfoDataInstance {
	/** Unique identifier for the data item */
	id: InfoDataID;
	/** Priority of the data item, used for sorting */
	order: InfoDataOrder;
	/** Content of the data item */
	render: InfoDataRender;
}

/**
 * Record of all info data items by their ID.
 */
export type InfoDataRecord = Record<InfoDataID, InfoDataInstance>;

/**
 * Record of all LayoutInfos by their ID.
 */
export type InfoRecord = Record<InfoID, InfoInstance>;
