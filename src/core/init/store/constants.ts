// Store initialization functions
import { initLayoutStore } from '@/src/state/layout/layout';
import { initializeBlockStore } from '@/src/state/block/block';
import { initializePageStore } from '@/src/state/layout/page';

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
