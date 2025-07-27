import type { BlockDefinition } from '@/types/block/block';

const registry: Record<string, BlockDefinition> = {};

export function registerBlock(block: BlockDefinition) {
	registry[block.type] = block;
}

export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return registry;
}
