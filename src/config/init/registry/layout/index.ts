import { LAYOUT_DEFINITIONS } from './layout';
import { VIEWPORT_DEFINITIONS } from './viewport';
import { WORKBENCH_DEFINITIONS } from './workbench';
import { PAGE_DEFINITIONS } from './page';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const LAYOUT_REGISTRY: RegistryDefinition<any>[] = [...LAYOUT_DEFINITIONS, ...PAGE_DEFINITIONS, ...WORKBENCH_DEFINITIONS, ...VIEWPORT_DEFINITIONS];
