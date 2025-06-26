import React, { ReactElement, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { TextViewProps } from './types';

// Utilities
import { clampDimension } from '@/utilities/style/dimension'

/**
 * TextView Component
 *
 * A reusable component that displays a text layout with custom styles.
 * It accepts custom styles to modify the layout of the component.
 *
 * @param {TextViewProps} props - The component props.
 * @param {React.CSSProperties} props.styles - Custom inline styles to apply to the container.
 * @returns {ReactElement} - The rendered TextView component.
*/
const TextView: React.FC<TextViewProps> = ({ styles }: TextViewProps): ReactElement => {
    const _styles = useMemo(() => {
        return {
            ...styles,
            fontSize: clampDimension(styles.fontSize, 25),
            lineHeight: clampDimension(styles.lineHeight),
            letterSpacing: clampDimension(styles.letterSpacing),
            columnWidth: clampDimension(styles.columnWidth),
            columnGap: clampDimension(styles.columnGap),
            textIndent: clampDimension(styles.textIndent),
            columnRuleWidth: clampDimension(styles.columnRuleWidth),
        };
    }, [styles]);

    return (
        <div className={CSS.TextView} style={_styles}>
            Try changing text properties to see the effect.
        </div>
    );
};

export default TextView;