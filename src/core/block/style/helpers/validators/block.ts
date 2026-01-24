// Types
import type { ValidateResult } from '@/shared/types/result';
import type { NodeStyles } from '@/core/block/node/types/definition';

// Helpers
import { validateObject } from '@/shared/helpers';

/**
 * Checks if the styles is a valid object containing CSS styles for the block.
 *
 * @param NodeStyles - The block styles object to validate
 */
export function validateNodeStyles(NodeStyles: unknown): ValidateResult<NodeStyles> {
	const validation = validateObject(NodeStyles);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as NodeStyles };
}
