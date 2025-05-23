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
import { useBackgroundLayout } from '@/editors/style/layout/hooks/background';
import { useEffectLayout } from '@/editors/style/layout/hooks/effect';

// Contexts
import { ToolbarProvider } from '@/contexts/ToolbarContext';

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
    const effectLayout = useEffectLayout();

    const layouts: STYLE_LAYOUT[] = [
        displayLayout,
        sizeLayout,
        positionLayout,
        fontLayout,
        backgroundLayout,
        effectLayout,
    ];

    const AccordionItems = layouts.map((category) => ({
        title: <span>{category.label}</span>,
        content: <Category key={category.label} groups={category.groups} />,
    }));

    return (
        <ToolbarProvider>
            <AccordionGroup items={AccordionItems} />
        </ToolbarProvider>
    );

};

export default Layout;