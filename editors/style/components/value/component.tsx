import { memo, ReactElement, useMemo, useState } from 'react';

// Types
import { ValueProps } from './types';

// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { getValueTypes } from '@/utilities/style/value';

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
    const initialValue = propertyDefs.initialValue;
    const values = value ? splitTopLevel(value, [...ValueSeparators]) : [initialValue];
    const valueTypes = useMemo(() => getValueTypes(values), [values]);

    console.log(valueTypes);

    // const variations = useMemo(() => propertyDefs.syntaxParsed, [propertyDefs]);
    const variations = [
        "auto",
        "<number [0,∞]>",
        "auto <number [0,∞]>",
        "<number [0,∞]>  auto",
        "<number [0,∞]> / <number [0,∞]>",
        "auto <number [0,∞]> / <number [0,∞]>",
        "<number [0,∞]> / <number [0,∞]> auto",
        "<angle> <length> <percentage>"
    ];


    if (!variations || variations.length === 0) {
        return <Error message={`No variations found for property: ${property}`} />;
    }


    return <Slots values={values} variations={variations} onChange={setValue} />;
};

export default memo(Value);

