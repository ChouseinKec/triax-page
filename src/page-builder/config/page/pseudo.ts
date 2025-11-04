import type { PseudoDefinition } from '@/src/page-builder/core/page/types/pseudo';

export const PseudoDefinitions: PseudoDefinition[] = [
	{ name: 'hover', value: 'hover' },
	{ name: 'active', value: 'active' },
] as const;
