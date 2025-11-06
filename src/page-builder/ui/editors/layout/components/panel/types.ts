import type { TabRecord, PanelPosition, PanelSize, PanelTitle } from '@/src/page-builder/core/editor/layout/types';

/**
 * Props for the LayoutPanelGroup component.
 */
export type LayoutPanelProps = {
	/** The tabs to display in the LayoutPanel group */
	tabs: TabRecord;
	/** Initial position of the LayoutPanel group */
	initialPosition: PanelPosition;
	/** Initial size and constraints of the LayoutPanel group */
	initialSize: PanelSize;
	/** Optional initial locked state of the LayoutPanel group */
	initialLocked?: boolean;
	/** Title of the LayoutPanel group, displayed in the header */
	title: PanelTitle;
	/** Callback function to handle LayoutPanel close events */
	onClose: () => void;
};
