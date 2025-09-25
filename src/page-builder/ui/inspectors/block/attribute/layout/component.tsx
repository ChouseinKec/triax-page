"use client";

import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Category from "@/src/page-builder/ui/inspectors/block/attribute/category/component";
import TabGroup from "@/src/shared/components/group/tab/component";

// Types
import type { BlockAttributesLayoutsProps, BlockAttributesLayoutProps } from "@/src/page-builder/ui/inspectors/block/types";

// Hooks
import { useGlobalLayout } from "@/src/page-builder/ui/inspectors/block/attribute/layout/hooks/global";
import { useSpecificLayout } from "@/src/page-builder/ui/inspectors/block/attribute/layout/hooks/specific";

/**
 * BlockAttributesLayouts Component
 * Renders the attribute editor layouts organized in tabs for better user experience.
 *
 * @returns The rendered layout with tabbed interface for attribute editing
 */
const BlockAttributesLayouts: React.FC<BlockAttributesLayoutsProps> = () => {
  
    // Fetch all layouts
    const allLayouts: BlockAttributesLayoutProps[] = [
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

export default memo(BlockAttributesLayouts);