"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import TooltipReveal from "@/src/shared/components/reveal/tooltip/component";

// Types
import type { PropertyProps } from "./types";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/page-builder/core/block/attribute/constants";

/**
 * Property Component
 *
 * An individual HTML attribute editor with tooltip information and conditional rendering.
 * Displays attribute labels with informational tooltips and provides controlled input components.
 * Supports visibility and disabled states for flexible attribute management.
 *
 * @param  props - Component properties
 * @param  props.component - Function that renders the attribute input component
 * @param  props.label - Display label for the attribute (can be null to hide)
 * @param  props.hidden - Whether to completely hide this attribute
 * @param  props.disabled - Whether the attribute controls are disabled
 * @param  props.property - HTML attribute key for tooltip information
 * @param  props.styles - Custom CSS styles for the attribute container
 * @returns Rendered attribute editor with label, tooltip, and input control
 *
 * @note Tooltip displays attribute name and description from definitions
 */
const Property: React.FC<PropertyProps> = ({ component, label, hidden, disabled, property, styles }) => {
    if (hidden) return null;

    const labelRef = useRef<HTMLLabelElement>(null);
    const propertyDef = property ? ATTRIBUTE_DEFINITIONS[property] : undefined;
    const propertyName = propertyDef?.name ?? "N/A";
    const propertyDescription = propertyDef?.description ?? "N/A";

    return (
        <div
            className={CSS.Property}
            style={styles}
            data-label={label?.toLocaleLowerCase()}
            data-disabled={disabled}
        >
            {/* Render the label and float reveal if provided */}
            {label && (
                <div className={CSS.Label}>
                    <span ref={labelRef} aria-label="Property Label">
                        {label}
                    </span>

                    <TooltipReveal targetRef={labelRef} anchor="top">
                        <div className={CSS.FloatTitle} aria-label="Property Name">
                            {propertyName}
                        </div>

                        <div className={CSS.FloatDescription} aria-label="Property Description">
                            {propertyDescription}
                        </div>
                    </TooltipReveal>
                </div>
            )}

            {/* Render the property input component */}
            <div className={CSS.Value}>
                {component()}
            </div>
        </div>
    );
};

Property.displayName = "Property";
export default memo(Property);