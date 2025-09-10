"use client";
import React, { memo } from "react";

// Styles
import CSS from "@/editors/block/components/style/layout/styles.module.scss";

// Components
import Category from "./category/component";
import TabGroup from "@/components/group/tab/component";

// Types 
import type { StylesEditorLayoutProps, StylesEditorLayoutsProps } from "@/editors/block/types/component";
import type { TabGroupItemsProps } from "@/components/group/tab/type";

// Hooks
import { useDisplayLayout } from "./hooks/display";
import { useSizeLayout } from "./hooks/size";
import { useFontLayout } from "./hooks/font";
import { useBorderLayout } from "./hooks/border";
import { useEffectLayout } from "./hooks/effect";
import { useBackgroundLayout } from "./hooks/background";


/**
 * StylesEditorLayouts Component
 * Renders the style editor layouts organized in tabs for better user experience.
 *
 * @returns The rendered layout with tabbed interface for style editing
 */
const StylesEditorLayouts: React.FC<StylesEditorLayoutsProps> = () => {

    // Fetch all layouts
    const allLayouts: StylesEditorLayoutProps[] = [
        useDisplayLayout(),
        useSizeLayout(),
        useFontLayout(),
        useBackgroundLayout(),
        useBorderLayout(),
        useEffectLayout(),
    ]

    // Map the layouts to tab items
    const tabItems: TabGroupItemsProps[] = allLayouts.map((category, idx) => ({
        label: <>{category.label}</>,
        title: category.title,
        content: <Category key={idx} groups={category.groups} />,
    }));

    return (
        <div className={CSS.StylesEditorLayouts}>
            <TabGroup items={tabItems} />
        </div>
    );
}

export default memo(StylesEditorLayouts);