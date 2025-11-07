"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import TooltipReveal from "@/src/shared/components/reveal/tooltip/component";

// Types
import type { PropertyProps } from "./types";

// Constants
import { STYLE_DEFINITIONS } from "@/src/page-builder/core/block/style/constants";

// Hooks
import { copyBlockStyle, pasteBlockStyle, resetBlockStyle } from "@/src/page-builder/services/managers/block/commands";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

/**
 * Property Component
 *
 * An individual CSS property editor with enhanced UX features including tooltips and action buttons.
 * Displays property labels with informational tooltips and provides copy/paste/reset functionality.
 * Conditionally renders based on visibility settings and integrates with block style management.
 *
 * @param  props - Component properties
 * @param  props.component - Function that renders the property input component
 * @param  props.label - Display label for the property (can be null to hide)
 * @param  props.hidden - Whether to completely hide this property
 * @param  props.disabled - Whether the property controls are disabled
 * @param  props.property - CSS property key for style management operations
 * @param  props.styles - Custom CSS styles for the property container
 * @returns Rendered property editor with label, tooltip, and action controls
 */
const Property: React.FC<PropertyProps> = ({ component, label, hidden, disabled, property, styles }) => {
    // Always call hooks in the same order
    const selectedBlockID = useSelectedBlockID();
    const labelRef = useRef<HTMLLabelElement>(null);

    const propertyDef = property ? STYLE_DEFINITIONS[property] : undefined;
    const propertyName = propertyDef?.name ?? "N/A";
    const propertyDescription = propertyDef?.description ?? "N/A";

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
                            {propertyName}
                        </div>

                        <div className={CSS.Description} aria-label="Property Description">
                            {propertyDescription}
                        </div>

                        {/* Render action buttons if property and block are selected */}
                        {property && selectedBlockID &&
                            <div className={CSS.Actions} id={`${property}-tools`} role="group" aria-label="Property Actions">
                                <button title="Copy Property" onClick={() => copyBlockStyle(selectedBlockID, property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                                </button>
                                <button title="Paste Property" onClick={() => pasteBlockStyle(selectedBlockID, property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" /></svg>
                                </button>
                                <button title="Reset Property" onClick={() => resetBlockStyle(selectedBlockID, property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="m840-234-80-80v-446h-80v120H434L234-840h133q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v526ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm166 560L200-646v446h446Zm-446 80q-33 0-56.5-23.5T120-200v-526l-65-65 57-57 736 736-57 57-65-65H200Z" /></svg>
                                </button>
                            </div>
                        }

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