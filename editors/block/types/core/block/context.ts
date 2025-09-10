import type { BlockID } from '@/editors/block/types/core/block/block';

/**
 * Context type for actions management.
 * Provides methods to register, unregister, and manage block editor actions by blockID.
 */
export type BlocksContextDefinition = {
	/** Current registered actions mapped by blockID */
	actions: Record<BlockID, BlocksActionDefinition[]>;
	/** Register a new action for a specific block */
	registerAction: (blockID: BlockID, action: BlocksActionDefinition) => void;
	/** Unregister a specific action for a block */
	unregisterAction: (blockID: BlockID, actionID: string) => void;
	/** Unregister all actions for a specific block */
	unregisterBlockActions: (blockID: BlockID) => void;
	/** Get all currently registered actions */
	getAllActions: () => Record<BlockID, BlocksActionDefinition[]>;
	/** Get actions for a specific block */
	getBlockActions: (blockID: BlockID) => BlocksActionDefinition[] | undefined;
	/** Reset all actions to initial state */
	resetActions: () => void;
};

export type BlockActionID = string;
export type BlockActionIcon = React.ReactNode;
export type BlockActionTitle = string;
export type BlockActionClick = () => void;

/**
 * Props for individual block editor actions.
 * Represents an action that can be performed in the block editor.
 */
export interface BlocksActionDefinition {
	/** Unique identifier for the action */
	actionID: BlockActionID;

	/** Icon for the action */
	icon: BlockActionIcon;

	/** Title for the action */
	title: BlockActionTitle;

	/** Function to execute when the action is triggered */
	onClick: BlockActionClick;
}
