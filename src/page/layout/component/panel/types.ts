import type { TabRecord, PanelPosition, PanelSize, PanelTitle } from '@/src/page/layout/core/types';


/**
 * Props for the PanelSection component.
 */
export interface PanelSectionProps {
	/** ID of the workbench to get bars for */
	selectedWorkbenchID: string;
}


/**
 * Props for the Panel component.
 */
export type PanelProps = {
	/** The tabs to display in the Panel */
	tabs: TabRecord;
	/** Initial position of the Panel */
	initialPosition: PanelPosition;
	/** Initial size and constraints of the Panel */
	initialSize: PanelSize;
	/** Optional initial locked state of the Panel */
	initialLocked?: boolean;
	/** Title of the Panel, displayed in the header */
	title: PanelTitle;
	/** Callback function to handle Panel close events */
	onClose: () => void;
};
