import React, { ReactElement } from 'react';

// Components
import Category from '@/editors/style/components/category/component';
import AccordionGroup from '@/components/group/accordion/component';
import TabGroup from '@/components/group/tab/component';

// Types 
import { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useDisplayLayout } from '@/editors/style/components/layout/hooks/display';
import { useSizeLayout } from '@/editors/style/components/layout/hooks/size';
import { usePositionLayout } from '@/editors/style/components/layout/hooks/position';
import { useFontLayout } from '@/editors/style/components/layout/hooks/font';
import { useBorderLayout } from '@/editors/style/components/layout/hooks/border';
import { useEffectLayout } from '@/editors/style/components/layout/hooks/effect';
import { useBackgroundLayout } from '@/editors/style/components/layout/hooks/background';

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
    const borderLayout = useBorderLayout();
    const effectLayout = useEffectLayout();

    const layouts: LayoutProps[] = [
        displayLayout,
        sizeLayout,
        positionLayout,
        fontLayout,
        backgroundLayout,
        borderLayout,
        effectLayout,
    ];

    const AccordionItems = layouts.map((category,idx) => ({
        title: <>{category.label}</>,
        content: <Category key={idx} groups={category.groups} />,
    }));

    return (
        <TabGroup items={AccordionItems} />
    );

};

export default Layout;