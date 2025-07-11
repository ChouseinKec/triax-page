import React, { useMemo, CSSProperties } from "react";

// Styles
import CSS from './styles.module.css';

// Types
import { SizeViewProps } from './types';

// Utilities
import { clampDimension } from '@/utilities/style/dimension'



/**
 * PositionView Component
 *
 * Displays a position layout with customizable styles.
 */
const SizeView: React.FC<SizeViewProps> = ({ styles }: SizeViewProps) => {

    const contentStyles = useMemo<CSSProperties>(() => ({
        width: clampDimension(styles.width, 50),
        height: clampDimension(styles.height, 50),
        minWidth: clampDimension(styles.minWidth, 0),
        minHeight: clampDimension(styles.minHeight, 0),
        maxWidth: clampDimension(styles.maxWidth, 100),
        maxHeight: clampDimension(styles.maxHeight, 100),
        aspectRatio: styles.aspectRatio,
        overflow: styles.overflow,
        objectFit: styles.objectFit as CSSProperties['objectFit'],
    }), [styles]);


    return (
        <div className={CSS.SizeView} >
            <div className={CSS.SizeView_Content} style={contentStyles}>
                Content
            </div>
        </div>
    );
};

export default SizeView;