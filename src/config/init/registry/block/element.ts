// Registry functions
import { registerElement } from '@/src/core/block/element/registries';

// Config sources
import { CoreElements } from '@/src/config/block/element';

// Validators
import { validateElementDefinition } from '@/src/core/block/element/helpers/validators';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const ELEMENT_DEFINITIONS: RegistryDefinition<any>[] = [
    {
        category: 'Core/Block/Element',
        items: CoreElements,
        registerFn: registerElement,
        getIdFn: (element: any) => element.key,
        validateFn: validateElementDefinition,
    },
   
];