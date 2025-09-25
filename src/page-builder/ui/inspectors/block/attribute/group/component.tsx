"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockAttributesProperty from "@/src/page-builder/ui/inspectors/block/attribute/property/component";
import DividerReveal from "@/src/shared/components/reveal/divider/component";
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Types
import type { BlockAttributesGroupProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockAttributesGroup Component
 * Renders the attribute editor group organized in a grid for better user experience.
 *
 * @param properties - The properties to render in the group
 * @param hidden - Flag to determine if the group should be visible
 * @param isExpandable - Whether the group is expandable
 * @param dividerTitle - Title for the divider
 * @param styles - Additional styles for the group
 * @returns The rendered group with grid interface for attribute editing
 */
const BlockAttributesGroup: React.FC<BlockAttributesGroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (!properties || !Array.isArray(properties) || properties.length === 0) return devRender.error("[BlockAttributesGroup] No properties to render");
    if (hidden === true) return null;

    // Map properties to BlockAttributesProperty components
    const propertyInstances = properties.map((property, index) => (
        <BlockAttributesProperty
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.BlockAttributesGroup} style={styles}>
            {isExpandable ?
                <DividerReveal className="BlockAttributesGroup__Reveal" title={dividerTitle} contentStyles={styles}>
                    {propertyInstances}
                </DividerReveal>
                :
                <>
                    {dividerTitle !== undefined && <HorizontalDivider className="BlockAttributesGroup__Divider" title={dividerTitle} />}
                    {propertyInstances}
                </>
            }
        </div>
    );
};

export default memo(BlockAttributesGroup);