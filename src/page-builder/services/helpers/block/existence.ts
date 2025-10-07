// Types
import type { BlockID, BlockInstance } from '@/src/page-builder/core/block/block/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

/**
 * Validates that a block exists in the store and returns it.
 * Logs an error if the block is not found.
 *
 * @param blockID - The block ID to validate existence for
 * @param context - Optional context string for error messages (e.g., 'Target block', 'Source block')
 * @returns The block instance if found, undefined if not found (error is logged)
 *
 * @example
 */
export function validateBlockExistence(blockID: BlockID): ValidationResult<BlockInstance> {
	const store = useBlockStore.getState();
	const block = store.getBlock(blockID);

	if (!block) return { valid: false, message: `Block not found: ${blockID}` };

	return { valid: true, value: block as BlockInstance };
}
