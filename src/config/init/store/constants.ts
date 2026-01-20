// Store initialization functions
import { initializeBlockStore } from '@/src/state/block/block';
import { initializePageStore } from '@/src/state/layout/page';
import { initializeBarStore } from '@/src/core/layout/bar/state/store';
import { initializeWorkbenchStore } from '@/src/core/layout/workbench/state/store';
import { initializePanelStore } from '@/src/core/layout/panel/store';
import { initViewportStore } from '@/src/core/layout/viewport/state/store';

// Types
import type { StoreDefinition } from '@/src/core/init/store/types';

export const STORE_DEFINITIONS: StoreDefinition[] = [
	{
		name: 'Page',
		initFn: initializePageStore,
	},
	{
		name: 'Workbench',
		initFn: initializeWorkbenchStore,
	},
	{
		name: 'Viewport',
		initFn: initViewportStore,
	},

	{
		name: 'Panel',
		initFn: initializePanelStore,
	},
	{
		name: 'Bar',
		initFn: initializeBarStore,
	},

	{
		name: 'Block',
		initFn: initializeBlockStore,
	},
];
