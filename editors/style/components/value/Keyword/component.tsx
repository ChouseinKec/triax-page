import React, { memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DropdownSelect from '@/components/select/dropdown/component';
import RadioSelect from '@/components/select/radio/component';

// Types
import { KeywordValueProps } from './types';

// Utilities
import { devLog } from '@/utilities/dev';

/**
 * KeywordValue Component
 *
 * Renders a keyword value selector using either a radio group (with icons)
 * or a dropdown select (without icons), based on the provided options.
 *
 * @param {KeywordValueProps} props - The component props
 * @returns {ReactElement} The rendered selector component
 */
const KeywordValue: React.FC<KeywordValueProps> = memo((props: KeywordValueProps) => {
    const { value, options, onChange } = props;

    // Guard Clause
    if (!options || options.length === 0) {
        devLog.error('[KeywordValue] No options provided');
        return null;
    }

    if (value == null) {
        devLog.error('[KeywordValue] Invalid value provided, expected a string');
        return null;
    }


    // Determine if all options have an icon (for radio group rendering)
    const hasIcon = useMemo(() =>
        options.every(option => !!option.icon),
        [options]
    );

    // Render radio group if all options have icons, otherwise render dropdown
    return (
        hasIcon ? (
            <RadioSelect
                value={value}
                options={options}
                onChange={onChange}
            />
        ) : (
            <DropdownSelect
                value={value}
                options={options}
                placeholder="N/A"
                searchable={false}
                grouped={true}
                onChange={onChange}
                title="Change Value Type"
                ariaLabel="Change Value Type"
            />
        )

    )
});

export default KeywordValue;
