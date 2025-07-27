import { ReactNode } from 'react';
/**
 * Represents a single tab item with a title and collapsible content.
 */
export type TabGroupItemsProps = {
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
export type TabGroupProps = {
	/** List of tab items to display */
	items: TabGroupItemsProps[];
};
