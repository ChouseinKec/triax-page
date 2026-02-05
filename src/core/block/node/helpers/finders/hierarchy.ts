// Types
import type { NodeInstance } from '@/core/block/node/types/instance';
import type { StoredNodes } from '@/core/block/node/types/instance';
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickElementDefinition } from '@/core/block/element/helpers/pickers';
import { findElementOrder } from '@/core/block/element/helpers/finders/hierarchy';

/**
 * Find the insertion index for a new node based on its element order in the parent's structure.
 *
 * This function determines where to insert the new node by comparing its order with the orders
 * of existing sibling nodes. It inserts after the last sibling with order <= newOrder,
 * or at the beginning if all siblings have higher order.
 *
 * @param newElementKey - the element key of the node to be inserted
 * @param parentNodeInstance - the parent node instance
 * @param storedNodes - the record of all stored node instances
 * @param elementDefinitions - array of all available element definitions
 * @returns the index at which to insert the new node
 */
export function findNodeInsertionIndex(newElementKey: ElementKey, parentNodeInstance: NodeInstance, storedNodes: StoredNodes, elementDefinitions: ElementDefinition[]): FindResult<number> {
	const parentElementDefResult = pickElementDefinition(parentNodeInstance.elementKey, elementDefinitions);
	if (!parentElementDefResult.success) return { status: 'not-found', message: 'Parent element definition not found' };

	const newOrderResult = findElementOrder(parentElementDefResult.data, newElementKey);
	if (newOrderResult.status !== 'found') return { status: 'found', data: parentNodeInstance.childNodeIDs.length }; // Insert at end if no order defined

	const newOrder = newOrderResult.data;
	let insertAfterIndex = -1;

	for (let i = 0; i < parentNodeInstance.childNodeIDs.length; i++) {
		const childID = parentNodeInstance.childNodeIDs[i];
		const childNode = storedNodes[childID];
		if (!childNode) continue;

		const childOrderResult = findElementOrder(parentElementDefResult.data, childNode.elementKey);
		if (childOrderResult.status === 'found' && childOrderResult.data <= newOrder) {
			insertAfterIndex = i;
		}
	}

	return { status: 'found', data: insertAfterIndex + 1 };
}
