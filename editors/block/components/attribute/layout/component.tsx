"use client";

import React, { memo } from "react";

// Styles
import CSS from "@/editors/block/components/attribute/layout/styles.module.scss";

// Components
import Category from "@/editors/block/components/attribute/category/component";
import TabGroup from "@/components/group/tab/component";

// Types
import type { AttributesEditorLayoutsProps, AttributesEditorLayoutProps } from "@/editors/block/types/component";
import type { TabGroupItemsProps } from "@/components/group/tab/type";

// Hooks
import { useGlobalLayout } from "@/editors/block/components/attribute/layout/hooks/global";
import { useSpecificLayout } from "@/editors/block/components/attribute/layout/hooks/specific";

/**
 * AttributeEditorLayouts Component
 * Renders the attribute editor layouts organized in tabs for better user experience.
 *
 * @returns The rendered layout with tabbed interface for attribute editing
 */
const AttributeEditorLayouts: React.FC<AttributesEditorLayoutsProps> = () => {
  
    // Fetch all layouts
    const allLayouts: AttributesEditorLayoutProps[] = [
        useGlobalLayout(),
        useSpecificLayout(),
    ];

    // Map the layouts to tab items
    const tabItems: TabGroupItemsProps[] = allLayouts.map((category, idx) => ({
        label: category.label,
        title: category.title,
        content: <Category key={idx} groups={category.groups} />,
    }));

    return (
        <div className={CSS.AttributeEditorLayouts}>
            <TabGroup items={tabItems} />
        </div>
    )
};

export default memo(AttributeEditorLayouts);