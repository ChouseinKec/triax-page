// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';


// Types
import type { BlockTypes, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

/**
 * Reactive hook to get a block's type.
 * @param blockID - The block identifier
 * @returns The block type or undefined if block doesn't exist
 * @example
 * const type = useBlockType('block-123'); // 'text'
 */
export function useBlockType(blockID: BlockID): BlockTypes | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]?.type);
}

/**
 * Reactive hook to get a block's ID.
 * @param blockID - The block identifier to validate
 * @returns The validated block ID or undefined if block doesn't exist
 * @example
 * const id = useBlockID('block-123'); // 'block-123'
 */
export function useBlockID(blockID: BlockID): BlockID | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]?.id);
}

/**
 * Reactive hook to get a block's content block IDs.
 * @param blockID - The block identifier
 * @returns Array of child block IDs or undefined if block doesn't exist
 * @example
 * const contentIDs = useBlockContentIDs('block-123'); // ['block-456', 'block-789']
 */
export function useBlockContentIDs(blockID: BlockID): BlockID[] | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]?.contentIDs);
}

/**
 * Reactive hook to get a block's attributes.
 * @param blockID - The block identifier
 * @returns The block attributes or undefined if block doesn't exist
 * @example
 * const attributes = useBlockAttributes('block-123'); // { className: 'my-class' }
 */
export function useBlockAttributes(blockID: BlockID): BlockAttributes | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]?.attributes);
}

/**
 * Reactive hook to get a block's styles.
 * @param blockID - The block identifier
 * @returns The block styles or undefined if block doesn't exist
 * @example
 * const styles = useBlockStyles('block-123'); // { all: { all: { all: { color: 'red' } } } }
 */
export function useBlockStyles(blockID: BlockID): BlockStyles | null | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]?.styles);
}


