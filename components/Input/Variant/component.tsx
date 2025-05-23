import { memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Styles 
import CSS from '@/components/Input/Variant/styles.module.css';

// Components
import DynamicInput from '@/components/Input/Dynamic/component';

// Types
import { VARIANT_INPUT } from '@/components/Input/Variant/types';

// Utilities
import { splitMultiValue, extractSyntaxTypes, getSyntaxVariants, matchSyntaxVariant, updateMultiValue } from '@/utilities/style';
import { devLog } from '@/utilities/dev';

// Contexts
import { useToolbar } from '@/contexts/ToolbarContext';


/**
 * A component that handles input variants with multiple syntax options.
 * Allows cycling through different syntax variants and editing their values.
 *
 * @param {object} props - Component props
 * @param {string} [props.value=''] - The current combined input value
 * @param {object} props.option - The syntax option configuration
 * @param {string} [props.separator=' '] - Separator used between multiple values
 * @param {Function} [props.onChange=()=>{}] - Callback when values change
 * 
 * @example
 * // Basic usage
 * const lengths = [{name:'px',value:'0px',syntax:'length'}]
 * <VariantInput
 *   value="10px,20px"
 *   option={value:'',name:'',lengths:lengths}
 *   separator=","
 *   onChange={(newValue) => console.log(newValue)}
 * />
 * 
 * // With more complex syntax variants
 * const option = {name:'px',value:'0px',syntax:'number || number/number'}
 * <VariantInput
 *   value="1 || 1/2"
 *   option = {option}
 *   separator="/"
 * />
 */
const VariantInput: React.FC<VARIANT_INPUT> = (props: VARIANT_INPUT): ReactElement | null => {
    const { id, value = '', option = { name: '', value: '', syntax: '' }, separator, onChange = () => { } } = props;

    const { addButton, removeButtons } = useToolbar();
    const splitedValues = splitMultiValue(value, separator);
    const syntaxes = useMemo(() => getSyntaxVariants(option), [option]);

    // Initialize current index based on the value
    const [currentIndex, setCurrentIndex] = useState(() => {
        return matchSyntaxVariant(value, syntaxes || []) || 0;
    });

    // Memoize event handlers to prevent unnecessary re-renders of child components
    const handleChange = useCallback((input: string, value: string, index: number) => {
        const updatedValue = updateMultiValue(value, input, index, separator);
        onChange(updatedValue);
    }, [separator, onChange]
    );

    const handleVariantChange = useCallback(() => {
        if (!syntaxes?.length) {
            devLog.warn('No syntax variants available');
            return;
        }

        const nextIndex = (currentIndex + 1) % syntaxes.length;
        const nextValue = option.lengths ? option.lengths[nextIndex].value : '';

        // First update the state
        setCurrentIndex(nextIndex);

        // Then trigger the onChange in a separate update
        onChange(nextValue);

    }, [syntaxes, onChange, option]
    );

    // Memoize the button to prevent recreation on every render
    const cycleButton = useMemo(() => (
        <button
            key={id}
            type="button"
            onClick={handleVariantChange}
            aria-label="Cycle syntax variant"
        >
            ⟳
        </button>
    ), [handleVariantChange]);


    // Add/remove button effect
    // useEffect(() => {
    //     addButton(cycleButton);
    //     return () => removeButtons();

    // }, [cycleButton]);


    const childrenElements = (() => {
        if (!syntaxes?.length) return null;

        const currentSyntax = syntaxes[currentIndex];
        const syntaxTypes = extractSyntaxTypes(currentSyntax);

        if (!syntaxTypes?.length) return null;

        return syntaxTypes.map((syntaxType, index) => {
            const currentOption = option.lengths?.[currentIndex];
            const inputValue = splitedValues[index] ?? '';

            return (
                <DynamicInput
                    key={`${syntaxType}-${index}-${currentIndex}`}
                    value={inputValue}
                    onChange={(val) => handleChange(val, value, index)}
                    type={syntaxType}
                    option={currentOption}
                />
            );
        });
    })();

    return (
        <div className={CSS.VariantInput} role="group" aria-label="Variant-value input group">
            {childrenElements}
        </div>
    );
};


export default memo(VariantInput);
