import { memo, ReactElement, useMemo, useState } from 'react';

// Types
import { ValueProps } from './types';

// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { filterVariations } from '@/utilities/style/value';

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
const Value: React.FC<ValueProps> = ({ property }: ValueProps): ReactElement => {
    // State for the current value string (e.g., '10px auto')
    const [value, setValue] = useState<string>('');

    // Get property definition (syntax, etc.) from constants
    const propertyDefs = useMemo(() => CSSPropertyDefs[property], [property]);
    if (!propertyDefs) return <Error message={`Unknown property: ${property}`} />;

    // Split the value string into slots (e.g., ['10px', 'auto'])
    const values = splitTopLevel(value, [...ValueSeparators]);

    // Get all possible syntax variations for this property
    const variations = useMemo(() => propertyDefs.syntaxParsed, [propertyDefs]);
    if (!variations) {
        return <Error message={`No variations found for property: ${property}`} />;
    }

    // Filter variations to only those matching the current input prefix
    const filteredVariations = filterVariations(variations, values);

    // Render the slot-based value editor
    return (
        <Slots values={values} variations={filteredVariations} onChange={setValue} />
    );
};

export default memo(Value);

