"use client";

import React, { ReactElement, useMemo } from "react";

// Components
import Category from "@/editors/style/components/category/component";
import TabGroup from "@/components/group/tab/component";

// Types 
import { LayoutProps } from "@/editors/style/components/layout/types";
import type { TabGroupItemsProps } from "@/components/group/tab/types";

// Hooks
import { useDisplayLayout } from "@/editors/style/components/layout/hooks/display";
import { useSizeLayout } from "@/editors/style/components/layout/hooks/size";
import { useFontLayout } from "@/editors/style/components/layout/hooks/font";
import { useBorderLayout } from "@/editors/style/components/layout/hooks/border";
import { useEffectLayout } from "@/editors/style/components/layout/hooks/effect";
import { useBackgroundLayout } from "@/editors/style/components/layout/hooks/background";

/**
 * Layout component renders various style categories (e.g., display, size, position, font, border) 
 * using an accordion layout for better user experience.
 *
 * @returns {ReactElement} The rendered layout with collapsible accordion items for style editing.
*/
const Layout: React.FC = ({ }): ReactElement => {
    const displayLayout = useDisplayLayout();
    const sizeLayout = useSizeLayout();
    const fontLayout = useFontLayout();
    const backgroundLayout = useBackgroundLayout();
    const borderLayout = useBorderLayout();
    const effectLayout = useEffectLayout();

    const layouts: LayoutProps[] = [
        displayLayout,
        sizeLayout,
        fontLayout,
        backgroundLayout,
        borderLayout,
        effectLayout,
    ];

    const TabItems: TabGroupItemsProps[] = useMemo(() =>
        layouts.map((category, idx) => ({
            label: <>{category.label}</>,
            title: category.title,
            content: <Category key={idx} groups={category.groups} />,
        }))
        , [layouts]);

    return (
        <TabGroup items={TabItems} />
    );

};

export default Layout;