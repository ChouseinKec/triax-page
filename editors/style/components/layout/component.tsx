import React, { ReactElement } from 'react';

// Components
import Category from '@/editors/style/components/category/component';
import AccordionGroup from '@/components/Group/Accordion/component';

// Types 
import { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useDisplayLayout } from '@/editors/style/components/layout/hooks/display';
import { useSizeLayout } from '@/editors/style/components/layout/hooks/size';
import { usePositionLayout } from '@/editors/style/components/layout/hooks/position';
import { useFontLayout } from '@/editors/style/components/layout/hooks/font';
import { useBackgroundLayout } from '@/editors/style/components/layout/hooks/background';
import { useEffectLayout } from '@/editors/style/components/layout/hooks/effect';

/**
 * Layout component renders various style categories (e.g., display, size, position, font, border) 
 * using an accordion layout for better user experience.
 *
 * @returns {ReactElement} The rendered layout with collapsible accordion items for style editing.
*/
const Layout: React.FC = ({ }): ReactElement => {
    const displayLayout = useDisplayLayout();
    const sizeLayout = useSizeLayout();
    const positionLayout = usePositionLayout();
    const fontLayout = useFontLayout();
    const backgroundLayout = useBackgroundLayout();
    // const effectLayout = useEffectLayout();

    const layouts: LayoutProps[] = [
        displayLayout,
        sizeLayout,
        positionLayout,
        fontLayout,
        backgroundLayout,
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