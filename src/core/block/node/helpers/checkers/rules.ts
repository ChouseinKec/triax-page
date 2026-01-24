// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { ElementKey, ElementDefinition } from '@/core/block/element/types';
import type { CheckResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

/**
 * Check whether the parent block definition allows a child with the specified element tag.
 *
 * @param parentElementDefinition - definition of the parent element to consult
 * @param childElementKey - the element tag of the candidate child
 */
export function isChildElementAllowed(parentElementDefinition: ElementDefinition, childElementKey: ElementKey): CheckResult {
	// If the parent does not restrict allowed children, the child is permitted
	const allowedChildren = parentElementDefinition.allowedChildren;
	if (!allowedChildren) return { success: true, passed: true };

	// If the allowed list explicitly contains the child's tag it's permitted
	if (allowedChildren.includes(childElementKey)) return { success: true, passed: true };

	// Otherwise the child's element type is not permitted by this parent
	return { success: true, passed: false };
}

/**
 * Determine whether the child has a forbidden ancestor.
 *
 * @param childElementDefinition - the element definition for the prospective child (contains forbiddenAncestors)
 * @param parentNodeInstance - the immediate parent instance where the child would be placed
 */
export function hasForbiddenAncestor(childElementDefinition: ElementDefinition, parentNodeInstance: NodeInstance): CheckResult {
	// If there are no forbidden ancestors declared, no forbidden ancestor
	const forbiddenAncestors = childElementDefinition.forbiddenAncestors;
	if (!forbiddenAncestors) return { success: true, passed: false };

	// Check if the immediate parent is forbidden
	if (forbiddenAncestors.includes(parentNodeInstance.tag)) return { success: true, passed: true };

	// No forbidden ancestor
	return { success: true, passed: false };
}

/**
 * Check whether placing a child of a given tag would exceed any declared "unique" limit
 * on the parent.
 *
 * @param parentElementDefinition - definition containing uniqueChildren limits
 * @param parentNodeInstance - the parent instance whose children we will scan
 * @param childElementKey - the tag of the prospective child being checked
 * @param storedNodes - record used to fetch sibling instances
 * @param excludeNodeID - optional block id to exclude from the counting (useful for moves)
 */
export function hasExceededUniqueChildLimit(parentElementDefinition: ElementDefinition, parentNodeInstance: NodeInstance, childElementKey: ElementKey, storedNodes: StoredNodes, excludeNodeID?: string): CheckResult {
	// If the parent has no unique element limits, the child can't exceed them
	const uniqueChildren = parentElementDefinition.uniqueChildren;
	if (!uniqueChildren) return { success: true, passed: false };

	// Find the configured limit for this element tag — if none is set, it can't exceed
	const limit = uniqueChildren[childElementKey];
	if (!limit) return { success: true, passed: false };

	// Count existing matching child elements, skipping the excludeNodeID if provided
	let existingCount = 0;
	for (const contentID of parentNodeInstance.contentIDs) {
		if (contentID === excludeNodeID) continue;
		const siblingNodeInstance = pickNodeInstance(contentID, storedNodes);
		if (!siblingNodeInstance.success) return { success: false, error: siblingNodeInstance.error };
		if (siblingNodeInstance.data.tag === childElementKey) existingCount++;
	}

	// If the existing count is already >= limit then adding would exceed
	return { success: true, passed: existingCount >= limit };
}

/**
 * Validate whether inserting a child with a given tag at a target index would violate
 * the parent's `orderedChildren` policy.
 *
 * @param parentElementDefinition - definition containing orderedChildren groups
 * @param parentNodeInstance - the parent instance whose children will be scanned
 * @param childElementKey - the tag of the prospective child being added
 * @param storedNodes - record used to fetch sibling instances
 * @param targetIndex - the index where the child would be inserted
 */
export function hasViolatedOrderedChildren(parentElementDefinition: ElementDefinition, parentNodeInstance: NodeInstance, childElementKey: ElementKey, storedNodes: StoredNodes, targetIndex: number): CheckResult {
	// If there are no ordered rules, insertion can't violate ordering
	const orderedChildren = parentElementDefinition.orderedChildren;
	if (!orderedChildren) return { success: true, passed: false };

	// Collect current sibling tags in order
	const currentChildTags: ElementKey[] = [];
	for (const contentID of parentNodeInstance.contentIDs) {
		const siblingNodeInstance = pickNodeInstance(contentID, storedNodes);
		if (!siblingNodeInstance.success) return { success: false, error: siblingNodeInstance.error };
		currentChildTags.push(siblingNodeInstance.data.tag);
	}

	// Create a projected tags list with the new child inserted at the requested index
	const projectedTags = [...currentChildTags];
	projectedTags.splice(targetIndex, 0, childElementKey);

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
