// Registry
import { registerAttributes } from '@/core/block/attribute/definition/states/registry';

// Definitions
import { GLOBAL_DEFINITIONS } from './global';
import { ACCESSIBILITY_DEFINITIONS } from './accessibility';
import { ELEMENT_DEFINITIONS } from './element';
import { SCHEMA_DEFINITIONS } from './schema';

// Register attributes directly
registerAttributes([...GLOBAL_DEFINITIONS, ...ACCESSIBILITY_DEFINITIONS, ...ELEMENT_DEFINITIONS, ...SCHEMA_DEFINITIONS]);
