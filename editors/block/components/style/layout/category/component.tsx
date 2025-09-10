"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import StylesEditorGroup from "../group/component";

// Types
import { StylesEditorCategoryProps } from "@/editors/block/types/component";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * StylesEditorCategory Component
 * Renders a list of style groups in a category layout for better user experience.
 *
 * @param groups - The groups to render in the category
 * @returns The rendered category with style groups
 */
const StylesEditorCategory: React.FC<StylesEditorCategoryProps> = ({ groups }) => {
    if (!groups || !Array.isArray(groups) || groups.length === 0) return devRender.error("[StylesEditorCategory] No groups to render");

    return (
        <div className={CSS.StylesEditorCategory}>
            {/* Render each group in the category */}
            {groups.map((group, index) => (
                <StylesEditorGroup
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

export default memo(StylesEditorCategory);