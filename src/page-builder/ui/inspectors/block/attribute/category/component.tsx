"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockAttributesGroup from "@/src/page-builder/ui/inspectors/block/attribute/group/component";

// Types
import { BlockAttributesCategoryProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockAttributesCategory Component
 * Renders the attribute editor category organized in groups for better user experience.
 *
 * @param groups - The groups to render in the category
 * @returns The rendered layout with grouped interface for attribute editing
 */
const BlockAttributesCategory: React.FC<BlockAttributesCategoryProps> = ({ groups }) => {
    if (!groups || !Array.isArray(groups) || groups.length === 0) return devRender.error("[BlockAttributesCategory] No groups to render");

    return (
        <div className={CSS.BlockAttributesCategory}>
            {/* Render each group in the category */}
            {groups.map((group, index) => (
                <BlockAttributesGroup
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

export default memo(BlockAttributesCategory);