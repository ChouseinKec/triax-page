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
const HorizontalDivider: React.FC<HorizontalDividerProps> = (props: HorizontalDividerProps): ReactElement => {
    const { title } = props;

    /**
     * Provides proper ARIA labeling for screen readers
     */
    const accessibilityProps = useMemo(() => ({
        role: 'separator',
        'aria-label': title ? `Section separator: ${title}` : 'Section separator',
        'aria-orientation': 'horizontal' as const
    }), [title]
    );

    /**
     * Style and data attributes.
    */
    const customProps = useMemo(() => ({
        style: { '--divider-title': title ? `"${title}"` : '""' } as React.CSSProperties,
        'data-title': title,
    }), [title]
    );

    return (
        <div
            className={CSS.HorizontalDivider}
            {...customProps}
            {...accessibilityProps}
        />
    );
};

export default HorizontalDivider;