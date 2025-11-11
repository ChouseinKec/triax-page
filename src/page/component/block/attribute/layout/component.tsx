"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Category from "@/src/page/component/block/attribute/category/component";
import TabGroup from "@/src/shared/components/group/tab/component";

// Types
import type { LayoutProps } from "./hooks/types";

// Hooks
import { useGlobalLayout } from "@/src/page/component/block/attribute/layout/hooks/global";
import { useSpecificLayout } from "@/src/page/component/block/attribute/layout/hooks/specific";

/**
 * BlockAttributesLayouts Component
 *
 * A tabbed interface that organizes HTML attribute editing into logical categories for the page builder.
 * Aggregates global and block-specific attribute layouts into navigable tabs using custom hooks.
 * Each tab contains categorized attribute controls rendered through the Category component.
 *
 * @returns Rendered tabbed attribute editor with categorized property controls
 *
 * @note Uses custom hooks to generate layout configurations for global and specific attributes
 */
const BlockAttributesLayouts: React.FC = () => {

    // Fetch all layouts
    const allLayouts: LayoutProps[] = [
        useGlobalLayout(),
        useSpecificLayout(),
    ];

    // Map the layouts to tab items
    const tabItems = allLayouts.map((category, idx) => ({
        label: category.label,
        title: category.title,
        content: <Category key={idx} groups={category.groups} />,
    }));

    return (
        <div className={CSS.BlockAttributesLayouts}>
            <TabGroup items={tabItems} />
        </div>
    )
};

BlockAttributesLayouts.displayName = "BlockAttributesLayouts";
export default memo(BlockAttributesLayouts);