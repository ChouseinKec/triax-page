"use client";

import React, { ReactElement, useMemo } from "react";

// Components
import Category from "./category/component";
import TabGroup from "@/components/group/tab/component";

// Types 
import { LayoutProps } from "./type";
import type { TabGroupItemsProps } from "@/components/group/tab/type";

// Hooks
import { useGlobalLayout } from "./hooks/global";


/**
 * Layout component renders various style categories (e.g., display, size, position, font, border) 
 * using an accordion layout for better user experience.
 *
 * @returns {ReactElement} The rendered layout with collapsible accordion items for style editing.
*/
const Layout: React.FC = ({ }): ReactElement => {
    const globalLayout = useGlobalLayout();

    const layouts: LayoutProps[] = [
        globalLayout,
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