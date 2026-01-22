// Types
import type { ValidateResult } from '@/shared/types/result';
import type { NodeAttributes } from '@/core/block/node/definition/types/definition';

// Helpers
import {  validateObject } from '@/shared/helpers';

/**
 * Checks if the attributes is a valid object containing HTML attributes for the block.
 *
 * @param NodeAttributes - The block attributes object to validate
 */
export function validateNodeAttributes(NodeAttributes: unknown): ValidateResult<NodeAttributes> {
	const validation = validateObject(NodeAttributes);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeAttributes };
}
