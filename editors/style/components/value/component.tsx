import { memo, ReactElement, useMemo, useState } from 'react';

// Types
import { ValueProps } from './types';

// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { matchValueType } from '@/utilities/style/value';


// Components
import Slots from './Slots/component';
import Error from './Error/component';


const SEPARATORS = [' ', ',', '/'];


function convertValueToTypes(values: string[]): string[] {
    const types: string[] = values.map(value => {
        const type = matchValueType(value);
        return type ? type : 'unknown';
    }
    );

    return types;
}


/**
 * Main Value component for rendering CSS property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 */
const Value: React.FC<ValueProps> = ({ property }: ValueProps): ReactElement => {
    const [value, setValue] = useState<string>('');
    const propertyDefs = useMemo(() => CSSPropertyDefs[property], [property]);

    if (!propertyDefs) return <Error message={`Unknown property: ${property}`} />;
    const initialValue = propertyDefs.initialValue;
    const values = value ? splitTopLevel(value, SEPARATORS) : [initialValue];

    const valueTypes = useMemo(() => convertValueToTypes(values), [values]);


    console.log(valueTypes);

    const variations: string[] = useMemo(() => propertyDefs.syntaxParsed || [], [propertyDefs]);

    console.log(variations);


    return <Slots values={values} variations={variations} onChange={setValue} />;
};

export default memo(Value);

