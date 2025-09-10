// Utilities
import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockInstance, StylesEditor, BlockTypes, BlockID, AttributeEditor } from '@/editors/block/types';

// Constants
import { BlockStyleDefaults } from '@/constants/block/defaults';
import { getRegisteredBlocks } from '@/editors/block/registry/registry';

export function isBlockIDValid(blockID: unknown): blockID is BlockID {
	return typeof blockID === 'string' && blockID.trim().length > 0;
}

export function isAttributeEditorValid(attributes: unknown): attributes is AttributeEditor {
	if (!attributes || typeof attributes !== 'object') return false;
	return true;
}

export function isStylesEditorValid(styles: unknown): styles is StylesEditor {
	if (!styles || typeof styles !== 'object') return false;
	return true;
}

/**
 * Recursively gets all descendant block IDs from given block IDs.
 * Includes the input block IDs in the result for deletion operations.
 *
 * @param blockIDs - Array of starting block IDs
 * @param allBlocks - The collection of all blocks
 * @returns Array of all descendant block IDs including the starting IDs
 *
 * @example
 * getBlockDescendants(['parent-1'], allBlocks) // → ['parent-1', 'child-1', 'grandchild-1']
 */
export function getBlockDescendants(blockIDs: BlockID[], allBlocks: Record<BlockID, BlockInstance>): BlockID[] {
	const result: string[] = [];
	const visited = new Set<string>();

	const traverse = (id: string) => {
		if (visited.has(id)) return;

		visited.add(id);
		result.push(id);

		const block = allBlocks[id];
		if (block?.contentIDs?.length) {
			block.contentIDs.forEach(traverse);
		}
	};

	blockIDs.forEach(traverse);
	return result;
}

/**
 * Checks if a target block is a descendant of a parent block.
 * Recursively traverses the block tree to find relationship.
 *
 * @param parentBlock - The parent block instance
 * @param targetID - The target block identifier to search for
 * @param allBlocks - All blocks collection keyed by IDs
 * @returns True if target is a descendant of parent, false otherwise
 *
 * @example
 * isBlockDescendant(parentBlock, 'child-2', allBlocks) // → true
 */
export function isBlockDescendant(parentBlock: BlockInstance, targetID: BlockID, allBlocks: Record<BlockID, BlockInstance>): boolean {
	if (!parentBlock?.contentIDs) return false;
	if (parentBlock.contentIDs.includes(targetID)) return true;
	return parentBlock.contentIDs.some((childID) => {
		const childBlock = allBlocks[childID];
		return childBlock ? isBlockDescendant(childBlock, targetID, allBlocks) : false;
	});
}

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType Parent block type
 * @param childType Child block type to check
 * @returns True if child is permitted, false otherwise
 */
export function isBlockChildAllowed(parentType: BlockTypes, childType: BlockTypes): boolean {
	const blocks = getRegisteredBlocks();
	if (!blocks || !parentType || !childType) return false;

	const parentBlock = blocks[parentType];
	const childBlock = blocks[childType];
	if (!parentBlock || !childBlock) return false;

	if (parentBlock.permittedContent == null) return true;
	return parentBlock.permittedContent.includes(childType);
}

/**
 * Creates default style structure for a new block.
 * Initializes with default values and nested device/orientation/pseudo structure.
 *
 * @returns Default block style definition with all device contexts
 *
 * @example
 * createStylesEditor() // → { all: { all: { default: { color: '', fontSize: '' } } } }
 */
export function createStylesEditor(): StylesEditor {
	const defaults = {
		...BlockStyleDefaults,
		all: {
			...BlockStyleDefaults.all,
		},
	};

	return {
		all: {
			all: defaults,
		},
	};
}

/**
 * Creates a new block instance with generated ID and default values.
 * Generates UUID, initializes styles, and sets up parent relationship.
 *
 * @param type - The block type to create
 * @param parentBlock - Optional parent block ID
 * @returns Complete block instance ready for store
 *
 * @example
 * createBlock('text', 'parent-123') // → { id: 'uuid', type: 'text', parentID: 'parent-123', ... }
 */
export function createBlock(type: BlockTypes, parentBlock?: BlockID): BlockInstance {
	return {
		id: uuidv4(),
		styles: createStylesEditor(),
		attributes: {},
		parentID: parentBlock ?? null,
		contentIDs: [],
		tag: 'div',
		type,
	};
}

export default {
	validate: {
		id: isBlockIDValid,
		styles: isStylesEditorValid,
		attributes: isAttributeEditorValid,
	},
	create: {
		styles: createStylesEditor,
		block: createBlock,
	},

	is: {
		descendant: isBlockDescendant,
		childAllowed: isBlockChildAllowed,
	},

	get: {
		descendants: getBlockDescendants,
	},
} as const;
