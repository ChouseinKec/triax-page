import React, { ReactElement, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import { FlexViewProps } from '@/editors/style/components/value/view/flex/types';

/**
 * FlexView Component
 * 
 * A reusable component that displays a flex layout with dots and boxes.
 * It accepts custom styles to modify the layout of the component.
 * 
 * @param {FlexViewProps} props - The component props.
 * @param {React.CSSProperties} props.styles - Custom inline styles to apply to the container.
 * @returns {ReactElement} - The rendered FlexView component.
*/
const FlexView: React.FC<FlexViewProps> = ({ styles }: FlexViewProps): ReactElement => {

    const renderedDots = useMemo(() => {
        return Array(9).fill(0).map((_, index) => (
            <i key={index} className={CSS.FlexView_Dot} />
        ))

    }, []
    );

    return (
        <div className={CSS.FlexView} style={styles}>

            <div className={CSS.FlexView_Dots}>
                {renderedDots}
            </div>

            <div className={CSS.FlexView_Box} data-index={1} />
            <div className={CSS.FlexView_Box} data-index={2} />
            <div className={CSS.FlexView_Box} data-index={3} />
        </div>
    );
};

export default FlexView;