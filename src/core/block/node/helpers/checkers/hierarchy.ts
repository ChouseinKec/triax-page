// Types
import type { NodeInstance, StoredNodes, NodeID } from '@/core/block/node/types/instance';
import type { ElementKey, ElementDefinition, ElementStructure } from '@/core/block/element/types';
import type { CheckResult } from '@/shared/types/result';

// Helpers
import { pickElementDefinition, isElementAllowed, isElementAncestorForbidden, isElementOptional } from '@/core/block/element/helpers';

/**
 * Checks whether the element counts in a parent's children meet the targetNodeElementStructure constraints.
 *
 * This function validates that the number of child elements of each type falls within
 * the minimum and maximum bounds defined in the parent's element targetNodeElementStructure constraints.
 *
 * @param targetNodeInstance - The parent node whose children element counts to validate
 * @param targetNodeElementStructure - The targetNodeElementStructure constraints defining min/max counts for each element type
 * @param storedNodes - The record of all stored node instances for resolving child references
 * @returns CheckResult indicating if all element counts are within valid ranges
 * @see {@link isNodeOrderValid} - Related function for order validation
 */
export function isNodeCountValid(targetNodeInstance: NodeInstance, targetNodeElementStructure: ElementStructure[] | null, storedNodes: StoredNodes): CheckResult {
	if (!targetNodeElementStructure) return { success: true, passed: true };

	const children = targetNodeInstance.childNodeIDs.map((id) => storedNodes[id]).filter(Boolean);

	for (const item of targetNodeElementStructure) {
		const count = children.filter((c) => c.elementKey === item.key).length;
		if (item.min != null && count < item.min) return { success: true, passed: false, message: `Element '${item.key}' count ${count} is below minimum ${item.min}` };
		if (item.max != null && count > item.max) return { success: true, passed: false, message: `Element '${item.key}' count ${count} is above maximum ${item.max}` };
	}

	return { success: true, passed: true };
}

/**
 * Checks whether the element order in a parent's children meets the targetNodeElementStructure constraints.
 *
 * This function validates that child elements appear in the correct order as defined
 * by the ordered constraints in the parent's element targetNodeElementStructure. Elements with order
 * constraints must appear in ascending order of their order values.
 *
 * @param targetNodeInstance - The parent node whose children element order to validate
 * @param targetNodeElementStructure - The targetNodeElementStructure constraints defining order requirements for element types
 * @param storedNodes - The record of all stored node instances for resolving child references
 * @returns CheckResult indicating if element order meets all constraints
 * @see {@link isNodeCountValid} - Related function for count validation
 */
export function isNodeOrderValid(targetNodeInstance: NodeInstance, targetNodeElementStructure: ElementStructure[] | null, storedNodes: StoredNodes): CheckResult {
	if (!targetNodeElementStructure) return { success: true, passed: true };

	const children = targetNodeInstance.childNodeIDs.map((id) => storedNodes[id]).filter(Boolean);

	// Get the order for each child
	const orders: number[] = [];
	for (const child of children) {
		const item = targetNodeElementStructure.find((s) => s.key === child.elementKey);
		const order = item?.order ?? -1; // Elements without order are treated as -1 (can be anywhere)
		orders.push(order);
	}

	// Check that orders are non-decreasing
	for (let i = 1; i < orders.length; i++) {
		if (orders[i] < orders[i - 1]) {
			return { success: true, passed: false, message: `Elements out of order: ${children[i].elementKey} (order ${orders[i]}) cannot come after ${children[i - 1].elementKey} (order ${orders[i - 1]})` };
		}
	}

	return { success: true, passed: true };
}

/**
 * Validates whether a node can be placed in its current position within the hierarchy.
 *
 * This function performs comprehensive validation of a node's structural placement by checking:
 * - Whether the node's element type is allowed as a child of its parent
 * - Whether the node's element type is forbidden under any ancestor
 * - Whether the placement violates element count constraints
 * - Whether the placement violates element order constraints
 *
 * @param sourceNodeID - The unique identifier of the node to validate
 * @param elementDefinitions - Array of all available element definitions for validation
 * @param storedNodes - The record of all stored node instances for hierarchy traversal
 * @returns CheckResult indicating if the node's current position is structurally valid
 * @see {@link isNodeCountValid} - Validates element count constraints
 * @see {@link isNodeOrderValid} - Validates element order constraints
 * @see {@link isElementAllowed} - Checks if element type is permitted as child
 * @see {@link isElementAncestorForbidden} - Checks for forbidden ancestor relationships
 */
export function isNodeStructureValid(sourceNodeID: NodeID, elementDefinitions: ElementDefinition[], storedNodes: StoredNodes): CheckResult {
	const sourceNode = storedNodes[sourceNodeID];
	if (!sourceNode || !sourceNode.parentID) return { success: true, passed: true }; // root or invalid

	const targetNodeInstance = storedNodes[sourceNode.parentID];
	if (!targetNodeInstance) return { success: true, passed: false, message: 'Parent node not found' };

	const parentElementDefResult = pickElementDefinition(targetNodeInstance.elementKey, elementDefinitions);
	const sourceElementDefResult = pickElementDefinition(sourceNode.elementKey, elementDefinitions);
	if (!parentElementDefResult.success || !sourceElementDefResult.success) return { success: true, passed: false, message: 'Element definition not found' };

	const parentElementDef = parentElementDefResult.data;
	const sourceElementDef = sourceElementDefResult.data;
	// Check if source is allowed
	const allowed = isElementAllowed(sourceNode.elementKey, parentElementDef);
	if (!allowed.success || !allowed.passed) return allowed;

	// Check forbidden ancestors
	const forbidden = isElementAncestorForbidden(sourceElementDef, targetNodeInstance.elementKey);
	if (!forbidden.success || forbidden.passed) return forbidden;

	// Check targetNodeElementStructure constraints
	const targetNodeElementStructure = parentElementDef.structure;
	if (!targetNodeElementStructure) return { success: true, passed: true };

	// Check element counts
	const countResult = isNodeCountValid(targetNodeInstance, targetNodeElementStructure, storedNodes);
	if (!countResult.success || !countResult.passed) return countResult;

	// Check element order
	const orderResult = isNodeOrderValid(targetNodeInstance, targetNodeElementStructure, storedNodes);
	if (!orderResult.success || !orderResult.passed) return orderResult;

	return { success: true, passed: true };
}

/**
 * Checks whether a specific node element can be deleted based on its parent's targetNodeElementStructure constraints.
 *
 * This function determines if removing the given node would violate the minimum count requirements
 * defined in the parent's element targetNodeElementStructure. It considers both whether the element is optional
 * and whether the current count of similar elements would remain above the minimum after deletion.
 *
 * @param sourceNodeElementKey - The element key of the node to check for deletability
 * @param parentElementDefinition - The element definition of the parent node containing targetNodeElementStructure constraints
 * @param currentSiblingCount - The current count of sibling nodes with the same element key
 * @returns CheckResult indicating if the node can be safely deleted
 * @see {@link isElementOptional} - Checks if the element type is optional in the parent
 */
export function isNodeDeletable(sourceNodeElementKey: ElementKey, parentElementDefinition: ElementDefinition, currentSiblingCount: number): CheckResult {
	// First check if the element is optional
	const optionalResult = isElementOptional(sourceNodeElementKey, parentElementDefinition);
	if (!optionalResult.success) return optionalResult;

	// If the element is optional, it can be deleted
	if (optionalResult.passed) return { success: true, passed: true };

	// If the element is required, check if we can delete it without violating min constraints
	const targetNodeElementStructure = parentElementDefinition.structure;
	if (!targetNodeElementStructure) return { success: true, passed: false, message: 'No targetNodeElementStructure constraints defined' };

	const structureItem = targetNodeElementStructure.find((item) => item.key === sourceNodeElementKey);
	if (!structureItem) return { success: true, passed: false, message: 'Element not found in targetNodeElementStructure constraints' };

	// If current count is greater than min, we can delete one
	if (currentSiblingCount > structureItem.min) return { success: true, passed: true };

	// Otherwise, deleting would violate the min constraint
	return { success: true, passed: false, message: `Cannot delete: minimum ${structureItem.min} ${sourceNodeElementKey} elements required` };
}

/**
 * Checks whether a specific node element can be cloned based on its parent's targetNodeElementStructure constraints.
 *
 * This function determines if duplicating the given node would violate the maximum count requirements
 * defined in the parent's element targetNodeElementStructure. It considers whether the current count of similar
 * elements is below the maximum after cloning.
 *
 * @param sourceNodeElementKey - The element key of the node to check for cloneability
 * @param parentElementDefinition - The element definition of the parent node containing targetNodeElementStructure constraints
 * @param currentSiblingCount - The current count of sibling nodes with the same element key
 * @returns CheckResult indicating if the node can be safely cloned
 * @see {@link isNodeDeletable} - Related function for deletion validation
 */
export function isNodeCloneable(sourceNodeElementKey: ElementKey, parentElementDefinition: ElementDefinition, currentSiblingCount: number): CheckResult {
	// If the element is not in structure, assume it can be cloned
	const targetNodeElementStructure = parentElementDefinition.structure;
	if (!targetNodeElementStructure) return { success: true, passed: true };

	const structureItem = targetNodeElementStructure.find((item) => item.key === sourceNodeElementKey);
	if (!structureItem) return { success: true, passed: true };

	// If max is null, unlimited, can clone
	if (structureItem.max == null) return { success: true, passed: true };

	// If current count is less than max, can clone
	if (currentSiblingCount < structureItem.max) return { success: true, passed: true };

	// Otherwise, cloning would violate the max constraint
	return { success: true, passed: false, message: `Cannot clone: maximum ${structureItem.max} ${sourceNodeElementKey} elements allowed` };
}

/**
 * Checks whether a specific node element can be reordered based on its parent's targetNodeElementStructure constraints.
 *
 * This function determines if reordering the given node among its siblings would violate the order constraints.
 * Elements with order null can be reordered freely, and elements with specific orders can be reordered
 * if there are multiple siblings with the same order value.
 *
 * @param sourceNodeElementKey - The element key of the node to check for orderability
 * @param parentElementDefinition - The element definition of the parent node containing targetNodeElementStructure constraints
 * @param currentSiblingCount - The current count of sibling nodes with the same element key
 * @returns CheckResult indicating if the node can be safely reordered
 * @see {@link isNodeCloneable} - Related function for cloning validation
 */
export function isNodeOrderable(sourceNodeElementKey: ElementKey, parentElementDefinition: ElementDefinition, currentSiblingCount: number): CheckResult {
	// If the element is not in structure, assume it can be ordered
	const targetNodeElementStructure = parentElementDefinition.structure;
	if (!targetNodeElementStructure) return { success: true, passed: true };

	const structureItem = targetNodeElementStructure.find((item) => item.key === sourceNodeElementKey);
	if (!structureItem) return { success: true, passed: true };

	// If order is null, can be ordered freely
	if (structureItem.order == null) return { success: true, passed: true };

	// If there are multiple siblings with the same element key, can be ordered
	if (currentSiblingCount > 1) return { success: true, passed: true };

	// Otherwise, cannot be reordered as it's the only one
	return { success: true, passed: false, message: `Cannot reorder: only one ${sourceNodeElementKey} allowed` };
}
