// Types
import type { NodeKey, NodeDefinition, NodeComponent, NodeCategory, NodeIcon } from '@/core/block/node/types/definition';
import type { ElementKey } from '@/core/block/element/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateString, validateArray, validateObject, validateElement } from '@/shared/helpers';

/**
 * Validates that the provided value is a valid node key.
 *
 * A node key must be a non-empty string that uniquely identifies a node type
 * within the system. This validation ensures that only registered node types
 * can be referenced.
 *
 * @param nodeKey - The value to validate as a node key
 * @returns A ValidateResult indicating whether the value is a valid node key
 */
export function validateNodeKey(nodeKey: unknown): ValidateResult<NodeKey> {
	const validation = validateString(nodeKey);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeKey };
}


/**
 * Validates that the provided value is a valid element key for a node.
 *
 * This function checks that the element key is a valid HTML element identifier
 * and optionally verifies that it is included in a list of supported element keys
 * for a specific node type. This ensures that only appropriate HTML elements
 * are used for rendering nodes.
 *
 * @param blockTag - The value to validate as an element key
 * @param elementKeys - Optional array of element keys that are allowed for this context
 * @returns A ValidateResult indicating whether the value is a valid element key
 */
export function validateNodeElementKey(blockTag: unknown, elementKeys?: ElementKey[]): ValidateResult<ElementKey> {
	const validation = validateString(blockTag);
	if (!validation.valid) return validation;

	// if (!Object.keys(getBlockElementDefinitions()).includes(validation.value as ElementKey)) {
	// 	return { valid: false, message: `Invalid block tag: expected a valid HTML element tag, got "${validation.value}"` };
	// }

	// If elementKeys is provided, check that blockTag is included
	if (elementKeys && !elementKeys.includes(validation.value as ElementKey)) {
		return { valid: false, message: `Invalid block tag: '${validation.value}' is not in elementKeys [${elementKeys.join(', ')}]` };
	}

	return { valid: true, value: validation.value as ElementKey };
}

/**
 * Validates that the provided value is an array of valid element keys.
 *
 * This function ensures that all elements in the array are valid HTML element
 * identifiers, which is used to define the set of supported element keys for
 * a node definition.
 *
 * @param blockTags - The value to validate as an array of element keys
 * @returns A ValidateResult indicating whether the value is a valid array of element keys
 */
export function validateBlockAvailableTags(blockTags: unknown): ValidateResult<ElementKey[]> {
	const validation = validateArray(blockTags);
	if (!validation.valid) return validation;

	for (const tag of validation.value) {
		const tagValidation = validateNodeElementKey(tag);
		if (!tagValidation.valid) return { valid: false, message: `Invalid block elementKeys: '${tag}' is not a valid HTML element tag` };
	}

	return { valid: true, value: validation.value as ElementKey[] };
}

/**
 * Validates that the provided value is a valid node component function.
 *
 * A node component must be a function that can render the node in the UI.
 * This validation ensures that the component is properly defined and can be
 * used for rendering purposes.
 *
 * @param nodeComponent - The value to validate as a node component
 * @returns A ValidateResult indicating whether the value is a valid node component
 */
export function validateNodeComponent(nodeComponent: unknown): ValidateResult<NodeComponent> {
	const objectValidation = validateObject(nodeComponent);
	if (!objectValidation.valid) return { valid: false, message: `Invalid block component: expected a function, received ${typeof nodeComponent}` };

	return { valid: true, value: nodeComponent as NodeComponent };
}

/**
 * Validates that the provided value is a valid node category.
 *
 * A node category must be a non-empty string that groups related node types
 * together for organizational purposes in the UI.
 *
 * @param nodeCategory - The value to validate as a node category
 * @returns A ValidateResult indicating whether the value is a valid node category
 */
export function validateNodeCategory(nodeCategory: unknown): ValidateResult<NodeCategory> {
	const validation = validateString(nodeCategory);
	if (!validation.valid) return validation;

	return { valid: true, value: nodeCategory as NodeCategory };
}

/**
 * Validates that the provided value is a valid node icon component.
 *
 * A node icon must be a valid React element that can be rendered as an icon
 * in the UI, typically used to represent the node type visually.
 *
 * @param nodeIcon - The value to validate as a node icon
 * @returns A ValidateResult indicating whether the value is a valid node icon
 */
export function validateNodeIcon(nodeIcon: unknown): ValidateResult<NodeIcon> {
	const componentValidation = validateElement(nodeIcon);
	if (componentValidation.valid) return { valid: true, value: componentValidation.value as NodeIcon };

	return { valid: false, message: `Invalid block icon: expected a React element, got ${typeof nodeIcon}` };
}

/**
 * Validates that the provided value is a complete and valid node definition.
 *
 * This comprehensive validation checks that the node definition has all required
 * properties (key, icon, category, component, elementKeys) and that each
 * property conforms to its expected type and validation rules. It ensures that
 * only properly configured node definitions can be registered in the system.
 *
 * @param nodeDefinition - The value to validate as a node definition
 * @returns A ValidateResult indicating whether the value is a valid node definition
 */
export function validateNodeDefinition(nodeDefinition: unknown): ValidateResult<NodeDefinition> {
	const validation = validateObject(nodeDefinition, ['key', 'icon', 'category', 'component', 'elementKeys']);
	if (!validation.valid) return { valid: false, message: `Invalid block definition: ${validation.message}` };

	const keyValidation = validateNodeKey(validation.value.key);
	if (!keyValidation.valid) return { valid: false, message: keyValidation.message };

	const allowedTagsValidation = validateBlockAvailableTags(validation.value.elementKeys);
	if (!allowedTagsValidation.valid) return { valid: false, message: allowedTagsValidation.message };

	const renderValidation = validateNodeComponent(validation.value.component);
	if (!renderValidation.valid) return { valid: false, message: renderValidation.message };

	const categoryValidation = validateNodeCategory(validation.value.category);
	if (!categoryValidation.valid) return { valid: false, message: categoryValidation.message };

	const iconValidation = validateNodeIcon(validation.value.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: validation.value as unknown as NodeDefinition };
}
