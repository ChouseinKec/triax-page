import { ReactNode } from 'react';
import type { StyleKeys } from '../style/style';
import type { ElementTags, AttributeKeys } from '@/editors/block/types/core/attribute';

export type BlockID = string;

/**
 * Kinds of blocks available in the editor.
 * - 'text': Blocks primarily for text content (e.g., paragraphs, headings).
 * - 'container': Blocks that can contain other blocks (e.g., divs, sections).
 * - 'media': Blocks for media content (e.g., images, videos).
 */
export type BlockTypes = 'text' | 'container' | 'media';

/**
 * Block style data structure for responsive and pseudo-class styles.
 * Organizes styles by device, orientation, and pseudo-class.
 */
export type StylesEditor = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in StyleKeys]?: string;
			};
		};
	};
};

/**
 * Mapping of HTML attributes for a block.
 * Keys are HTML attribute names, values are their string representations.
 */
export type AttributeEditor = Partial<Record<AttributeKeys, string>>;

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
	permittedContent?: BlockTypes[] | null;
	/** Block kinds that can contain this block */
	permittedParent?: BlockTypes[] | null;
	/** Icon representation for the block */
	icon?: string | ReactNode;
	/** Default styles for the block */
	styles?: StylesEditor | null;
	/** Category for organizing blocks */
	category?: string;
	/** Render function that returns JSX for the block */
	render: (instance: BlockInstance, children?: ReactNode) => ReactNode;
}

/**
 * Instance of a block in the editor (with unique ID and state).
 * Represents a concrete block with its current data and position in the hierarchy.
 */
export interface BlockInstance {
	/** Unique identifier for this block instance */
	id: BlockID;
	/** HTML tag for this block instance */
	tag: ElementTags;
	/** Kind of block this instance represents */
	type: BlockTypes;
	/** Current styles applied to this block */
	styles: StylesEditor;
	/** Current attributes applied to this block */
	attributes: AttributeEditor;
	/** ID of the parent block, null if root */
	parentID: BlockID | null;
	/** IDs of child blocks in order */
	contentIDs: BlockID[];
}
