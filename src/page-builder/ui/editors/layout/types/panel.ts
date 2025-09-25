import type { TabRecord, PanelPosition, PanelSize, PanelTitle } from '@/src/page-builder/core/editor/layout/types';

/**
 * Props for the LayoutPanelGroup component.
 */
export type LayoutPanelProps = {
	/** The tabs to display in the LayoutPanel group */
	tabs: TabRecord;

	/**
	 *  Initial position of the LayoutPanel group
	 *  @default { top: '0px', left: '0px' }
	 */
	initialPosition: PanelPosition;

	/**
	 *  Initial size and constraints of the LayoutPanel group
	 *  @default { width: '250px', height: '250px', minWidth: 250, minHeight: 250 }
	 */
	initialSize: PanelSize;

	/**
	 * Optional initial locked state of the LayoutPanel group
	 * @default true
	 */
	initialLocked?: boolean;

	/**
	 * Title of the LayoutPanel group, displayed in the header
	 * @default "LayoutPanel"
	 */
	title: PanelTitle;

	/**
	 * Callback function to handle LayoutPanel close events
	 * @default () => {}
	 */
	onClose: () => void;
};
