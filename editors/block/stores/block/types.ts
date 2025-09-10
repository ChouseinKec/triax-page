import type { BlockInstance, AttributeKeys, BlockID } from '@/editors/block/types';

export interface BlockStoreProps {
	selectedBlockID: BlockID | null;
	allBlocks: Record<BlockID, BlockInstance>;
	rootBlocks: BlockInstance[];
	/**
	 * Sets the currently selected block by ID.
	 * Accepts null to clear selection.
	 * Pure data mutation without validation
	 *
	 * @param blockID - The block ID to select or null to clear
	 *
	 * @example
	 * selectBlock('block-123') // Select block
	 * selectBlock(null) // Clear selection
	 */
	selectBlock: (blockID: BlockID | null) => void;

	/**
	 * Retrieves all blocks in the store.
	 * Pure data access without validation
	 *
	 * @returns Complete collection of all blocks keyed by ID
	 *
	 * @example
	 * getAllBlocks() // → { 'block-123': BlockInstance, 'block-456': BlockInstance }
	 */
	getAllBlocks: () => Record<BlockID, BlockInstance>;

	/**
	 * Gets the currently selected block ID.
	 * Pure data access without validation
	 *
	 * @returns Currently selected block ID or null if none selected
	 *
	 * @example
	 * getSelectedBlockID() // → 'block-123' | null
	 */
	getSelectedBlockID: () => BlockID | null;

	/**
	 * Updates a single block in the store.
	 * Pure data mutation without validation
	 *
	 * @param blockID - The block ID to update
	 * @param block - Complete updated block instance
	 *
	 * @example
	 * updateBlock('block-123', updatedBlockInstance)
	 */
	updateBlock: (blockID: BlockID, block: BlockInstance) => void;

	/**
	 * Updates multiple blocks in the store.
	 * Can be used for adding new blocks or updating existing ones.
	 * Pure data mutation without validation
	 *
	 * @param blocks - Record of blocks to add/update in the store
	 *
	 * @example
	 * updateBlocks({ 'block-123': blockInstance, 'block-456': anotherBlock })
	 */
	updateBlocks: (blocks: Record<BlockID, BlockInstance>) => void;

	/**
	 * Deletes blocks from the store.
	 * Pure data mutation without validation
	 *
	 * @param blockIDs - Array of block IDs to delete from the store
	 *
	 * @example
	 * deleteBlocks(['block-123', 'block-456'])
	 */
	deleteBlocks: (blockIDs: BlockID[]) => void;

	/**
	 * Retrieves a specific attribute value from a block.
	 * Pure data access without validation
	 *
	 * @param blockID - The block identifier
	 * @param attribute - The attribute key to retrieve
	 * @returns The attribute value or undefined if not found
	 *
	 * @example
	 * getBlockAttribute('block-123', 'className') // → 'my-class' | undefined
	 */
	getBlockAttribute: (blockID: BlockID, attribute: AttributeKeys) => string | undefined;
}
