// Types
import type { BlockDefinition, BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { ElementTag,ElementDefinition } from '@/src/core/block/element/types';
import type { CheckResult } from '@/src/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/src/core/block/instance/helper/pickers';

/**
 * Check whether the parent block definition allows a child with the specified element tag.
 *
 * @param parentBlockDefinition - definition of the parent block to consult
 * @param childElementTag - the element tag of the candidate child
 */
export function isBlockChildAllowed(parentBlockDefinition: BlockDefinition, childElementTag: ElementTag): CheckResult {
	// If the parent does not restrict allowed children, the child is permitted
	const allowedChildren = parentBlockDefinition.allowedChildren;
	if (!allowedChildren) return { success: true, ok: true };

	// If the allowed list explicitly contains the child's tag it's permitted
	if (allowedChildren.includes(childElementTag)) return { success: true, ok: true };

	// Otherwise the child's element type is not permitted by this parent
	return { success: true, ok: false };
}

/**
 * Determine whether placing a child would violate "forbidden ancestor" rules.
 *
 * @param childElementDefinition - the element definition for the prospective child (contains forbiddenAncestors)
 * @param parentBlockInstance - the immediate parent instance where the child would be placed
 * @param storedBlocks - record of all block instances (used to walk up the tree)
 */
export function hasBlockForbiddenAncestor(childElementDefinition: ElementDefinition, parentBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): CheckResult {
	// If there are no forbidden ancestors declared, this rule can't be violated
	const forbiddenAncestors = childElementDefinition.forbiddenAncestors;
	if (!forbiddenAncestors) return { success: true, ok: false };

	// Convert to a Set for efficient membership tests
	const forbiddenSet = new Set(forbiddenAncestors);

	// Walk up the parent chain from the immediate parent, looking for a forbidden tag
	let currentBlockInstance: BlockInstance | undefined = parentBlockInstance;
	while (currentBlockInstance) {
		if (!currentBlockInstance.parentID) break; // reached the root

		// If the current ancestor's tag is forbidden, we report ok:true
		if (forbiddenSet.has(currentBlockInstance.tag)) return { success: true, ok: true };

		// Fetch the next parent in the chain; propagate fetch errors as failures
		const parentResult = pickBlockInstance(currentBlockInstance.parentID, storedBlocks);
		if (!parentResult.success) return { success: false, error: parentResult.error };
		currentBlockInstance = parentResult.data;
	}

	// No forbidden ancestor found
	return { success: true, ok: false };
}

/**
 * Check whether placing a child of a given tag would exceed any declared "unique" limit
 * on the parent.
 *
 * @param parentBlockDefinition - definition containing uniqueElements limits
 * @param parentBlockInstance - the parent instance whose children we will scan
 * @param childElementTag - the tag of the prospective child being checked
 * @param storedBlocks - record used to fetch sibling instances
 * @param excludeBlockID - optional block id to exclude from the counting (useful for moves)
 */
export function doesBlockElementExceeds(parentBlockDefinition: BlockDefinition, parentBlockInstance: BlockInstance, childElementTag: ElementTag, storedBlocks: BlockInstanceRecord, excludeBlockID?: string): CheckResult {
	// If the parent has no unique element limits, the child can't exceed them
	const uniqueElements = parentBlockDefinition.uniqueElements;
	if (!uniqueElements) return { success: true, ok: false };

	// Find the configured limit for this element tag — if none is set, it can't exceed
	const limit = uniqueElements[childElementTag];
	if (!limit) return { success: true, ok: false };

	// Count existing matching child elements, skipping the excludeBlockID if provided
	let existingCount = 0;
	for (const contentID of parentBlockInstance.contentIDs) {
		if (contentID === excludeBlockID) continue;
		const siblingBlockInstance = pickBlockInstance(contentID, storedBlocks);
		if (!siblingBlockInstance.success) return { success: false, error: siblingBlockInstance.error };
		if (siblingBlockInstance.data.tag === childElementTag) existingCount++;
	}

	// If the existing count is already >= limit then adding would exceed
	return { success: true, ok: existingCount >= limit };
}

/**
 * Validate whether inserting a child with a given tag at a target index would violate
 * the parent's `orderedElements` policy.
 *
 * @param parentBlockDefinition - definition containing orderedElements groups
 * @param parentBlockInstance - the parent instance whose children will be scanned
 * @param childElementTag - the tag of the prospective child being added
 * @param storedBlocks - record used to fetch sibling instances
 * @param targetIndex - the index where the child would be inserted
 */
export function doesBlockElementViolatesOrder(parentBlockDefinition: BlockDefinition, parentBlockInstance: BlockInstance, childElementTag: ElementTag, storedBlocks: BlockInstanceRecord, targetIndex: number): CheckResult {
	// If there are no ordered rules, insertion can't violate ordering
	const orderedElements = parentBlockDefinition.orderedElements;
	if (!orderedElements) return { success: true, ok: false };

	// Collect current sibling tags in order
	const currentChildTags: ElementTag[] = [];
	for (const contentID of parentBlockInstance.contentIDs) {
		const siblingBlockInstance = pickBlockInstance(contentID, storedBlocks);
		if (!siblingBlockInstance.success) return { success: false, error: siblingBlockInstance.error };
		currentChildTags.push(siblingBlockInstance.data.tag);
	}

	// Create a projected tags list with the new child inserted at the requested index
	const projectedTags = [...currentChildTags];
	projectedTags.splice(targetIndex, 0, childElementTag);

	// Walk projected tags and ensure they never belong to an earlier group once advanced
	let currentGroupIndex = 0;
	for (const tag of projectedTags) {
		let foundInGroup = false;
		for (let i = currentGroupIndex; i < orderedElements.length; i++) {
			if (orderedElements[i].includes(tag)) {
				// Found in the same or a later group — advance the scanning index to this group
				currentGroupIndex = i;
				foundInGroup = true;
				break;
			}
		}

		// If the tag is not part of any allowed group (or would force re-ordering backwards),
		// then this insertion violates the ordered constraints — report ok:true
		if (!foundInGroup) return { success: true, ok: true };
	}

	// No ordering violations detected
	return { success: true, ok: false };
}
