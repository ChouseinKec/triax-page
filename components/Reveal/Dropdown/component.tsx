import React, { memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

// Styles
import CSS from '@/components/Reveal/Dropdown/styles.module.css';

// Types
import { DROPDOWN_REVEAL } from '@/components/Reveal/Dropdown/types';


/**
 * Dropdown Component
 *
 * A reusable dropdown component that toggles visibility on button click
 * and closes when clicking outside or when the children element changes (optional).
 *
 * @component
 * @param {DROPDOWN_REVEAL} props - Component props
 * @param {React.ReactNode} props.value - The display label or toggle value
 * @param {React.CSSProperties} [props.toggleStyle] - Optional inline styles for the toggle button
 * @param {string} [props.placeholder="Toggle"] - Placeholder shown if value is not provided
 * @param {React.ReactNode} props.children - Content shown inside the dropdown window
 * @param {boolean} [props.closeOnChange=true] - Whether to auto-close when children update
 * @param {boolean} [props.isDisabled=false] - Whether the dropdown toggle is disabled
 * @returns {ReactElement}
 *
 * @example
 * <Dropdown value="Menu" closeOnChange>
 *   <p>Dropdown content</p>
 * </Dropdown>
 */
const Dropdown: React.FC<DROPDOWN_REVEAL> = ({ value, toggleStyle, placeholder = 'Toggle', children, closeOnChange, isDisabled }: DROPDOWN_REVEAL): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    /**
     * Handles clicks outside the dropdown container.
     * Closes the dropdown if an outside click is detected.
     * Memoized to prevent unnecessary re-creation.
    */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]
    );

    /**
     * Closes the dropdown when the children element changes, if enabled.
     * Memoized to prevent unnecessary re-execution.
    */
    useEffect(() => {
        if (closeOnChange === false) return;
        setIsOpen(false);
    }, [children, closeOnChange]
    )

    /**
     * Toggles the dropdown open/closed state.
     * Memoized to prevent unnecessary re-creations.
    */
    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className={CSS.DropdownReveal} ref={dropdownRef}>
            {/* Toggle button to open/close the dropdown */}
            <button
                className={CSS.DropdownReveal_Button}
                style={toggleStyle}
                onClick={handleToggle}
                data-isopen={isOpen}
                data-isdisabled={isDisabled}
            >
                {value || placeholder}
            </button>

            {/* Conditionally render the dropdown content */}
            {isOpen && isDisabled !== true && (
                <div className={CSS.DropdownReveal_Window}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default memo(Dropdown);