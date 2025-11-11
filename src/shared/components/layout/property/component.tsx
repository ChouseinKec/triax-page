"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import TooltipReveal from "@/src/shared/components/reveal/tooltip/component";

// Types
import type { PropertyProps } from "./types";

/**
 * Property Component
 *
 * A generic property editor with enhanced UX features including tooltips and action buttons.
 * Displays property labels with informational tooltips and provides customizable action buttons.
 * Conditionally renders based on visibility settings.
 *
 * @param  props - Component properties
 * @param  props.component - Function that renders the property input component
 * @param  props.label - Display label for the property (can be null to hide)
 * @param  props.hidden - Whether to completely hide this property
 * @param  props.disabled - Whether the property controls are disabled
 * @param  props.styles - Custom CSS styles for the property container
 * @param  props.name - Name of the property for display
 * @param  props.description - Description of the property for tooltip
 * @param  props.actions - Function that renders action buttons
 * @returns Rendered property editor with label, tooltip, and action controls
 */
const Property: React.FC<PropertyProps> = ({
    content,
    label,
    hidden,
    disabled,
    styles,
    name,
    description,
    actions
}) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    if (hidden) return null;

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

                    <TooltipReveal className="Tooltip" targetRef={labelRef} anchor="top">
                        <div className={CSS.Title} aria-label="Property Name">
                            {name}
                        </div>

                        <div className={CSS.Description} aria-label="Property Description">
                            {description}
                        </div>

                        {/* Render action buttons */}
                        <div className={CSS.Actions} role="group" aria-label="Property Actions">
                            {actions()}
                        </div>

                    </TooltipReveal>
                </div>
            )}

            {/* Render the property input component */}
            <div className={CSS.Value}>
                {content()}
            </div>
        </div>
    );
};

Property.displayName = "Property";
export default memo(Property);
