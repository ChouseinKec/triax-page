import React, { ReactElement } from 'react';

// Components
import Category from '@/editors/style/layout/components/category/component';
import AccordionGroup from '@/components/Group/Accordion/component';

// Types 
import { STYLE_LAYOUT } from '@/editors/style/layout/types';

// Hooks
import { useDisplayLayout } from '@/editors/style/layout/hooks/display';
import { useSizeLayout } from '@/editors/style/layout/hooks/size';
import { usePositionLayout } from '@/editors/style/layout/hooks/position';
import { useFontLayout } from '@/editors/style/layout/hooks/font';
import { useBorderLayout } from '@/editors/style/layout/hooks/border';
import { useEffectLayout } from '@/editors/style/layout/hooks/effect';

/**
 * Layout component renders various style categories (e.g., display, size, position, font, border) 
 * using an accordion layout for better user experience.
 *
 * @returns {ReactElement} The rendered layout with collapsible accordion items for style editing.
*/
const Layout: React.FC = ({ }): ReactElement => {

    // Use hooks to fetch layout configurations for different style categories.
    const styles: STYLE_LAYOUT[] = [
        useDisplayLayout(),
        useSizeLayout(),
        usePositionLayout(),
        useFontLayout(),
        useBorderLayout(),
        useEffectLayout(),
    ];


    // Map through each style category to create accordion items.
    const AccordionItems = styles.map((category, index) => ({
        title: <span>{category.label}</span>, // Title for the accordion item
        content: (
            <Category key={index} groups={category.groups} /> // Renders the Category component with style groups
        ),
    }));

    return <AccordionGroup items={AccordionItems} />


};

export default Layout;