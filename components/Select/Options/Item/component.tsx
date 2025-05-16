import { memo, ReactElement, useCallback } from 'react';

// Styles
import CSS from '@/components/Select/Options/Item/styles.module.css';

// Components
import SVG from '@/components/SVG/svg';

// Types
import { OPTIONS_SELECT_ITEM } from '@/components/Select/Options/Item/types';

/**
 * OptionItem Component
 * 
 * A reusable item for displaying individual options in a dropdown select list.
 * The option may have an icon or text, and it can be selected or deselected.
 * 
 * @param {OPTIONS_SELECT_ITEM} props - The component props.
 * @param {string} props.name - The name of the option.
 * @param {string} props.value - The value of the option.
 * @param {string} [props.icon] - The optional icon for the option.
 * @param {React.CSSProperties} [props.style] - Custom styles for the option.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected or deselected.
 * @param {boolean} props.isSelected - Whether the option is selected.
 * @returns {ReactElement} - The rendered option item component.
 */
const OptionItem: React.FC<OPTIONS_SELECT_ITEM> = ({ name, value, icon, style, onChange, isSelected }): ReactElement => {

    /**
     * Handle the selection or deselection of an option.
     * Memoized to prevent unnecessary re-creations on each render.
     * 
     * @param {string} value - The value of the selected option.
     */
    const handleChange = useCallback((value: string): void => {
        if (isSelected) {
            onChange(''); // Deselect the option if it's already selected
            return;
        }
        onChange(value); // Select the option if it's not already selected
    }, [isSelected, onChange]
    );

    return (
        <i
            className={CSS.OptionsSelect_Item}
            onClick={() => handleChange(value)}
            data-selected={isSelected}
            style={style}
        >
            {icon && <SVG name={icon} />}
            {!icon && name}
        </i>
    )
};


export default memo(OptionItem);