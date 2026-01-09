// Registry functions
import { registerWorkbench } from '@/src/core/layout/workbench/registries';

// Config sources
import { CoreWorkbenches } from '@/src/config/layout/workbench';

// Validators
import { validateWorkbenchDefinition } from '@/src/core/layout/workbench/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const WORKBENCH_DEFINITIONS: RegistryDefinition<any>[] = [
	{
		category: 'Workbench',
		items: CoreWorkbenches,
		registerFn: registerWorkbench,
		getIdFn: (workbench: any) => workbench.id,
		validateFn: validateWorkbenchDefinition,
	},
];
