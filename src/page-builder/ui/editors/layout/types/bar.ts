// Types
import type { BarPosition, BarTitle, BarSize, BarID } from '@/src/page-builder/core/editor/layout/types/bar';

/**
 * Props for the LayoutBar component.
 */
export type LayoutBarProps = {
	/**
	 * Title of the LayoutBar, displayed in the header
	 */
	title: BarTitle;
	/**
	 * The position of the LayoutBar within the layout
	 */
	position: BarPosition;
	/**
	 * Size of the LayoutBar
	 */
	size: BarSize;

	/**
	 * ID of the bar to get actions for
	 */
	barID: BarID;
};
