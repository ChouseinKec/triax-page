import type { ReactElement, ComponentType } from 'react';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { StyleKey, StyleValue } from '@/core/block/style/types';
import type { AttributeKey } from '@/core/block/attribute/types';
import type { ElementKey } from '@/core/block/element/types';
import type { DeviceKey, OrientationKey, PseudoKey } from '@/core/layout/page/types';

/**
 * The kind of block (text, container, media).
 */
export type NodeKey = string;

/**
 *  Name for the block type
 */
export type NodeName = string;

/**
 *  Description for the block type
 */
export type NodeDescription = string;

/**
 * Category for organizing blocks in the UI
 */
export type NodeCategory = string;

/**
 * Icon for representing the block in the UI
 */
export type NodeIcon = ReactElement;

/**
 * Block styles structure:
 * device -> orientation -> pseudo -> styles
 */
export type NodeStyles = {
	[deviceKey: DeviceKey]: {
		[orientationKey: OrientationKey]: {
			[pseudoKey: PseudoKey]: {
				[key in StyleKey]?: StyleValue;
			};
		};
	};
};

/**
 * Record of block attributes
 */
export type NodeAttributes = Partial<Record<AttributeKey, string>>;

/**
 * Generic data for blocks - flexible structure for plugin developers
 * Can contain any data structure needed by different block types
 */
export type NodeData = Record<string, any>;

/**
 * Children blocks (React nodes)
 */
export type NodeChildren = ReactElement | ReactElement[];

/**
 * Props for block render components
 */
export interface NodeComponentProps {
	nodeID: NodeID;
	deviceKey: DeviceKey;
	orientationKey: OrientationKey;
	pseudoKey: PseudoKey;
	isSelected: boolean;
	children?: NodeChildren;
}

/**
 * Function to render a block instance with optional children
 */
export type NodeComponent = ComponentType<NodeComponentProps>;

/**
 * Blueprint/definition for a block type (core or plugin).
 * Defines the structure, behavior, and rendering logic for a block.
 */
export interface NodeDefinition {
	/** The unique key for this block (plain-text, rich-text, container, media) */
	key: NodeKey;
	/** Name for the block type.*/
	name: NodeName;
	/** The description for this block type to display in the UI */
	description: NodeDescription;
	/** Category for organizing blocks */
	category: NodeCategory;
	/** Icon representation for the block */
	icon: NodeIcon;

	/** All supported HTML element keys for this block type */
	elementKeys: ElementKey[];

	/** Default styles for the block */
	defaultStyles: NodeStyles;
	/** Default attributes for the block */
	defaultAttributes: NodeAttributes;
	/** Default data for the block */
	defaultData: NodeData;

	/** Render function that returns JSX for the block */
	component: NodeComponent;
}

/**
 * Record of all block definitions by their type.
 */
export type RegisteredNodes = Record<NodeKey, NodeDefinition>;
