// External imports
import React, { useCallback, memo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/input/generic/component';

// Types
import { LinkValueProps } from './types';

/**
 * LinkValue Component
 *
 * Renders a text input for editing a URL value.
 * Ensures the value is always formatted as "https://example.com" (with quotes).
 */
const LinkValue: React.FC<LinkValueProps> = (props: LinkValueProps) => {
    const {
        value,
        onChange
    } = props;

    // Remove quotes and "https://" prefix for display in the input
    const safeValue = value.replaceAll('"', '').replace(/^https:\/\//, '');

    /**
     * Validates a URL input for use in the LinkValue component.
     * - Requires a valid domain (no protocol like https://)
     * - Disallows local files (no file://, localhost, or IPs)
     * - Allows optional www, path, query, and hash
     * - Returns user-friendly error messages
     *
     * @param {string} inputValue - The input value to validate
     * @returns {{ status: boolean; message: string }} Validation result
     */
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
        if (
            /^file:/.test(inputValue) ||
            /^localhost\b/.test(inputValue) ||
            /^\d{1,3}(\.\d{1,3}){3}/.test(inputValue)
        ) {
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
    }, []);


    /**
     * Handles changes to the input field.
     * Sanitizes input by removing quotes and "https://", then formats as a quoted URL.
     */
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') {
            onChange('');
            return;
        }
        // Remove quotes and any "https://" prefix, then format as quoted URL
        const sanitizedInput = input.replaceAll('"', '').replace(/^https:\/\//, '');
        onChange(`"https://${sanitizedInput}"`);
    }, [onChange]);

    return (
        <div className={CSS.LinkValue}>
            <GenericInput
                prefix="https://"
                value={safeValue}
                type="text"
                onChange={handleValueChange}
                onValidate={validateLink}
                placeholder="Enter a link..."
            />
        </div>
    );
};

export default memo(LinkValue);
