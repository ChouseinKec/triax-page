// Types
import type { NodeID, NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { findNodeDescendants, findNodeChildIndex } from '@/core/block/node/helpers/finders';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { detachNodeIdFromParent, attachNodeIdIntoParent, updateNodeParentID } from '@/core/block/node/helpers/operations/instance';

// External
import { v4 as uuidv4 } from 'uuid';

/**
 * Detach a block instance from its parent.
 *
 * This operation removes the parent-child relationship between the specified node
 * and its parent, updating both the parent's childNodeIDs list and the child's
 * parentID to 'orphan'. The nodes remain in the store but are no longer connected
 * in the tree structure.
 *
 * This only updates the parent/child relationship and does NOT remove nodes
 * from the store.
 *
 * @param sourceNodeInstance - The block instance to detach from its parent
 * @param parentNodeInstance - The current parent block instance
 * @param storedNodes - The current record of all block instances in the store
 * @returns An OperateResult containing the updated store with modified relationships
 *
 * @see {@link deleteNodeFromTree} - For detaching with deletion
 */
export function detachNodeFromParent(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Remove the child ID from the parent's childNodeIDs cleanly using the
	const mutatedParentResult = detachNodeIdFromParent(parentNodeInstance, sourceNodeInstance.id);
	if (!mutatedParentResult.success) return { success: false, error: `Failed to detach child from parent: ${mutatedParentResult.error}` };

	// Update the child's parent reference to 'orphan' to reflect detachment.
	const mutatedSourceResult = updateNodeParentID(sourceNodeInstance, 'orphan');
	if (!mutatedSourceResult.success) return { success: false, error: `Failed to update child parentID: ${mutatedSourceResult.error}` };

	// Return the updated store reflecting the detached relationship.
	return {
		success: true,
		data: {
			...storedNodes,
			[mutatedParentResult.data.id]: mutatedParentResult.data,
			[mutatedSourceResult.data.id]: mutatedSourceResult.data,
		},
	};
}

/**
 * Attach a block instance to a new parent at the specified index.
 *
 * This operation establishes a parent-child relationship between the source node
 * and the target parent, inserting the child at the specified position in the
 * parent's childNodeIDs list and updating the child's parentID accordingly.
 *
 * This only updates the parent/child relationship and does NOT add a brand
 * new node into the canonical store by itself. When creating and inserting
 * a brand-new block into the store.
 *
 * @param sourceNodeInstance - The block instance to attach to the new parent
 * @param parentNodeInstance - The new parent block instance to attach to
 * @param targetIndex - The index within the parent's childNodeIDs to insert the child at
 * @param storedNodes - The current record of all block instances in the store
 * @returns An OperateResult containing the updated store with modified relationships
 *
 * @see {@link addNodeToTree} - For adding a new node and attaching it
 */
export function attachNodeToParent(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance, targetIndex: number, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Add the child ID into the parent's childNodeIDs cleanly using the
	const mutatedParentResult = attachNodeIdIntoParent(parentNodeInstance, sourceNodeInstance.id, targetIndex);
	if (!mutatedParentResult.success) return { success: false, error: `Failed to attach child to parent: ${mutatedParentResult.error}` };

	// Update the child's parent reference to point to the new parent instance.
	const mutatedSourceInstanceResult = updateNodeParentID(sourceNodeInstance, mutatedParentResult.data.id);
	if (!mutatedSourceInstanceResult.success) return { success: false, error: `Failed to update child's parentID: ${mutatedSourceInstanceResult.error}` };

	// Return the updated store reflecting the attached relationship.
	return {
		success: true,
		data: {
			...storedNodes,
			[mutatedParentResult.data.id]: mutatedParentResult.data,
			[mutatedSourceInstanceResult.data.id]: mutatedSourceInstanceResult.data,
		},
	};
}

/**
 * Remove a block and all of its descendant blocks from the provided store.
 *
 * This operation performs a deep deletion: it first detaches the node from its parent's
 * childNodeIDs (if not already orphaned), finds all descendants, and removes the entire
 * subtree from the store. This completely eliminates the node and its hierarchy from
 * the block structure, ensuring no dangling references.
 *
 * @param sourceNodeInstance - The root block instance to delete along with all its descendants
 * @param storedNodes - The current record of all block instances in the store
 * @returns An OperateResult containing the updated store with the nodes removed and parent updated
 *
 * @see {@link detachNodeFromParent} - For detaching without deletion
 * @see {@link findNodeDescendants} - For finding descendants during deletion
 */
export function deleteNodeFromTree(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Detach from parent if not already orphaned
	const mutatedBlocks = { ...storedNodes };

	const parentInstanceResult = pickNodeInstance(sourceNodeInstance.parentID, storedNodes);
	if (!parentInstanceResult.success) return parentInstanceResult;

	const detachResult = detachNodeIdFromParent(parentInstanceResult.data, sourceNodeInstance.id);
	if (!detachResult.success) return { success: false, error: `Failed to detach node from parent during deletion: ${detachResult.error}` };
	mutatedBlocks[detachResult.data.id] = detachResult.data;

	// Set to track all block ids to delete
	const blocksToDelete = new Set<NodeID>([sourceNodeInstance.id]);

	// Find all descendants and add their ids to the set
	const descendantInstancesResult = findNodeDescendants(sourceNodeInstance, mutatedBlocks);
	if (descendantInstancesResult.status === 'error') return { success: false, error: `Failed to delete tree: ${descendantInstancesResult.error}` };
	if (descendantInstancesResult.status === 'found') descendantInstancesResult.data.forEach((inst) => blocksToDelete.add(inst.id));

	// Remove each id from the mutated blocks
	blocksToDelete.forEach((id) => delete mutatedBlocks[id]);

	// Return the pruned record
	return { success: true, data: mutatedBlocks };
}

/**
 * Add a block instance to the store and attach it as a child of its parent at the specified index.
 *
 * This operation adds a new node to the store and establishes its relationship
 * with its parent by inserting it at the specified position in the parent's childNodeIDs list.
 * The node must already have a valid parentID set. If no index is provided, it appends to the end.
 *
 * @param nodeInstance - The block instance to add to the store and tree
 * @param storedNodes - The current record of all block instances in the store
 * @param targetIndex - The index at which to insert the node in the parent's child list (optional, defaults to append)
 * @returns An OperateResult containing the updated store with the new node added and attached
 *
 * @see {@link attachNodeToParent}  - For attaching the node to its parent
 */
export function addNodeToTree(nodeInstance: NodeInstance, storedNodes: StoredNodes, targetIndex?: number): OperateResult<StoredNodes> {
	// Add the instance into the store copy upfront so downstream operations
	const mutatedBlocks = { ...storedNodes, [nodeInstance.id]: nodeInstance };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(nodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Determine the insertion index
	const index = targetIndex ?? parentInstanceResult.data.childNodeIDs.length;

	// Add the block to its parent at the specified index
	const mutatedParentInstance = attachNodeToParent(nodeInstance, parentInstanceResult.data, index, mutatedBlocks);
	if (!mutatedParentInstance.success) return mutatedParentInstance;

	// Return the updated record with the new block added to its parent
	return { success: true, data: mutatedParentInstance.data };
}

/**
 * Duplicate a block instance and its entire subtree within the store.
 *
 * This operation creates a deep copy of the specified node and all its descendants,
 * generating new IDs for all cloned nodes. The duplicated subtree is inserted
 * immediately after the original node within its parent's childNodeIDs list,
 * maintaining the same parent relationship.
 *
 * @param sourceNodeInstance - The block instance to duplicate along with its subtree
 * @param storedNodes - The record of all block instances used to resolve children during cloning
 * @returns An OperateResult containing the updated store with the duplicated subtree added
 */
export function duplicateNodeInTree(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Clone the subtree
	const { clonedInstance, clonedNodes } = cloneNode(sourceNodeInstance, storedNodes);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedNodes, ...clonedNodes };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(sourceNodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return { success: false, error: parentInstanceResult.error };

	// Find the index of the source block within its parent's childNodeIDs
	const childIndexResult = findNodeChildIndex(sourceNodeInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Original block not found in parent's childNodeIDs` };

	// Attach the cloned root immediately after the original
	const attachedBlocksResult = attachNodeToParent(clonedInstance, parentInstanceResult.data, childIndexResult.data + 1, mutatedBlocks);
	if (!attachedBlocksResult.success) return { success: false, error: `Failed to insert cloned subtree: ${attachedBlocksResult.error}` };

	// Return the final updated store
	return { success: true, data: attachedBlocksResult.data };
}

/**
 * Overwrite a target block instance with a cloned subtree from a source block.
 *
 * This operation replaces the target node with a deep clone of the source node
 * and its entire subtree. The target node's ID and parent relationship are preserved,
 * but its content, styles, and child structure are completely replaced by the source.
 *
 * @param sourceBlock - The block instance to clone and use as the replacement content
 * @param targetNodeInstance - The block instance to be overwritten
 * @param storedNodes - The record of all block instances used to resolve children during cloning
 * @returns An OperateResult containing the updated store with the target node overwritten
 *
 * @see {@link cloneNode} - For deep-cloning the source block
 *
 */
export function overwriteNodeInTree(sourceBlock: NodeInstance, targetNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Clone the subtree
	const { clonedInstance, clonedNodes } = cloneNode(sourceBlock, storedNodes, targetNodeInstance.parentID);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedNodes, ...clonedNodes };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(targetNodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Find the index of the source block within its parent's childNodeIDs
	const childIndexResult = findNodeChildIndex(targetNodeInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Target block not found in parent's childNodeIDs` };

	// Remove the cloned root from the record as it will be overwritten
	delete mutatedBlocks[clonedInstance.id];

	// Overwrite the target block with the cloned instance
	mutatedBlocks[targetNodeInstance.id] = {
		...clonedInstance,
		id: targetNodeInstance.id,
		parentID: targetNodeInstance.parentID,
	};

	// Update the parent's childNodeIDs to reflect the overwritten block
	const newContentIDs = [...parentInstanceResult.data.childNodeIDs];
	newContentIDs[childIndexResult.data] = targetNodeInstance.id;

	// Update the mutatedBlocks with the updated parent instance
	mutatedBlocks[parentInstanceResult.data.id] = {
		...parentInstanceResult.data,
		childNodeIDs: newContentIDs,
	};

	// Return the final updated store
	return { success: true, data: mutatedBlocks };
}

/**
 * Deep-clone the given block subtree and return the cloned instances.
 *
 * This operation creates a complete copy of the specified node and all its descendants,
 * generating new unique IDs for each cloned node while preserving the hierarchical
 * structure and relationships. The cloned nodes are not automatically added to any store.
 *
 * This only creates the new instances and does NOT merge clones into a store
 *
 * @param rootNodeInstance - The root block instance to clone along with its subtree
 * @param storedNodes - The record of all block instances used to resolve children during cloning
 * @param parentNodeID - Optional parent ID to assign to the cloned root (defaults to original parent)
 * @returns An object containing the cloned root instance and a map of all cloned instances
 *
 * @see {@link duplicateNodeInTree} - For duplicating a node within the store
 * @see {@link overwriteNodeInTree} - For overwriting a node with a cloned subtree
 */
export function cloneNode(rootNodeInstance: NodeInstance, storedNodes: StoredNodes, parentNodeID?: NodeID): { clonedInstance: NodeInstance; clonedNodes: StoredNodes } {
	// Map to track all cloned instances
	const clonedNodes: StoredNodes = {};

	function cloneRecursive(node: NodeInstance, parentNodeID?: NodeID): NodeInstance {
		// Generate a new unique ID for the cloned instance
		const newId = uuidv4();

		// Create a shallow clone with an empty child list initially
		const clonedNodeInstance: NodeInstance = {
			...node,
			id: newId,
			parentID: parentNodeID ?? node.parentID,
			childNodeIDs: [],
		};
		clonedNodes[newId] = clonedNodeInstance;

		// Clone children recursively preserving order
		for (const childID of node.childNodeIDs) {
			const child = storedNodes[childID];
			if (!child) continue;

			// Recursively clone the child node with the current cloned block as its new parent
			const clonedChild = cloneRecursive(child, clonedNodeInstance.id);

			// Add the cloned child's ID to the parent's childNodeIDs
			clonedNodeInstance.childNodeIDs.push(clonedChild.id);
		}

		// Return the cloned block instance
		return clonedNodeInstance;
	}

	// Start cloning the subtree
	const clonedInstance = cloneRecursive(rootNodeInstance, parentNodeID);

	// Return the cloned root and the map of all cloned instances
	return {
		clonedInstance,
		clonedNodes,
	};
}

/**
 * Add multiple block instances to the tree progressively.
 *
 * This operation adds each node one by one, updating the stored nodes after each addition
 * to ensure that subsequent additions use the latest state.
 *
 * @param nodeInstances - Array of block instances to add
 * @param storedNodes - The initial record of all block instances in the store
 * @returns An OperateResult containing the updated store with all nodes added
 *
 * @see {@link addNodeToTree} - For adding individual nodes
 */
export function addNodesToTree(nodeInstances: NodeInstance[], storedNodes: StoredNodes): OperateResult<StoredNodes> {
	let currentStoredNodes = storedNodes;

	for (const nodeInstance of nodeInstances) {
		const result = addNodeToTree(nodeInstance, currentStoredNodes);
		if (!result.success) return result;
		currentStoredNodes = result.data;
	}
	return { success: true, data: currentStoredNodes };
}
