// Registry functions
import { registerBench, registerAction } from '@/src/core/layout/workbench/state/registry';

// Config sources
import { CoreBenches, CoreActions } from '@/src/config/layout/bench';

// Validators
import { validateBenchDefinition, validateActionDefinition } from '@/src/core/layout/workbench/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const BENCH_DEFINITIONS: RegistryDefinition<any>[] = [
	{
		category: 'Core/Workbench/Bench',
		items: CoreBenches,
		registerFn: registerBench,
		getIdFn: (workbench: any) => workbench.id,
		validateFn: validateBenchDefinition,
	},

	{
		category: 'Core/Workbench/Action',
		items: CoreActions,
		registerFn: registerAction,
		getIdFn: (action: any) => action.key,
		validateFn: validateActionDefinition,
	},
];
