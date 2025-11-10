"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesProperty from "../property/component";
import DividerReveal from "@/src/shared/components/reveal/divider/component";
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Types
import type { GroupProps } from "./types";

/**
 * Group Component
 *
 * A flexible container for organizing CSS property editors with support for expandable sections.
 * Renders properties in a grid layout with optional dividers and dynamic styling through CSS variables.
 * Provides collapsible sections for complex property sets to improve interface organization.
 *
 * @param  props - Component properties
 * @param  props.properties - Array of property configurations to render
 * @param  props.hidden - Whether to completely hide this group
 * @param  props.isExpandable - Enables collapsible section with divider toggle
 * @param  props.dividerTitle - Title for the divider when expandable
 * @param  props.styles - Custom styles applied as CSS variables to content
 * @returns Rendered property group with optional expandable wrapper
 */
const Group: React.FC<GroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (hidden === true) return null;

    // Map properties to BlockStylesProperty components
    const propertyInstances = properties.map((property, index) => (
        <BlockStylesProperty
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.Group} style={styles}>
            {isExpandable ?
                <DividerReveal title={dividerTitle} >
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

export default memo(Group);