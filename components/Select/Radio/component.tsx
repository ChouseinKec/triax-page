import React, { memo, ReactElement } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Options from '@/components/select/options/component';

// Types
import { RadioSelectProps } from '@/components/select/radio/types';


/**
 * RadioSelect Component
 * 
 * A reusable radio select component that allows users to select a single option from a list.
 * It uses the `Options` component to render the available options and triggers an `onChange` callback when a selection is made.
 * 
 * @param {RadioSelectProps} props - The component props.
 * @param {string} props.value - The currently selected value.
 * @param {Array<{ name: string, value: string }>} props.options - The list of options to display in the radio select.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected.
 * @returns {ReactElement} - The rendered radio select component.
 */
const RadioSelect: React.FC<RadioSelectProps> = ({ value, options, onChange }: RadioSelectProps): ReactElement => {
    return (
        <div className={CSS.RadioSelect}  >
            <Options value={value} options={options} onChange={onChange} />
        </div>
    );
};

export default memo(RadioSelect);