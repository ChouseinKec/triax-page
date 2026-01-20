import { LAYOUT_DEFINITIONS } from './layout';
import { VIEW_DEFINITIONS } from './view';
import { BENCH_DEFINITIONS } from './bench';
import { PAGE_DEFINITIONS } from './page';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const LAYOUT_REGISTRY: RegistryDefinition<any>[] = [...LAYOUT_DEFINITIONS, ...PAGE_DEFINITIONS, ...BENCH_DEFINITIONS, ...VIEW_DEFINITIONS];
