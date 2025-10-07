// Registry
import { getRegisteredBlocks as getBlocksFromRegistry, getRegisteredBlock as getBlockFromRegistry } from '@/src/page-builder/state/registries/block';

// Utilities
import { validateOrLog } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Types
import type { BlockDefinition, BlockType, BlockID } from '@/src/page-builder/core/block/block/types';
import type { ReactNode } from 'react';

// Helpers
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/block/validation';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

/**
 * Gets all registered block definitions from the registry.
 * @returns Record of all registered block definitions keyed by type
 * @example
 * const blocks = getRegisteredBlocks(); // { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return getBlocksFromRegistry();
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 * @returns The block definition or undefined if not found
 * @example
 * const blockDef = getRegisteredBlock('text'); // BlockDefinition | undefined
 */
export function getRegisteredBlock(blockType: BlockType): BlockDefinition | undefined {
	const safeParams = validateOrLog({ blockType: validateBlockType(blockType) }, `[BlockManager → getRegisteredBlock]`);
	if (!safeParams) return;

	return getBlockFromRegistry(safeParams.blockType);
}

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType - The parent block type
 * @param childType - The child block type to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockTypeAcceptChildType('container', 'text'); → true
 */
export function canBlockTypeAcceptChildType(parentType: BlockType, childType: BlockType): boolean {
	const safeParams = validateOrLog({ parentType: validateBlockType(parentType), childType: validateBlockType(childType) }, `[BlockManager → canBlockTypeAcceptChildType]`);
	if (!safeParams) return false;

	const registeredBlocks = getBlocksFromRegistry();

	const parentBlockDefinition = registeredBlocks[safeParams.parentType];
	if (!parentBlockDefinition) return devLog.error(`[BlockManager → canBlockTypeAcceptChildType] Parent block definition not found`), false;

	const childBlockDefinition = registeredBlocks[safeParams.childType];
	if (!childBlockDefinition) return devLog.error(`[BlockManager → canBlockTypeAcceptChildType] Child block definition not found`), false;

	if (parentBlockDefinition.permittedContent == null) return true;
	return parentBlockDefinition.permittedContent.includes(childBlockDefinition.type);
}

/**
 * Checks if a child block is permitted within a parent block.
 * @param parentID - The parent block ID
 * @param childID - The child block ID to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockAcceptChild('block-123', 'block-456'); → true
 */
export function canBlockAcceptChild(parentID: BlockID, childID: BlockID): boolean {
	const safeParams = validateOrLog({ parentID: validateBlockID(parentID), childID: validateBlockID(childID) }, `[BlockManager → canBlockAcceptChild]`);
	if (!safeParams) return false;

	const store = useBlockStore.getState();
	const registeredBlocks = getBlocksFromRegistry();

	const parentBlockInstance = store.getBlock(safeParams.parentID);
	if (!parentBlockInstance) return devLog.error(`[BlockManager → canBlockAcceptChild] Parent block instance not found`), false;
	const childBlockInstance = store.getBlock(safeParams.childID);
	if (!childBlockInstance) return devLog.error(`[BlockManager → canBlockAcceptChild] Child block instance not found`), false;

	const parentBlockDefinition = registeredBlocks[parentBlockInstance.type];
	if (!parentBlockDefinition) return devLog.error(`[BlockManager → canBlockAcceptChild] Parent block definition not found`), false;
	const childBlockDefinition = registeredBlocks[childBlockInstance.type];
	if (!childBlockDefinition) return devLog.error(`[BlockManager → canBlockAcceptChild] Child block definition not found`), false;

	if (parentBlockDefinition.permittedContent == null) return true;
	return parentBlockDefinition.permittedContent.includes(childBlockDefinition.type);
}

/**
 * Checks if a block type can have children based on its permittedContent property.
 * @param parentType - The parent block type to check
 * @returns True if the block type can have children, false otherwise
 * @example
 * const canHaveChildren = canBlockHaveChildren('container'); → true
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → canBlockHaveChildren]`);
	if (!safeParams) return devLog.error(`[BlockManager → canBlockHaveChildren] Invalid block ID`), false;

	const blockInstance = useBlockStore.getState().getBlock(safeParams.blockID);
	if (!blockInstance) return devLog.error(`[BlockManager → canBlockHaveChildren] Block instance not found`), false;

	const registeredBlocks = getBlocksFromRegistry();
	const blockDefinition = registeredBlocks[blockInstance.type];
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
	const safeParams = validateOrLog({ blockType: validateBlockType(blockType) }, `[BlockManager → getBlockIcon]`);
	if (!safeParams) return;

	return getRegisteredBlock(safeParams.blockType)?.icon;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 * @returns The block's render function or undefined if not found or type is undefined
 * @example
 * const render = getBlockRender('text'); // (block, children) => <TextBlock ... />
 */
export function getBlockRender(blockType: BlockType | undefined) {
	const safeParams = validateOrLog({ blockType: validateBlockType(blockType) }, `[BlockManager → getBlockRender]`);
	if (!safeParams) return;

	return getRegisteredBlock(safeParams.blockType)?.render;
}
