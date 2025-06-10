import { memo, ReactElement, useMemo, useState } from 'react';

// Types
import { ValueProps } from './types';

// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { getValueTypes, filterVariations } from '@/utilities/style/value';

// Constants
import { ValueSeparators } from '@/constants/style/value';

// Components
import Slots from './Slots/component';
import Error from './Error/component';


/**
 * Main Value component for rendering CSS property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 */
const Value: React.FC<ValueProps> = ({ property }: ValueProps): ReactElement => {
    const [value, setValue] = useState<string>('');
    const propertyDefs = useMemo(() => CSSPropertyDefs[property], [property]);

    if (!propertyDefs) return <Error message={`Unknown property: ${property}`} />;
    // const initialValue = propertyDefs.initialValue;
    const values = value ? splitTopLevel(value, [...ValueSeparators]) : [];
    const valueTypes = getValueTypes(values);

    const variations = useMemo(() => propertyDefs.syntaxParsed, [propertyDefs]);

    if (!variations || variations.length === 0) {
        return <Error message={`No variations found for property: ${property}`} />;
    }

    const filteredVariations = filterVariations(variations, values);

    return (
        <>
            {value}
            <br />
            {valueTypes.join(', ')}
            <Slots values={values} variations={filteredVariations} onChange={setValue} />
        </>
    );
};

export default memo(Value);

