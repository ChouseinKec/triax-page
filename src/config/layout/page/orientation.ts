import type { OrientationDefinition } from '@/src/core/layout/page/types';

export const CoreOrientations: OrientationDefinition[] = [
	{ name: 'all', value: 'all', hidden: true },
	{ name: 'portrait', value: 'portrait' },
	{ name: 'landscape', value: 'landscape' },
] as const;