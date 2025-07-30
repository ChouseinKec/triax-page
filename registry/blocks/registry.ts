import type { BlockDefinition, BlockType } from '@/types/block/block';

const registry: Record<string, BlockDefinition> = {};

export function registerBlock(block: BlockDefinition) {
	registry[block.type] = block;
}

export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return registry;
}

export function isChildPermitted(parentType: BlockType, childType: BlockType): boolean {
	const blocks = getRegisteredBlocks();
	if (!blocks || !parentType || !childType) return false;

	const parentBlock = blocks[parentType];
	const childBlock = blocks[childType];
	if (!parentBlock || !childBlock) return false;

	if (parentBlock.permittedContent == null) return true;
	return parentBlock.permittedContent.includes(childType);
}
