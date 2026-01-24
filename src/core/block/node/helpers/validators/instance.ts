// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/instance';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateString, validateObject } from '@/shared/helpers';
import { validateNodeStyles } from '@/core/block/style/helpers/';
import { validateNodeAttributes } from '@/core/block/attribute/helpers/';
import { validateNodeKey } from '@/core/block/node/helpers/validators/definition';

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
