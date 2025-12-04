import type { AttributeRecord } from '@/src/core/block/attribute/types';
import { GLOBAL_ATTRIBUTES } from './global';
import { ACCESSIBILITY_ATTRIBUTES } from './accessibility';
import { ELEMENT_ATTRIBUTES } from './element';
import { SCHEMA_ATTRIBUTES } from './schema';

// Merge distinct attribute sources into a single lookup map.
export const ATTRIBUTE_DEFINITIONS: Partial<AttributeRecord> = {
	...GLOBAL_ATTRIBUTES,
	...ACCESSIBILITY_ATTRIBUTES,
	...ELEMENT_ATTRIBUTES,
	...SCHEMA_ATTRIBUTES,
} as const;
