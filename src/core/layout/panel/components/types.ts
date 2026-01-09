import type { PanelTabRecord, PanelPosition, PanelSize, PanelTitle } from '@/src/core/layout/panel/types';


/**
 * Props for the PanelEditor component.
 */
export interface PanelEditorProps {
	/** ID of the workbench to get bars for */
	selectedWorkbenchKey: string;
}


/**
 * Props for the Panel component.
 */
export type PanelProps = {
	/** The tabs to display in the Panel */
	tabs: PanelTabRecord;
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
