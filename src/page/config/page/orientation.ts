import type { OrientationDefinition } from '@/src/page/core/page/types/orientation';

export const OrientationDefinitions: OrientationDefinition[] = [
	{ name: 'all', value: 'all', hidden: true },
	{ name: 'portrait', value: 'portrait' },
	{ name: 'landscape', value: 'landscape' },
] as const;