// Types
import type { SeparatorDefinition } from '@/src/core/block/style/types';

/**
 * Default value separators for CSS style properties that accept multiple values.
 */
export const SEPARATOR_DEFINITIONS: SeparatorDefinition[] = [
	{ key: ',', value: ',' },
	{ key: ' ', value: ' ' },
	{ key: '/', value: '/' },
];
