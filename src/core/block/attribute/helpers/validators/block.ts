// Types
import type { ValidateResult } from '@/src/shared/types/result';
import type { BlockAttributes } from '@/src/core/block/instance/types';

// Helpers
import {  validateObject } from '@/src/shared/helpers';

/**
 * Checks if the attributes is a valid object containing HTML attributes for the block.
 *
 * @param blockAttributes - The block attributes object to validate
 */
export function validateBlockAttributes(blockAttributes: unknown): ValidateResult<BlockAttributes> {
	const validation = validateObject(blockAttributes);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockAttributes };
}
