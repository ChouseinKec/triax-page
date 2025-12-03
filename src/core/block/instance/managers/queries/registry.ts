// Types
import type { BlockDefinition, BlockType, BlockDefinitionRecord } from '@/src/core/block/instance/types';

// Helpers
import { pickBlockDefinition } from '@/src/core/block/instance/helpers/pickers';
import { validateBlockType } from '@/src/core/block/instance/helpers/validators';

// Registry
import { getRegisteredBlocks } from '@/src/core/block/instance/registries';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Gets all registered block definitions from the registry.
 */
export function getBlockDefinitions(): BlockDefinitionRecord {
	return getRegisteredBlocks();
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 */
export function getBlockDefinition(blockType: BlockType): BlockDefinition | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockDefinition]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition;
}
