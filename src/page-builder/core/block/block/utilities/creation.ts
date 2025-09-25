import { v4 as uuidv4 } from 'uuid';

// Defaults
import { BlockStyleDefaults } from '@/src/page-builder/core/block/block/constants/defaults';

// Types
import type { BlockStyles } from '@/src/page-builder/core/block/block/types';
import type { BlockDefinition, BlockInstance } from '@/src/page-builder/core/block/block/types';

/**
 * Creates default style structure for a new block.
 * Initializes with default values and nested device/orientation/pseudo structure.
 *
 * @returns Default block style definition with all device contexts
 *
 * @example
 * createBlockStyles() // → { all: { all: { default: { color: '', fontSize: '' } } } }
 */
export function createBlockStyles(): BlockStyles {
	const defaults = {
		...BlockStyleDefaults,
		all: {
			...BlockStyleDefaults.all,
		},
	};

	return {
		all: {
			all: defaults,
		},
	};
}

export function createBlock(definition: BlockDefinition, parentID?: string): BlockInstance {
	const block: BlockInstance = {
		id: uuidv4(),
		parentID: parentID ?? null,
		contentIDs: [],

		styles: createBlockStyles(),
		attributes: {},

		type: definition.type,
	};

	return block;
}
