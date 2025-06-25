import React, { ReactElement, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { PositionViewProps } from './types';

// Utilities
import { extractNumber } from '@/utilities/style/dimension'



/**
 * Clamps a CSS value to a maximum of 10px.
 * Extracts the numeric part and returns it as px, limited to 10.
 * @param value - The CSS value (e.g., '10rem', '5vh', '12px')
 * @param maxPx - The maximum px value allowed (default: 10)
 * @returns {string | undefined} - The clamped value in px, or undefined if input is invalid
 */
function normalizeDimension(value: string, maxPx = 15): string | undefined {
    if (value == null) return undefined;
    const num = extractNumber(value);
    if (!num) return undefined;

    const safeNum = parseFloat(num);
    return `${Math.min(safeNum, maxPx)}px`;
}

function normalizePosition(value: string | undefined): string | undefined {
    if (value == null) return undefined;
    const normalized = value.trim().toLowerCase();
    if (normalized === 'fixed') return 'absolute';
    return ['static', 'relative', 'absolute', 'sticky'].includes(normalized) ? normalized : 'static';
}


/**
 * PositionView Component
 *
 * A reusable component that displays a position layout with custom styles.
 * It accepts custom styles to modify the layout of the component.
 *
 * @param {PositionViewProps} props - The component props.
 * @param {React.CSSProperties} props.styles - Custom inline styles to apply to the container.
 * @returns {ReactElement} - The rendered PositionView component.
*/
const PositionView: React.FC<PositionViewProps> = ({ styles }: PositionViewProps): ReactElement => {
    const paddingStyles = useMemo(() => ({
        paddingTop: normalizeDimension(styles.paddingTop),
        paddingRight: normalizeDimension(styles.paddingRight),
        paddingBottom: normalizeDimension(styles.paddingBottom),
        paddingLeft: normalizeDimension(styles.paddingLeft),
    }), [styles]);

    const marginStyles = useMemo(() => ({
        position: normalizePosition(styles.position) as React.CSSProperties['position'],
        top: normalizeDimension(styles.top),
        right: normalizeDimension(styles.right),
        bottom: normalizeDimension(styles.bottom),
        left: normalizeDimension(styles.left),
        zIndex: styles.zIndex,

        paddingTop: normalizeDimension(styles.marginTop),
        paddingRight: normalizeDimension(styles.marginRight),
        paddingBottom: normalizeDimension(styles.marginBottom),
        paddingLeft: normalizeDimension(styles.marginLeft),
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