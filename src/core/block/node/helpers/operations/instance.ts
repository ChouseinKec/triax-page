// Types
import type { NodeID, NodeInstance, NodeStyles, NodeAttributes, NodeDefinition } from '@/core/block/node/types/';
import type { ElementKey } from '@/core/block/element/types';
import type { OperateResult } from '@/shared/types/result';

// External
import { v4 as uuidv4 } from 'uuid';

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

/**
 * Generate a unique identifier for a new node instance.
 *
 * This function creates a new UUID v4 string to serve as the unique identifier
 * for a block instance. The ID is generated using the 'uuid' library and ensures
 * uniqueness across all nodes in the system.
 *
 * @returns A unique string identifier for the node
 */
export function createNodeID(): NodeID {
	return uuidv4();
}

/**
 * Create a new node instance with default properties and validation.
 *
 * This function instantiates a new NodeInstance based on the provided definition,
 * applying default styles and attributes while allowing for custom overrides.
 * It validates that the specified element key is supported by the node definition
 * and initializes the node with an empty child list and the provided parent relationship.
 *
 * @param nodeDefinition - The definition blueprint containing default properties and supported element keys
 * @param targetNodeID - The ID of the parent node this instance will be attached to
 * @param nodeTag - The HTML element key to use for this node (must be supported by the definition)
 * @param options - Optional configuration including custom data to store with the node
 * @returns An OperateResult containing the newly created node instance or an error if validation fails
 */
export function createNode(
	nodeDefinition: NodeDefinition, //
	targetNodeID: NodeID,
	nodeTag: ElementKey,
	options?: { data?: {} },
): OperateResult<NodeInstance> {
	// Pull defaults from definition — these will be used when creating the
	// initial shape of the NodeInstance.
	const nodeStyles = nodeDefinition.defaultStyles;
	const nodeAttributes = nodeDefinition.defaultAttributes;

	// If a tag override is provided, ensure it's valid for this block type
	const elementKeys = nodeDefinition.elementKeys;
	if (nodeTag && elementKeys && !elementKeys.includes(nodeTag)) return { success: false, error: `Tag '${nodeTag}' is not available for node type '${nodeDefinition.key}'.` };

	// Build an initial NodeInstance using the block definition defaults. The
	// instance starts with an empty child list (`childNodeIDs`) and the provided
	// parent relationship.
	const block: NodeInstance = {
		id: createNodeID(),
		parentID: targetNodeID,
		elementKey: nodeTag,
		childNodeIDs: [],
		styles: createNodeStyles({}, nodeStyles),
		attributes: createNodeAttributes({}, nodeAttributes),
		definitionKey: nodeDefinition.key,
		data: options?.data || {},
	};

	return { success: true, data: block };
}

/**
 * Detach a child node ID from a parent's child list.
 *
 * This operation removes the specified child ID from the parent's childNodeIDs array,
 * effectively breaking the parent-child relationship at the list level. The child
 * node remains in the store but is no longer referenced as a child of this parent.
 *
 * This only updates the childNodeIDs and does not update the child's parentID
 * or remove the node instance from the store.
 * @see {@link deleteNodeFromTree}, {@link detachNodeFromParent}
 *
 * @param targetNodeInstance - The parent node instance whose child list will be modified
 * @param sourceNodeID - The ID of the child node to remove from the parent's child list
 * @returns An OperateResult containing the updated parent node instance with the child removed
 */
export function detachNodeIdFromParent(targetNodeInstance: NodeInstance, sourceNodeID: NodeID): OperateResult<NodeInstance> {
	// If the child is not present, return the parent unchanged
	if (!targetNodeInstance.childNodeIDs.includes(sourceNodeID)) return { success: true, data: targetNodeInstance };

	// Filter out the child ID and return a new instance
	const childNodeIDs = targetNodeInstance.childNodeIDs.filter((id) => id !== sourceNodeID);

	// Return a new NodeInstance with updated childNodeIDs
	return { success: true, data: { ...targetNodeInstance, childNodeIDs } };
}

/**
 * Attach a child node ID to a parent's child list at the specified index.
 *
 * This operation inserts the specified child ID into the parent's childNodeIDs array
 * at the given index, establishing a parent-child relationship at the list level.
 * If the child ID already exists in the list, it is first removed to prevent duplicates,
 * then inserted at the new position.
 *
 * This only updates the childNodeIDs and does not update the child's parentID
 * or add the node instance to the store.
 * @see {@link addNodeToTree}, {@link attachNodeToParent}
 *
 * @param targetNodeInstance - The parent node instance whose child list will be modified
 * @param sourceNodeID - The ID of the child node to add to the parent's child list
 * @param targetIndex - The index at which to insert the child ID in the parent's child list
 * @returns An OperateResult containing the updated parent node instance with the child added
 */
export function attachNodeIdIntoParent(targetNodeInstance: NodeInstance, sourceNodeID: NodeID, targetIndex: number): OperateResult<NodeInstance> {
	// Remove any existing occurrence first so insertion will not create duplicates
	const withoutChild = targetNodeInstance.childNodeIDs.filter((id) => id !== sourceNodeID);

	// Clamp the target index to valid bounds and insert the child ID
	const index = Math.max(0, Math.min(targetIndex, withoutChild.length));
	const newContentIDs = [...withoutChild];
	newContentIDs.splice(index, 0, sourceNodeID);

	// Return a new NodeInstance with updated childNodeIDs
	return { success: true, data: { ...targetNodeInstance, childNodeIDs: newContentIDs } };
}

/**
 * Update the parent ID of a node instance.
 *
 * This operation changes the parentID property of the specified node instance
 * to point to a new parent. If the new parent ID is the same as the current one,
 * the operation returns the original instance unchanged.
 *
 * @param nodeInstance - The node instance whose parent ID will be updated
 * @param targetNodeID - The new parent ID to assign to the node
 * @returns An OperateResult containing the updated node instance with the new parent ID
 */
export function updateNodeParentID(sourceInstance: NodeInstance, targetNodeID: NodeID): OperateResult<NodeInstance> {
	// If the parentID is already the desired value, return success with the original instance
	if (sourceInstance.parentID === targetNodeID) return { success: true, data: sourceInstance };

	// Return a new instance with the updated parentID
	return { success: true, data: { ...sourceInstance, parentID: targetNodeID } };
}
