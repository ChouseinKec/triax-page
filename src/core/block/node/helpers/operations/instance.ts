// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/instance';
import { NodeStyles, NodeAttributes, NodeDefinition } from '@/core/block/node/types/definition';
import type { OperateResult } from '@/shared/types/result';

/**
 * Compose the final styles for a block instance.
 *
 * We merge user-provided `nodeStyles` on top of `defaultNodeStyles` so that every
 * default key is preserved unless explicitly overridden by the caller.
 *
 * @param nodeStyles - styles supplied at create-time or during updates
 * @param defaultNodeStyles - default style values that should be used when missing
 * @returns the merged nodeStyles object
 */
export function createNodeStyles(nodeStyles: NodeStyles, defaultNodeStyles: NodeStyles): NodeStyles {
	// Spread the defaults first, then overlay with any provided styles so callers
	// can override individual properties without needing to supply all defaults.
	return { ...defaultNodeStyles, ...nodeStyles };
}

/**
 * Compose the attributes object for a new block instance.
 *
 * Attributes behave like styles: default attributes are present unless the
 * caller supplies an override.
 *
 * @param nodeAttributes - attributes provided when creating the block
 * @param defaultNodeAttributes - attribute defaults for the block type
 * @returns merged attributes object
 */
export function createNodeAttributes(nodeAttributes: NodeAttributes, defaultNodeAttributes: NodeAttributes): NodeAttributes {
	return { ...defaultNodeAttributes, ...nodeAttributes };
}

export function createNodeID(): NodeID {
	// Lazy import to avoid adding uuid everywhere; original code used uuidv4
	// but keeping the simple signature — createNode will call this helper
	// The actual ID generation remains in the CRUD caller scope if needed.
	// For now, keep a placeholder that will be replaced by original implementation.
	// NOTE: The original implementation uses uuidv4 from 'uuid'. We'll re-use that via dynamic import.
	const { v4: uuidv4 } = require('uuid');
	return uuidv4();
}

export function createNode(nodeDefinition: NodeDefinition, parentNodeID: NodeID): NodeInstance {
	// Pull defaults from definition — these will be used when creating the
	// initial shape of the NodeInstance.
	const nodeStyles = nodeDefinition.defaultStyles;
	const nodeAttributes = nodeDefinition.defaultAttributes;

	// Build an initial NodeInstance using the block definition defaults. The
	// instance starts with an empty child list (`contentIDs`) and the provided
	// parent relationship.
	const block: NodeInstance = {
		id: createNodeID(),
		parentID: parentNodeID,
		tag: nodeDefinition.defaultTag,
		contentIDs: [],
		styles: createNodeStyles({}, nodeStyles),
		attributes: createNodeAttributes({}, nodeAttributes),
		type: nodeDefinition.key,
	};

	return block;
}

/**
 * Detach a child id from a parent's contentIDs list.
 *
 * This only updates the contentIDs and does `not` update
 * the child block parentID neither removes the block instance from the store.
 * @see {@link deleteNodeFromTree}, {@link detachNodeFromParent}
 *
 * @param parentNodeInstance - the parent block instance
 * @param childNodeID - the child block ID to remove
 */
export function detachNodeFromContentIDs(parentNodeInstance: NodeInstance, childNodeID: NodeID): OperateResult<NodeInstance> {
	// If the child is not present, return the parent unchanged
	if (!parentNodeInstance.contentIDs.includes(childNodeID)) return { success: true, data: parentNodeInstance };

	// Filter out the child ID and return a new instance
	const contentIDs = parentNodeInstance.contentIDs.filter((id) => id !== childNodeID);

	// Return a new NodeInstance with updated contentIDs
	return { success: true, data: { ...parentNodeInstance, contentIDs } };
}

/**
 * Attach a child id to a parent's contentIDs list at the provided index.
 *
 * This only updates the contentIDs and does NOT update
 * the child block parentID neither adds the block instance to the store.
 * @see {@link addNodeToTree}, {@link attachNodeToParent}
 *
 * @param parentNodeInstance - the parent block instance
 * @param childNodeID - the child block ID to add
 * @param targetIndex - the index at which to insert the child ID
 */
export function attachNodeToContentIDs(parentNodeInstance: NodeInstance, childNodeID: NodeID, targetIndex: number): OperateResult<NodeInstance> {
	// Remove any existing occurrence first so insertion will not create duplicates
	const withoutChild = parentNodeInstance.contentIDs.filter((id) => id !== childNodeID);

	// Clamp the target index to valid bounds and insert the child ID
	const index = Math.max(0, Math.min(targetIndex, withoutChild.length));
	const newContentIDs = [...withoutChild];
	newContentIDs.splice(index, 0, childNodeID);

	// Return a new NodeInstance with updated contentIDs
	return { success: true, data: { ...parentNodeInstance, contentIDs: newContentIDs } };
}

/**
 * Update the parentID of a block instance.
 *
 * @param blockInstance - the block instance to update
 * @param parentNodeID - the new parent ID
 */
export function updateNodeParentID(blockInstance: NodeInstance, parentNodeID: NodeID): OperateResult<NodeInstance> {
	// If the parentID is already the desired value, return success with the original instance
	if (blockInstance.parentID === parentNodeID) return { success: true, data: blockInstance };

	// Return a new instance with the updated parentID
	return { success: true, data: { ...blockInstance, parentID: parentNodeID } };
}
