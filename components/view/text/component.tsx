import React, { ReactElement, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { TextViewProps } from './types';

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
    return (
        <div className={CSS.TextView} style={styles}>
            Try changing text properties to see the effect.
        </div>
    );
};

export default TextView;