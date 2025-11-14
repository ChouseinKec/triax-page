import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockDefinition, BlockID, BlockInstance, BlockStyles, BlockAttributes, BlockRecord } from '@/src/core/block/instance/types';

// Helpers
import { findBlockDescendants, moveBlock } from '@/src/core/block/instance/helper';

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
 * createBlockAttributes({ className: 'my-class' }) → { className: 'my-class' }
 */
export function createBlockAttributes(blockAttributes: BlockAttributes, blockDefaults: BlockAttributes): BlockAttributes {
	return { ...blockDefaults, ...blockAttributes };
}

/**
 * Generates a unique identifier for a new block.
 * Uses UUID v4 to ensure uniqueness across the application.
 *
 * @returns A unique block identifier
 *
 * @example
 * createBlockID() → '550e8400-e29b-41d4-a716-446655440000'
 */
export function createBlockID(): BlockID {
	return uuidv4();
}

/**
 * Creates a new block instance with default properties.
 * Retrieves the block definition from the registry and initializes
 * the block with default styles and attributes.
 *
 * @param blockType - The type of block to create
 * @param parentID - The ID of the parent block
 * @returns A new block instance or undefined if block type not found
 *
 * @example
 * createBlock('text', 'parent-123') → { id: '...', parentID: 'parent-123', ... }
 */
export function createBlock(blockDefinition: BlockDefinition, parentID: BlockID): BlockInstance {
	const blockStyles = blockDefinition.styles;
	const blockAttributes = blockDefinition.attributes;

	const block: BlockInstance = {
		id: createBlockID(),
		parentID,
		tag: blockDefinition.tag,
		contentIDs: [],

		styles: createBlockStyles({}, blockStyles),
		attributes: createBlockAttributes({}, blockAttributes),

		type: blockDefinition.type,
	};

	return block;
}

/**
 * Removes a block from its parent's contentIDs array.
 * Updates the parent block's contentIDs to exclude the specified block.
 * Does not remove the block from the blocks collection.
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
 * Removes a block and all its descendants from the block tree.
 * Completely deletes the block subtree from the blocks collection.
 * Does not update parent relationships - use deleteBlockFromParent for that.
 *
 * @param blockID - The block ID to remove from the tree
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the block tree removed
 *
 * @example
 * deleteBlockFromTree('block-123', allBlocks) → updated allBlocks with block and descendants removed
 */
export function deleteBlockFromTree(blockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	// Get all descendants for the block to delete
	const allBlocksToDelete = new Set<BlockID>();
	allBlocksToDelete.add(blockID);

	// Add all descendants
	const descendants = findBlockDescendants(blockID, allBlocks);
	descendants.forEach((descendantId: BlockID) => allBlocksToDelete.add(descendantId));

	// Create updated blocks without deleted blocks
	const finalBlocks = { ...allBlocks };
	allBlocksToDelete.forEach((id) => delete finalBlocks[id]);

	return finalBlocks;
}

/**
 * Adds a block to its parent's contentIDs array.
 * Updates the parent block's contentIDs to include the new block.
 *
 * @param blockInstance - The block instance to add to parent
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
 * Adds a block to the block tree by adding it to the blocks collection and updating its parent's contentIDs.
 * Performs both operations atomically to maintain tree consistency.
 * Use this when creating new blocks that need to be both stored and positioned.
 *
 * @param blockInstance - The block instance to add to the tree
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the new block added and parent relationship updated
 *
 * @example
 * addBlockToTree(newBlock, allBlocks) → updated allBlocks with block added and parent contentIDs updated
 */
export function addBlockToTree(blockInstance: BlockInstance, allBlocks: BlockRecord): BlockRecord {
	// First add the block to the collection
	const blocksWithNewBlock = {
		...allBlocks,
		[blockInstance.id]: blockInstance,
	};

	// Then update the parent relationship
	return addBlockToParent(blockInstance, blocksWithNewBlock);
}

/**
 * Clones a block and its entire subtree, generating new IDs for all blocks.
 * Positions the cloned root block as a sibling after the original block.
 * Returns the updated blocks record with the cloned tree added and positioned.
 *
 * @param blockID - The block ID to clone
 * @param allBlocks - All blocks collection
 * @returns Updated blocks record with the cloned tree added and positioned
 *
 * @example
 * cloneBlock('block-123', allBlocks) → updated allBlocks with cloned tree positioned after original
 */
export function cloneBlock(blockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	const originalBlock = allBlocks[blockID];
	if (!originalBlock) return allBlocks;

	const clonedBlocks: BlockRecord = {};
	const idMap = new Map<string, string>();

	// Recursively clone a block and its children
	function cloneBlockRecursive(block: BlockInstance): BlockInstance {
		const newBlockID = createBlockID();
		idMap.set(block.id, newBlockID);

		const clonedBlock: BlockInstance = {
			...block,
			id: newBlockID,
			contentIDs: [], // Will be populated with cloned child IDs
		};

		clonedBlocks[newBlockID] = clonedBlock;

		// Clone all children recursively
		block.contentIDs.forEach((childID) => {
			const childBlock = allBlocks[childID];
			if (childBlock) {
				const clonedChild = cloneBlockRecursive(childBlock);
				clonedBlock.contentIDs.push(clonedChild.id);
			}
		});

		return clonedBlock;
	}

	// Clone the entire tree starting from the root
	const clonedRootBlock = cloneBlockRecursive(originalBlock);

	// Add cloned blocks to the collection
	const blocksWithClones = { ...allBlocks, ...clonedBlocks };

	// Position the cloned root block after the original block
	if (originalBlock.parentID) {
		const parentBlock = blocksWithClones[originalBlock.parentID];
		if (parentBlock) {
			const originalIndex = parentBlock.contentIDs.indexOf(originalBlock.id);
			if (originalIndex !== -1) {
				// Insert cloned block after the original
				return moveBlock(clonedRootBlock.id, originalBlock.parentID, originalIndex + 1, blocksWithClones);
			}
		}
	}

	// If no parent exists or positioning failed, return blocks with clones (unpositioned)
	return blocksWithClones;
}

/**
 * Overwrites a target block with a source block's content, cloning the entire source tree.
 * Used for paste operations where the target block is replaced with clipboard content.
 *
 * @param sourceBlock - The source block to clone from
 * @param targetBlockID - The target block ID to overwrite
 * @param allBlocks - The complete block record collection
 * @returns BlockRecord with the target block overwritten and source tree cloned
 *
 * @example
 * overwriteBlock(sourceBlock, 'target-123', allBlocks) → updated allBlocks with target block overwritten by source block tree	
*/
export function overwriteBlock(sourceBlock: BlockInstance, targetBlockID: BlockID, allBlocks: BlockRecord): BlockRecord {
	const targetBlock = allBlocks[targetBlockID];
	if (!targetBlock) return allBlocks;

	const clonedBlocks: BlockRecord = {};
	const idMap = new Map<string, string>();

	// Recursively clone a block and its children
	function cloneBlockRecursive(block: BlockInstance, newParentID: BlockID): BlockInstance {
		const newBlockID = createBlockID();
		idMap.set(block.id, newBlockID);

		const clonedBlock: BlockInstance = {
			...block,
			id: newBlockID,
			parentID: newParentID,
			contentIDs: [], // Will be populated with cloned child IDs
		};

		clonedBlocks[newBlockID] = clonedBlock;

		// Clone all children recursively
		block.contentIDs.forEach((childID) => {
			const childBlock = allBlocks[childID];
			if (childBlock) {
				const clonedChild = cloneBlockRecursive(childBlock, newBlockID);
				clonedBlock.contentIDs.push(clonedChild.id);
			}
		});

		return clonedBlock;
	}

	// Clone the source block tree
	const clonedRootBlock = cloneBlockRecursive(sourceBlock, targetBlock.parentID);

	// Create the overwritten target block (keeping target ID and parent)
	const overwrittenTargetBlock: BlockInstance = {
		...clonedRootBlock,
		id: targetBlockID,
		parentID: targetBlock.parentID,
	};

	// Add all cloned blocks except the root (which becomes the target)
	const blocksWithOverwrite = { ...allBlocks, ...clonedBlocks };
	delete blocksWithOverwrite[clonedRootBlock.id]; // Remove the temporary cloned root
	blocksWithOverwrite[targetBlockID] = overwrittenTargetBlock;

	// Update parent's contentIDs to replace old target ID with new one (if IDs changed)
	if (targetBlock.parentID) {
		const parentBlock = blocksWithOverwrite[targetBlock.parentID];
		if (parentBlock) {
			const targetIndex = parentBlock.contentIDs.indexOf(targetBlockID);
			if (targetIndex !== -1) {
				// Replace the target block ID in parent's content (in case it changed)
				const newContentIDs = [...parentBlock.contentIDs];
				newContentIDs[targetIndex] = targetBlockID;
				blocksWithOverwrite[targetBlock.parentID] = {
					...parentBlock,
					contentIDs: newContentIDs,
				};
			}
		}
	}

	return blocksWithOverwrite;
}
