// Types
import type { ElementKey, ElementDefinition } from '@/core/block/element/types';
import type { CheckResult } from '@/shared/types/result';

/**
 * Checks whether the parent element definition requires a child with the specified element key.
 *
 * This function determines if the given element key is mandatory in the parent's structure,
 * based on minimum count constraints in the element definition.
 *
 * @param sourceElementKey - The element key of the candidate child to check
 * @param targetElementDefinition - The definition of the parent element to consult
 * @returns CheckResult - Success with passed true if required, false if optional; failure if validation fails
 */
export function isElementRequired(sourceElementKey: ElementKey, targetElementDefinition: ElementDefinition): CheckResult {
	// If the parent has no structure constraints, the child is not required
	const structure = targetElementDefinition.structure;
	if (!structure) return { success: true, passed: false, message: 'No structure constraints defined' };

	// Check if the structure requires this element
	const requiredItem = structure.find((item) => item.key === sourceElementKey && item.min != null && item.min > 0);
	if (requiredItem) return { success: true, passed: true };

	// Otherwise the child's element type is not required by this parent
	return { success: true, passed: false, message: 'Element is not required in the structure' };
}

/**
 * Checks whether the parent element definition allows an optional child with the specified element key.
 *
 * This function determines if the given element key is not required in the parent's structure,
 * meaning it can be omitted without violating minimum count constraints.
 *
 * @param sourceElementKey - The element key of the candidate child to check
 * @param targetElementDefinition - The definition of the parent element to consult
 * @returns CheckResult - Success with passed true if optional, false if required; failure if validation fails
 * @see {@link isElementRequired} - The complementary function that checks if required
 */
export function isElementOptional(sourceElementKey: ElementKey, targetElementDefinition: ElementDefinition): CheckResult {
	const requiredResult = isElementRequired(sourceElementKey, targetElementDefinition);
	if (!requiredResult.success) return requiredResult;

	return {
		success: true,
		passed: !requiredResult.passed,
		message: requiredResult.passed ? 'Element is required in the structure' : 'Element is optional in the structure',
	};
}

/**
 * Checks whether the parent element definition allows a child with the specified element key.
 *
 * This function verifies if the given element key is permitted as a child,
 * based on the parent's allowedChildren list or lack thereof.
 *
 * @param sourceElementKey - The element key of the candidate child to check
 * @param targetElementDefinition - The definition of the parent element to consult
 * @returns CheckResult - Success with passed true if allowed, false if not; failure if validation fails
 */
export function isElementAllowed(sourceElementKey: ElementKey, targetElementDefinition: ElementDefinition): CheckResult {
	// If the parent does not restrict allowed children, the child is permitted
	const allowedChildren = targetElementDefinition.allowedChildren;
	if (!allowedChildren) return { success: true, passed: true };

	// If the allowed list explicitly contains the child's tag it's permitted
	if (allowedChildren.includes(sourceElementKey)) return { success: true, passed: true };

	// Otherwise the child's element type is not permitted by this parent
	return { success: true, passed: false, message: 'Element not in allowed children list' };
}

/**
 * Checks whether the specified ancestor element key is forbidden for the child element definition.
 *
 * This function determines if the child's definition prohibits the given parent element key
 * as an ancestor, based on the forbiddenAncestors list.
 *
 * @param sourceElementDefinition - The definition of the child element being checked
 * @param targetElementKey - The element key of the potential ancestor parent
 * @returns CheckResult - Success with passed true if forbidden, false if allowed; failure if validation fails
 */
export function isElementAncestorForbidden(sourceElementDefinition: ElementDefinition, targetElementKey: ElementKey): CheckResult {
	// If there are no forbidden ancestors declared, the ancestor is not forbidden
	const forbiddenAncestors = sourceElementDefinition.forbiddenAncestors;
	if (!forbiddenAncestors) return { success: true, passed: false, message: 'No forbidden ancestors defined' };

	// Check if the immediate parent is forbidden
	if (forbiddenAncestors.includes(targetElementKey)) return { success: true, passed: true };

	// The ancestor is not forbidden
	return { success: true, passed: false, message: 'Parent is not a forbidden ancestor' };
}

/**
 * Checks whether the element definition has any required child elements.
 *
 * This function determines if the given element definition mandates any minimum child counts,
 * indicating that certain child elements must be present.
 *
 * @param elementDefinition - The element definition to check for required children
 * @returns CheckResult - Success with passed true if has required elements, false if none; failure if validation fails
 */
export function hasElementRequiredElements(elementDefinition: ElementDefinition): CheckResult {
	const structure = elementDefinition.structure;
	if (!structure) return { success: true, passed: false, message: 'No structure constraints defined' };

	const hasRequired = structure.some((item) => item.min != null && item.min > 0);
	if (hasRequired) return { success: true, passed: true };

	return { success: true, passed: false, message: 'No required elements' };
}
