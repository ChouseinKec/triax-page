// Constants
import { REGISTRY_DEFINITIONS } from '@/src/config/init/registry';
import { STORE_DEFINITIONS } from '@/src/config/init/store/constants';

// Init
import { InitRegistry } from '@/src/core/init/registry';
import { InitStore } from '@/src/core/init/store';

// Types
import type { Step } from '@/src/core/init/types';

/**
 * Default initialization steps for the page builder.
 */
export const Steps: Step[] = [
	{
		name: 'Registries',
		init: () => REGISTRY_DEFINITIONS.forEach((spec) => InitRegistry(spec)),
		description: 'Initialize all registries (panels, bars, tabs, actions ...)',
	},
	{
		name: 'Stores',
		init: async () => {
			for (const store of STORE_DEFINITIONS) {
				await InitStore(store);
			}
		},
		description: 'Initialize all stores (page, layout, block ...)',
	},
];
