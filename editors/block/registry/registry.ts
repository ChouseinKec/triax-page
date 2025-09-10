import type { BlockDefinition, BlockTypes } from '@/editors/block/types';
import { ReactNode } from 'react';

const registry: Record<string, BlockDefinition> = {};

/**
 * Registers a block definition in the block registry.
 * @param block - The block definition to register
 */
export function registerBlock(block: BlockDefinition) {
	registry[block.type] = block;
}

/**
 * Retrieves all registered block definitions.
 * @returns Record of all registered blocks keyed by their type
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return registry;
}

/**
 * Retrieves a specific block definition by its type.
 * @param type - The block type to retrieve
 * @returns The block definition if found, undefined otherwise
 */
export function getRegisteredBlock(type: BlockTypes): BlockDefinition | undefined {
	return registry[type];
}

/**
 * Retrieves the icon for a specific block type.
 * @param type - The block type to get the icon for
 * @returns The block's icon component if found, null otherwise
 */
export function getRegisteredBlockIcon(type: BlockTypes): ReactNode | null {
	if (!type) return null;

	const block = registry[type];
	if (!block) return null;

	return block.icon || null;
}
