import React, { memo, ReactElement, useMemo } from 'react';

// Styles
import CSS from '@/components/View/Flex/styles.module.css';

// Types
import { FlexViewProps } from '@/components/View/Flex/types';

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
            <i key={index} className={CSS.dot} />
        ))

    }, []
    );

    return (
        <div className={CSS.component} style={styles}>
          
            <div className={CSS.dots}>
                {renderedDots}
            </div>

            <div className={CSS.box} data-index={1} />
            <div className={CSS.box} data-index={2} />
            <div className={CSS.box} data-index={3} />
        </div>
    );
};

export default memo(FlexView);