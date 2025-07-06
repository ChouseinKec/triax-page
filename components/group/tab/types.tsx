/**
 * Represents a single accordion item with a title and collapsible content.
 * 
 * @param {React.ReactElement} title - The clickable header element
 * @param {React.ReactElement} content - The content to show when expanded
 */
export type TabGroupItemsProps = {
    title: string | React.ReactElement;
    content: React.ReactElement;
};

/**
 * Represents a group of tab items to be rendered together.
 * 
 * @param {TabGroupItemsProps[]} items - List of tab items to display
 */
export type TabGroupProps = {
    items: TabGroupItemsProps[];
};
