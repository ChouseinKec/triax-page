import { memo, ReactElement, useMemo, useState } from 'react';

// Types
import type { ValueProps } from './types';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { filterVariations } from '@/utilities/style/value';
import { createOptionsTable } from '@/utilities/style/option';

// Constants
import { ValueSeparators } from '@/constants/style/value';

// Components
import Slots from './Slots/component';
import Error from './Error/component';

/**
 * Value Component
 * Main entry for rendering a CSS property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 *
 * @param property - The CSS property name to edit (e.g., 'aspect-ratio', 'width').
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const Value: React.FC<ValueProps> = (props: ValueProps): ReactElement => {
    const { property, value, onChange } = props;

    // Split the value string into slots (e.g., ['10px', 'auto'])
    const values = splitTopLevel(value, [...ValueSeparators]);

    // Get all possible syntax variations for this property
    const variations = useMemo(() => property.syntaxParsed, [property]);
    if (!variations) {
        return <Error message={`No variations found for property: ${property}`} />;
    }

    // Filter variations to only those matching the current input prefix
    const filteredVariations = filterVariations(variations, values);

    // Compute the possible slot variations for each slot (column) from all variations
    const slotsOptions = useMemo(
        () => createOptionsTable(filteredVariations),
        [filteredVariations]
    );

    // Render the slot-based value editor
    return (
        <Slots values={values} options={slotsOptions} onChange={onChange} />
    );
};

export default memo(Value);

