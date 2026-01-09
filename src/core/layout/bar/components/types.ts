// Types
import type { BarPosition, BarTitle, BarSize, BarID } from '@/src/core/layout/bar/types';

/**
 * Props for the BarEditor component.
 */
export interface BarEditorProps {
	/** ID of the workbench to get bars for */
	selectedWorkbenchKey: string;
}

/**
 * Props for the Bar component.
 */
export interface BarProps {
	/** Title of the Bar, displayed in the header */
	title: BarTitle;
	/** The position of the Bar within the layout */
	position: BarPosition;
	/** Size of the Bar */
	size: BarSize;
	/** ID of the bar to get actions for */
	barID: BarID;
	/** Background color of the Bar */
	isTransparent?: boolean;
}
