import type { PseudoDefinition } from '@/src/core/layout/page/types';

export const CorePseudos: PseudoDefinition[] = [
	{ name: 'all', value: 'all', hidden: true },
	{ name: 'hover', value: 'hover' },
	{ name: 'active', value: 'active' },
	{ name: 'focus', value: 'focus' },
	{ name: 'focus-visible', value: 'focus-visible' },
	{ name: 'visited', value: 'visited' },
	{ name: 'disabled', value: 'disabled' },
	{ name: 'checked', value: 'checked' },
	{ name: 'link', value: 'link' },
	{ name: 'target', value: 'target' },
] as const;
