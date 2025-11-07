// Registry
import * as BlockRegistry from '@/src/page-builder/state/registries/block';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Types
import type { BlockDefinition, BlockType } from '@/src/page-builder/core/block/block/types';
import type { ReactNode } from 'react';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';

// Helpers
import { validateBlockType } from '@/src/page-builder/services/helpers/validate';

/**
 * Gets all registered block definitions from the registry.
 * @returns Record of all registered block definitions keyed by type
 * @example
 * const blocks = getRegisteredBlocks(); // { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return BlockRegistry.getRegisteredBlocks();
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 * @returns The block definition or undefined if not found
 * @example
 * const blockDef = getRegisteredBlock('text'); // BlockDefinition | undefined
 */
export function getRegisteredBlock(blockType: BlockType): BlockDefinition | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getRegisteredBlock]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return BlockRegistry.getRegisteredBlock(safeData.blockType);
}

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 * @returns The block's icon component or null if not found or type is undefined
 * @example
 * const icon = getBlockIcon('text'); // <TextIcon />
 */
export function getBlockIcon(blockType: BlockType): ReactNode | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getBlockIcon]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return getRegisteredBlock(safeData.blockType)?.icon;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 * @returns The block's render function or undefined if not found or type is undefined
 * @example
 * const render = getBlockRender('text'); // (block, children) => <TextBlock ... />
 */
export function getBlockRender(blockType: BlockType) {
	const safeData = new ValidationPipeline('[BlockManager → getBlockRender]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return getRegisteredBlock(safeData.blockType)?.render;
}

/**
 * Gets the available HTML element tags for a specific block type.
 * @param blockType - The block type to get tags for
 * @returns Array of available HTML element tags for the block type, or undefined if block type not found
 * @example
 * const tags = getBlockTags('container'); // ['div', 'section', 'article', 'aside', 'nav']
 */
export function getBlockTags(blockType: BlockType): ElementTag[] | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getBlockTags]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	const blockDefinition = getRegisteredBlock(safeData.blockType);
	return blockDefinition?.tags;
}
