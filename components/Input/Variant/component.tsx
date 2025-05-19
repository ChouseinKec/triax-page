import { memo, cloneElement, Children, ReactElement, useCallback, useState } from 'react';

// Styles 
import componentStyle from '@/components/Input/Variant/styles.module.css';

// Components
import DynamicInput from '@/components/Input/Dynamic/component';

// Types
import { VARIANT_INPUT } from '@/components/Input/Variant/types';

// Utilities
import { splitMultiValue, splitSyntaxIdentifiers, splitSyntaxVariants, getSyntaxVariantIndex, updateMultiValue } from '@/editors/style/utilities/style';
import { devLog } from '@/utilities/dev';

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
 * <VariantValueInput
 *   value="10px,20px"
 *   option={value:'',name:'',lengths:lengths}
 *   separator=","
 *   onChange={(newValue) => console.log(newValue)}
 * />
 * 
 * // With more complex syntax variants
 * const option = {name:'px',value:'0px',syntax:'number || number/number'}
 * <VariantValueInput
 *   value="1 || 1/2"
 *   option = {option}
 *   separator="/"
 * />
 */
const VariantValueInput: React.FC<VARIANT_INPUT> = ({ value = '', option, separator, onChange = () => { } }: VARIANT_INPUT): ReactElement | null => {
    const splitedValues = splitMultiValue(value, separator);
    const syntaxes = splitSyntaxVariants(option.syntax);
    const initialSyntaxIndex = getSyntaxVariantIndex(value, option.syntax) || 0;
    const [currentIndex, setCurrentIndex] = useState(initialSyntaxIndex);

    /**
     * Normalizes the value when syntax variant changes
     */
    const normalizeValueForSyntax = useCallback((targetSyntax: string) => {
        const identifiers = splitSyntaxIdentifiers(targetSyntax);
        if (!identifiers) return '';

        // Take only the values that fit the target syntax
        const normalizedValues = splitedValues.slice(0, identifiers.length);
        return normalizedValues.join(separator);
    }, [splitedValues, separator]);

    const handleChange = useCallback((input: string, index: number) => {
        const updatedValue = updateMultiValue(value, input, index, separator);
        onChange(updatedValue);
    }, [value, separator, onChange]);

    const handleVariantChange = useCallback(() => {
        if (!syntaxes?.length) {
            devLog.warn('No syntax variants available');
            return;
        }

        setCurrentIndex(prev => {
            const nextIndex = (prev + 1) % syntaxes.length;
            const nextSyntax = syntaxes[nextIndex];
            const normalizedValue = normalizeValueForSyntax(nextSyntax);

            // Update parent with normalized value if needed
            if (normalizedValue !== value) {
                onChange(normalizedValue);
            }

            return nextIndex;
        });
    }, [syntaxes, value, onChange, normalizeValueForSyntax]);

    // Generate input elements
    const childrenElements = (() => {
        if (!syntaxes?.length) return null;

        const currentSyntax = syntaxes[currentIndex];
        const identifiers = splitSyntaxIdentifiers(currentSyntax);
        if (!identifiers?.length) return null;

        return identifiers.map((identifier, index) => (
            <DynamicInput
                key={`${identifier}-${index}`}
                value={splitedValues[index] ?? ''}
                onChange={(val) => handleChange(val, index)}
                identifier={identifier}
            />
        ));
    })();

    return (
        <div className={componentStyle.VariantInput} role="group" aria-label="Variant-value input group">
            <button
                type="button"
                className={componentStyle.CycleButton}
                onClick={handleVariantChange}
                aria-label="Cycle syntax variant"
            >
                ⟳
            </button>
            {childrenElements}
        </div>
    );
};


export default memo(VariantValueInput);
