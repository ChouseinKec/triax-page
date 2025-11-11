// Registry
import { initializeAllRegistries } from '@/src/page/state/registries';
import { initializeLayoutStore } from '@/src/page/layout/state/store/layout';
import { initializeBlockStore } from '@/src/page/state/stores/block';
import { initializePageStore } from '@/src/page/state/stores/page';

// Types
import type { InitStep } from '@/src/page/core/init/types';

/**
 * Default initialization steps for the page builder.
 * Add new steps here as the application grows.
 */
export const CoreSteps: InitStep[] = [
	{
		name: 'Registries',
		init: initializeAllRegistries,
		required: true,
		description: 'Initialize all component registries (panels, bars, tabs, etc.)',
	},
	{
		name: 'Page Store',
		init: () => initializePageStore(),
		required: false,
		description: 'Initialize the page Zustand store',
	},
	{
		name: 'Layout Store',
		init: () => initializeLayoutStore(),
		required: true,
		description: 'Initialize the layout Zustand store with registry data',
	},
	{
		name: 'Block Store',
		init: () => initializeBlockStore(),
		required: false,
		description: 'Initialize the block Zustand store',
	},
];
