import { ReactNode } from 'react';

// Types
import type { WorkbenchID } from '@/src/core/layout/workbench/types';
import type { PanelTabRecord } from '@/src/core/layout/panel/types';

/**
 * Represents the position of the LayoutPanel on the screen.
 */
export type PanelPosition = {
	/** Distance from the top of the viewport (in any CSS unit) */
	top: string;
	/** Distance from the left of the viewport (in any CSS unit) */
	left: string;
};

/**
 * Represents the size and minimum constraints of the LayoutPanel.
 */
export type PanelSize = {
	/** Current width of the LayoutPanel (in any CSS unit) */
	width: string;
	/** Current height of the LayoutPanel (in any CSS unit) */
	height: string;
	/** Minimum allowed width of the LayoutPanel (in pixels) */
	minWidth: number;
	/** Minimum allowed height of the LayoutPanel (in pixels) */
	minHeight: number;
};

/**
 * Represents the possible sides or corners for resizing the LayoutPanel.
 */
export type PanelSide = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Unique identifier for the LayoutPanel
 */
export type PanelID = string;

/**
 * Title of the LayoutPanel
 */
export type PanelTitle = string;

/**
 * Icon of the LayoutPanel
 */
export type PanelIcon = ReactNode;

/**
 * Order of the LayoutPanel in the layout, used for sorting
 */
export type PanelOrder = number;

/**
 * Interface for LayoutPanel definition used in the layout system.
 * Defines the structure and properties of a LayoutPanel.
 * This is used to register LayoutPanels in the layout context.
 */
export interface PanelDefinition {
	/** Unique identifier for the LayoutPanel */
	id: PanelID;
	/** Title of the LayoutPanel, displayed in the header */
	title: PanelTitle;
	/** Order of the LayoutPanel in the layout, used for sorting */
	order: PanelOrder;
	/** Icon of the LayoutPanel, displayed in the left bar */
	icon: PanelIcon;
	/** Optional Workbench identifier for the LayoutPanel */
	workbenchID: WorkbenchID;
	/** Initial position of the LayoutPanel	 */
	initialPosition: PanelPosition;
	/**	Initial size and constraints of the LayoutPanel	 */
	initialSize: PanelSize;
	/** Optional initial locked state of the LayoutPanel */
	initialLocked: boolean;
	/** Optional initial open state of the LayoutPanel	 */
	initialOpen: boolean;
}

/**
 * Interface for a LayoutPanel instance, which includes the content (tabs) to render.
 * This extends the PanelDefinition with the actual tabs to be displayed.
 * This is used to render the LayoutPanel in the layout.
 */
export interface PanelInstance extends PanelDefinition {
	/** The content (LayoutPanel items) to render inside the group */
	tabs: PanelTabRecord;
	/**	Whether the LayoutPanel is currently locked	 */
	isLocked: boolean;
	/** Whether the LayoutPanel group is open or closed */
	isOpen: boolean;
}

/**
 * Record of all LayoutPanels by their ID.
 */
export type PanelRecord = Record<PanelID, PanelInstance>;
