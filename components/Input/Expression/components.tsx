import { memo, ReactElement } from 'react';

// Styles
import componentStyle from '@/components/Input/Expression/styles.module.css';

// Types
import { EXPRESSION_INPUT } from '@/components/Input/Expression/types';

// Utilities 
// import { splitExpression } from '@/style/utilities/styles';


/**
 * 
 * A component that manages multiple input values separated by a specified separator.
 * It clones its children and passes the corresponding value and onChange handler to each child.
 * 
 * @param {Props} props - The component props.
 * @param {string} props.value - A string of values separated by the `separator`.
 * @param {ReactNode} props.children - The child input elements to render.
 * @param {string} [props.separator] - The separator used to split and join values (default: ',').
 * @param {(value: string) => void} props.onChange - Callback triggered when any child input changes.
 * @param {string} [props.className] - Optional class name for the root element.
 * @param {string} [props.fallbackValue] - Optional fallback value for undefined or missing values (default: '').
 * 
 * @example

 */
const ExpressionInput: React.FC<EXPRESSION_INPUT> = ({ value, onChange }: EXPRESSION_INPUT): ReactElement | null => {
    if (!onChange) { throw new Error('The `onChange` prop is required for Expression Input.'); }
    if (!value) { throw new Error('The `value` prop is required for Expression Input.'); }


    // const values: [string[], string[]] = splitExpression(value);




    // Render the component.
    return (
        <div className={componentStyle.component}>
            {/* {clonedChildren} */}
            <p>Expression</p>
        </div>
    );
};

export default memo(ExpressionInput);