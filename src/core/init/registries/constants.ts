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
import { validateBlockDefinition } from '@/src/core/block/instance/helpers';
import { validatePanelDefinition, validatePanelTabDefinition } from '@/src/core/layout/panel/helpers';
import { validateBarDefinition } from '@/src/core/layout/bar/helpers';
import { validateWorkbenchDefinition } from '@/src/core/layout/workbench/helpers';
import { validateViewportDefinition } from '@/src/core/layout/viewport/helpers';
import { validateDeviceDefinition, validateOrientationDefinition, validatePseudoDefinition, validateActionDefinition } from '@/src/core/layout/page/helpers';

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
		validateFn: validateBlockDefinition,
	},

	// Layout Registries
	{
		category: 'Core/Panel',
		items: CorePanels,
		registerFn: registerPanel,
		getIdFn: (panel: any) => panel.id,
		validateFn: validatePanelDefinition,
	},
	{
		category: 'Core/Panel/Tab',
		items: CoreTabs,
		registerFn: registerPanelTab,
		getIdFn: (tab: any) => tab.id,
		validateFn: validatePanelTabDefinition,
	},
	{
		category: 'Core/Bar',
		items: CoreBars,
		registerFn: registerBar,
		getIdFn: (bar: any) => bar.id,
		validateFn: validateBarDefinition,
	},

	// Page Registries
	{
		category: 'Core/Device',
		items: CoreDevices,
		registerFn: registerDevice,
		getIdFn: (device: any) => device.value,
		validateFn: validateDeviceDefinition,
	},
	{
		category: 'Core/Orientation',
		items: CoreOrientations,
		registerFn: registerOrientation,
		getIdFn: (orientation: any) => orientation.value,
		validateFn: validateOrientationDefinition,
	},
	{
		category: 'Core/Pseudo',
		items: CorePseudos,
		registerFn: registerPseudo,
		getIdFn: (pseudo: any) => pseudo.value,
		validateFn: validatePseudoDefinition,
	},

	// Workbench Registries
	{
		category: 'Workbench',
		items: CoreWorkbenches,
		registerFn: registerWorkbench,
		getIdFn: (workbench: any) => workbench.id,
		validateFn: validateWorkbenchDefinition,
	},
	{
		category: 'Core/Workbench/Action',
		items: [WorkbenchSelectAction],
		registerFn: registerAction,
		getIdFn: (action: any) => action.id,
		validateFn: validateActionDefinition,
	},

	// Viewport Registries
	{
		category: 'Core/Viewport',
		items: CoreViewports,
		registerFn: registerViewport,
		getIdFn: (viewport: any) => viewport.id,
		validateFn: validateViewportDefinition,
	},
];
