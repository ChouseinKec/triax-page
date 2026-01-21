// Types
import type { ReactNode } from 'react';
import type { BenchKey } from '@/core/layout/workbench/types';

/**
 * Represents the position of the Panel on the screen.
 */
type PanelPositionA = {
	/** Distance from the left of the viewport (in %) */
	top: number;
	/** Distance from the left of the viewport (in %) */
	right: number;
};

/**
 * Represents the position of the Panel on the screen.
 */
type PanelPositionB = {
	/** Distance from the top of the viewport (in %) */
	top: number;
	/** Distance from the left of the viewport (in %) */
	left: number;
};

/**
 * Represents the position of the Panel on the screen.
 */
type PanelPositionC = {
	/** Distance from the bottom of the viewport (in %) */
	bottom: number;
	/** Distance from the left of the viewport (in %) */
	left: number;
};

/**
 * Represents the position of the Panel on the screen.
 */
type PanelPositionD = {
	/** Distance from the bottom of the viewport (in %) */
	bottom: number;
	/** Distance from the right of the viewport (in %) */
	right: number;
};

/**
 * Represents the position of the Panel on the screen.
 */
export type PanelPosition = PanelPositionA | PanelPositionB | PanelPositionC | PanelPositionD;

/**
 * Represents the size and minimum constraints of the Panel.
 */
export type PanelSize = {
	/** Current width of the Panel (in px) */
	width: number;
	/** Current height of the Panel (in px) */
	height: number;
	/** Minimum allowed width of the Panel (in px) */
	minWidth: number;
	/** Minimum allowed height of the Panel (in px) */
	minHeight: number;
};

/**
 * Represents the possible sides or corners for resizing the Panel.
 */
export type PanelSide = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Unique identifier for the Panel
 */
export type PanelKey = string;

/**
 * Title of the Panel
 */
export type PanelTitle = string;

/**
 * Icon of the Panel
 */
export type PanelIcon = ReactNode;

/**
 * Order of the Panel in the layout, used for sorting
 */
export type PanelOrder = number;

/**
 * Interface for Panel definition used in the layout system.
 * Defines the structure and properties of a Panel.
 * This is used to register LayoutPanels in the layout context.
 */
export interface PanelDefinition {
	/** Unique identifier for the Panel */
	key: PanelKey;
	/** Key of the Workbench this Panel belongs to */
	benchKey: BenchKey;
	/** Title of the Panel, displayed in the header */
	title: PanelTitle;
	/** Order of the Panel in the layout, used for sorting */
	order: PanelOrder;
	/** Icon of the Panel, displayed in the left bar */
	icon: PanelIcon;
	/** Initial position of the Panel	 */
	initialPosition: PanelPosition;
	/**	Initial size and constraints of the Panel	 */
	initialSize: PanelSize;
	/** Optional initial locked state of the Panel */
	initialLocked?: boolean;
	/** Optional initial open state of the Panel	 */
	initialOpen?: boolean;
}

/**
 * Record of all Panel definitions by their key.
 */
export type PanelDefinitionRecord = Record<PanelKey, PanelDefinition>;

/**
 * Represents the runtime state of a Panel instance.
 * This includes mutable properties that can change during the session.
 */
export interface PanelInstance {
	/** Unique identifier for the Panel */
	key: PanelKey;
	/** Whether the Panel is currently open */
	isOpen: boolean;
	/** Current position of the Panel */
	position: PanelPosition;
	/** Current size of the Panel */
	size: PanelSize;
	/** Whether the Panel is locked (cannot be moved/resized) */
	isLocked: boolean;
}

/**
 * Record of all Panel instances by their key.
 */
export type PanelInstanceRecord = Record<PanelKey, PanelInstance>;
