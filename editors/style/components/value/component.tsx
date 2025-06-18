import { memo, ReactElement, useMemo } from 'react';

// Types
import type { ValueProps } from './types';

// Utilities
import { splitAdvanced, joinAdvanced } from '@/utilities/string/string';
import { createOptionsTable } from '@/utilities/style/option';
import { extractSeparators, getValueTokens, getVariationIndex } from '@/utilities/style/value';

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
    const syntaxSet = property.syntaxSet;
    const syntaxNormalized = property.syntaxNormalized;
    const syntaxParsed = property.syntaxParsed;
    const syntaxRaw = property.syntaxRaw;
    // console.log(property);
    console.log('Syntax Raw: ', syntaxRaw);
    // console.log('Syntax Parsed: ', syntaxParsed);
    console.log('Syntax Normalized: ', syntaxNormalized);
    // console.log('Syntax Set: ', syntaxSet);

    // Split the value string into slots (e.g., ['10px', 'auto'])
    const values = useMemo(() => splitAdvanced(value, [...ValueSeparators]), [value]);

    // Extract all separators for each variation in syntaxParsed
    const allSeparators = useMemo(() => extractSeparators(syntaxParsed), [syntaxParsed]);

    // Compute the possible slot options for each slot, based on current values and property syntax
    const slotsOptions = useMemo(() => createOptionsTable(syntaxNormalized, syntaxSet, values),
        [syntaxNormalized, syntaxSet, values]
    );

    // console.log(slotsOptions);

    // Handler to update slot values and join with correct separators
    function handleSlotsChange(updatedValues: string[]) {

        const valueTokens = getValueTokens(updatedValues).join(' ');
        // console.log(updatedValues, valueTokens);

        const found = getVariationIndex(syntaxNormalized, valueTokens);

        const separators = found === -1 ? [] : allSeparators[found];
        // Join the values using the correct separators
        const joinedValue = joinAdvanced(updatedValues, separators);
        onChange(joinedValue);
    }

    // Render the slot-based value editor, passing separators and new onChange
    return <Slots values={values} options={slotsOptions} onChange={handleSlotsChange} />;
};

export default memo(Value);

