// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/instance';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateString, validateObject } from '@/shared/helpers';
import { validateNodeStyles } from '@/core/block/style/helpers/';
import { validateNodeAttributes } from '@/core/block/attribute/helpers/';
import { validateNodeKey } from '@/core/block/node/helpers/validators/definition';

/**
 * Validates that the provided value is a valid node ID.
 *
 * A valid node ID must be a non-empty string that serves as a unique identifier
 * for node instances within the system. This validation ensures type safety
 * and prevents invalid identifiers from being used.
 *
 * @param nodeID - The value to validate as a node ID
 * @returns A ValidateResult indicating whether the value is a valid node ID
 */
export function validateNodeID(nodeID: unknown): ValidateResult<NodeID> {
	const validation = validateString(nodeID);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeID };
}

/**
 * Validates that the provided value is a complete and valid node instance.
 *
 * This comprehensive validation checks that the node instance has all required
 * properties (id, definitionKey, parentID, childNodeIDs, attributes, styles, data)
 * and that each property conforms to its expected type and constraints. It also
 * validates nested properties like attributes and styles using their respective
 * validators.
 *
 * @param nodeInstance - The value to validate as a node instance
 * @returns A ValidateResult indicating whether the value is a valid node instance
 */
export function validateNodeInstance(nodeInstance: unknown): ValidateResult<NodeInstance> {
	const validation = validateObject(nodeInstance, ['id', 'parentID', 'definitionKey','elementKey',  'childNodeIDs', 'attributes', 'styles', 'data']);
	if (!validation.valid) return { valid: false, message: `Invalid block instance: ${validation.message}` };

	const typeValidation = validateNodeKey(validation.value.definitionKey);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const attributesValidation = validateNodeAttributes(validation.value.attributes);
	if (!attributesValidation.valid) return { valid: false, message: attributesValidation.message };

	const stylesValidation = validateNodeStyles(validation.value.styles);
	if (!stylesValidation.valid) return { valid: false, message: stylesValidation.message };

	return { valid: true, value: validation.value as unknown as NodeInstance };
}
