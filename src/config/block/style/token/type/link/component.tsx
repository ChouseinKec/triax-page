"use client";
import React, { useCallback, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { TokenLinkProps } from "./types";

// Components
import GenericInput from "@/shared/components/input/generic/component";


/**
 * TokenLink Component
 *
 * A specialized URL input component for CSS link values with automatic formatting and comprehensive validation.
 * Automatically wraps URLs in quotes and prepends "https://" protocol for proper CSS syntax.
 * Provides real-time validation preventing protocols, local files, and invalid domains.
 *
 * @param  props - Component properties
 * @param  props.value - Current URL value (will be formatted as quoted https URL)
 * @param  props.onChange - Callback triggered when URL changes
 * @returns Rendered URL input with validation and automatic formatting
 *
 * @note Automatically formats input as "https://domain.com" and validates against local/invalid URLs
 */
const TokenLink: React.FC<TokenLinkProps> = ({ value, onChange }) => {
    // Prepare value for display by removing quotes and protocol
    const safeValue = value.replaceAll('"', '').replace(/^https:\/\//, '');

    // Validate URL input and return error messages
    const validateLink = useCallback((inputValue: string): { status: boolean; message: string } => {
        // Allow empty values
        if (!inputValue || inputValue.trim() === '') return { status: true, message: '' };

        // Disallow protocol (http, https, file, etc.)
        if (/^\w+:\/\//.test(inputValue)) return { status: false, message: 'Do not include the protocol (e.g., "https://") in the link.' };

        // Disallow local files and localhost/IPs
        if (/^file:/.test(inputValue) || /^localhost\b/.test(inputValue) || /^\d{1,3}(\.\d{1,3}){3}/.test(inputValue)) return { status: false, message: 'Local files and IP addresses are not allowed.' };

        // Basic domain validation (with optional www, path, query, hash)
        // e.g. example.com, www.example.com, example.com/path?query#hash
        const domainPattern = /^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        if (!domainPattern.test(inputValue)) return { status: false, message: 'Please enter a valid domain (e.g., "example.com" or "www.example.com/path").' };

        // If all checks pass, the input is valid
        return { status: true, message: '' };
    }, []
    );

    // Handle input changes and format as quoted URL
    const handleValueChange = useCallback((input: string): void => {
        // Allow clearing the input
        if (input === '') return onChange('');

        // Remove quotes and any "https://" prefix, then format as quoted URL
        const sanitizedInput = input.replaceAll('"', '').replace(/^https:\/\//, '');
        onChange(`"https://${sanitizedInput}"`);
    }, [onChange]
    );

    // Render the link input component
    return (
        <div className={CSS.TokenLink}>

            {/* URL input field with validation */}
            <GenericInput
                value={safeValue}
                type="text"
                onChange={handleValueChange}
                onValidate={validateLink}
                placeholder="Enter a link..."
            />
        </div>
    );
};

TokenLink.displayName = "TokenLink";
export default memo(TokenLink);
