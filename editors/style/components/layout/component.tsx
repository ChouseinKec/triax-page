import React, { ReactElement } from 'react';

// Components
import Category from '@/editors/style/components/category/component';
import AccordionGroup from '@/components/Group/Accordion/component';

// Types 
import { STYLE_LAYOUT } from '@/editors/style/components/layout/types';

// Hooks
import { useDisplayLayout } from '@/editors/style/hooks/display';
import { useSizeLayout } from '@/editors/style/hooks/size';
import { usePositionLayout } from '@/editors/style/hooks/position';
import { useFontLayout } from '@/editors/style/hooks/font';
import { useBackgroundLayout } from '@/editors/style/hooks/background';
import { useEffectLayout } from '@/editors/style/hooks/effect';

/**
 * Layout component renders various style categories (e.g., display, size, position, font, border) 
 * using an accordion layout for better user experience.
 *
 * @returns {ReactElement} The rendered layout with collapsible accordion items for style editing.
*/
const Layout: React.FC = ({ }): ReactElement => {
    // const displayLayout = useDisplayLayout();
    const sizeLayout = useSizeLayout();
    // const positionLayout = usePositionLayout();
    // const fontLayout = useFontLayout();
    // const backgroundLayout = useBackgroundLayout();
    // const effectLayout = useEffectLayout();

    const layouts: STYLE_LAYOUT[] = [
        // displayLayout,
        sizeLayout,
        // positionLayout,
        // fontLayout,
        // backgroundLayout,
        // effectLayout,
    ];

    const AccordionItems = layouts.map((category) => ({
        title: <span>{category.label}</span>,
        content: <Category key={category.label} groups={category.groups} />,
    }));

    return (
        <AccordionGroup items={AccordionItems} />
    );

};

export default Layout;