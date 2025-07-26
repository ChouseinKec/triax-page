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
 * Props for the PanelGroup component.
 */
export type PanelGroupProps = {
	/** The content (panel items) to render inside the group */
	children: ReactNode[] | ReactNode;
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
	 * Whether the panel group is open or closed
	 * @default true
	 */
	isOpen: boolean;

	/**
	 * Callback function to handle panel close events
	 * @default () => {}
	 */
	onClose: () => void;
};
