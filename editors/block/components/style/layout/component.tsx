"use client";

import React, { ReactElement, useMemo } from "react";

// Components
import Category from "./category/component";
import TabGroup from "@/components/group/tab/component";

// Types 
import { LayoutProps } from "./type";
import type { TabGroupItemsProps } from "@/components/group/tab/type";

// Hooks
import { useDisplayLayout } from "./hooks/display";
import { useSizeLayout } from "./hooks/size";
import { useFontLayout } from "./hooks/font";
import { useBorderLayout } from "./hooks/border";
import { useEffectLayout } from "./hooks/effect";
import { useBackgroundLayout } from "./hooks/background";

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