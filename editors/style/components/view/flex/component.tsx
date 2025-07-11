import React, { ReactElement, useMemo } from "react";

// Styles
import CSS from './styles.module.css';

// Types
import { DisplayViewProps } from '@/editors/style/components/view/flex/types';

/**
 * DisplayView Component
 * 
 * A reusable component that displays a flex layout with dots and boxes.
 * It accepts custom styles to modify the layout of the component.
 * 
 * @param {DisplayViewProps} props - The component props.
 * @param {React.CSSProperties} props.styles - Custom inline styles to apply to the container.
 * @returns {ReactElement} - The rendered DisplayView component.
*/
const DisplayView: React.FC<DisplayViewProps> = ({ styles }: DisplayViewProps): ReactElement => {

    const renderedDots = useMemo(() => {
        return Array(9).fill(0).map((_, index) => (
            <i key={index} className={CSS.DisplayView_Dot} />
        ))

    }, []
    );

    return (
        <div className={CSS.DisplayView} style={styles}>

            <div className={CSS.DisplayView_Dots}>
                {renderedDots}
            </div>

            <div className={CSS.DisplayView_Box} data-index={1} />
            <div className={CSS.DisplayView_Box} data-index={2} />
            <div className={CSS.DisplayView_Box} data-index={3} />
        </div>
    );
};

export default DisplayView;