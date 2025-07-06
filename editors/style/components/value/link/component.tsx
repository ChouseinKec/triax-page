// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/input/generic/component';

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

        const sanitizedInput = input.replaceAll('"', '').replaceAll('https://', '');

        onChange(`"https://${sanitizedInput}"`);
    }, [onChange]);





    return (
        <div className={CSS.LinkValue}>
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
