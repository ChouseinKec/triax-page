// Registry functions
import { registerStyle, registerUnit, registerToken, registerTokenType } from '@/src/core/block/style/registries';

// Config sources
import { CoreStyles } from '@/src/config/block/style/definition';
import { CoreTokens } from '@/src/config/block/style/token';
import { CoreTokenTypes } from '@/src/config/block/style/token';
import { CoreUnits } from '@/src/config/block/style/unit';

// Validators
import { validateStyleDefinition, validateUnitDefinition, validateTokenDefinition, validateTokenTypeDefinition } from '@/src/core/block/style/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const STYLE_DEFINITIONS: RegistryDefinition<any>[] = [
    {
        category: 'Core/Block/Style/Unit',
        items: CoreUnits,
        registerFn: registerUnit,
        getIdFn: (unit: any) => unit.key,
        validateFn: validateUnitDefinition,
    },
    {
        category: 'Core/Block/Style/Token',
        items: CoreTokens,
        registerFn: registerToken,
        getIdFn: (token: any) => token.key,
        validateFn: validateTokenDefinition,
    },
    {
        category: 'Core/Block/Style/Token/Type',
        items: CoreTokenTypes,
        registerFn: registerTokenType,
        getIdFn: (tokenType: any) => tokenType.key,
        validateFn: validateTokenTypeDefinition,
    },
    {
        category: 'Core/Block/Style',
        items: CoreStyles,
        registerFn: registerStyle,
        getIdFn: (style: any) => style.key,
        validateFn: validateStyleDefinition,
    },
];