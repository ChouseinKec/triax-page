// Types
import type { BlockDefinition, BlockID, BlockInstance, BlockStyles, BlockAttributes } from '@/core/block/instance/types';
import type { OperateResult } from '@/shared/types/result';

/**
 * Compose the final styles for a block instance.
 *
 * We merge user-provided `blockStyles` on top of `blockDefaults` so that every
 * default key is preserved unless explicitly overridden by the caller.
 *
 * @param blockStyles - styles supplied at create-time or during updates
 * @param blockDefaults - default style values that should be used when missing
 * @returns the merged BlockStyles object
 */
export function createBlockStyles(blockStyles: BlockStyles, blockDefaults: BlockStyles): BlockStyles {
	// Spread the defaults first, then overlay with any provided styles so callers
	// can override individual properties without needing to supply all defaults.
	return { ...blockDefaults, ...blockStyles };
}

/**
 * Compose the attributes object for a new block instance.
 *
 * Attributes behave like styles: default attributes are present unless the
 * caller supplies an override.
 *
 * @param blockAttributes - attributes provided when creating the block
 * @param blockDefaults - attribute defaults for the block type
 * @returns merged attributes object
 */
export function createBlockAttributes(blockAttributes: BlockAttributes, blockDefaults: BlockAttributes): BlockAttributes {
	return { ...blockDefaults, ...blockAttributes };
}

export function createBlockID(): BlockID {
	// Lazy import to avoid adding uuid everywhere; original code used uuidv4
	// but keeping the simple signature — createBlock will call this helper
	// The actual ID generation remains in the CRUD caller scope if needed.
	// For now, keep a placeholder that will be replaced by original implementation.
	// NOTE: The original implementation uses uuidv4 from 'uuid'. We'll re-use that via dynamic import.
	const { v4: uuidv4 } = require('uuid');
	return uuidv4();
}

export function createBlock(blockDefinition: BlockDefinition, parentID: BlockID): BlockInstance {
	// Pull defaults from definition — these will be used when creating the
	// initial shape of the BlockInstance.
	const blockStyles = blockDefinition.defaultStyles;
	const blockAttributes = blockDefinition.defaultAttributes;

	// Build an initial BlockInstance using the block definition defaults. The
	// instance starts with an empty child list (`contentIDs`) and the provided
	// parent relationship.
	const block: BlockInstance = {
		id: createBlockID(),
		parentID,
		tag: blockDefinition.defaultTag,
		contentIDs: [],
		styles: createBlockStyles({}, blockStyles),
		attributes: createBlockAttributes({}, blockAttributes),
		type: blockDefinition.type,
	};

	return block;
}

/**
 * Detach a child id from a parent's contentIDs list.
 *
 * This only updates the contentIDs and does `not` update
 * the child block parentID neither removes the block instance from the store.
 * @see {@link deleteBlockFromTree}, {@link detachBlockFromParent}
 *
 * @param parentBlockInstance - the parent block instance
 * @param childBlockID - the child block ID to remove
 */
export function detachBlockFromContentIDs(parentBlockInstance: BlockInstance, childBlockID: BlockID): OperateResult<BlockInstance> {
	// If the child is not present, return the parent unchanged
	if (!parentBlockInstance.contentIDs.includes(childBlockID)) return { success: true, data: parentBlockInstance };

	// Filter out the child ID and return a new instance
	const contentIDs = parentBlockInstance.contentIDs.filter((id) => id !== childBlockID);

	// Return a new BlockInstance with updated contentIDs
	return { success: true, data: { ...parentBlockInstance, contentIDs } };
}

/**
 * Attach a child id to a parent's contentIDs list at the provided index.
 *
 * This only updates the contentIDs and does NOT update
 * the child block parentID neither adds the block instance to the store.
 * @see {@link addBlockToTree}, {@link attachBlockToParent}
 *
 * @param parentBlockInstance - the parent block instance
 * @param childBlockID - the child block ID to add
 * @param targetIndex - the index at which to insert the child ID
 */
export function attachBlockToContentIDs(parentBlockInstance: BlockInstance, childBlockID: BlockID, targetIndex: number): OperateResult<BlockInstance> {
	// Remove any existing occurrence first so insertion will not create duplicates
	const withoutChild = parentBlockInstance.contentIDs.filter((id) => id !== childBlockID);

	// Clamp the target index to valid bounds and insert the child ID
	const index = Math.max(0, Math.min(targetIndex, withoutChild.length));
	const newContentIDs = [...withoutChild];
	newContentIDs.splice(index, 0, childBlockID);

	// Return a new BlockInstance with updated contentIDs
	return { success: true, data: { ...parentBlockInstance, contentIDs: newContentIDs } };
}

/**
 * Update the parentID of a block instance.
 *
 * @param blockInstance - the block instance to update
 * @param parentID - the new parent ID
 */
export function updateBlockParentID(blockInstance: BlockInstance, parentID: BlockID): OperateResult<BlockInstance> {
	// If the parentID is already the desired value, return success with the original instance
	if (blockInstance.parentID === parentID) return { success: true, data: blockInstance };

	// Return a new instance with the updated parentID
	return { success: true, data: { ...blockInstance, parentID } };
}
