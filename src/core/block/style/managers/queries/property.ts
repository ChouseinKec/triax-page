// Registry
import { getRegisteredStyles } from '@/core/block/style/state/registry';

// Types
import type { StyleDefinitionRecord } from '@/core/block/style/types';

export function getStyleDefinitions(): StyleDefinitionRecord {
	return getRegisteredStyles();
}
