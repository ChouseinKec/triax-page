import { BLOCK_REGISTRY } from './block';
import { LAYOUT_REGISTRY } from './layout';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const REGISTRY_DEFINITIONS: RegistryDefinition<any>[] = [...BLOCK_REGISTRY, ...LAYOUT_REGISTRY];
