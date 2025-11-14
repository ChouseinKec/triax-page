import type { BlockDefinition, BlockType } from '@/src/core/block/instance/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateBlockDefinition } from '@/src/core/block/instance/helper';

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
	registerBlock(block: BlockDefinition): ValidateResult<BlockDefinition> {
		const validation = validateBlockDefinition(block);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.blocks[block.type]) {
			return { valid: false, message: `Block with type "${block.type}" already registered` };
		}

		this.blocks = { ...this.blocks, [block.type]: block };
		return { valid: true, value: block };
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
	getRegisteredBlock(type: BlockType): BlockDefinition | undefined {
		return this.blocks[type];
	}
}

// Create singleton instance
const blockRegistry = new BlockRegistry();

// Export the registry instance methods
export const registerBlock = (block: BlockDefinition) => blockRegistry.registerBlock(block);
export const getRegisteredBlocks = () => blockRegistry.getRegisteredBlocks();
export const getRegisteredBlock = (type: BlockType) => blockRegistry.getRegisteredBlock(type);
