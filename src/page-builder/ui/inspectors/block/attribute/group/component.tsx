"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Property from "@/src/page-builder/ui/inspectors/block/attribute/property/component";
import DividerReveal from "@/src/shared/components/reveal/divider/component";
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Types
import type { GroupProps } from "./types";

/**
 * Group Component
 *
 * A container for organizing related HTML attribute properties with support for expandable sections.
 * Renders properties in a structured layout with optional dividers and collapsible functionality.
 * Provides visual organization for complex attribute sets in the block inspector.
 *
 * @param  props - Component properties
 * @param  props.properties - Array of property configurations to render
 * @param  props.hidden - Whether to completely hide this group
 * @param  props.isExpandable - Enables collapsible section with divider toggle
 * @param  props.dividerTitle - Title for the divider when expandable
 * @param  props.styles - Custom styles for the group container
 * @returns Rendered attribute group with optional expandable wrapper
 *
 */
const Group: React.FC<GroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (hidden === true) return null;

    // Map properties to Property components
    const propertyInstances = properties.map((property, index) => (
        <Property
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.Group} style={styles}>
            {isExpandable ?
                <DividerReveal title={dividerTitle}>
                    <div className={CSS.Content} style={styles}>
                        {propertyInstances}
                    </div>
                </DividerReveal>
                :
                <>
                    {dividerTitle !== undefined && <HorizontalDivider title={dividerTitle} />}
                    {propertyInstances}
                </>
            }
        </div>
    );
};

Group.displayName = "Group";
export default memo(Group);