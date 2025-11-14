// Store initialization functions
import { initLayoutStore } from '@/src/core/layout/store';
import { initializeBlockStore } from '@/src/core/block/store';
import { initializePageStore } from '@/src/core/store';

// Types
import type { StoreDefinition } from '@/src/core/init/store/types';

export const STORE_DEFINITIONS: StoreDefinition[] = [
	{
		name: 'Page',
		initFn: initializePageStore,
	},
	{
		name: 'Layout',
		initFn: initLayoutStore,
	},
	{
		name: 'Block',
		initFn: initializeBlockStore,
	},
];
