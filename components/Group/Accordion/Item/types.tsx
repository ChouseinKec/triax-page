/**
 * Type definition for an individual accordion item's props
 * 
 * @param {React.ReactElement} toggleElement - The clickable element that toggles the accordion (e.g., title or icon)
 * @param {React.ReactElement} contentElement - The content to display when the accordion item is expanded
 * @param {boolean} isSelected - Whether this item is currently selected (expanded)
 */
export type AccordionGroupProps_ITEM = {
    toggleElement: React.ReactElement;
    contentElement: React.ReactElement;
    isSelected: boolean;
};
