// Registry functions
import { registerDevice, registerPseudo, registerOrientation, registerAction } from '@/src/core/layout/page/registries';

// Config sources
import { CoreDevices } from '@/src/config/layout/page/device';
import { CoreOrientations } from '@/src/config/layout/page/orientation';
import { CorePseudos } from '@/src/config/layout/page/pseudo';
import { CoreActions } from '@/src/config/layout/page/action';

// Validators
import { validateDeviceDefinition, validateOrientationDefinition, validatePseudoDefinition, validateActionDefinition } from '@/src/core/layout/page/helpers';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const PAGE_DEFINITIONS: RegistryDefinition<any>[] = [
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

	{
		category: 'Core/Page/Action',
		items: CoreActions,
		registerFn: registerAction,
		getIdFn: (action: any) => action.id,
		validateFn: validateActionDefinition,
	},
];
