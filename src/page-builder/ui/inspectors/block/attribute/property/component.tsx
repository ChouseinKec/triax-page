"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import TooltipReveal from "@/src/shared/components/reveal/tooltip/component";

// Types
import type { BlockAttributesPropertyProps } from "@/src/page-builder/ui/inspectors/block/types";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/page-builder/core/block/attribute/constants";

// Utilities
import { devRender, devLog } from "@/src/shared/utilities/dev";

/**
 * BlockAttributesProperty Component
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
const BlockAttributesProperty: React.FC<BlockAttributesPropertyProps> = ({ component, label, hidden, disabled, property, styles }) => {
    if (!component || typeof component !== "function") return devRender.error("[BlockAttributesProperty] No component to render");
    if (!property || typeof property !== "string") devLog.warn("[BlockAttributesProperty] No property key provided");
    if (hidden) return null;

    const labelRef = useRef<HTMLLabelElement>(null);
    const propertyDef = property ? ATTRIBUTE_DEFINITIONS[property] : undefined;
    const propertyName = propertyDef?.name ?? "N/A";
    const propertyDescription = propertyDef?.description ?? "N/A";

    return (
        <div
            className={CSS.BlockAttributesProperty}
            style={styles}
            data-label={label?.toLocaleLowerCase()}
            data-disabled={disabled}
        >
            {/* Render the label and float reveal if provided */}
            {label && (
                <div className={CSS.BlockAttributesProperty__Label}>
                    <span ref={labelRef} aria-label="Property Label">
                        {label}
                    </span>

                    <TooltipReveal targetRef={labelRef} anchor="top">
                        <div className={CSS.BlockAttributesProperty__FloatTitle} aria-label="Property Name">
                            {propertyName}
                        </div>

                        <div className={CSS.BlockAttributesProperty__FloatDescription} aria-label="Property Description">
                            {propertyDescription}
                        </div>
                    </TooltipReveal>
                </div>
            )}

            {/* Render the property input component */}
            <div className={CSS.BlockAttributesProperty__Value}>
                {component()}
            </div>
        </div>
    );
};

export default memo(BlockAttributesProperty);