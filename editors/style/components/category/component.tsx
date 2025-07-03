import { memo, ReactElement } from 'react';

// Components
import Group from '@/editors/style/components/group/component';

// Types
import { LAYOUT_CATEGORY } from '@/editors/style/components/category/type';


/**
 * Category component renders a list of groups in a category layout.
 * Each group represents a set of properties that define the layout structure.
 * 
 * @param {LAYOUT_CATEGORY} props - The props for the Category component.
 * @param {LayoutGroup[]} props.groups - The groups to render in the category.
 * @returns {ReactElement} The rendered Category component.
 */
const Category: React.FC<LAYOUT_CATEGORY> = ({ groups }): ReactElement => {
    return (
        <>
            {/* Map through the `groups` array and render a `Group` component for each group */}
            {groups.map((group, index) => (
                <Group
                    key={index}
                    properties={group.properties}
                    columns={group.columns}
                    rows={group.rows}
                    hidden={group.hidden}
                    isExpandable={group.isExpandable}
                    expandTitle={group.expandTitle}
                />
            ))}
        </>
    );
};

export default memo(Category);