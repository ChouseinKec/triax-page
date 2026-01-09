// Registry functions
import { registerViewport } from '@/src/core/layout/viewport/registries';

// Config sources
import { CoreViewports } from '@/src/config/layout/viewport';

// Validators
import { validateViewportDefinition } from '@/src/core/layout/viewport/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const VIEWPORT_DEFINITIONS: RegistryDefinition<any>[] = [
    {
        category: 'Core/Viewport',
        items: CoreViewports,
        registerFn: registerViewport,
        getIdFn: (viewport: any) => viewport.id,
        validateFn: validateViewportDefinition,
    },
];
