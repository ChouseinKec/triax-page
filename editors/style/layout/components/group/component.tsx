import { memo, ReactElement } from 'react';

// Styles
import CSS from '@/editors/style/layout/components/group/styles.module.css';

// Components
import Property from '@/editors/style/layout/components/property/components';

// Types
import { STYLE_LAYOUT_GROUP } from '@/editors/style/layout/components/group/types';

/**
 * Group component renders a grid layout of properties within a style editor.
 * Each property is rendered as a separate component within the grid structure.
 * 
 * @param {STYLE_LAYOUT_GROUP} props - The props for the Group component.
 * @param {STYLE_PROPERTY[]} props.properties - The properties to render in the group.
 * @param {string} [props.columns='1fr 1fr'] - The grid column layout.
 * @param {string} [props.rows='auto'] - The grid row layout.
 * @param {boolean} [props.hidden] - Flag to determine if the group should be visible.
 * @returns {ReactElement} The rendered Group component.
*/
const Group: React.FC<STYLE_LAYOUT_GROUP> = ({ properties, columns = '1fr 1fr', rows = 'auto', hidden }: STYLE_LAYOUT_GROUP): ReactElement => {
    // If the `hidden` prop is explicitly set to `false`, return nothing (hide the group)
    if (hidden === true) return <></>;

    // Define the CSS styles for the grid layout using CSS variables
    const _style: React.CSSProperties = {
        ['--group-columns' as string]: columns,
        ['--group-rows' as string]: rows,
    };

    return (
        <div className={CSS.group} style={_style}>

            {/* Map through the `properties` array and render a `Property` component for each property */}
            {properties.map((property, index) => (
                <Property
                    key={index}
                    {...property} // Spread all property attributes (e.g., label, column, component, etc.)
                />
            ))}

        </div>
    );
};

export default memo(Group);