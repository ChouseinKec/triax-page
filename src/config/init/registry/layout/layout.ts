// Registry functions
import { registerPanel, registerPanelTab } from '@/src/core/layout/panel/registries';
import { registerBar } from '@/src/core/layout/bar/registries';

// Config sources
import { CorePanels, CoreTabs } from '@/src/config/layout/panel';
import { CoreBars } from '@/src/config/layout/bar';

// Validators
import { validatePanelDefinition, validatePanelTabDefinition } from '@/src/core/layout/panel/helpers';
import { validateBarDefinition } from '@/src/core/layout/bar/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const LAYOUT_DEFINITIONS: RegistryDefinition<any>[] = [
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

];
