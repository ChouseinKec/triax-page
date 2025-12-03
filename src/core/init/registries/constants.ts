// Registry functions
import { registerBlock } from '@/src/core/block/instance/registries';
import { registerPanel, registerPanelTab } from '@/src/core/layout/panel/registries';
import { registerBar } from '@/src/core/layout/bar/registries';
import { registerDevice, registerPseudo, registerOrientation, registerAction } from '@/src/core/layout/page/registries';
import { registerViewport } from '@/src/core/layout/viewport/registries';
import { registerWorkbench } from '@/src/core/layout/workbench/registries';

// Config sources
import { CoreBlocks } from '@/src/config/block';
import { CorePanels, CoreTabs } from '@/src/config/layout/panel';
import { CoreBars } from '@/src/config/layout/bar';
import { CoreDevices } from '@/src/config/layout/page/device';
import { CoreOrientations } from '@/src/config/layout/page/orientation';
import { CorePseudos } from '@/src/config/layout/page/pseudo';
import { CoreViewports } from '@/src/config/layout/viewport';
import { CoreWorkbenches } from '@/src/config/layout/workbench';
import { WorkbenchSelectAction } from '@/src/config/layout/page/action';

// Types
import type { RegistryDefinition } from '@/src/core/init/registries/types';

export const REGISTRY_DEFINITIONS: RegistryDefinition<any>[] = [
	{
		category: 'Core/Block',
		items: () => CoreBlocks,
		registerFn: registerBlock,
		getIdFn: (block: any) => block.type,
		validateFn: (block: any) => block && typeof block === 'object' && 'type' in block,
	},
	{
		category: 'Core/Panel',
		items: () => CorePanels,
		registerFn: registerPanel,
		getIdFn: (panel: any) => panel.id,
		validateFn: (panel: any) => panel && typeof panel === 'object' && 'id' in panel,
	},
	{
		category: 'Core/Panel/Tab',
		items: () => CoreTabs,
		registerFn: registerPanelTab,
		getIdFn: (tab: any) => tab.id,
		validateFn: (tab: any) => tab && typeof tab === 'object' && 'id' in tab,
	},
	{
		category: 'Core/Bar',
		items: () => CoreBars,
		registerFn: registerBar,
		getIdFn: (bar: any) => bar.id,
		validateFn: (bar: any) => bar && typeof bar === 'object' && 'id' in bar,
	},
	{
		category: 'Core/Device',
		items: () => CoreDevices,
		registerFn: registerDevice,
		getIdFn: (device: any) => device.value,
		validateFn: (device: any) => device && typeof device === 'object' && 'value' in device,
	},
	{
		category: 'Core/Orientation',
		items: () => CoreOrientations,
		registerFn: registerOrientation,
		getIdFn: (orientation: any) => orientation.value,
		validateFn: (orientation: any) => orientation && typeof orientation === 'object' && 'value' in orientation,
	},
	{
		category: 'Core/Pseudo',
		items: () => CorePseudos,
		registerFn: registerPseudo,
		getIdFn: (pseudo: any) => pseudo.value,
		validateFn: (pseudo: any) => pseudo && typeof pseudo === 'object' && 'value' in pseudo,
	},
	{
		category: 'Workbench',
		items: () => CoreWorkbenches,
		registerFn: registerWorkbench,
		getIdFn: (workbench: any) => workbench.id,
		validateFn: (workbench: any) => workbench && typeof workbench === 'object' && 'id' in workbench,
	},
	{
		category: 'Core/Workbench/Action',
		items: () => [WorkbenchSelectAction],
		registerFn: registerAction,
		getIdFn: (action: any) => action.id,
		validateFn: (action: any) => action && typeof action === 'object' && 'id' in action,
	},
	{
		category: 'Core/Viewport',
		items: () => CoreViewports,
		registerFn: registerViewport,
		getIdFn: (viewport: any) => viewport.id,
		validateFn: (viewport: any) => viewport && typeof viewport === 'object' && 'id' in viewport,
	},
];
