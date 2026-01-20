// Registry functions
import { registerView, registerAction } from '@/src/core/layout/viewport/state/registry';

// Config sources
import { CoreViews, CoreActions } from '@/src/config/layout/view';

// Validators
import { validateViewDefinition, validateActionDefinition } from '@/src/core/layout/viewport/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const VIEW_DEFINITIONS: RegistryDefinition<any>[] = [
	{
		category: 'Core/Viewport/Views',
		items: CoreViews,
		registerFn: registerView,
		getIdFn: (viewport: any) => viewport.id,
		validateFn: validateViewDefinition,
	},
	{
		category: 'Core/Viewport/Action',
		items: CoreActions,
		registerFn: registerAction,
		getIdFn: (action: any) => action.key,
		validateFn: validateActionDefinition,
	},
];
