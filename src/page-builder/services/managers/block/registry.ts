// Registry
import * as blockRegistry from '@/src/page-builder/state/registries/block';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Types
import type { BlockDefinition, BlockType, BlockID } from '@/src/page-builder/core/block/block/types';
import type { ReactNode } from 'react';

// Helpers
import { canBlockMoveInto } from '@/src/page-builder/services/helpers/block';
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/validate';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

/**
 * Gets all registered block definitions from the registry.
 * @returns Record of all registered block definitions keyed by type
 * @example
 * const blocks = getRegisteredBlocks(); // { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return blockRegistry.getRegisteredBlocks();
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

	return blockRegistry.getRegisteredBlock(safeData.blockType);
}

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType - The parent block type
 * @param childType - The child block type to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockAcceptChild('container', 'text'); → true
 */
export function canBlockAcceptChild(parentType: BlockType, childType: BlockType): boolean {
	const safeData = new ValidationPipeline('[BlockManager → canBlockAcceptChild]')
		.validate({
			parentType: validateBlockType(parentType),
			childType: validateBlockType(childType),
		})
		.execute();
	if (!safeData) return false;

	return canBlockMoveInto(parentType, childType);
}


/**
 * Checks if a block type can have children based on its permittedContent property.
 * @param parentType - The parent block type to check
 * @returns True if the block type can have children, false otherwise
 * @example
 * const canHaveChildren = canBlockHaveChildren('container'); → true
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return false;

	const registeredBlocks = blockRegistry.getRegisteredBlocks();
	const blockDefinition = registeredBlocks[safeData.blockInstance.type];

	if (!blockDefinition) return devLog.error(`[BlockManager → canBlockHaveChildren] Block definition not found`), false;

	if (blockDefinition.permittedContent == null) return true;
	return blockDefinition.permittedContent.length > 0;
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
export function getBlockRender(blockType: BlockType | undefined) {
	const safeData = new ValidationPipeline('[BlockManager → getBlockRender]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return getRegisteredBlock(safeData.blockType)?.render;
}
