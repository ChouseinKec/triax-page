import type { ReactElement } from 'react';

// Types
import type { StyleKey } from '@/src/core/block/style/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { ElementTag } from '@/src/core/block/element/types';

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
 *  Name for the block type
 */
export type BlockName = string;

/**
 *  Description for the block type
 */
export type BlockDescription = string;

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
 * Indicates if a block can have styles
 */
export type BlockAllowedStyles = StyleKey[] | null;

/**
 * Indicates if a block can have attributes
 */
export type BlockAllowedAttributes = AttributeKey[] | null;

/**
 * Permitted content types that can be contained within this block
 */
export type BlockAllowedElements = ElementTag[] | null;

/**
 * Tags that cannot appear anywhere in the ancestor chain above this block
 */
export type BlockForbiddenAncestors = ElementTag[] | null;

/**
 * Elements that can appear only once as direct children (e.g., figcaption in figure)
 */
export type BlockUniqueElements = Partial<Record<ElementTag, number>> | null;

/**
 * Ordered groups of elements that must appear in sequence (e.g., table structure)
 */
export type BlockOrderedElements = ElementTag[][] | null;

/**
 * Record of all block instances by their ID.
 */
export type BlockRecord = Record<BlockID, BlockInstance>;

/**
 * Blueprint/definition for a block type (core or plugin).
 * Defines the structure, behavior, and rendering logic for a block.
 */
export interface BlockDefinition {
	/** The unique type for this block (plain-text, rich-text, container, media) */
	type: BlockType;
	/** Name for the block type. See BlockName. @see {@link BlockName} */
	name: BlockName;
	/** The description for this block type to display in the UI */
	description: BlockDescription;
	/** Category for organizing blocks */
	category: BlockCategory;
	/** Icon representation for the block */
	icon: BlockIcon;

	/** The primary HTML tag for this block */
	defaultTag: ElementTag;
	/** All allowed HTML tags for this block type */
	availableTags: ElementTag[];

	/** Indicates if this block type can have styles */
	allowedStyles: BlockAllowedStyles;
	/** Indicates if this block type can have attributes */
	allowedAttributes: BlockAllowedAttributes;
	/** Block kinds that can be contained within this block */
	allowedElements: BlockAllowedElements;

	/** Tags that cannot appear anywhere in the ancestor chain */
	forbiddenAncestors: BlockForbiddenAncestors;
	/** Elements that can appear only once as direct children */
	uniqueElements: BlockUniqueElements;
	/** Ordered groups of elements enforcing sequence */
	orderedElements: BlockOrderedElements;

	/** Default styles for the block */
	defaultStyles: BlockStyles;
	/** Default attributes for the block */
	defaultAttributes: BlockAttributes;

	/** Default content data for the block */
	defaultContent: BlockContent;

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
