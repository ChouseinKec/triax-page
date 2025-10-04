// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/block/validation';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockInstance, BlockType, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

// Utilities
import { validateOrLog } from '@/src/shared/utilities/validation';

/**
 * Reactive hook to get a block's type for block properties operations.
 * Returns the block type and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block type or undefined if block doesn't exist
 *
 * @example
 * useBlockType('block-123') → 'text'
 */
export function useBlockType(blockID: BlockID): BlockType | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlockType]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.type);
}

/**
 * Reactive hook to get a block's ID for block properties operations.
 * Returns the validated block ID and updates reactively.
 *
 * @param blockID - The block identifier to validate
 * @returns The validated block ID or undefined if block doesn't exist
 *
 * @example
 * useBlockID('block-123') → 'block-123'
 */
export function useBlockID(blockID: BlockID): BlockID | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlockID]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.id);
}

/**
 * Reactive hook to get a block's content block IDs for block properties operations.
 * Returns the array of child block IDs and updates reactively.
 *
 * @param blockID - The block identifier
 * @returns Array of child block IDs or undefined if block doesn't exist
 *
 * @example
 * useBlockContentIDs('block-123') → ['block-456', 'block-789']
 */
export function useBlockContentIDs(blockID: BlockID): BlockID[] | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlockContentIDs]`);
	if (!safeParams) return [];

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.contentIDs);
}

/**
 * Reactive hook to get a block's attributes for block properties operations.
 * Returns the block attributes object and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block attributes or undefined if block doesn't exist
 *
 * @example
 * useBlockAttributes('block-123') → { className: 'my-class' }
 */
export function useBlockAttributes(blockID: BlockID): BlockAttributes | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlockAttributes]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.attributes);
}

/**
 * Reactive hook to get a block's styles for block properties operations.
 * Returns the block styles object and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block styles or undefined if block doesn't exist
 *
 * @example
 * useBlockStyles('block-123') → { all: { all: { all: { color: 'red' } } } }
 */
export function useBlockStyles(blockID: BlockID): BlockStyles | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlockStyles]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.styles);
}

/**
 * Reactive hook to get a complete block instance in block CRUD operations.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if not found
 *
 * @example
 * useBlock('block-123') → { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlock]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]);
}
