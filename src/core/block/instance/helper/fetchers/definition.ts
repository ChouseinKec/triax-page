// Types
import type { BlockDefinition, BlockType,BlockDefinitionRecord } from '@/src/core/block/instance/types';
import type { FetchResult } from '@/src/shared/types/result';
import type { BlockRegistryRecord } from '@/src/core/block/instance/registry';

/**
 * Fetch all block definitions from the registry.
 *
 * @param registeredBlocks - registry record containing block definitions
 */
export function fetchBlockDefinitions(registeredBlocks: BlockRegistryRecord): FetchResult<BlockDefinitionRecord> {
    // If the registry is missing, return an error
    if (!registeredBlocks) return { success: false, error: `No registered blocks found in the block registry` };

	// The registry is present; return it directly
	return { success: true, data: registeredBlocks };
}

/**
 * Fetch a single block definition by its type key from the registry.
 *
 * @param blockType - block type key to resolve (e.g. 'container', 'text')
 * @param registeredBlocks - registry containing available block definitions
 */
export function fetchBlockDefinition(blockType: BlockType, registeredBlocks: BlockRegistryRecord): FetchResult<BlockDefinition> {
	// Lookup the block type in the registry map
	const block = registeredBlocks[blockType];

	// If missing, return a helpful error for debugging and early failure
	if (!block) return { success: false, error: `Block type not registered: '${blockType}' is not a recognized block type` };

	// Found — return the block definition
	return { success: true, data: block };
}
