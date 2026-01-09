import type { ComponentType, ReactElement } from 'react';

// Types
import type { StyleKey, StyleValue } from '@/src/core/block/style/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { ElementKey } from '@/src/core/block/element/types';
import type { DeviceName } from '@/src/core/layout/page/types';
import type { OrientationName } from '@/src/core/layout/page/types';
import type { PseudoName } from '@/src/core/layout/page/types';
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
	[deviceName: DeviceName]: {
		[orientationName: OrientationName]: {
			[pseudoName: PseudoName]: {
				[key in StyleKey]?: StyleValue;
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
 * Props for block render components
 */
export interface BlockComponentProps {
	instance: BlockInstance;
	children?: BlockChildren;
}

/**
 * Function to render a block instance with optional children
 */
export type BlockComponent = ComponentType<BlockComponentProps>;

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
export type BlockAllowedChildren = ElementKey[] | null;

/**
 * Tags that cannot appear anywhere in the ancestor chain above this block
 */
export type BlockForbiddenAncestors = ElementKey[] | null;

/**
 * Elements that can appear only once as direct children (e.g., figcaption in figure)
 */
export type BlockUniqueElements = Partial<Record<ElementKey, number>> | null;

/**
 * Ordered groups of elements that must appear in sequence (e.g., table structure)
 */
export type BlockOrderedElements = ElementKey[][] | null;

/**
 * Record of all block instances by their ID.
 */
export type BlockInstanceRecord = Record<BlockID, BlockInstance>;

/**
 * Record of all block definitions by their type.
 */
export type BlockDefinitionRecord = Record<BlockType, BlockDefinition>;

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
	defaultTag: ElementKey;
	/** All allowed HTML tags for this block type */
	availableTags: ElementKey[];

	/** Indicates if this block type can have styles */
	allowedStyles: BlockAllowedStyles;
	/** Indicates if this block type can have attributes */
	allowedAttributes: BlockAllowedAttributes;
	/** Block kinds that can be contained within this block */
	allowedChildren: BlockAllowedChildren;

	/** Tags that cannot appear anywhere in the ancestor chain */
	forbiddenAncestors: BlockForbiddenAncestors;
	/** Elements that can appear only once as direct children */
	uniqueChildren: BlockUniqueElements;
	/** Ordered groups of elements enforcing sequence */
	orderedChildren: BlockOrderedElements;

	/** Default styles for the block */
	defaultStyles: BlockStyles;
	/** Default attributes for the block */
	defaultAttributes: BlockAttributes;

	/** Default content data for the block */
	defaultContent: BlockContent;

	/** Render function that returns JSX for the block */
	component: BlockComponent;
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
	tag: ElementKey;
	/** IDs of child blocks in order */
	contentIDs: BlockID[];
	/** Instance-specific attributes that override defaults */
	attributes: BlockAttributes;
	/** Instance-specific styles that override defaults */
	styles: BlockStyles;
	/** Generic content data - flexible structure for any block-specific data */
	content?: BlockContent;
}
