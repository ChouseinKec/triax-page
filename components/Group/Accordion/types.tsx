/**
 * Represents a single accordion item with a title and collapsible content.
 * 
 * @param {React.ReactElement} title - The clickable header element
 * @param {React.ReactElement} content - The content to show when expanded
 */
export type ACCORDION_ITEMS = {
    title: React.ReactElement;
    content: React.ReactElement;
};

/**
 * Represents a group of accordion items to be rendered together.
 * 
 * @param {ACCORDION_ITEMS[]} items - List of accordion items to display
 */
export type ACCORDION_GROUP = {
    items: ACCORDION_ITEMS[];
};
