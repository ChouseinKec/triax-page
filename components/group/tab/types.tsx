/**
 * Represents a single accordion item with a title and collapsible content.
 */
export type TabGroupItemsProps = {
    label: string | React.ReactElement;
    title: string;
    content: React.ReactElement;
};

/**
 * Represents a group of tab items to be rendered together.
 */
export type TabGroupProps = {
    /** List of tab items to display */
    items: TabGroupItemsProps[];

    /** ARIA label for the tab group */
    ariaLabel?: string;
    
    /** Optional description for the tab group */
    ariaDescription?: string;
};
