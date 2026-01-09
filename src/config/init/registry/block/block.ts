// Registry functions
import { registerBlock } from '@/src/core/block/instance/registries';

// Config sources
import { CoreBlocks } from '@/src/config/block/instance';

// Validators
import { validateBlockDefinition } from '@/src/core/block/instance/helpers/validators';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const BLOCK_DEFINITIONS: RegistryDefinition<any>[] = [
	{
		category: 'Core/Block',
		items: CoreBlocks,
		registerFn: registerBlock,
		getIdFn: (block: any) => block.type,
		validateFn: validateBlockDefinition,
	},
];
