
import React, { memo, ReactElement, useCallback, useState } from 'react';

// Style
import CSS from '@/components/Group/Accordion/styles.module.css';

// Component
import Item from '@/components/group/accordion/Item/component';

// Type
import { ACCORDION_GROUP } from '@/components/group/accordion/types';

/**
 * AccordionGroup Component
 * 
 * A compound component that manages a collection of collapsible accordion items.
 * Only one item can be expanded at a time (accordion behavior).
 * 
 * @component
 * @param {ACCORDION_GROUP} props - Component props
 * @param {ACCORDION_ITEMS[]} props.items - Array of accordion items with title/content pairs
 * @returns {ReactElement} - Returns a memoized accordion group component
 */
const AccordionGroup: React.FC<ACCORDION_GROUP> = ({ items }): ReactElement => {
    const [selected, setSelected] = useState<number>(0);

    /**
     * Renders the clickable toggle button for each accordion item
     * @param {ReactElement} title - The title content to display
     * @param {number} index - Position of the item in the array
     * @returns {ReactElement} - Button element with click handler
     */
    const renderToggleElement = useCallback((title: ReactElement, index: number, selected: number): ReactElement => {
        return (
            <button
                className={CSS.AccordionGroup_Button}
                onClick={() => setSelected(index)}
                data-isopen={index === selected}
                aria-expanded={index === selected}

                id={`accordion-header-${index}`}
                aria-controls={`accordion-content-${index}`}
            >
                {title}
            </button>
        );
    }, []
    );

    /**
     * Renders the collapsible content section for each item
     * @param {ReactElement} content - The content to display when expanded
     * @returns {ReactElement} - Content container div
     */
    const renderContentElement = useCallback((content: ReactElement, index: number): ReactElement => {
        return (
            <div
                className={CSS.AccordionGroup_Content}
                id={`accordion-content-${index}`}
                aria-labelledby={`accordion-header-${index}`}
            >
                {content}
            </div>
        );
    }, []
    );

    return (
        <div
            className={CSS.AccordionGroup}
            role="tablist"
            aria-multiselectable="false"
        >
            {items.map((item, index) => (
                <Item
                    key={index}
                    toggleElement={renderToggleElement(item.title, index, selected)}
                    contentElement={renderContentElement(item.content, index)}
                    isSelected={index === selected}
                />
            ))}
        </div>
    );
};

export default memo(AccordionGroup);