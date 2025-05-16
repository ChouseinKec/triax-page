import { memo, ReactElement } from 'react';

// Components
import Group from '@/editors/style/layout/components/group/component';

// Types
import { STYLE_LAYOUT_CATEGORY } from '@/editors/style/layout/components/category/type';


/**
 * Category component renders a list of groups in a category layout.
 * Each group represents a set of properties that define the layout structure.
 * 
 * @param {STYLE_LAYOUT_CATEGORY} props - The props for the Category component.
 * @param {STYLE_LAYOUT_GROUP[]} props.groups - The groups to render in the category.
 * @returns {ReactElement} The rendered Category component.
 */
const Category: React.FC<STYLE_LAYOUT_CATEGORY> = ({ groups }): ReactElement => {
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
                />
            ))}
        </>
    );
};

export default memo(Category);