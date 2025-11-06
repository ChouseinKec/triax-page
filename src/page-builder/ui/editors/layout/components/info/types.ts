// Types
import type { InfoPosition, InfoTitle, InfoSize, InfoID, InfoGrid } from '@/src/page-builder/core/editor/layout/types/info';

/**
 * Props for the LayoutInfo component.
 */
export type LayoutInfoProps = {
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
