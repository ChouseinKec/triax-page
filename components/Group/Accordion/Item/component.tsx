import React, { memo, ReactElement } from 'react';

// Styles 
import CSS from '@/components/Group/Accordion/Item/styles.module.css';

// Type 
import { ACCORDION_GROUP_ITEM } from '@/components/group/accordion/Item/types';

/**
 * AccordionItem Component
 * 
 * A single collapsible item within an Accordion group. Manages the rendering of
 * the toggle header and conditionally displays its content based on selection state.
 * 
 * @component
 * @param {ACCORDION_GROUP_ITEM} props - Component props
 * @param {React.ReactElement} props.toggleElement - Clickable header element
 * @param {React.ReactElement} props.contentElement - Expandable content section
 * @param {boolean} props.isSelected - Controls content visibility
 * @returns {ReactElement} A collapsible accordion item
 * 
 * @example
 * <Item
 *   toggleElement={<button>Section 1</button>}
 *   contentElement={<div>Content</div>}
 *   isSelected={true}
 * />
 */
const Item: React.FC<ACCORDION_GROUP_ITEM> = ({ toggleElement, contentElement, isSelected }: ACCORDION_GROUP_ITEM): ReactElement => {
    return (
        <div
            className={CSS.AccordionGroup_Item}
            aria-expanded={isSelected}
        >
            {toggleElement}
            {isSelected && contentElement}
        </div>
    );
}

export default memo(Item);
