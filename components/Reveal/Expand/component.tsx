import React, { ReactElement, useCallback, useState, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

// Types
import { ExpandRevealProps } from './types';

/**
 * ExpandReveal Component
 *
 * An accessible expand/collapse component that toggles visibility of content.
 * Provides keyboard navigation, ARIA attributes, and smooth state transitions.
 * Uses a horizontal divider as the toggle button for consistent UI styling.
 *
 * @component
 * @param {ExpandRevealProps} props - Component properties
 * @param {React.ReactNode} props.children - Content displayed inside the expandable section
 * @param {string} [props.title=''] - Optional title for the expand section
 * @returns {ReactElement} The rendered ExpandReveal component
 */
const ExpandReveal: React.FC<ExpandRevealProps> = (props: ExpandRevealProps): ReactElement => {
    const { children, title = '' } = props;

    // Component state for expand/collapse
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Toggles the visibility of the expandable content.
     */
    const handleToggle = useCallback((): void => {
        setIsOpen((prevState) => !prevState);
    }, []
    );

    /**
     * Handles keyboard navigation for accessibility.
     * Supports Enter and Space keys for toggle action.
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
        }
    }, [handleToggle]
    );

    /**
     * Provides contextual title that changes with expand state.
     */
    const dividerTitle = useMemo((): string => {
        if (title) {
            return `${title} ${isOpen ? '(Expanded)' : '(Collapsed)'}`;
        }
        return isOpen ? 'Collapse' : 'Expand';
    }, [title, isOpen]
    );

    /**
     * Accessibility attributes for the toggle button.
     * Ensures proper ARIA labeling and state announcement.
     */
    const accessibilityProps = useMemo(() => ({
        'aria-expanded': isOpen,
        'aria-label': title ? `Toggle ${title} section` : 'Toggle expandable content',
        'role': 'button' as const,
    }), [isOpen, title]
    );

    return (
        <div className={CSS.ExpandReveal} data-isopen={isOpen}>
            {/* Toggle button to expand/collapse the content */}
            <button
                className={CSS.ExpandReveal_Button}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                {...accessibilityProps}
            >
                <HorizontalDivider title={dividerTitle} />
            </button>

            {/* Conditionally render content when expanded */}
            {isOpen && (
                <div className={CSS.ExpandReveal_Content} role="region">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ExpandReveal;