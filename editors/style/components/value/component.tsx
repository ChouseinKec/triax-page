import { memo, ReactElement, useCallback, useMemo } from 'react';

// Types
import type { ValueProps } from './types';

// Utilities
import { splitAdvanced, joinAdvanced } from '@/utilities/string/string';
import { createOptionsTable } from '@/utilities/style/option';
import { getValueTokens, getVariationIndex } from '@/utilities/style/value';

// Constants
import { ValueSeparators } from '@/constants/style/value';

// Components
import Slots from './slots/component';


/**
 * Value Component
 * Main entry for rendering a CSS property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 *
 * @param property - The CSS property definition (with syntaxSet and syntaxNormalized)
 * @param value - The current value string for the property (e.g., 'auto 10px')
 * @param onChange - Callback to update the value
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const Value: React.FC<ValueProps> = (props: ValueProps): ReactElement => {
    const { property, value, onChange } = props;

    // Get the syntaxSet (all possible tokens for each slot) and normalized variations from the property definition
    const syntaxSet = useMemo(() => property.syntaxSet, [property.syntaxSet]);
    const syntaxNormalized = useMemo(() => property.syntaxNormalized, [property.syntaxNormalized]);
    const syntaxSeparators = useMemo(() => property.syntaxSeparators, [property.syntaxSeparators]);

    // console.log(property.syntaxNormalized)
    // console.log(property.syntaxParsed);
    // console.log(syntaxSeparators);

    // Split the value string into slots (e.g., ['10px', 'auto'])
    const values = useMemo(() => splitAdvanced(value, [...ValueSeparators]), [value]);

    // Compute the possible slot options for each slot, based on current values and property syntax
    const slotsOptions = useMemo(() => createOptionsTable(syntaxNormalized, syntaxSet, values),
        [syntaxNormalized, syntaxSet, values]
    );

    // Handler to update slot values and join with correct separators
    const handleSlotsChange = useCallback((updatedValues: string[]) => {
        // console.log(updatedValues);

        // Normalize updated values to canonical tokens
        const valueTokens = getValueTokens(updatedValues).join(' ');

        // Find the index of the matching variation
        const separatorIndex = getVariationIndex(syntaxNormalized, valueTokens);

        // Get separators for this variation, or fallback to spaces
        let separators = syntaxSeparators[separatorIndex]
            ? syntaxSeparators[separatorIndex]
            : [];

        // If separators are missing or don't match the number of slots, fallback to spaces
        if (values.length > 1 && (!separators || separators.length - 1 !== updatedValues.length)) {
            separators = Array(updatedValues.length).fill(' ');
        }

        // Join values with the determined separators
        const joinedValue = joinAdvanced(updatedValues, separators);

        // Trigger the change callback
        onChange(joinedValue);
    }, [onChange, syntaxNormalized, syntaxSeparators]);

    // Render the slot-based value editor, passing separators and new onChange
    return <>
        {/* {values.join(' ')}
        <br /> */}
        <Slots values={values} options={slotsOptions} onChange={handleSlotsChange} />
    </>
};

export default memo(Value);

