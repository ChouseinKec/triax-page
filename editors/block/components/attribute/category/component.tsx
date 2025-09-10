"use client";

import { memo } from "react";

// Styles
import CSS from "@/editors/block/components/attribute/category/styles.module.scss";

// Components
import AttributesEditorGroup from "@/editors/block/components/attribute/group/component";

// Types
import { AttributesEditorCategoryProps } from "@/editors/block/types/component";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * AttributeEditorCategory Component
 * Renders the attribute editor category organized in groups for better user experience.
 *
 * @param groups - The groups to render in the category
 * @returns The rendered layout with grouped interface for attribute editing
 */
const AttributeEditorCategory: React.FC<AttributesEditorCategoryProps> = ({ groups }) => {
    if (!groups || !Array.isArray(groups) || groups.length === 0) return devRender.error("[AttributeEditorCategory] No groups to render");

    return (
        <div className={CSS.AttributeEditorCategory}>
            {/* Render each group in the category */}
            {groups.map((group, index) => (
                <AttributesEditorGroup
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

export default memo(AttributeEditorCategory);