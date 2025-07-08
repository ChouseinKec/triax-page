import React, { useRef, ReactElement, useCallback } from 'react';

// Types
import type { ErrorProps } from './types';

// Styles
import CSS from './styles.module.css';

// Components
import FloatReveal from '@/components/reveal/float/component';

// Utilities
import { devLog } from '@/utilities/dev';

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
const Error: React.FC<ErrorProps> = (props: ErrorProps): ReactElement => {
    const { message } = props;

    if (!message || message.trim() === '') {
        devLog.warn('[Error] Empty or missing error message provided');
    }

    // Ref for the error trigger button (target for floating tooltip)
    const errorButtonRef = useRef<HTMLButtonElement>(null);
    // Fallback for empty messages
    const displayMessage = message?.trim() || 'An unknown error occurred';

    /**
     * Handles error button click for keyboard accessibility
     * Ensures the floating tooltip can be activated via keyboard
     * 
     * @param {React.MouseEvent} event - Click event from the error button
     */
    const handleErrorClick = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        // Prevent any default button behavior
        event.preventDefault();

        // Focus the button to ensure accessibility
        if (errorButtonRef.current) {
            errorButtonRef.current.focus();
        }

        devLog.info('[Error] Error button clicked, tooltip should be visible');
    },
        []
    );

    /**
     * Handles keyboard events for accessibility
     * Provides keyboard navigation support for the error tooltip
     * 
     * @param {React.KeyboardEvent} event - Keyboard event from the error button
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>): void => {
        // Show tooltip on Enter or Space key
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            // The FloatReveal component should handle the visibility
        }

        // Close on Escape key
        if (event.key === 'Escape') {
            event.preventDefault();
            if (errorButtonRef.current) {
                errorButtonRef.current.blur();
            }
        }
    },
        []
    );


    return (
        <div
            className={CSS.ErrorContainer}
            role="alert"
            aria-live="polite"
        >
            {/* Error indicator button */}
            <button
                className={CSS.Error}
                ref={errorButtonRef}
                onClick={handleErrorClick}
                onKeyDown={handleKeyDown}
                type="button"
                aria-label={`Error: ${displayMessage}`}
                aria-describedby="error-tooltip"
                aria-expanded="false"
                title="Click or press Enter to view error details"
            >
                <span aria-hidden="true">⚠</span>
                <span className={CSS.ScreenReaderOnly}>Error</span>
            </button>

            {/* Floating error message tooltip */}
            <FloatReveal
                targetRef={errorButtonRef}
                aria-label="Error message tooltip"
            >
                <div
                    className={CSS.ErrorMessage}
                    role="tooltip"
                    id="error-tooltip"
                    aria-live="polite"
                >
                    <p>{displayMessage}</p>
                </div>
            </FloatReveal>
        </div>
    );
};

export default Error;
