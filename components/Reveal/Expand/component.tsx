import React, { ReactElement, useCallback, useState } from 'react';
// Style
import CSS from '@/components/Reveal/Expand/styles.module.css';

// Types
import { ExpandRevealProps } from '@/components/reveal/expand/types';


/**
 * expandReveal Component
 *
 * A simple expand/collapse component that toggles visibility of content on button click.
 * The content is revealed when the component is in the "open" state.
 *
 * @component
 * @param {ExpandRevealProps} props - Component props
 * @param {React.ReactNode} props.children - Content displayed inside the expandable section
 * @returns {ReactElement} - The rendered expand component
 *
 * @example
 * <expandReveal>
 *   <p>Expandable content</p>
 * </expandReveal>
 */
const ExpandReveal: React.FC<ExpandRevealProps> = (props: ExpandRevealProps): ReactElement => {
    const {
        children,
        title = '',
    } = props;

    const [isOpen, setIsOpen] = useState(false);


    /**
     * Toggles the visibility of the expandable content.
     * Memoized to prevent unnecessary re-creations.
    */
    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const _style: React.CSSProperties = {
        ['--expand-title-before' as string]: title ? `| ${title} ` : '+',
        ['--expand-title-after' as string]: title ? title : '-',
    };

    return (
        <div className={CSS.ExpandReveal} data-isopen={isOpen} style={_style}>

            {/* Toggle button to expand/collapse the content */}
            <button className={CSS.ExpandReveal_Button} onClick={handleToggle} />

            {/* Conditionally render content if the expand is open */}
            {isOpen && (
                <div className={CSS.ExpandReveal_Content}>
                    {children} {/* Render the expandable content */}
                </div>
            )}
        </div>
    );
};

export default ExpandReveal;