import React, { memo, ReactElement, useCallback, useState, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Item from '@/components/group/accordion/item/component';

// Types
import { AccordionGroupProps } from '@/components/group/accordion/types';

/**
 * AccordionGroup Component
 * 
 * A controlled accordion component that manages collapsible content sections.
 * Implements single-item expansion pattern (only one item open at a time).
 * Provides accessible keyboard navigation and screen reader support.
 * 
 * @param {AccordionGroupProps} props - Component properties
 * @param {ACCORDION_ITEMS[]} props.items - Array of accordion item configurations
 * @returns {ReactElement} Memoized AccordionGroup component
 */
const AccordionGroup: React.FC<AccordionGroupProps> = ({ items }): ReactElement => {
    // Early return for empty items array
    if (!items || items.length === 0) {
        console.warn('AccordionGroup: No items provided');
        return (
            <div
                className={CSS.AccordionGroup}
                role="tablist"
                aria-label="Empty accordion group"
            />
        );
    }

    // State management for active accordion item
    // Default to first item (index 0) for consistent behavior
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    /**
     * Handles accordion item selection with validation
     * Toggles selection: click same item to close, different item to switch
     * 
     * @param {number} index - The accordion item index to select/toggle
     */
    const handleAccordionToggle = useCallback((index: number): void => {
        // Validate index is within bounds
        if (index < 0 || index >= items.length) {
            console.warn(`AccordionGroup: Invalid index ${index}, ignoring selection`);
            return;
        }

        // Toggle behavior: close if same item clicked, otherwise switch
        setSelectedIndex(prevIndex => prevIndex === index ? -1 : index);
    }, [items.length]);

    /**
     * Creates accessible button with proper ARIA attributes
     * 
     * @param {ReactElement} title - The title content to display in button
     * @param {number} index - Position of the item in the array
     * @returns {ReactElement} Accessible button element with click handler
     */
    const renderToggleButton = useCallback((title: ReactElement, index: number): ReactElement => {
        const isExpanded = index === selectedIndex;

        return (
            <button
                className={CSS.AccordionGroup_Button}
                onClick={() => handleAccordionToggle(index)}
                data-isopen={isExpanded}
                aria-expanded={isExpanded}
                id={`accordion-header-${index}`}
                aria-controls={`accordion-content-${index}`}
                type="button"
                role="tab"
                tabIndex={isExpanded ? 0 : -1}
            >
                {title}
            </button>
        );
    }, [selectedIndex, handleAccordionToggle]);

    /**
     * Creates accessible content panel with proper ARIA associations
     * 
     * @param {ReactElement} content - The content to display when expanded
     * @param {number} index - Position of the item in the array
     * @returns {ReactElement} Content container with accessibility attributes
     */
    const renderContentPanel = useCallback((content: ReactElement, index: number): ReactElement => {
        const isExpanded = index === selectedIndex;

        return (
            <div
                className={CSS.AccordionGroup_Content}
                id={`accordion-content-${index}`}
                aria-labelledby={`accordion-header-${index}`}
                role="tabpanel"
                aria-hidden={!isExpanded}
                tabIndex={isExpanded ? 0 : -1}
            >
                {content}
            </div>
        );
    }, [selectedIndex]);

    /**
     * Transforms items array into Item components with proper props
     * 
     * @returns {ReactElement[]} Array of Item components
     */
    const accordionItems = useMemo((): ReactElement[] => {
        return items.map((item, index) => {
            // Validate item structure
            if (!item || !item.title || !item.content) {
                console.warn(`AccordionGroup: Invalid item at index ${index}`);
                return null;
            }

            const isSelected = index === selectedIndex;

            return (
                <Item
                    key={`accordion-item-${index}`}
                    toggleElement={renderToggleButton(item.title, index)}
                    contentElement={renderContentPanel(item.content, index)}
                    isSelected={isSelected}
                />
            );
        }).filter(Boolean) as ReactElement[]; // Remove null items
    }, [items, selectedIndex, renderToggleButton, renderContentPanel]);

    return (
        <div
            className={CSS.AccordionGroup}
            role="tablist"
            aria-multiselectable="false"
            aria-label={`Accordion with ${items.length} sections`}
        >
            {accordionItems}
        </div>
    );
};

export default memo(AccordionGroup);