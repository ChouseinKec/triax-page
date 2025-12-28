// Registry functions
import { registerStyle, registerUnit, registerToken, registerTokenType } from '@/src/core/block/style/registries';

import { registerBlock } from '@/src/core/block/instance/registries';

import { registerPanel, registerPanelTab } from '@/src/core/layout/panel/registries';
import { registerBar } from '@/src/core/layout/bar/registries';
import { registerDevice, registerPseudo, registerOrientation, registerAction } from '@/src/core/layout/page/registries';

import { registerViewport } from '@/src/core/layout/viewport/registries';

import { registerWorkbench } from '@/src/core/layout/workbench/registries';

// Config sources
import { CoreStyles } from '@/src/config/block/style/definition';
import { CoreTokens } from '@/src/config/block/style/token';
import { CoreTokenTypes } from '@/src/config/block/style/token';

import { CoreBlocks } from '@/src/config/block/block';
import { CoreUnits } from '@/src/config/block/style/unit';

import { CorePanels, CoreTabs } from '@/src/config/layout/panel';
import { CoreBars } from '@/src/config/layout/bar';

import { CoreDevices } from '@/src/config/layout/page/device';
import { CoreOrientations } from '@/src/config/layout/page/orientation';
import { CorePseudos } from '@/src/config/layout/page/pseudo';

import { CoreWorkbenches } from '@/src/config/layout/workbench';
import { WorkbenchSelectAction } from '@/src/config/layout/page/action';

import { CoreViewports } from '@/src/config/layout/viewport';

// Validators
import { validateStyleDefinition, validateUnitDefinition, validateTokenDefinition, validateTokenTypeDefinition } from '@/src/core/block/style/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registries/types';

export const REGISTRY_DEFINITIONS: RegistryDefinition<any>[] = [
	// Style Registries
	{
		category: 'Core/Block/Style/Unit',
		items: CoreUnits,
		registerFn: registerUnit,
		getIdFn: (unit: any) => unit.key,
		validateFn: validateUnitDefinition,
	},

	{
		category: 'Core/Block/Style/Token',
		items: CoreTokens,
		registerFn: registerToken,
		getIdFn: (token: any) => token.key,
		validateFn: validateTokenDefinition,
	},
	{
		category: 'Core/Block/Style/Token/Type',
		items: CoreTokenTypes,
		registerFn: registerTokenType,
		getIdFn: (tokenType: any) => tokenType.key,
		validateFn: validateTokenTypeDefinition,
	},

	{
		category: 'Core/Block/Style',
		items: CoreStyles,
		registerFn: registerStyle,
		getIdFn: (style: any) => style.key,
		validateFn: validateStyleDefinition,
	},

	// Block Registries
	{
		category: 'Core/Block',
		items: CoreBlocks,
		registerFn: registerBlock,
		getIdFn: (block: any) => block.type,
		validateFn: (block: any) => block && typeof block === 'object' && 'type' in block,
	},

	// Layout Registries
	{
		category: 'Core/Panel',
		items: CorePanels,
		registerFn: registerPanel,
		getIdFn: (panel: any) => panel.id,
		validateFn: (panel: any) => panel && typeof panel === 'object' && 'id' in panel,
	},
	{
		category: 'Core/Panel/Tab',
		items: CoreTabs,
		registerFn: registerPanelTab,
		getIdFn: (tab: any) => tab.id,
		validateFn: (tab: any) => tab && typeof tab === 'object' && 'id' in tab,
	},
	{
		category: 'Core/Bar',
		items: CoreBars,
		registerFn: registerBar,
		getIdFn: (bar: any) => bar.id,
		validateFn: (bar: any) => bar && typeof bar === 'object' && 'id' in bar,
	},

	// Page Registries
	{
		category: 'Core/Device',
		items: CoreDevices,
		registerFn: registerDevice,
		getIdFn: (device: any) => device.value,
		validateFn: (device: any) => device && typeof device === 'object' && 'value' in device,
	},
	{
		category: 'Core/Orientation',
		items: CoreOrientations,
		registerFn: registerOrientation,
		getIdFn: (orientation: any) => orientation.value,
		validateFn: (orientation: any) => orientation && typeof orientation === 'object' && 'value' in orientation,
	},
	{
		category: 'Core/Pseudo',
		items: CorePseudos,
		registerFn: registerPseudo,
		getIdFn: (pseudo: any) => pseudo.value,
		validateFn: (pseudo: any) => pseudo && typeof pseudo === 'object' && 'value' in pseudo,
	},

	// Workbench Registries
	{
		category: 'Workbench',
		items: CoreWorkbenches,
		registerFn: registerWorkbench,
		getIdFn: (workbench: any) => workbench.id,
		validateFn: (workbench: any) => workbench && typeof workbench === 'object' && 'id' in workbench,
	},
	{
		category: 'Core/Workbench/Action',
		items: [WorkbenchSelectAction],
		registerFn: registerAction,
		getIdFn: (action: any) => action.id,
		validateFn: (action: any) => action && typeof action === 'object' && 'id' in action,
	},

	// Viewport Registries
	{
		category: 'Core/Viewport',
		items: CoreViewports,
		registerFn: registerViewport,
		getIdFn: (viewport: any) => viewport.id,
		validateFn: (viewport: any) => viewport && typeof viewport === 'object' && 'id' in viewport,
	},
];
