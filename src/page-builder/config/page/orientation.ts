import type { OrientationDefinition } from '@/src/page-builder/core/page/types/orientation';

export const OrientationDefinitions: OrientationDefinition[] = [
	{ name: 'portrait', value: 'portrait' },
	{ name: 'landscape', value: 'landscape' },
] as const;