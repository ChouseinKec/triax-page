// Types
import type { ValidateResult } from '@/shared/types/result';
import type { BlockStyles } from '@/core/block/instance/types';

// Helpers
import { validateObject } from '@/shared/helpers';

/**
 * Checks if the styles is a valid object containing CSS styles for the block.
 *
 * @param blockStyles - The block styles object to validate
 */
export function validateBlockStyles(blockStyles: unknown): ValidateResult<BlockStyles> {
	const validation = validateObject(blockStyles);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockStyles };
}
