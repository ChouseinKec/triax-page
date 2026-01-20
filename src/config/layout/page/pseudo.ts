import type { PseudoDefinition } from '@/src/core/layout/page/types';

export const CorePseudos: PseudoDefinition[] = [
	{ name: 'default', key: 'default', hidden: true },
	{ name: 'hover', key: 'hover' },
	{ name: 'active', key: 'active' },
	{ name: 'focus', key: 'focus' },
	{ name: 'focus-visible', key: 'focus-visible' },
	{ name: 'visited', key: 'visited' },
	{ name: 'disabled', key: 'disabled' },
	{ name: 'checked', key: 'checked' },
	{ name: 'link', key: 'link' },
	{ name: 'target', key: 'target' },
] as const;
