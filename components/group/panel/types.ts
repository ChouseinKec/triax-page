import { ReactNode } from 'react';
/**
 * Represents a single tab item with a title and collapsible content.
 */
export type PanelGroupItemsProps = {
	/** The label for the tab, displayed in the tab header */
	label: string | ReactNode;

	/** The title of the tab, displayed in the tab header */
	title: string;

	/** The content to display within the tab */
	content: ReactNode;
};

/**
 * Represents a group of tab items to be rendered together.
 */
export type PanelGroupProps = {
	/** List of tab items to display */
	items: PanelGroupItemsProps[];

	/** The position of the tab controls */
	tabPosition?: 'right' | 'left';
};
