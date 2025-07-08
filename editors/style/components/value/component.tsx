import { memo, ReactElement, useCallback, useMemo } from 'react';

// Types
import type { ValueProps } from './types';

// Utilities
import { splitAdvanced, joinAdvanced } from '@/utilities/string/string';
import { createOptionsTable } from '@/utilities/style/option';
import { getValueTokens } from '@/utilities/style/value';
import { getTokenValues } from '@/utilities/style/token';
import { mergeArrays } from '@/utilities/array/array';

// Constants
import { ValueSeparators } from '@/constants/style/separator';

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
    const syntaxParsed = useMemo(() => property.syntaxParsed, [property.syntaxParsed]);
    const syntaxNormalized = useMemo(() => property.syntaxNormalized, [property.syntaxNormalized]);
    const syntaxSeparators = useMemo(() => property.syntaxSeparators, [property.syntaxSeparators]);

    // if(property.name === 'grid-template-rows') {
    // console.log(property.syntaxExpanded);
    // console.log(syntaxNormalized);
    // }

    // Split the value string into slots (e.g., ['10px', 'auto'])
    const values = useMemo(() => splitAdvanced(value, [...ValueSeparators]), [value]);

    // Compute the possible slot options for each slot, based on current values and property syntax
    const slotsOptions = useMemo(() => createOptionsTable(syntaxNormalized, syntaxSet, values, property.name),
        [syntaxNormalized, syntaxSet, values, property.name]
    );

    // Handler to update slot values and join with correct separators
    const handleSlotsChange = useCallback((input: string[]) => {
        if (!input || (input.length === 1 && input[0] === '')) return onChange('');

        // Normalize updated values to canonical tokens
        const valueTokens = getValueTokens(input).join(' ');

        // Find the index of the matching variation with strict matching
        // This will return the index of the variation that matches the updated value tokens
        let variationIndex = syntaxNormalized.findIndex((value) => value === valueTokens)

        // If no matching variation is found,
        // Find the index of the matching variation with non-strict matching
        // This will return the index of the variation that starts with the updated value tokens
        // Needed for variations with tuple values
        if (variationIndex === -1) {
            variationIndex = syntaxParsed.findIndex((value) => value.startsWith(valueTokens));

            // If still no match, return early
            // This will prevent assignment of invalid syntax when the slot is set to '' or empty
            if (variationIndex === -1) return;
            const syntax = syntaxNormalized[variationIndex];
            input = mergeArrays(input, getTokenValues(syntax.split(' ')));
        }


        // Get separators for this variation, or fallback to spaces
        const separators = syntaxSeparators[variationIndex]
            ? syntaxSeparators[variationIndex]
            : [];

        // Join values with the determined separators
        const joinedValue = joinAdvanced(input, separators);

        // Trigger the change callback
        onChange(joinedValue);
    }, [onChange, syntaxNormalized, syntaxSeparators]
    );

    // Render the slot-based value editor, passing separators and new onChange
    return <Slots values={values} options={slotsOptions} onChange={handleSlotsChange} />
};

export default memo(Value);

