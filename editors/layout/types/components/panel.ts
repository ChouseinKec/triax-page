import { ReactNode } from 'react';

/**
 * Represents the position of the panel on the screen.
 */
export type Position = {
	/** Distance from the top of the viewport (in any CSS unit) */
	top: string;
	/** Distance from the left of the viewport (in any CSS unit) */
	left: string;
};

/**
 * Represents the size and minimum constraints of the panel.
 */
export type Size = {
	/** Current width of the panel (in any CSS unit) */
	width: string;
	/** Current height of the panel (in any CSS unit) */
	height: string;
	/** Minimum allowed width of the panel (in pixels) */
	minWidth: number;
	/** Minimum allowed height of the panel (in pixels) */
	minHeight: number;
};

/**
 * Represents the possible sides or corners for resizing the panel.
 */
export type Side = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Interface for panel definition used in the layout system.
 * Defines the structure and properties of a panel.
 * This is used to register panels in the layout context.
 */
export interface PanelDefinition {
	/**
	 * Unique identifier for the panel
	 */
	id: string;

	/**
	 *  Initial position of the panel
	 *  @default { top: '0px', left: '0px' }
	 */
	initialPosition: Position;
	/**
	 *  Initial size and constraints of the panel
	 *  @default { width: '250px', height: '250px', minWidth: 250, minHeight: 250 }
	 */
	initialSize: Size;

	/**
	 * Optional initial locked state of the panel
	 * @default true
	 */
	initialLocked: boolean;

	/**
	 * Optional initial open state of the panel
	 * @default true
	*/
	initialOpen: boolean;

	/**
	 * Title of the panel, displayed in the header
	 * @default "Panel"
	 */
	title: string;

	/**
	 * Order of the panel in the layout, used for sorting
	 * @default 0
	 */
	order: number;

	/**
	 * Icon of the panel, displayed in the left bar
	 */
	icon: React.ReactNode;

	/**
	 * Optional workspace identifier for the panel
	 * Used to differentiate panels in different workspaces
	 */
	workspace: string;
}

/**
 * Interface for a panel instance, which includes the content (tabs) to render.
 * This extends the PanelDefinition with the actual tabs to be displayed.
 * This is used to render the panel in the layout.
 */
export interface PanelInstance extends PanelDefinition {
	/** The content (panel items) to render inside the group */
	tabs: Record<string, PanelTabInstance>;

	/**
	 * Whether the panel is currently locked
	 * @default true
	 */
	isLocked: boolean;

	/**
	 * Whether the panel group is open or closed
	 * @default true
	 */
	isOpen: boolean;
}

/**
 * Represents a tab within a panel.
 * This defines the structure of a tab that can be registered in a panel.
 * This is used to render the content of the panel.
 */
export interface PanelTabInstance {
	/** Unique identifier for the tab */
	id: string;

	/** Title of the tab */
	title: string;

	/** Content of the tab */
	content: ReactNode;

	/** Icon for the tab, displayed in the panel header */
	icon: ReactNode;

	/** Priority of the tab, used for sorting */
	order: number;
}

/**
 * Record of all panels by their ID.
 */
export type PanelRecord = Record<string, PanelInstance>;

/**
 * Context type for layout management.
 */
export type PanelContextType = {
	panels: PanelRecord;
	registerPanel: (panel: PanelInstance) => void;
	unregisterPanel: (panelID: string) => void;
	togglePanel: (panelID: string) => void;
	registerPanelTab: (panelID: string, tab: PanelTabInstance) => void;
	unregisterPanelTab: (panelID: string, tabID: string) => void;
};

/**
 * Props for the PanelGroup component.
 */
export type PanelProps = {
	tabs: Record<string, PanelTabInstance>;

	/**
	 *  Initial position of the panel group
	 *  @default { top: '0px', left: '0px' }
	 */
	initialPosition: Position;

	/**
	 *  Initial size and constraints of the panel group
	 *  @default { width: '250px', height: '250px', minWidth: 250, minHeight: 250 }
	 */
	initialSize: Size;

	/**
	 * Optional initial locked state of the panel group
	 * @default true
	 */
	initialLocked?: boolean;

	/**
	 * Title of the panel group, displayed in the header
	 * @default "Panel"
	 */
	title: string;

	/**
	 * Callback function to handle panel close events
	 * @default () => {}
	 */
	onClose: () => void;
};
