"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Group from "../group/component";

// Types
import { CategoryProps } from "./types";

/**
 * Category Component
 *
 * A container component that organizes and renders multiple style groups within a category.
 * Provides structured layout for related CSS properties, supporting expandable sections and custom styling.
 * Acts as an intermediate layer between tabbed layouts and individual property groups.
 *
 * @param  props - Component properties
 * @param  props.groups - Array of style group configurations to render
 * @returns Rendered category containing organized style property groups
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