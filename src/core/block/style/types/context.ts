import type { StyleShorthandRecord } from '@/src/core/block/style/types';

/**
 * Represents the style context including selected, registered, and default device, orientation, pseudo and shorthand info.
 */
export type StyleContext = {
	constant: {
		shorthands: StyleShorthandRecord;
	};
};
