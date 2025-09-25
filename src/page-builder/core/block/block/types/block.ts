import { ReactNode } from 'react';

// Types
import type { StyleKeys } from '@/src/page-builder/core/block/style/types';
import type { AttributeKeys } from '@/src/page-builder/core/block/attribute/types';
import type { ElementTags } from '@/src/page-builder/core/block/element/types';

/**
 * Unique identifier for a block instance
 */
export type BlockID = string;

/**
 * Icon for representing the block in the UI
 */
export type BlockIcon = string | ReactNode;

/**
 * Category for organizing blocks in the UI
 */
export type BlockCategory = string;

/**
 * The kind of block (text, container, media).
 */
export type BlockTypes = 'text' | 'container' | 'media';

/**
 * Block styles structure:
 * device -> orientation -> pseudo -> styles
 */
export type BlockStyles = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in StyleKeys]?: string;
			};
		};
	};
};

/**
 * Block attributes structure:
 * key -> value
 */
export type BlockAttributes = Partial<Record<AttributeKeys, string>>;

/**
 * Children blocks (React nodes)
 */
export type BlockChildren = ReactNode;

/**
 * Function to render a block instance with optional children
 */
export type BlockRender = (instance: BlockInstance, children?: BlockChildren) => ReactNode;

/**
 * Permitted content types that can be contained within this block
 */
export type BlockPermitedContent = BlockTypes[] | null;

/**
 * Permitted parent types that can contain this block
 */
export type BlockPermitedParent = BlockTypes[] | null;

/**
 * Record of all block instances by their ID.
*/
export type BlockRecord = Record<BlockID, BlockInstance>;

/**
 * Blueprint/definition for a block type (core or plugin).
 * Defines the structure, behavior, and rendering logic for a block.
 */
export interface BlockDefinition {
	/** The kind of block (text, container, media) */
	type: BlockTypes;
	/** The primary HTML tag for this block */
	tag: ElementTags;
	/** All supported HTML tags for this block type */
	tags: ElementTags[];
	/** Block kinds that can be contained within this block */
	permittedContent: BlockPermitedContent;
	/** Block kinds that can contain this block */
	permittedParent: BlockPermitedParent;
	/** Icon representation for the block */
	icon: BlockIcon;
	/** Default styles for the block */
	styles: BlockStyles;
	/** Default attributes for the block */
	attributes: BlockAttributes;
	/** Category for organizing blocks */
	category: BlockCategory;
	/** Render function that returns JSX for the block */
	render: BlockRender;
}

/**
 * Instance of a block in the editor (with unique ID and state).
 * Represents a concrete block with its current data and position in the hierarchy.
 */
export interface BlockInstance {
	/** Unique identifier for this block instance */
	id: BlockID;
	/** The kind of block (text, container, media) */
	type: BlockTypes;
	/** ID of the parent block, null if root */
	parentID: BlockID | null;
	/** IDs of child blocks in order */
	contentIDs: BlockID[];
	/** Instance-specific attributes that override defaults */
	attributes: BlockAttributes;
	/** Instance-specific styles that override defaults */
	styles: BlockStyles;
}
