"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesGroup from "../group/component";

// Types
import { BlockStylesCategoryProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesCategory Component
 * Renders a list of style groups in a category layout for better user experience.
 *
 * @param groups - The groups to render in the category
 * @returns The rendered category with style groups
 */
const BlockStylesCategory: React.FC<BlockStylesCategoryProps> = ({ groups }) => {
    if (!groups || !Array.isArray(groups) || groups.length === 0) return devRender.error("[BlockStylesCategory] No groups to render");
    return (
        <div className={CSS.BlockStylesCategory}>
            {/* Render each group in the category */}
            {groups.map((group, index) => (
                <BlockStylesGroup
                    key={index}
                    properties={group.properties}
                    hidden={group.hidden}
                    isExpandable={group.isExpandable}
                    dividerTitle={group.dividerTitle}
                    styles={group.styles}
                />
            ))}
        </div>
    );
};

export default memo(BlockStylesCategory);