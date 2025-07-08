import React, { ReactElement, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { HorizontalDividerProps } from './types';

/**
 * HorizontalDivider Component
 * 
 * A semantic horizontal divider/separator element with optional title.
 * Uses CSS custom properties for title display and provides proper accessibility.
 * Rendered as a semantic separator with appropriate ARIA attributes.
 * 
 * @param {HorizontalDividerProps} props - Component properties
 * @param {string} [props.title] - Optional title text displayed on the divider
 * @returns {ReactElement} The rendered HorizontalDivider component
 */
const HorizontalDivider: React.FC<HorizontalDividerProps> = ({ title }): ReactElement => {
    /**
     * CSS custom properties for the divider title
     */
    const customProperties = useMemo((): React.CSSProperties => ({
        '--divider-title': title ? `"${title}"` : '""'
    } as React.CSSProperties),
        [title]
    );

    /**
     * Provides proper ARIA labeling for screen readers
     */
    const accessibilityProps = useMemo(() => ({
        role: 'separator',
        'aria-label': title ? `Section separator: ${title}` : 'Section separator',
        'aria-orientation': 'horizontal' as const
    }), [title]);

    return (
        <div
            className={CSS.HorizontalDivider}
            style={customProperties}
            data-title={title || undefined}
            {...accessibilityProps}
        />
    );
};

export default HorizontalDivider;