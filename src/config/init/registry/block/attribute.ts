// Registry functions
import { registerAttribute } from '@/src/core/block/attribute/registries';

// Config sources
import { CoreAttributes } from '@/src/config/block/attribute/';

// Validators
import { validateAttributeDefinition } from '@/src/core/block/attribute/helpers/validators';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const ATTRIBUTE_DEFINITIONS: RegistryDefinition<any>[] = [
    {
        category: 'Core/Block/Attribute',
        items: CoreAttributes,
        registerFn: registerAttribute,
        getIdFn: (attribute: any) => attribute.key,
        validateFn: validateAttributeDefinition,
    },
  
];