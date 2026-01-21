// Types
import type { BlockType, BlockAllowedStyles, BlockAllowedAttributes, BlockComponent } from '@/core/block/instance/types';
import type { ElementKey } from '@/core/block/element/types';
import type { ReactNode } from 'react';

// Helpers
import { pickBlockDefinition } from '@/core/block/instance/helpers/pickers';
import { validateBlockType } from '@/core/block/instance/helpers/validators';

// Registry
import { getRegisteredBlocks } from '@/core/block/instance/registries';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 */
export function getBlockIcon(blockType: BlockType): ReactNode | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockIcon]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition.icon;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 */
export function getBlockComponent(blockType: BlockType): BlockComponent | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockComponent]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition.component;
}

/**
 * Gets the available HTML element availableTags for a specific block type.
 * @param blockType - The block type to get availableTags for
 */
export function getBlockAvailableTags(blockType: BlockType): ElementKey[] | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockAvailableTags]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition.availableTags;
}

/**
 * Gets the allowed styles for a specific block type.
 * @param blockType - The block type to get allowed styles for
 */
export function getBlockAllowedStyles(blockType: BlockType): BlockAllowedStyles | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockAllowedStyles]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition.allowedStyles;
}

/**
 * Gets the allowed attributes for a specific block type.
 * @param blockType - The block type to get allowed attributes for
 */
export function getBlockAllowedAttributes(blockType: BlockType): BlockAllowedAttributes | undefined {
	const results = new ResultPipeline('[BlockQueries → getBlockAllowedAttributes]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return;

	return results.blockDefinition.allowedAttributes;
}
