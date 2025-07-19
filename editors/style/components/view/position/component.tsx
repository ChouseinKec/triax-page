import React, { useMemo, CSSProperties } from "react";

// Styles
import CSS from './styles.module.scss';

// Types
import { PositionViewProps } from './types';

// Utilities
import { clampDimension } from '@/utilities/style/dimension'


/**
 * Clamp a position value to valid CSS values.
 * Maps 'fixed' to 'absolute'. Defaults to 'static' for unrecognized values.
 */
function clampPosition(value?: string): CSSProperties['position'] {
    if (!value) return undefined;
    const normalized = value.trim().toLowerCase();
    if (normalized === 'fixed') return 'absolute';
    return (['static', 'relative', 'absolute', 'sticky'] as const).includes(normalized as any)
        ? (normalized as CSSProperties['position'])
        : 'static';
}

/**
 * PositionView Component
 *
 * Displays a position layout with customizable styles.
 */
const PositionView: React.FC<PositionViewProps> = ({ styles }: PositionViewProps) => {
    const paddingStyles = useMemo<CSSProperties>(() => ({
        paddingTop: clampDimension(styles.paddingTop),
        paddingRight: clampDimension(styles.paddingRight),
        paddingBottom: clampDimension(styles.paddingBottom),
        paddingLeft: clampDimension(styles.paddingLeft),
    }), [styles]);

    const marginStyles = useMemo<CSSProperties>(() => ({
        position: clampPosition(styles.position),
        top: clampDimension(styles.top),
        right: clampDimension(styles.right),
        bottom: clampDimension(styles.bottom),
        left: clampDimension(styles.left),
        zIndex: styles.zIndex,
        paddingTop: clampDimension(styles.marginTop),
        paddingRight: clampDimension(styles.marginRight),
        paddingBottom: clampDimension(styles.marginBottom),
        paddingLeft: clampDimension(styles.marginLeft),
    }), [styles]);


    return (
        <div className={CSS.PositionView} >
            <div className={CSS.PositionView_Position} style={marginStyles}>
                <div className={CSS.PositionView_Margin} style={paddingStyles}>
                    <div className={CSS.PositionView_Padding}>
                        <div className={CSS.PositionView_Content}>
                            Content
                        </div>
                    </div>
                </div>
            </div>

            <div className={CSS.PositionView_Info}>
                <span className={CSS.Info_Padding}>Padding</span>
                <span className={CSS.Info_Margin}>Margin</span>
            </div>
        </div>
    );
};

export default PositionView;