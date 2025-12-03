// Types
import type { BlockDefinition, BlockType } from '@/src/core/block/instance/types';
import type { PickResult } from '@/src/shared/types/result';
import type { BlockRegistryRecord } from '@/src/core/block/instance/registries';

/**
 * Fetch a single block definition by its type key from the registry.
 *
 * @param blockType - block type key to resolve (e.g. 'container', 'text')
 * @param registeredBlocks - registry containing available block definitions
 */
export function pickBlockDefinition(blockType: BlockType, registeredBlocks: BlockRegistryRecord): PickResult<BlockDefinition> {
	// Lookup the block type in the registry map
	const BlockDefinition = registeredBlocks[blockType];

	// If missing, return an error
	if (!BlockDefinition) return { success: false, error: `Block type not registered: '${blockType}' is not a recognized block type` };

	// Return the found block definition
	return { success: true, data: BlockDefinition };
}
