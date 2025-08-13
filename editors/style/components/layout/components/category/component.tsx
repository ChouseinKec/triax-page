"use client";

import { memo, ReactElement } from "react";

// Components
import Group from "@/editors/style/components/layout/components/group/component";

// Types
import { CategoryProps } from "./type";


/**
 * Category component renders a list of groups in a category layout.
 * Each group represents a set of properties that define the layout structure.
 * 
 * @param {LayoutCategoryProps} props - The props for the Category component.
 * @param {LayoutGroup[]} props.groups - The groups to render in the category.
 * @returns {ReactElement} The rendered Category component.
 */
const Category: React.FC<CategoryProps> = ({ groups }): ReactElement => {
    return (
        <>
            {/* Map through the `groups` array and render a `Group` component for each group */}
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
        </>
    );
};

export default memo(Category);