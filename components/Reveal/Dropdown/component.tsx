import React, { memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

// Styles
import CSS from '@/components/Reveal/Dropdown/styles.module.css';

// Types
import { DropdownRevealProps } from '@/components/Reveal/Dropdown/types';


/**
 * Dropdown Component
 *
 * A reusable dropdown component that toggles visibility on button click
 * and closes when clicking outside or when the children element changes (optional).
 */
const Dropdown: React.FC<DropdownRevealProps> = (props: DropdownRevealProps): ReactElement => {
    const {
        value,
        buttonStyle,
        placeholder = 'Toggle',
        children,
        closeOnChange,
        isDisabled
    } = props;


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
                style={buttonStyle}
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