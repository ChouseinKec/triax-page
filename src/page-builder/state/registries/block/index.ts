import { ReactNode } from 'react';

import type { BlockDefinition, BlockTypes } from '@/src/page-builder/core/block/block/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Helpers
import { validateBlockDefinition } from '@/src/page-builder/services/helpers/block/block';

/**
 * Class-based block registry for managing block definitions
 */
class BlockRegistry {
	private blocks: Record<string, BlockDefinition> = {};

	/**
	 * Registers a block definition in the block registry.
	 * @param block - The block definition to register
	 * @returns Success status with optional error message
	 */
	registerBlock(block: BlockDefinition): ValidationResult {
		const validation = validateBlockDefinition(block);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.blocks[block.type]) {
			return { success: false, error: `Block with type "${block.type}" already registered` };
		}

		this.blocks = { ...this.blocks, [block.type]: block };
		return { success: true };
	}

	/**
	 * Retrieves all registered block definitions.
	 * @returns Readonly record of all registered blocks keyed by their type
	 */
	getRegisteredBlocks(): Readonly<Record<string, BlockDefinition>> {
		return { ...this.blocks };
	}

	/**
	 * Retrieves a specific block definition by its type.
	 * @param type - The block type to retrieve
	 * @returns The block definition if found, undefined otherwise
	 */
	getRegisteredBlock(type: BlockTypes): BlockDefinition | undefined {
		return this.blocks[type];
	}
}

// Create singleton instance
const blockRegistry = new BlockRegistry();

// Export the registry instance methods
export const registerBlock = (block: BlockDefinition) => blockRegistry.registerBlock(block);
export const getRegisteredBlocks = () => blockRegistry.getRegisteredBlocks();
export const getRegisteredBlock = (type: BlockTypes) => blockRegistry.getRegisteredBlock(type);
