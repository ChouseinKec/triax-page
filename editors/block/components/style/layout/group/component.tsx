"use client";

import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import StylesEditorProperty from "../property/component";
import DividerReveal from "@/components/reveal/divider/component";
import HorizontalDivider from "@/components/divider/horizontal/component";

// Types
import type { StylesEditorGroupProps } from "@/editors/block/types";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * StylesEditorGroup Component
 * Renders a grid layout of properties within a style editor for better user experience.
 *
 * @param properties - The properties to render in the group
 * @param hidden - Flag to determine if the group should be visible
 * @param isExpandable - Whether the group should be expandable
 * @param dividerTitle - Title for the divider if applicable
 * @param styles - Custom styles for the group
 * @returns The rendered group with properties
 */
const StylesEditorGroup: React.FC<StylesEditorGroupProps> = ({ properties, hidden, isExpandable, dividerTitle, styles }) => {
    if (!properties || !Array.isArray(properties) || properties.length === 0) return devRender.error("[StylesEditorGroup] No properties to render");
    if (hidden === true) return <></>;

    // Map properties to StylesEditorProperty components
    const propertyInstances = properties.map((property, index) => (
        <StylesEditorProperty
            key={property.label || index}
            {...property}
        />
    ));

    return (
        <div className={CSS.StylesEditorGroup} style={styles}>
            {isExpandable ?
                <DividerReveal className="StylesEditorGroup__Reveal" title={dividerTitle} contentStyles={styles}>
                    {propertyInstances}
                </DividerReveal>
                :
                <>
                    {dividerTitle !== undefined && <HorizontalDivider className="StylesEditorGroup__Divider" title={dividerTitle} />}
                    {propertyInstances}
                </>
            }
        </div>
    );
};

export default memo(StylesEditorGroup);