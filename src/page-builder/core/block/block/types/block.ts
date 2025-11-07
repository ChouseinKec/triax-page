import type { ReactElement } from 'react';

// Types
import type { StyleKey } from '@/src/page-builder/core/block/style/types';
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';

/**
 * Unique identifier for a block instance
 */
export type BlockID = string;

/**
 * Icon for representing the block in the UI
 */
export type BlockIcon = ReactElement;

/**
 * Category for organizing blocks in the UI
 */
export type BlockCategory = string;

/**
 * The kind of block (text, container, media).
 */
export type BlockType = string;

/**
 * Block styles structure:
 * device -> orientation -> pseudo -> styles
 */
export type BlockStyles = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in StyleKey]?: string;
			};
		};
	};
};

/**
 * Record of block attributes
 */
export type BlockAttributes = Partial<Record<AttributeKey, string>>;

/**
 * Generic content data for blocks - flexible structure for plugin developers
 * Can contain any data structure needed by different block types
 */
export type BlockContent = Record<string, any>;

/**
 * Children blocks (React nodes)
 */
export type BlockChildren = ReactElement | ReactElement[];

/**
 * Function to render a block instance with optional children
 */
export type BlockRender = (instance: BlockInstance, children?: BlockChildren) => ReactElement;

/**
 * Permitted content types that can be contained within this block
 */
export type BlockPermitedContent = BlockType[] | null;

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
	type: BlockType;
	/** The primary HTML tag for this block */
	tag: ElementTag;
	/** All supported HTML tags for this block type */
	tags: ElementTag[];
	/** Block kinds that can be contained within this block */
	permittedContent: BlockPermitedContent;

	/** Icon representation for the block */
	icon: BlockIcon;
	/** Default styles for the block */
	styles: BlockStyles;
	/** Default attributes for the block */
	attributes: BlockAttributes;
	/** Default content data for the block */
	content?: BlockContent;
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
	/** ID of the parent block, null if root */
	parentID: BlockID;
	/** The kind of block (text, container, media) */
	type: BlockType;
	/** The primary HTML tag for this block */
	tag: ElementTag;
	/** IDs of child blocks in order */
	contentIDs: BlockID[];
	/** Instance-specific attributes that override defaults */
	attributes: BlockAttributes;
	/** Instance-specific styles that override defaults */
	styles: BlockStyles;
	/** Generic content data - flexible structure for any block-specific data */
	content?: BlockContent;
}
