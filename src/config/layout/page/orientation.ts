import type { OrientationDefinition } from '@/core/layout/page/types';
import { registerOrientations } from '@/core/layout/page/registries';

export const CoreOrientations: OrientationDefinition[] = [
	{ name: 'default', key: 'default', hidden: true },
	{ name: 'portrait', key: 'portrait' },
	{ name: 'landscape', key: 'landscape' },
] as const;

// Register orientations directly
registerOrientations(CoreOrientations);