// Types
import type { NodeKey, NodeContent, NodeStyles, NodeAttributes } from '@/core/block/node/definition/types';
import type { ElementKey } from '@/core/block/element/types';

/**
 * Unique identifier for a block instance
 */
export type NodeID = string;

/**
 * Instance of a block in the editor (with unique ID and state).
 * Represents a concrete block with its current data and position in the hierarchy.
 */
export interface NodeInstance {
	/** Unique identifier for this block instance */
	id: NodeID;
	/** ID of the parent block, null if root */
	parentID: NodeID;
	/** The kind of block (text, container, media) */
	type: NodeKey;
	/** The primary HTML tag for this block */
	tag: ElementKey;
	/** IDs of child blocks in order */
	contentIDs: NodeID[];
	/** Instance-specific attributes that override defaults */
	attributes: NodeAttributes;
	/** Instance-specific styles that override defaults */
	styles: NodeStyles;
	/** Generic content data - flexible structure for any block-specific data */
	content?: NodeContent;
}

/**
 * Record of all block instances by their ID.
 */
export type StoredNodes = Record<NodeID, NodeInstance>;
