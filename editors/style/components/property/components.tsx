"use client";

import { memo, ReactElement, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Types
import type { LayoutProps, LayoutContentProps } from "@/editors/style/components/property/types";

// Constants
import { StylePropertyDefinitions } from "@/constants/style/property";

// Hooks
import { useStyleManager } from "@/hooks/style/manager";

/**
 * Property component represents an individual style input field within a group.
 * It includes a label and a component (e.g., input, dropdown) for user interaction.
 * 
 * @param {LayoutProps} props - The props for the Property component.
 * @param {React.ReactNode} props.component - The component to render (e.g., input, dropdown, etc.).
 * @param {string} [props.column="auto"] - The column layout for the property.
 * @param {string} [props.row="auto"] - The row layout for the property.
 * @param {string | null} [props.label] - The label for the property.
 * @param {boolean} [props.hidden] - Flag to determine if the property should be visible.
 * @param {boolean} [props.disabled] - Flag to disable the property input.
 * @returns {ReactElement} The rendered Property component.
*/
const Property: React.FC<LayoutProps> = (props: LayoutProps): ReactElement => {
    const {
        component,
        label = null,
        hidden = false,
        disabled = false,
        property,
        styles = {},
    } = props;

    // If the `hidden` prop is explicitly set to `false`, return nothing (hide the property)
    if (hidden === true) return <></>;

    return (
        <div
            className={CSS.Property}
            style={styles}
            data-label={label?.toLocaleLowerCase()}
            data-disabled={disabled}
            role="group"
            aria-label={label ? `Property ${label}` : ""}
            aria-hidden={label ? "false" : "true"}
        >

            <Content component={component} label={label} property={property} />

        </div>
    );
};

const Content: React.FC<LayoutContentProps> = (props: LayoutContentProps): ReactElement => {
    const { component, label, property } = props;
    const labelRef = useRef<HTMLLabelElement>(null);

    const propertyName = property ? StylePropertyDefinitions[property]?.name : "N/A";
    const propertyDescription = property ? StylePropertyDefinitions[property]?.description : "N/A";

    const { copyStyle, pasteStyle, resetStyle } = useStyleManager();

    return (
        <>
            {/* Render the label if provided */}
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

                        {property &&
                            <div className={CSS.FloatActions} id={`${property}-tools`} role="group" aria-label="Property Actions">
                                <button title="Copy Property" onClick={() => copyStyle(property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                                </button>
                                <button title="Paste Property" onClick={() => pasteStyle(property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" /></svg>
                                </button>

                                <button title="Reset Property" onClick={() => resetStyle(property)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path fill="black" d="m840-234-80-80v-446h-80v120H434L234-840h133q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v526ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm166 560L200-646v446h446Zm-446 80q-33 0-56.5-23.5T120-200v-526l-65-65 57-57 736 736-57 57-65-65H200Z" /></svg>
                                </button>
                            </div>
                        }


                    </FloatReveal>
                </div>
            )}



            {component()}
        </>
    )

};

export default memo(Property);


