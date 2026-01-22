// Types
import type { NodeKey, NodeDefinition, NodeComponent, NodeAllowedChildren, NodeCategory, NodeIcon, NodeAttributes, NodeStyles } from '@/core/block/node/definition/types';
import type { NodeID, NodeInstance } from '@/core/block/node/instance/types';
import type { ElementKey } from '@/core/block/element/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateString, validateArray, validateObject, validateElement } from '@/shared/helpers';
import { validateNodeStyles } from '@/core/block/style/helpers/';
import { validateNodeAttributes } from '@/core/block/attribute/helpers/';

/**
 * Checks if the ID is a valid non-empty string identifier.
 *
 * @param nodeID - The block ID to validate
 */
export function validateNodeID(nodeID: unknown): ValidateResult<NodeID> {
	const validation = validateString(nodeID);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeID };
}

/**
 * Checks if the type is a valid non-empty string representing a registered block type.
 *
 * @param nodeKey - The block type to validate
 */
export function validateNodeKey(nodeKey: unknown): ValidateResult<NodeKey> {
	const validation = validateString(nodeKey);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeKey };
}

/**
 * Checks if the tag is a valid HTML element tag from the predefined element definitions.
 *
 * @param blockTag - The block tag to validate
 * @param availableTags - Optional array of available tags to check against
 */
export function validateBlockTag(blockTag: unknown, availableTags?: ElementKey[]): ValidateResult<ElementKey> {
	const validation = validateString(blockTag);
	if (!validation.valid) return validation;

	// if (!Object.keys(getElementDefinitions()).includes(validation.value as ElementKey)) {
	// 	return { valid: false, message: `Invalid block tag: expected a valid HTML element tag, got "${validation.value}"` };
	// }

	// If availableTags is provided, check that blockTag is included
	if (availableTags && !availableTags.includes(validation.value as ElementKey)) {
		return { valid: false, message: `Invalid block tag: '${validation.value}' is not in availableTags [${availableTags.join(', ')}]` };
	}

	return { valid: true, value: validation.value as ElementKey };
}

/**
 * Checks if all availableTags in the array are valid HTML element availableTags.
 *
 * @param blockAllowedTags - The array of block availableTags to validate
 */
export function validateBlockAvailableTags(blockTags: unknown): ValidateResult<ElementKey[]> {
	const validation = validateArray(blockTags);
	if (!validation.valid) return validation;

	for (const tag of validation.value) {
		const tagValidation = validateBlockTag(tag);
		if (!tagValidation.valid) return { valid: false, message: `Invalid block availableTags: '${tag}' is not a valid HTML element tag` };
	}

	return { valid: true, value: validation.value as ElementKey[] };
}

/**
 * Checks if the component configuration is a valid function that can component the block.
 * @param nodeComponent - The block component configuration to validate
 * @returns ValidateResult containing validity and the validated NodeComponent function if valid
 */
export function validateNodeComponent(nodeComponent: unknown): ValidateResult<NodeComponent> {
	const objectValidation = validateObject(nodeComponent);
	if (!objectValidation.valid) return { valid: false, message: `Invalid block component: expected a function, received ${typeof nodeComponent}` };

	return { valid: true, value: nodeComponent as NodeComponent };
}

/**
 * Checks if all content types in the array are valid block types that this block can contain.
 *
 * @param allowedChildren - The array of permitted content types to validate
 */
export function validateNodeAllowedChildren(allowedChildren: unknown): ValidateResult<NodeAllowedChildren> {
	if (allowedChildren === null) {
		return { valid: true, value: [] };
	}

	if (!Array.isArray(allowedChildren)) {
		return { valid: false, message: `Invalid block allowed elements: expected an array or null, got ${typeof allowedChildren}` };
	}

	for (const type of allowedChildren) {
		const typeValidation = validateNodeKey(type);
		if (!typeValidation.valid) return typeValidation;
	}

	return { valid: true, value: allowedChildren as NodeAllowedChildren };
}

/**
 * Checks if the category is a valid non-empty string representing a block category.
 *
 * @param nodeCategory - The block category to validate
 */
export function validateNodeCategory(nodeCategory: unknown): ValidateResult<NodeCategory> {
	const validation = validateString(nodeCategory);
	if (!validation.valid) return validation;

	return { valid: true, value: nodeCategory as NodeCategory };
}

/**
 * Checks if the icon is a valid React component.
 *
 * @param nodeIcon - The block icon React component to validate
 */
export function validateNodeIcon(nodeIcon: unknown): ValidateResult<NodeIcon> {
	const componentValidation = validateElement(nodeIcon);
	if (componentValidation.valid) return { valid: true, value: componentValidation.value as NodeIcon };

	return { valid: false, message: `Invalid block icon: expected a React element, got ${typeof nodeIcon}` };
}

/**
 * Checks if the instance has required properties (id, type, parentID, contentIDs, attributes, styles)
 * and that each property is valid.
 *
 * @param nodeInstance - The block instance to validate
 */
export function validateNodeInstance(nodeInstance: unknown): ValidateResult<NodeInstance> {
	const validation = validateObject(nodeInstance, ['id', 'type', 'parentID', 'contentIDs', 'attributes', 'styles']);
	if (!validation.valid) return { valid: false, message: `Invalid block instance: ${validation.message}` };

	const typeValidation = validateNodeKey(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const attributesValidation = validateNodeAttributes(validation.value.attributes);
	if (!attributesValidation.valid) return { valid: false, message: attributesValidation.message };

	const stylesValidation = validateNodeStyles(validation.value.styles);
	if (!stylesValidation.valid) return { valid: false, message: stylesValidation.message };

	return { valid: true, value: validation.value as unknown as NodeInstance };
}

/**
 * Checks if the definition has all required properties (type, availableTags, component, allowedChildren, icon, category)
 * and that each property is valid according to its respective validation rules.
 *
 * @param nodeDefinition - The block definition object to validate
 */
export function validateNodeDefinition(nodeDefinition: unknown): ValidateResult<NodeDefinition> {
	const validation = validateObject(nodeDefinition, ['key', 'defaultTag', 'icon', 'category', 'component', 'availableTags', 'allowedChildren']);
	if (!validation.valid) return { valid: false, message: `Invalid block definition: ${validation.message}` };

	const keyValidation = validateNodeKey(validation.value.key);
	if (!keyValidation.valid) return { valid: false, message: keyValidation.message };

	const allowedTagsValidation = validateBlockAvailableTags(validation.value.availableTags);
	if (!allowedTagsValidation.valid) return { valid: false, message: allowedTagsValidation.message };

	const tagValidation = validateBlockTag(validation.value.defaultTag, allowedTagsValidation.value);
	if (!tagValidation.valid) return { valid: false, message: tagValidation.message };

	const renderValidation = validateNodeComponent(validation.value.component);
	if (!renderValidation.valid) return { valid: false, message: renderValidation.message };

	const permittedContentValidation = validateNodeAllowedChildren(validation.value.allowedChildren);
	if (!permittedContentValidation.valid) return { valid: false, message: permittedContentValidation.message };

	const categoryValidation = validateNodeCategory(validation.value.category);
	if (!categoryValidation.valid) return { valid: false, message: categoryValidation.message };

	const iconValidation = validateNodeIcon(validation.value.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: validation.value as unknown as NodeDefinition };
}
