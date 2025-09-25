// Types
import type { BlockTypes, BlockID, BlockInstance, BlockDefinition } from '@/src/page-builder/core/block/block/types';
import type { ValidationResult, CreationResult } from '@/src/shared/types/result';

// Utilities
import { createBlock, isBlockTypeValid, isBlockTagsValid, isBlockRenderValid, isBlockAttributesValid, isBlockStylesValid, isBlockPermittedContentValid, isBlockPermittedParentValid, isBlockCategoryValid, isBlockIconValid } from '@/src/page-builder/core/block/block/utilities';

// Registry
import { getRegisteredBlock } from '@/src/page-builder/state/registries/block';

/**
 * Type guard to check if a value is a valid BlockInstance shape
 */
function isInstanceShape(value: unknown): value is Record<keyof BlockInstance, unknown> {
	return (
		typeof value === 'object' && //
		value !== null &&
		'id' in value &&
		'type' in value &&
		'parentID' in value &&
		'contentIDs' in value &&
		'attributes' in value &&
		'styles' in value 
	);
}

function isDefinitionShape(value: unknown): value is Record<keyof BlockDefinition, unknown> {
	return typeof value === 'object' && value !== null && 'type' in value && 'tags' in value && 'permittedContent' in value && 'permittedParent' in value && 'icon' in value && 'category' in value && 'render' in value;
}

export function validateBlockInstance(block: unknown): ValidationResult {
	if (!block) return { success: false, error: 'Block instance is required' };

	if (!isInstanceShape(block)) return { success: false, error: `Block must be an object with required properties, got: ${typeof block}` };

	if (!isBlockTypeValid(block.type)) return { success: false, error: `Block requires a valid string type, got: ${block.type}` };

	if (!isBlockAttributesValid(block.attributes)) return { success: false, error: `Block "${block.type}" requires valid attributes object, got: ${block.attributes}` };

	if (!isBlockStylesValid(block.styles)) return { success: false, error: `Block "${block.type}" requires valid styles object, got: ${block.styles}` };

	return { success: true };
}

export function validateBlockDefinition(block: unknown): ValidationResult {
	if (!block) return { success: false, error: 'Block definition is required' };

	if (!isDefinitionShape(block)) return { success: false, error: `Block definition must be an object with required properties, got: ${typeof block}` };

	if (!isBlockTypeValid(block.type)) return { success: false, error: `Block definition requires a valid string type, got: ${block.type}` };

	if (!isBlockTagsValid(block.tags)) return { success: false, error: `Block definition "${block.type}" requires a non-empty tags array, got: ${JSON.stringify(block.tags)}` };

	if (!isBlockRenderValid(block.render)) return { success: false, error: `Block definition "${block.type}" requires a render function, got: ${typeof block.render}` };

	if (!isBlockPermittedContentValid(block.permittedContent)) return { success: false, error: `Block definition "${block.type}" requires valid permittedContent, got: ${block.permittedContent}` };

	if (!isBlockPermittedParentValid(block.permittedParent)) return { success: false, error: `Block definition "${block.type}" requires valid permittedParent, got: ${block.permittedParent}` };

	if (!isBlockCategoryValid(block.category)) return { success: false, error: `Block definition "${block.type}" requires a valid category, got: ${block.category}` };

	if (!isBlockIconValid(block.icon)) return { success: false, error: `Block definition "${block.type}" requires a valid icon, got: ${block.icon}` };

	return { success: true };
}

export function createBlockInstance(type: BlockTypes, parentID?: BlockID): CreationResult<BlockInstance> {
	const definition = getRegisteredBlock(type);

	if (!isBlockTypeValid(type)) return { success: false, error: `Invalid block type: ${type}` };
	if (!definition) return { success: false, error: `Block type "${type}" is not registered` };

	const block = createBlock(definition, parentID);
	return { success: true, data: block };
}
