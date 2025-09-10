"use client";

import { memo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Types
import type { StylesEditorPropertyProps } from "@/editors/block/types/component";

// Constants
import { StyleDefinitions } from "@/constants/style/style";

// Hooks
import { copyStyle, pasteStyle, resetStyle } from "@/editors/block/managers/style";

// Managers
import { useSelectedBlockID } from "@/editors/block/managers/block";

// Utilities
import { devRender, devLog } from "@/utilities/dev";

/**
 * StylesEditorProperty Component
 * Represents an individual style input field within a group for better user experience.
 *
 * @param component - The input component function to render
 * @param label - The label for the property
 * @param hidden - Whether the property should be hidden
 * @param disabled - Whether the property should be disabled
 * @param property - The property key
 * @param styles - Custom styles for the property
 * @returns The rendered property with label and input
 */
const StylesEditorProperty: React.FC<StylesEditorPropertyProps> = ({ component, label, hidden, disabled, property, styles }) => {
    if (!component || typeof component !== "function") return devRender.error("[StylesEditorProperty] No component to render");
    if (!property || typeof property !== "string") devLog.warn("[StylesEditorProperty] No property key provided");
    if (hidden) return null;
    
    const selectedBlockID = useSelectedBlockID();
    const labelRef = useRef<HTMLLabelElement>(null);
    const propertyDef = property ? StyleDefinitions[property] : undefined;
    const propertyName = propertyDef?.name ?? "N/A";
    const propertyDescription = propertyDef?.description ?? "N/A";

    return (
        <div
            className={CSS.StylesEditorProperty}
            style={styles}
            data-label={label?.toLocaleLowerCase()}
            data-disabled={disabled}
        >
            {/* Render the label and float reveal if provided */}
            {label && (
                <div className={CSS.StylesEditorProperty__Label}>
                    <span ref={labelRef} aria-label="Property Label">
                        {label}
                    </span>

                    <FloatReveal targetRef={labelRef} position="top">
                        <div className={CSS.StylesEditorProperty__FloatTitle} aria-label="Property Name">
                            {propertyName}
                        </div>

                        <div className={CSS.StylesEditorProperty__FloatDescription} aria-label="Property Description">
                            {propertyDescription}
                        </div>

                        {/* Render action buttons if property and block are selected */}
                        {property && selectedBlockID &&
                            <div className={CSS.StylesEditorProperty__FloatActions} id={`${property}-tools`} role="group" aria-label="Property Actions">
                                <button title="Copy Property" onClick={() => copyStyle(selectedBlockID, property)}>
                                    {/* Copy Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                                </button>
                                <button title="Paste Property" onClick={() => pasteStyle(selectedBlockID, property)}>
                                    {/* Paste Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" /></svg>
                                </button>
                                <button title="Reset Property" onClick={() => resetStyle(selectedBlockID, property)}>
                                    {/* Reset Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="m840-234-80-80v-446h-80v120H434L234-840h133q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v526ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm166 560L200-646v446h446Zm-446 80q-33 0-56.5-23.5T120-200v-526l-65-65 57-57 736 736-57 57-65-65H200Z" /></svg>
                                </button>
                            </div>
                        }

                    </FloatReveal>
                </div>
            )}

            {/* Render the property input component */}
            <div className={CSS.StylesEditorProperty__Value}>
                {component()}
            </div>
        </div>
    );
};

export default memo(StylesEditorProperty);