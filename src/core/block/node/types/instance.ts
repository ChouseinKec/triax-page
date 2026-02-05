// Types
import type { NodeKey, NodeData, NodeStyles, NodeAttributes } from '@/core/block/node/types/definition';
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
	definitionKey: NodeKey;
	/** The primary HTML tag for this block */
	elementKey: ElementKey;
	/** IDs of child blocks in order */
	childNodeIDs: NodeID[];
	/** Instance-specific attributes that override defaults */
	attributes: NodeAttributes;
	/** Instance-specific styles that override defaults */
	styles: NodeStyles;
	/** Generic data - flexible structure for any block-specific data */
	data: NodeData;
}

/**
 * Record of all block instances by their ID.
 */
export type StoredNodes = Record<NodeID, NodeInstance>;

/**
 * Represents highlighted text within a node, including the text and its position offsets.
 */
export type NodeHighlight = {
	id: NodeID;
	elementKey: ElementKey;
	text: string;
	startOffset: number;
	endOffset: number;
} | null;
