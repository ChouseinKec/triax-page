// Registry
import { getRegisteredBlocks as getBlocksFromRegistry, getRegisteredBlock as getBlockFromRegistry } from '@/src/page-builder/state/registries/block';

// Utilities
import { isBlockChildAllowed as isBlockChildAllowedUtil } from '@/src/page-builder/core/block/block/utilities';

// Types
import type { BlockDefinition, BlockTypes } from '@/src/page-builder/core/block/block/types';
import type { ReactNode } from 'react';

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
export function getRegisteredBlock(blockType: BlockTypes): BlockDefinition | undefined {
	return getBlockFromRegistry(blockType);
}

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType - The parent block type
 * @param childType - The child block type to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = isBlockChildAllowed('container', 'text'); // true
 */
export function isBlockChildAllowed(parentType: BlockTypes, childType: BlockTypes): boolean {
	return isBlockChildAllowedUtil(parentType, childType, getBlocksFromRegistry());
}

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 * @returns The block's icon component or null if not found or type is undefined
 * @example
 * const icon = getBlockIcon('text'); // <TextIcon />
 */
export function getBlockIcon(blockType: BlockTypes | undefined): ReactNode | undefined {
	return blockType ? getRegisteredBlock(blockType)?.icon || undefined : undefined;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 * @returns The block's render function or undefined if not found or type is undefined
 * @example
 * const render = getBlockRender('text'); // (block, children) => <TextBlock ... />
 */
export function getBlockRender(blockType: BlockTypes | undefined) {
	return blockType ? getRegisteredBlock(blockType)?.render : undefined;
}
