// Types
import type { BlockDefinition, BlockID, BlockInstance, BlockRecord, BlockAttributes, BlockType, BlockContent } from '@/src/core/block/instance/types';
import type { FetchResult } from '@/src/shared/types/result';

// Registry
import { BlockRegistryRecord } from '@/src/core/block/instance/registry';

/**
 * Fetches a block instance from the block collection by its ID.
 * Returns a result object indicating success with the block data or failure with an error message.
 * @param blockID - The unique identifier of the block to fetch
 * @param allBlocks - The complete block collection
 * @returns FetchResult containing the block instance or error message
 * @example
 * fetchBlock('block-123', allBlocks) → { success: true, data: BlockInstance }
 * fetchBlock('invalid-id', allBlocks) → { success: false, error: 'Block not found...' }
 */
export function fetchBlock(blockID: BlockID, allBlocks: BlockRecord): FetchResult<BlockInstance> {
	const block = allBlocks[blockID];
	if (!block) return { success: false, error: `Block not found: '${blockID}' does not exist in the block collection` };

	return { success: true, data: block };
}

/**
 * Fetches a registered block definition from the block registry by its type.
 * Returns a result object indicating success with the definition or failure with an error message.
 * @param blockType - The type identifier of the block definition to fetch
 * @returns FetchResult containing the block definition or error message
 * @example
 * fetchBlockDefinition('text') → { success: true, data: BlockDefinition }
 * fetchBlockDefinition('invalid-type') → { success: false, error: 'Block type not registered...' }
 */
export function fetchBlockDefinition(blockType: BlockType, registeredBlocks: BlockRegistryRecord): FetchResult<BlockDefinition> {
	const block = registeredBlocks[blockType];
	if (!block) return { success: false, error: `Block type not registered: '${blockType}' is not a recognized block type` };

	return { success: true, data: block };
}

/**
 * Fetches all registered block definitions from the block registry.
 * Returns a result object with all block definitions keyed by their type.
 * @returns FetchResult containing all registered block definitions
 * @example
 * fetchBlockDefinitions() → { success: true, data: { 'text': BlockDefinition, 'container': BlockDefinition } }
 */
export function fetchBlockDefinitions(registeredBlocks: BlockRegistryRecord): FetchResult<Record<string, BlockDefinition>> {
	if (!registeredBlocks) return { success: false, error: `No registered blocks found in the block registry` };

	return { success: true, data: registeredBlocks };
}

/**
 * Fetches the content of a block instance from the block collection by its ID.
 * Returns a result object indicating success with the content or failure with an error message.
 * @param blockID - The unique identifier of the block to fetch content for
 * @param allBlocks - The complete block collection
 * @returns FetchResult containing the block content or error message
 * @example
 * fetchBlockContent('block-123', allBlocks) → { success: true, data: { text: 'Hello' } }
 * fetchBlockContent('invalid-id', allBlocks) → { success: false, error: 'Block not found...' }
 */
export function fetchBlockContent(blockID: BlockID, allBlocks: BlockRecord): FetchResult<BlockContent> {
	const blockResult = fetchBlock(blockID, allBlocks);
	if (!blockResult.success) return blockResult;

	const content = blockResult.data.content;
	if (!content) return { success: false, error: `Block content not found for block: '${blockID}'` };

	return { success: true, data: content };
}

/**
 * Fetches the selected block ID from the store state.
 * Returns a result object indicating success with the selected block ID or failure if undefined.
 * @param selectedBlockID - The selected block ID value from the store
 * @returns FetchResult containing the selected block ID or error message
 * @example
 * fetchSelectedBlock('block-123') → { success: true, data: 'block-123' }
 * fetchSelectedBlock(null) → { success: true, data: null }
 * fetchSelectedBlock(undefined) → { success: false, error: 'selectedBlockID is undefined...' }
 */
export function fetchSelectedBlock(selectedBlockID: BlockID | null, allBlocks: BlockRecord): FetchResult<BlockID | null> {
	if (!selectedBlockID) return { success: false, error: `No selected block ID provided in the block store` };

	const selectedBlock = fetchBlock(selectedBlockID, allBlocks);
	if (!selectedBlock.success) return { success: false, error: `Selected block not found: '${selectedBlockID}'` };

	return { success: true, data: selectedBlockID };
}

/**
 * Fetches the attributes of a block instance from the block collection by its ID.
 * Returns a result object indicating success with the attributes or failure with an error message.
 * @param blockID - The unique identifier of the block to fetch attributes for
 * @param allBlocks - The complete block collection
 * @returns FetchResult containing the block attributes or error message
 * @example
 * fetchBlockAttributes('block-123', allBlocks) → { success: true, data: { class: 'my-class' } }
 * fetchBlockAttributes('invalid-id', allBlocks) → { success: false, error: 'Block not found...' }
 */
export function fetchBlockAttributes(blockID: BlockID, allBlocks: BlockRecord): FetchResult<BlockAttributes> {
	const blockResult = fetchBlock(blockID, allBlocks);
	if (!blockResult.success) return blockResult;

	const attributes = blockResult.data.attributes;
	if (!attributes) return { success: false, error: `Block attributes not found for block: '${blockID}'` };

	return { success: true, data: attributes };
}
