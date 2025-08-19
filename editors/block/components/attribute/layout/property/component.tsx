"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Types
import type { PropertyProps } from "./type";

// Constants
import { HTMLPropertyDefinitions } from "@/constants/block/attribute";

/**
 * Property component represents an individual style input field within a group.
 * It includes a label, description, and actions for user interaction.
 * 
 * @param {PropertyProps} props - The props for the Property component.
 * @returns {ReactElement} The rendered Property component.
 */
const Property: React.FC<PropertyProps> = memo((props: PropertyProps) => {
    const {
        component,
        label = null,
        hidden = false,
        disabled = false,
        property,
        styles = {},
    } = props;

    // Hide the property if `hidden` is true
    if (hidden) return null;

    const labelRef = useRef<HTMLLabelElement>(null);

    const propertyDef = property ? HTMLPropertyDefinitions[property] : undefined;
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
                    <FloatReveal targetRef={labelRef} position="top">
                        <div className={CSS.FloatTitle} aria-label="Property Name">
                            {propertyName}
                        </div>
                        <div className={CSS.FloatDescription} aria-label="Property Description">
                            {propertyDescription}
                        </div>
                    </FloatReveal>
                </div>
            )}
            {/* Render the property input component */}
            <div className={CSS.Value}>
                {component()}
            </div>
        </div>
    );
});

export default Property;