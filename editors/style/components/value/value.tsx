import { memo, ReactElement } from 'react';

// Types
import { ValueProps } from './types';
import { OptionData } from '@/types/interface/option';


// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';
import { CSSDataTypeDefs } from '@/constants/style/data-types';

// Utilities
import { extractCSSValueComponents } from '@/utilities/style/interface';
import { parse } from '@/utilities/style/parse';

const Value: React.FC<ValueProps> = ({ property }: ValueProps): ReactElement => {
    const propertyDefs = CSSPropertyDefs[property];
    const syntaxRaw = propertyDefs?.['syntax-raw'];
    const syntaxExpanded = propertyDefs?.['syntax-expanded'];
    const syntaxParsed = propertyDefs?.['syntax-parsed'];

    console.log(syntaxRaw);
    console.log(syntaxExpanded);
    console.log(syntaxParsed)

    return <p>{property}</p>
};

export default memo(Value);


