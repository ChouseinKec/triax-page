// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { ElementKey, ElementDefinition } from '@/core/block/element/types';
import type { CheckResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

/**
 * Check whether the parent block definition allows a child with the specified element tag.
 *
 * @param targetElementDefinition - definition of the parent element to consult
 * @param sourceElementKey - the element tag of the candidate child
 */
export function isElementAllowed(targetElementDefinition: ElementDefinition, sourceElementKey: ElementKey): CheckResult {
	// If the parent does not restrict allowed children, the child is permitted
	const allowedChildren = targetElementDefinition.allowedChildren;
	if (!allowedChildren) return { success: true, passed: true };

	// If the allowed list explicitly contains the child's tag it's permitted
	if (allowedChildren.includes(sourceElementKey)) return { success: true, passed: true };

	// Otherwise the child's element type is not permitted by this parent
	return { success: true, passed: false };
}

/**
 * Determine whether the child has a forbidden ancestor.
 *
 * @param sourceElementDefinition - the element definition for the prospective child (contains forbiddenAncestors)
 * @param targetNodeInstance - the immediate parent instance where the child would be placed
 */
export function hasForbiddenAncestor(sourceElementDefinition: ElementDefinition, targetNodeInstance: NodeInstance): CheckResult {
	// If there are no forbidden ancestors declared, no forbidden ancestor
	const forbiddenAncestors = sourceElementDefinition.forbiddenAncestors;
	if (!forbiddenAncestors) return { success: true, passed: false };

	// Check if the immediate parent is forbidden
	if (forbiddenAncestors.includes(targetNodeInstance.tag)) return { success: true, passed: true };

	// No forbidden ancestor
	return { success: true, passed: false };
}

/**
 * Check whether placing a child of a given tag would exceed any declared "unique" limit
 * on the parent.
 *
 * @param targetElementDefinition - definition containing uniqueChildren limits
 * @param targetNodeInstance - the parent instance whose children we will scan
 * @param sourceElementKey - the tag of the prospective child being checked
 * @param storedNodes - record used to fetch sibling instances
 * @param excludeNodeID - optional block id to exclude from the counting (useful for moves)
 */
export function isExceedingLimit(targetElementDefinition: ElementDefinition, targetNodeInstance: NodeInstance, sourceElementKey: ElementKey, storedNodes: StoredNodes, excludeNodeID?: string): CheckResult {
	// If the parent has no unique element limits, the child can't exceed them
	const uniqueChildren = targetElementDefinition.uniqueChildren;
	if (!uniqueChildren) return { success: true, passed: false };

	// Find the configured limit for this element tag — if none is set, it can't exceed
	const limit = uniqueChildren[sourceElementKey];
	if (!limit) return { success: true, passed: false };

	// Count existing matching child elements, skipping the excludeNodeID if provided
	let existingCount = 0;
	for (const contentID of targetNodeInstance.contentIDs) {
		if (contentID === excludeNodeID) continue;
		const siblingNodeInstance = pickNodeInstance(contentID, storedNodes);
		if (!siblingNodeInstance.success) return { success: false, error: siblingNodeInstance.error };
		if (siblingNodeInstance.data.tag === sourceElementKey) existingCount++;
	}

	// If the existing count is already >= limit then adding would exceed
	return { success: true, passed: existingCount >= limit };
}

/**
 * Validate whether inserting a child with a given tag at a target index would violate
 * the parent's `orderedChildren` policy.
 *
 * @param targetElementDefinition - definition containing orderedChildren groups
 * @param targetNodeInstance - the parent instance whose children will be scanned
 * @param sourceElementKey - the tag of the prospective child being added
 * @param storedNodes - record used to fetch sibling instances
 * @param targetIndex - the index where the child would be inserted
 */
export function hasUnorderedElement(targetElementDefinition: ElementDefinition, targetNodeInstance: NodeInstance, sourceElementKey: ElementKey, storedNodes: StoredNodes, targetIndex: number): CheckResult {
	// If there are no ordered rules, insertion can't violate ordering
	const orderedChildren = targetElementDefinition.orderedChildren;
	if (!orderedChildren) return { success: true, passed: false };

	// Collect current sibling tags in order
	const currentChildTags: ElementKey[] = [];
	for (const contentID of targetNodeInstance.contentIDs) {
		const siblingNodeInstance = pickNodeInstance(contentID, storedNodes);
		if (!siblingNodeInstance.success) return { success: false, error: siblingNodeInstance.error };
		currentChildTags.push(siblingNodeInstance.data.tag);
	}

	// Create a projected tags list with the new child inserted at the requested index
	const projectedTags = [...currentChildTags];
	projectedTags.splice(targetIndex, 0, sourceElementKey);

	// Walk projected tags and ensure they never belong to an earlier group once advanced
	let currentGroupIndex = 0;
	for (const tag of projectedTags) {
		let foundInGroup = false;
		for (let i = currentGroupIndex; i < orderedChildren.length; i++) {
			if (orderedChildren[i].includes(tag)) {
				// Found in the same or a later group — advance the scanning index to this group
				currentGroupIndex = i;
				foundInGroup = true;
				break;
			}
		}

		// If the tag is not part of any allowed group (or would force re-ordering backwards),
		// then this insertion violates the ordered constraints — report passed:true
		if (!foundInGroup) return { success: true, passed: true };
	}

	// No ordering violations detected
	return { success: true, passed: false };
}

/**
 * Validate whether a node can be placed (moved or added) at a specific location in the parent,
 * by running all relevant rule checks in sequence.
 *
 * @param sourceNodeInstance - The node instance being added or moved.
 * @param targetNodeInstance - The parent node instance where the source will be placed.
 * @param targetElementDefinition - The element definition of the target parent.
 * @param sourceElementDefinition - The element definition of the source node.
 * @param storedNodes - The complete record of all node instances in the store.
 * @param targetIndex - The position in the target's contentIDs where the source will be inserted.
 */
export function passesAllRules(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance, targetElementDefinition: ElementDefinition, sourceElementDefinition: ElementDefinition, storedNodes: StoredNodes, targetIndex: number): CheckResult {
	const isChildAllowed = isElementAllowed(targetElementDefinition, sourceNodeInstance.tag);
	if (!isChildAllowed.success) return isChildAllowed;
	if (!isChildAllowed.passed) return { success: true, passed: false };

	const forbiddenAncestor = hasForbiddenAncestor(sourceElementDefinition, targetNodeInstance);
	if (!forbiddenAncestor.success) return forbiddenAncestor;
	if (forbiddenAncestor.passed) return { success: true, passed: false };

	const exceeds = isExceedingLimit(targetElementDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, sourceNodeInstance.id);
	if (!exceeds.success) return exceeds;
	if (exceeds.passed) return { success: true, passed: false };

	const violates = hasUnorderedElement(targetElementDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, targetIndex);
	if (!violates.success) return violates;
	if (violates.passed) return { success: true, passed: false };

	return { success: true, passed: true };
}
