import React, { memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { DropdownRevealProps } from '@/components/reveal/dropdown/types';

// Components
import FloatReveal from '@/components/reveal/float/component'

/**
 * Dropdown Component
 *
 * A reusable dropdown component that toggles visibility on button click
 * and closes when clicking outside or when the children element changes (optional).
 */
const DropdownReveal: React.FC<DropdownRevealProps> = (props: DropdownRevealProps): ReactElement => {
    const {
        value,
        placeholder = 'Toggle',
        forcePlaceholder = false,
        children,
        closeOnChange,
        isDisabled,
        title = 'Toggle Dropdown',
        ariaLabel = 'Dropdown reveal',
    } = props;


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    /**
     * Handles clicks outside the dropdown container.
     * Closes the dropdown if an outside click is detected.
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
    */
    useEffect(() => {
        if (closeOnChange === false) return;
        setIsOpen(false);
    }, [children, closeOnChange]
    )

    /**
     * Toggles the dropdown open/closed state.
    */
    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []
    );

    const buttonPlaceholder = forcePlaceholder ? placeholder : value || placeholder;

    return (
        <div className={CSS.DropdownReveal} ref={dropdownRef}>
            {/* Toggle button to open/close the dropdown */}
            <button
                className={CSS.DropdownReveal_Button}
                onClick={handleToggle}
                data-isopen={isOpen}
                data-isdisabled={isDisabled}
                title={title}
                aria-label={ariaLabel}
            >
                {buttonPlaceholder}
            </button>

            {/* Conditionally render the dropdown content */}
            {isDisabled !== true && (
                <FloatReveal
                    targetRef={dropdownRef}
                    position='bottom'
                    isOpen={isOpen}
                >
                    {children}
                </FloatReveal>
            )}
        </div>
    );
};

export default memo(DropdownReveal);