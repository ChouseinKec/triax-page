"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "@/editors/block/components/attribute/property/styles.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Types
import type { AttributesEditorPropertyProps } from "@/editors/block/types/component";

// Constants
import { AttributeDefinitions } from "@/constants/block/attribute";

// Utilities
import { devRender, devLog } from "@/utilities/dev";

/**
 * AttributeEditorProperty Component
 * Renders the attribute editor property with label and input for better user experience.
 *
 * @param component - The component function to render the input
 * @param label - The label for the property
 * @param hidden - Whether the property is hidden
 * @param disabled - Whether the property is disabled
 * @param property - The HTML attribute key
 * @param styles - Additional styles
 * @returns The rendered property with input interface for attribute editing
 */
const AttributeEditorProperty: React.FC<AttributesEditorPropertyProps> = ({ component, label, hidden, disabled, property, styles }) => {
    if (!component || typeof component !== "function") return devRender.error("[AttributeEditorProperty] No component to render");
    if (!property || typeof property !== "string") devLog.warn("[AttributeEditorProperty] No property key provided");
    if (hidden) return null;

    const labelRef = useRef<HTMLLabelElement>(null);
    const propertyDef = property ? AttributeDefinitions[property] : undefined;
    const propertyName = propertyDef?.name ?? "N/A";
    const propertyDescription = propertyDef?.description ?? "N/A";

    return (
        <div
            className={CSS.AttributeEditorProperty}
            style={styles}
            data-label={label?.toLocaleLowerCase()}
            data-disabled={disabled}
        >
            {/* Render the label and float reveal if provided */}
            {label && (
                <div className={CSS.AttributeEditorProperty__Label}>
                    <span ref={labelRef} aria-label="Property Label">
                        {label}
                    </span>

                    <FloatReveal targetRef={labelRef} position="top">
                        <div className={CSS.AttributeEditorProperty__FloatTitle} aria-label="Property Name">
                            {propertyName}
                        </div>

                        <div className={CSS.AttributeEditorProperty__FloatDescription} aria-label="Property Description">
                            {propertyDescription}
                        </div>
                    </FloatReveal>
                </div>
            )}

            {/* Render the property input component */}
            <div className={CSS.AttributeEditorProperty__Value}>
                {component()}
            </div>
        </div>
    );
};

export default memo(AttributeEditorProperty);