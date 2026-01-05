// Types
import type { AttributeDefinition } from '@/src/core/block/attribute/types';

// Definitions
import { GLOBAL_DEFINITIONS } from './global';
import { ACCESSIBILITY_DEFINITIONS } from './accessibility';
import { ELEMENT_DEFINITIONS } from './element';
import { SCHEMA_DEFINITIONS } from './schema';

// Merge distinct attribute sources into a single lookup map.
export const CoreAttributes: AttributeDefinition[] = [...GLOBAL_DEFINITIONS, ...ACCESSIBILITY_DEFINITIONS, ...ELEMENT_DEFINITIONS, ...SCHEMA_DEFINITIONS];
