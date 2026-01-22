// Types
import type { NodeID, NodeInstance, StoredNodes } from '@/core/block/node/instance/types';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { findNodeDescendants, findNodeChildIndex } from '@/core/block/node/instance/helpers/finders';
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';
import { detachNodeFromContentIDs, attachNodeToContentIDs, updateNodeParentID } from '@/core/block/node/instance/helpers/operations/instance';

// External
import { v4 as uuidv4 } from 'uuid';

/**
 * Detach a block instance from its parent.
 *
 * This only updates the parent/child relationship and does NOT remove nodes
 * from the store.
 * @see {@link deleteNodeFromTree}
 *
 * @param sourceNodeInstance - the block instance to detach
 * @param parentNodeInstance - the current parent block instance
 * @param storedNodes - the current block instance record
 */
export function detachNodeFromParent(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Remove the child ID from the parent's contentIDs cleanly using the
	const mutatedParentResult = detachNodeFromContentIDs(parentNodeInstance, sourceNodeInstance.id);
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
 * This only updates the parent/child relationship and does NOT add a brand
 * new node into the canonical store by itself. When creating and inserting
 * a brand-new block into the store.
 * @see {@link addNodeToTree}
 *
 * @param sourceNodeInstance - the block instance to attach
 * @param parentNodeInstance - the new parent block instance
 * @param targetIndex - the index within the parent's contentIDs to insert at
 * @param storedNodes - the current record of all block instances
 */
export function attachNodeToParent(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance, targetIndex: number, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Add the child ID into the parent's contentIDs cleanly using the
	const mutatedParentResult = attachNodeToContentIDs(parentNodeInstance, sourceNodeInstance.id, targetIndex);
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
 * @param NodeID - id of the root block to delete
 * @param storedNodes - the current block instance record
 */
export function deleteNodeFromTree(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Set to track all block ids to delete
	const blocksToDelete = new Set<NodeID>([sourceNodeInstance.id]);

	// Find all descendants and add their ids to the set
	const descendantInstancesResult = findNodeDescendants(sourceNodeInstance, storedNodes);
	if (descendantInstancesResult.status === 'error') return { success: false, error: `Failed to delete tree: ${descendantInstancesResult.error}` };
	if (descendantInstancesResult.status === 'found') descendantInstancesResult.data.forEach((inst) => blocksToDelete.add(inst.id));

	// Create a shallow copy and remove each id
	const mutatedBlocks = { ...storedNodes };
	blocksToDelete.forEach((id) => delete mutatedBlocks[id]);

	// Return the pruned record
	return { success: true, data: mutatedBlocks };
}

/**
 * Add a block instance to the store and attach it as the last child of its parent.
 *
 * @param nodeInstance - the block instance to add
 * @param storedNodes - the current block instance record
 */
export function addNodeToTree(nodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Add the instance into the store copy upfront so downstream operations
	const mutatedBlocks = { ...storedNodes, [nodeInstance.id]: nodeInstance };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(nodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Add the block to its parent at the end of the contentIDs
	const mutatedParentInstance = attachNodeToParent(nodeInstance, parentInstanceResult.data, parentInstanceResult.data.contentIDs.length, mutatedBlocks);
	if (!mutatedParentInstance.success) return mutatedParentInstance;

	// Return the updated record with the new block added to its parent
	return { success: true, data: mutatedParentInstance.data };
}

/**
 * Deep-clone the given block subtree and return the cloned instances.
 *
 * This only creates the new instances and does NOT merge clones into a store
 * @see {@link duplicateNode} , {@link overwriteNodeInTree}
 *
 * @param rootNodeInstance - the root block instance to clone
 * @param storedNodes - record of all block instances used to resolve children
 * @param parentNodeID - optional parent ID to assign to the cloned root
 */
export function cloneBlock(rootNodeInstance: NodeInstance, storedNodes: StoredNodes, parentNodeID?: NodeID): { clonedInstance: NodeInstance; clonedNodes: StoredNodes } {
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
			contentIDs: [],
		};
		clonedNodes[newId] = clonedNodeInstance;

		// Clone children recursively preserving order
		for (const childID of node.contentIDs) {
			const child = storedNodes[childID];
			if (!child) continue;

			// Recursively clone the child node with the current cloned block as its new parent
			const clonedChild = cloneRecursive(child, clonedNodeInstance.id);

			// Add the cloned child's ID to the parent's contentIDs
			clonedNodeInstance.contentIDs.push(clonedChild.id);
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
 * Duplicate a block instance and its entire subtree within the store.
 *
 * The duplicated subtree will be inserted immediately after the original
 * within its parent's contentIDs list.
 *
 * @param sourceNodeInstance - the block instance to duplicate
 * @param storedNodes - record of all block instances used to resolve children
 */
export function duplicateNodeInTree(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Clone the subtree
	const { clonedInstance, clonedNodes } = cloneBlock(sourceNodeInstance, storedNodes);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedNodes, ...clonedNodes };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(sourceNodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return { success: false, error: parentInstanceResult.error };

	// Find the index of the source block within its parent's contentIDs
	const childIndexResult = findNodeChildIndex(sourceNodeInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Original block not found in parent's contentIDs` };

	// Attach the cloned root immediately after the original
	const attachedBlocksResult = attachNodeToParent(clonedInstance, parentInstanceResult.data, childIndexResult.data + 1, mutatedBlocks);
	if (!attachedBlocksResult.success) return { success: false, error: `Failed to insert cloned subtree: ${attachedBlocksResult.error}` };

	// Return the final updated store
	return { success: true, data: attachedBlocksResult.data };
}

export function overwriteNodeInTree(sourceBlock: NodeInstance, targetNodeInstance: NodeInstance, storedNodes: StoredNodes): OperateResult<StoredNodes> {
	// Clone the subtree
	const { clonedInstance, clonedNodes } = cloneBlock(sourceBlock, storedNodes, targetNodeInstance.parentID);

	// Create a working record with all cloned instances
	const mutatedBlocks = { ...storedNodes, ...clonedNodes };

	// Fetch the parent block instance
	const parentInstanceResult = pickNodeInstance(targetNodeInstance.parentID, mutatedBlocks);
	if (!parentInstanceResult.success) return parentInstanceResult;

	// Find the index of the source block within its parent's contentIDs
	const childIndexResult = findNodeChildIndex(targetNodeInstance, parentInstanceResult.data);
	if (childIndexResult.status === 'error') return { success: false, error: childIndexResult.error };
	if (childIndexResult.status === 'not-found') return { success: false, error: `Target block not found in parent's contentIDs` };

	// Remove the cloned root from the record as it will be overwritten
	delete mutatedBlocks[clonedInstance.id];

	// Overwrite the target block with the cloned instance
	mutatedBlocks[targetNodeInstance.id] = {
		...clonedInstance,
		id: targetNodeInstance.id,
		parentID: targetNodeInstance.parentID,
	};

	// Update the parent's contentIDs to reflect the overwritten block
	const newContentIDs = [...parentInstanceResult.data.contentIDs];
	newContentIDs[childIndexResult.data] = targetNodeInstance.id;

	// Update the mutatedBlocks with the updated parent instance
	mutatedBlocks[parentInstanceResult.data.id] = {
		...parentInstanceResult.data,
		contentIDs: newContentIDs,
	};

	// Return the final updated store
	return { success: true, data: mutatedBlocks };
}
