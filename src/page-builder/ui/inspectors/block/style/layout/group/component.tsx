"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesProperty from "../property/component";
import DividerReveal from "@/src/shared/components/reveal/divider/component";
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Types
import type { BlockStylesGroupProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesGroup Component
 * Renders a grid layout of properties within a style editor for better user experience.
 *
 * @param properties - The properties to render in the group
 * @param hidden - Flag to determine if the group should be visible
 * @param isExpandable - Whether the group should be expandable
 * @param dividerTitle - Title for the divider if applicable
 * @param styles - Custom styles for the group
 * @returns The rendered group with properties
 */
const BlockStylesGroup: React.FC<BlockStylesGroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (!properties || !Array.isArray(properties) || properties.length === 0) return devRender.error("[BlockStylesGroup] No properties to render");
    if (hidden === true) return <></>;

    // Map properties to BlockStylesProperty components
    const propertyInstances = properties.map((property, index) => (
        <BlockStylesProperty
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.BlockStylesGroup} style={styles}>
            {isExpandable ?
                <DividerReveal className="BlockStylesGroup__Reveal" title={dividerTitle} contentStyles={styles}>
                    {propertyInstances}
                </DividerReveal>
                :
                <>
                    {dividerTitle !== undefined && <HorizontalDivider className="BlockStylesGroup__Divider" title={dividerTitle} />}
                    {propertyInstances}
                </>
            }
        </div>
    );
};

export default memo(BlockStylesGroup);