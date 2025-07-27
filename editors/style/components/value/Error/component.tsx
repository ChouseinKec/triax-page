"use client";

import React, { useRef, useCallback, Fragment } from "react";

// Types
import type { ErrorProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * Error Component
 * 
 * A controlled error display component that shows error messages in a floating tooltip.
 * Provides accessible error indication with hover/focus reveal functionality.
 * Designed for inline error display in form controls and value editors.
 * 
 * @param {ErrorProps} props - Component properties
 * @param {string} props.message - Error message to display in tooltip
 * @returns {ReactElement} The rendered Error component
 */
const Error: React.FC<ErrorProps> = (props: ErrorProps) => {
    const { message } = props;

    if (!message || message.trim() === "") {
        devLog.warn("[Error] Empty or missing error message provided");
        return null;
    }

    // Ref for the error trigger button (target for floating tooltip)
    const buttonRef = useRef<HTMLButtonElement>(null);
    // Fallback for empty messages
    const displayMessage = message?.trim() || "An unknown error occurred";


    return (
        <Fragment>
            {/* Error indicator button */}
            <button
                className={CSS.Error}
                ref={buttonRef}
                type="button"
                title="Hover to view error details"
                role="alert"
            >
                <span>⚠ Error</span>
            </button>

            {/* Floating error message tooltip */}
            <FloatReveal targetRef={buttonRef}>
                <p className={CSS.ErrorMessage}>
                    {displayMessage}
                </p>
            </FloatReveal>
        </Fragment>
    );
};

export default Error;
