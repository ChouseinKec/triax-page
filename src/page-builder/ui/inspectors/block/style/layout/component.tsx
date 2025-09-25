"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Category from "./category/component";
import TabGroup from "@/src/shared/components/group/tab/component";

// Types 
import type { BlockStylesLayoutProps, BlockStylesLayoutsProps } from "@/src/page-builder/ui/inspectors/block/types";

// Hooks
import { useDisplayLayout } from "./hooks/display";
import { useSizeLayout } from "./hooks/size";
import { useFontLayout } from "./hooks/font";
import { useBorderLayout } from "./hooks/border";
import { useEffectLayout } from "./hooks/effect";
import { useBackgroundLayout } from "./hooks/background";


/**
 * BlockStylesLayouts Component
 * Renders the style editor layouts organized in tabs for better user experience.
 *
 * @returns The rendered layout with tabbed interface for style editing
 */
const BlockStylesLayouts: React.FC<BlockStylesLayoutsProps> = () => {

    // Fetch all layouts
    const allLayouts: BlockStylesLayoutProps[] = [
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