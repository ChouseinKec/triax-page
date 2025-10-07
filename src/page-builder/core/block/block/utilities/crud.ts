import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockDefinition, BlockInstance, BlockStyles, BlockID, BlockAttributes, BlockRecord } from '@/src/page-builder/core/block/block/types';

// Utilities
import { findBlockDescendants } from '@/src/page-builder/core/block/block/utilities';

/**
 * Creates default style structure for a new block.
 * Initializes with default values and nested device/orientation/pseudo structure.
 * Merges provided styles with defaults if specified.
 *
 * @param styles - Optional custom styles to merge with defaults
 * @returns Default block style definition with all device contexts
 *
 * @example
 * createBlockStyles() → { all: { all: { default: { color: '', fontSize: '' } } } }
 * createBlockStyles({ all: { all: { color: 'red' } } }) → merged styles
 */
export function createBlockStyles(blockStyles: BlockStyles, blockDefaults: BlockStyles): BlockStyles {
	return { ...blockDefaults, ...blockStyles };
}

/**
 * Creates default attributes structure for a new block.
 * Merges provided attributes with empty defaults if specified.
 *
 * @param attributes - Optional custom attributes to merge with defaults
 * @returns Default block attributes object
 *
 * @example
 * createBlockAttributes() → {}
 * createBlockAttributes({ className: 'my-class' }) → { className: 'my-class' }
 */
export function createBlockAttributes(blockAttributes: BlockAttributes, blockDefaults: BlockAttributes): BlockAttributes {
	return { ...blockDefaults, ...blockAttributes };
}

export function createBlockID(): BlockID {
	return uuidv4();
}

/**
 * Creates a new block instance with the specified definition and parent.
 * Generates a unique ID and initializes with default or provided styles and attributes.
 *
 * @param definition - The block definition containing type and configuration
 * @param parentID - The ID of the parent block
 * @param styles - Optional custom styles to apply to the block
 * @param attributes - Optional custom attributes to apply to the block
 * @returns A new block instance
 *
 * @example
 * createBlock(textDefinition, 'parent-123') → { id: 'uuid', type: 'text', ... }
 * createBlock(textDefinition, 'parent-123', customStyles, customAttributes)
 */
export function createBlock(blockDefinition: BlockDefinition, blockParentID: BlockID, blockStyles: BlockStyles, blockAttributes: BlockAttributes): BlockInstance {
	const block: BlockInstance = {
		id: createBlockID(),
		parentID: blockParentID,
		contentIDs: [],

		styles: createBlockStyles(blockStyles, blockDefinition.styles),
		attributes: createBlockAttributes(blockAttributes, blockDefinition.attributes),

		type: blockDefinition.type,
	};

	return block;
}

/**
 * Removes a block from its parent's contentIDs array.
 * Updates the parent block's contentIDs to exclude the specified block.
 *
 * @param blockID - The block ID to remove from its parent
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with parent relationship removed
 *
 * @example
 * deleteBlockFromParent('child-123', allBlocks) → updated allBlocks with child removed from parent's contentIDs
 */
export function deleteBlockFromParent(blockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	const block = allBlocks[blockID];
	if (!block?.parentID) return allBlocks;

	const parentBlock = allBlocks[block.parentID];
	if (!parentBlock) return allBlocks;

	const updatedParent = {
		...parentBlock,
		contentIDs: parentBlock.contentIDs.filter((id: BlockID) => id !== blockID),
	};

	return {
		...allBlocks,
		[block.parentID]: updatedParent,
	};
}

/**
 * Adds a block to its parent's contentIDs array.
 * Updates the parent block's contentIDs to include the new block.
 *
 * @param block - The block instance to add to parent
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with parent relationship added
 *
 * @example
 * addBlockToParent(newBlock, allBlocks) → updated allBlocks with block added to parent's contentIDs
 */
export function addBlockToParent(blockInstance: BlockInstance, allBlocks: BlockRecord): BlockRecord {
	if (!blockInstance.parentID) return allBlocks;

	const parentBlock = allBlocks[blockInstance.parentID];
	if (!parentBlock) return allBlocks;

	const updatedParent = {
		...parentBlock,
		contentIDs: [...parentBlock.contentIDs, blockInstance.id],
	};

	return {
		...allBlocks,
		[blockInstance.parentID]: updatedParent,
	};
}

/**
 * Processes deletion of blocks by finding all descendants and removing them from the store.
 * Also clears the selected block if it's being deleted.
 *
 * @param blockIDs - Array of block IDs to delete
 * @param allBlocks - All blocks collection
 * @param selectedBlockID - Currently selected block ID
 * @returns Object containing updated blocks and new selected block ID
 *
 * @example
 * processBlockDeletions(['block-123'], allBlocks, 'block-456') → { allBlocks: updatedBlocks, selectedBlockID: null }
 */
export function processBlockDeletions(blockIDs: BlockID[], allBlocks: BlockRecord, selectedBlockID: BlockID | null): { allBlocks: BlockRecord; selectedBlockID: BlockID | null } {
	// Get all descendants for each queued block
	const allBlocksToDelete = new Set<BlockID>();

	blockIDs.forEach((blockID) => {
		allBlocksToDelete.add(blockID);

		// Add all descendants
		const descendants = findBlockDescendants([blockID], allBlocks);
		descendants.forEach((descendantId: BlockID) => allBlocksToDelete.add(descendantId));
	});

	// Create updated blocks without deleted blocks
	const updatedBlocks = { ...allBlocks };
	let newSelectedBlockID = selectedBlockID;

	// Delete all blocks
	allBlocksToDelete.forEach((blockID) => {
		if (newSelectedBlockID === blockID) newSelectedBlockID = null;
		delete updatedBlocks[blockID];
	});

	return {
		allBlocks: updatedBlocks,
		selectedBlockID: newSelectedBlockID,
	};
}

/**
 * Clones a block and its entire subtree, generating new IDs for all blocks.
 * Optionally allows specifying a new ID for the root cloned block.
 * @param blockInstance - The root block instance to clone
 * @param allBlocks - All blocks collection to reference children
 * @param blockID - Optional new ID for the root cloned block
 *
 * @example
 * cloneBlock(block, allBlocks) → { clonedBlocks: {...}, rootBlock: {...} }
 */
export function cloneBlock(blockInstance: BlockInstance, allBlocks: BlockRecord, blockID?: BlockID): { clonedBlocks: BlockRecord; rootBlock: BlockInstance } {
	const duplicatedBlocks: BlockRecord = {};
	const idMap = new Map<string, string>();

	// Helper function to recursively duplicate a block and its children
	function clone(block: BlockInstance, isRoot = false): BlockInstance {
		const newBlockID = isRoot && blockID ? blockID : createBlockID();
		idMap.set(block.id, newBlockID);

		const duplicatedBlock: BlockInstance = {
			...block,
			id: newBlockID,
			contentIDs: [], // Will be populated with new child IDs
		};

		duplicatedBlocks[newBlockID] = duplicatedBlock;

		// Duplicate all children
		block.contentIDs.forEach((childID) => {
			const childBlock = allBlocks[childID];
			if (childBlock) {
				const clonedChild = clone(childBlock);
				duplicatedBlock.contentIDs.push(clonedChild.id);
			}
		});

		return duplicatedBlock;
	}

	// Start duplication from root
	const clonedBlock = clone(blockInstance, true);

	return {
		clonedBlocks: duplicatedBlocks,
		rootBlock: clonedBlock,
	};
}
