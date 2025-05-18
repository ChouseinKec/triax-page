import { memo, ReactElement } from 'react';

// Styles
import CSS from '@/editors/style/layout/components/property/styles.module.css';

// Types
import { STYLE_PROPERTY } from '@/editors/style/layout/components/property/typse';

/**
 * Property component represents an individual style input field within a group.
 * It includes a label and a component (e.g., input, dropdown) for user interaction.
 * 
 * @param {STYLE_PROPERTY} props - The props for the Property component.
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
const Property: React.FC<STYLE_PROPERTY> = ({ component, column = 'auto', row = 'auto', label, labelAlign = 'center', direction, hidden, disabled }: STYLE_PROPERTY): ReactElement => {

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
            className={CSS.property}
            style={_style}
            data-label={label?.toLocaleLowerCase()}
            data-direction={direction}
            data-disabled={disabled}
        >

            {/* Render the label if provided */}
            {label && (
                <label className={CSS.label}>
                    {label}
                </label>
            )}

            {component()}

        </div>
    );
};

export default memo(Property);