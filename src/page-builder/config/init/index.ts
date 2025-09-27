// Registry
import { initializeAllRegistries } from '@/src/page-builder/state/registries';
import { initializeLayoutStore } from '@/src/page-builder/state/stores/layout';
import { initializeBlockStore } from '@/src/page-builder/state/stores/block';
import { initializePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { InitStep } from '@/src/page-builder/core/init/types';

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
