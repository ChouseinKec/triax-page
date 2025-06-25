// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/Input/Generic/component';
import SelectDropdown from '@/components/Select/Dropdown/component';

// Types
import { IntegerValueProps } from './types';



const LinkValue: React.FC<IntegerValueProps> = memo((props: IntegerValueProps): ReactElement => {
    const {
        value = '',
        onChange = () => { },
    } = props;

    const safeValue = value.replaceAll('"', '').replace("https://", ""); // Ensure only numeric characters are allowed


    // Handle changes to the numeric input
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') {
            onChange('');
            return;
        }

        let sanitizedInput = input.replaceAll('"', '');
        if (sanitizedInput.startsWith('https://')) {
            sanitizedInput = sanitizedInput.slice(8);
        }
        onChange(`"https://${input}"`);
    }, [onChange]);





    return (
        <div className={CSS.NumberValue}>
            <GenericInput
                prefix='https://'
                value={safeValue}
                type='text'
                onChange={handleValueChange}
                placeholder='Enter a link...'
            />
        </div>
    );
});

export default LinkValue;
