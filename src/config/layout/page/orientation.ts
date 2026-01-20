import type { OrientationDefinition } from '@/src/core/layout/page/types';

export const CoreOrientations: OrientationDefinition[] = [
	{ name: 'default', key: 'default', hidden: true },
	{ name: 'portrait', key: 'portrait' },
	{ name: 'landscape', key: 'landscape' },
] as const;