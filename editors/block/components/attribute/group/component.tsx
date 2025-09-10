"use client";

import { memo } from "react";

// Styles
import CSS from "@/editors/block/components/attribute/group/styles.module.scss";

// Components
import AttributeEditorProperty from "@/editors/block/components/attribute/property/component";
import DividerReveal from "@/components/reveal/divider/component";
import HorizontalDivider from "@/components/divider/horizontal/component";

// Types
import type { AttributesEditorGroupProps } from "@/editors/block/types/component";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * AttributeEditorGroup Component
 * Renders the attribute editor group organized in a grid for better user experience.
 *
 * @param properties - The properties to render in the group
 * @param hidden - Flag to determine if the group should be visible
 * @param isExpandable - Whether the group is expandable
 * @param dividerTitle - Title for the divider
 * @param styles - Additional styles for the group
 * @returns The rendered group with grid interface for attribute editing
 */
const AttributeEditorGroup: React.FC<AttributesEditorGroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (!properties || !Array.isArray(properties) || properties.length === 0) return devRender.error("[AttributeEditorGroup] No properties to render");
    if (hidden === true) return null;

    // Map properties to AttributeEditorProperty components
    const propertyInstances = properties.map((property, index) => (
        <AttributeEditorProperty
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.AttributeEditorGroup} style={styles}>
            {isExpandable ?
                <DividerReveal className="AttributeEditorGroup__Reveal" title={dividerTitle} contentStyles={styles}>
                    {propertyInstances}
                </DividerReveal>
                :
                <>
                    {dividerTitle !== undefined && <HorizontalDivider className="AttributeEditorGroup__Divider" title={dividerTitle} />}
                    {propertyInstances}
                </>
            }
        </div>
    );
};

export default memo(AttributeEditorGroup);