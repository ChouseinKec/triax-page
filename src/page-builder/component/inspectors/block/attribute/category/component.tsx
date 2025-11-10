"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Group from "@/src/page-builder/component/inspectors/block/attribute/group/component";

// Types
import { CategoryProps } from "./types";


/**
 * Category Component
 *
 * A container component that organizes attribute editing into logical categories within the page builder.
 * Renders multiple attribute groups with support for expandable sections and custom styling.
 * Acts as an intermediate layer in the attribute editor hierarchy for improved organization.
 *
 * @param  props - Component properties
 * @param  props.groups - Array of attribute group configurations to render
 * @returns Rendered category containing organized attribute property groups
 *
 * @note Each group can be individually configured for expandability and visibility
 */
const Category: React.FC<CategoryProps> = ({ groups }) => {
    return (
        <div className={CSS.Category}>
            {/* Render each group in the category */}
            {groups.map((group, index) => (
                <Group
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

Category.displayName = "Category";
export default memo(Category);