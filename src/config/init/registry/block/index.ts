import { BLOCK_DEFINITIONS } from './block';
import { STYLE_DEFINITIONS } from './style';
import { ELEMENT_DEFINITIONS } from './element';
import { ATTRIBUTE_DEFINITIONS } from './attribute';

// Types
import type { RegistryDefinition } from '@/src/core/init/registry/types';

export const BLOCK_REGISTRY: RegistryDefinition<any>[] = [
    ...BLOCK_DEFINITIONS,
    ...STYLE_DEFINITIONS,
    ...ELEMENT_DEFINITIONS,
    ...ATTRIBUTE_DEFINITIONS,
];