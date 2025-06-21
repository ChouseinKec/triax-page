import { memo, ReactElement, useRef } from 'react';

// Styles
import CSS from '@/editors/style/components/property/styles.module.css';

// Components
import FloatReveal from '@/components/Reveal/Float/component';

// Types
import type { LayoutProps, LayoutContentProps } from '@/editors/style/components/property/types';

// Constants
import { CSSPropertyDefs } from '@/constants/style/property';



/**
 * Property component represents an individual style input field within a group.
 * It includes a label and a component (e.g., input, dropdown) for user interaction.
 * 
 * @param {LayoutProps} props - The props for the Property component.
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
const Property: React.FC<LayoutProps> = (props: LayoutProps): ReactElement => {
    const {
        component,
        column = 'auto',
        row = 'auto',
        label = null,
        labelAlign = 'center',
        direction = 'ltr',
        hidden = false,
        disabled = false,
        property,
    } = props;

    // If the `hidden` prop is explicitly set to `false`, return nothing (hide the property)
    if (hidden === true) return <></>;



    // Define the CSS styles for the property using CSS variables
    const _style: React.CSSProperties = {
        ['--property-column' as string]: column,
        ['--property-row' as string]: row,
        ['--property-label--align' as string]: labelAlign,
    };

    return (
        <div
            className={CSS.Property}
            style={_style}
            data-label={label?.toLocaleLowerCase()}
            data-direction={direction}
            data-disabled={disabled}
        >

            <Content component={component} label={label} property={property} />

        </div>
    );
};


const Content: React.FC<LayoutContentProps> = (props: LayoutContentProps): ReactElement => {
    const { component, label, property } = props;
    const labelRef = useRef<HTMLLabelElement>(null);

    const propertyName = property ? CSSPropertyDefs[property]?.name : 'N/A';
    const propertyDescription = property ? CSSPropertyDefs[property]?.description : 'N/A';
    return (
        <>
            {/* Render the label if provided */}
            {label && (
                <>
                    <label className={CSS.Property_Label} ref={labelRef}>
                        {label}
                    </label>

                    <FloatReveal targetRef={labelRef} position='top'>

                        <div className={CSS.Property_Float__Title}>
                            {propertyName}
                        </div>

                        <div className={CSS.Property_Float__Description}>
                            {propertyDescription}
                        </div>


                    </FloatReveal>
                </>
            )}

            {component()}


        </>
    )

};

export default memo(Property);


