import React, { ReactElement, useMemo } from "react";

// Styles
import CSS from './styles.module.css';

// Types
import type { BackgroundViewProps } from './types';

// Utilities
import { clampDimension } from '@/utilities/style/dimension'


/**
 * BackgroundView Component
 * 
 * A reusable component that displays a background layout with dots and boxes.
 * It accepts custom styles to modify the layout of the component.
 * 
 * @param {BackgroundViewProps} props - The component props.
 * @param {React.CSSProperties} props.styles - Custom inline styles to apply to the container.
 * @returns {ReactElement} - The rendered BackgroundView component.
*/
const BackgroundView: React.FC<BackgroundViewProps> = ({ styles }: BackgroundViewProps): ReactElement => {

    const _styles = useMemo(() => {
        // Clamp dimensions to ensure they are within valid ranges
        return {
            ...styles,
            borderTopWidth: clampDimension(styles.borderTopWidth),
            borderRightWidth: clampDimension(styles.borderRightWidth),
            borderBottomWidth: clampDimension(styles.borderBottomWidth),
            borderLeftWidth: clampDimension(styles.borderLeftWidth),
            outlineWidth: clampDimension(styles.outlineWidth),
        };
    }, [styles]);

    return (
        <div className={CSS.BackgroundView} style={_styles} />
    );
};

export default BackgroundView;