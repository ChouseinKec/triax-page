import type { PseudoDefinition } from '@/src/page-builder/core/page/types/pseudo';

export const PseudoDefinitions: PseudoDefinition[] = [
	{ name: 'all', value: 'all', hidden: true },
	{ name: 'hover', value: 'hover' },
	{ name: 'active', value: 'active' },
] as const;
