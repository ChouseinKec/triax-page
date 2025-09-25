"use client";
import React, { useCallback, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/src/shared/components/input/generic/component";

// Types
import { BlockStylesValueLinkProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesValueLink Component
 * Renders a text input for editing a URL value.
 * Ensures the value is always formatted as "https://example.com" (with quotes).
 *
 * @param props - BlockStylesValueLinkProps containing value and onChange callback
 * @returns The rendered link input component
 */
const BlockStylesValueLink: React.FC<BlockStylesValueLinkProps> = ({ value, onChange }) => {
    // Validate input props
    if (typeof value !== 'string') return devRender.error("[BlockStylesValueLink] No value provided", { value });
    if (!onChange || typeof onChange !== 'function') return devRender.error("[BlockStylesValueLink] Invalid onChange callback", { onChange });

    // Prepare value for display by removing quotes and protocol
    const safeValue = value.replaceAll('"', '').replace(/^https:\/\//, '');

    // Validate URL input and return error messages
    const validateLink = useCallback((inputValue: string): { status: boolean; message: string } => {

        // Allow empty values
        if (!inputValue || inputValue.trim() === '') {
            return { status: true, message: '' };
        }

        // Disallow protocol (http, https, file, etc.)
        if (/^\w+:\/\//.test(inputValue)) {
            return {
                status: false,
                message: 'Do not include the protocol (e.g., "https://") in the link.'
            };
        }

        // Disallow local files and localhost/IPs
        if (/^file:/.test(inputValue) || /^localhost\b/.test(inputValue) || /^\d{1,3}(\.\d{1,3}){3}/.test(inputValue)) {
            return {
                status: false,
                message: 'Local files and IP addresses are not allowed.'
            };
        }

        // Basic domain validation (with optional www, path, query, hash)
        // e.g. example.com, www.example.com, example.com/path?query#hash
        const domainPattern = /^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        if (!domainPattern.test(inputValue)) {
            return {
                status: false,
                message: 'Please enter a valid domain (e.g., "example.com" or "www.example.com/path").'
            };
        }

        return { status: true, message: '' };
    }, []
    );

    // Handle input changes and format as quoted URL
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') return onChange('');

        // Remove quotes and any "https://" prefix, then format as quoted URL
        const sanitizedInput = input.replaceAll('"', '').replace(/^https:\/\//, '');
        onChange(`"https://${sanitizedInput}"`);
    }, [onChange]
    );

    // Render the link input component
    return (
        <div className={CSS.BlockStylesValueLink}>
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

export default memo(BlockStylesValueLink);
