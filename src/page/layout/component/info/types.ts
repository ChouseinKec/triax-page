// Types
import type { InfoPosition, InfoTitle, InfoSize, InfoID, InfoGrid } from '@/src/page/layout/core/types/info';

/**
 * Props for the InfoSection component.
 */
export interface InfoSectionProps {
	/** ID of the workbench to get bars for */
	selectedWorkbenchID: string;
}

/**
 * Props for the Info component.
 */
export type InfoProps = {
	/** Title of the LayoutInfo */
	title: InfoTitle;
	/** The position of the LayoutInfo within the layout */
	position: InfoPosition;
	/** Size of the LayoutInfo */
	size: InfoSize;
	/** ID of the info to get data for */
	infoID: InfoID;
	/** Grid layout configuration */
	grid: InfoGrid;
};
