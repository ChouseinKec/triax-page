import { memo, ReactElement, useRef, useState, ReactNode, useMemo, Fragment, useContext } from 'react';

// Styles
import CSS from '@/editors/style/components/property/styles.module.css';

// Components
import FloatReveal from '@/components/Reveal/Float/component';
import HorizontalDivider from '@/components/Divider/Horizontal/component';

// Types
import { LAYOUT_PROPERTY } from '@/editors/style/components/property/types';


// Contexts
import { useToolbar, ToolbarProvider } from '@/contexts/ToolbarContext';


/**
 * Property component represents an individual style input field within a group.
 * It includes a label and a component (e.g., input, dropdown) for user interaction.
 * 
 * @param {LAYOUT_PROPERTY} props - The props for the Property component.
 * @param {React.ReactNode} props.component - The component to render (e.g., input, dropdown, etc.).
 * @param {string} [props.column='auto'] - The column layout for the property.
 * @param {string} [props.row='auto'] - The row layout for the property.
 * @param {string | null} [props.label] - The label for the property.
 * @param {string} [props.labelAlign='center'] - The alignment of the label.
 * @param {string} [props.direction] - The direction (e.g., 'ltr' or 'rtl') for the property.
 * @param {boolean} [props.hidden] - Flag to determine if the property should be visible.
 * @param {boolean} [props.disabled] - Flag to disable the property input.
 * @returns {ReactElement} The rendered Property component.
*/
const Property: React.FC<LAYOUT_PROPERTY> = ({ component, column = 'auto', row = 'auto', label, labelAlign = 'center', direction, hidden, disabled }: LAYOUT_PROPERTY): ReactElement => {

    // If the `hidden` prop is explicitly set to `false`, return nothing (hide the property)
    if (hidden === true) return <></>;

    // Define the CSS styles for the property using CSS variables
    const _style: React.CSSProperties = {
        ['--property-column' as string]: column,
        ['--property-row' as string]: row,
        ['--property-label--align' as string]: labelAlign,
    };

    return (
        <ToolbarProvider>
            <div
                className={CSS.Property}
                style={_style}
                data-label={label?.toLocaleLowerCase()}
                data-direction={direction}
                data-disabled={disabled}
            >

                <Content component={component} label={label} />

            </div>
        </ToolbarProvider>
    );
};


const Content: React.FC<LAYOUT_PROPERTY> = ({ component, label }: LAYOUT_PROPERTY): ReactElement => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const { buttons, title, description } = useToolbar();

    return (
        <>
            {/* Render the label if provided */}
            {/* {label && (
                <>
                    <label className={CSS.Property_Label} ref={labelRef}>
                        {label}
                    </label>

                    <FloatReveal targetRef={labelRef} position='top'>

                        <div className={CSS.Property_Float__Title}>
                            {title}
                        </div>

                        <div className={CSS.Property__Float__Description}>
                            {description}
                        </div>

                        {buttons.length > 0 && <HorizontalDivider className={CSS.Property_Float__Divider} />}

                        <div className={CSS.Property_Float__Tools}>
                            {buttons}
                        </div>

                    </FloatReveal>
                </>
            )} */}

            {component()}


        </>
    )

};

export default memo(Property);


