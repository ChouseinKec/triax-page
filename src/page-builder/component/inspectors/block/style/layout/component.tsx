"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Category from "./category/component";
import TabGroup from "@/src/shared/components/group/tab/component";

// Types 
import type { LayoutProps } from "./hooks/types";

// Hooks
import { useDisplayLayout } from "./hooks/display";
import { useSizeLayout } from "./hooks/size";
import { useFontLayout } from "./hooks/font";
import { useBorderLayout } from "./hooks/border";
import { useEffectLayout } from "./hooks/effect";
import { useBackgroundLayout } from "./hooks/background";

/**
 * BlockStylesLayouts Component
 *
 * A tabbed interface that organizes CSS property editing into logical categories for improved user experience.
 * Aggregates multiple style layout hooks (display, size, font, background, border, effects) into navigable tabs.
 * Each tab contains grouped property controls rendered through the Category component.
 *
 * @returns Rendered tabbed style editor with categorized property controls
 *
 * @note Uses custom hooks to generate layout configurations for each style category
 */
const BlockStylesLayouts: React.FC = () => {
    // Fetch all layouts
    const allLayouts: LayoutProps[] = [
        useDisplayLayout(),
        useSizeLayout(),
        useFontLayout(),
        useBackgroundLayout(),
        useBorderLayout(),
        useEffectLayout(),
    ]

    // Map the layouts to tab items
    const tabItems = allLayouts.map((category, idx) => ({
        label: category.label,
        title: category.title,
        content: <Category key={idx} groups={category.groups} />,
    }));

    return (
        <div className={CSS.BlockStylesLayouts}>
            <TabGroup items={tabItems} />
        </div>
    );
}

export default memo(BlockStylesLayouts);