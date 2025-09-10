// Utilities
import { devLog } from '@/utilities/dev';
import { isBlockIDValid, isAttributeEditorValid, isStylesEditorValid } from '@/editors/block/utilities/block/block';
import { isBlockActionIDValid, isBlockActionIconValid, isBlockActionTitleValid, isBlockActionOnClickValid } from '@/editors/block/utilities/block/context';

// Types
import type { BlockInstance, BlocksActionDefinition } from '@/editors/block/types';

/**
 * Validates block instance with comprehensive validation and error logging.
 * @param block Block instance to validate (may be null/undefined)
 * @param context Calling context for error logging
 * @returns True if block is valid and safe to use, false otherwise
 */
export function validateBlock(block: BlockInstance | null | undefined, context: string): block is BlockInstance {
	if (!block) {
		devLog.error(`[${context} → validateBlock] Block not found`);
		return false;
	}

	if (!isBlockIDValid(block.id)) {
		devLog.error(`[${context} → validateBlock] Invalid block ID: expected a non-empty string`);
		return false;
	}

	if (!isAttributeEditorValid(block.attributes)) {
		devLog.error(`[${context} → validateBlock] Attributes not found for block: ${block.id}`);
		return false;
	}

	if (!isStylesEditorValid(block.styles)) {
		devLog.error(`[${context} → validateBlock] Styles not found for block: ${block.id}`);
		return false;
	}

	return true;
}

/**
 * Validates block action with comprehensive validation and error logging.
 * @param action Block action to validate (may be null/undefined)
 * @param context Calling context for error logging
 * @returns True if action is valid and safe to use, false otherwise
 */
export function validateBlockAction(action: BlocksActionDefinition, context: string): action is BlocksActionDefinition {
	if (!action) {
		devLog.error(`[${context} → validateBlockAction] Action not found`);
		return false;
	}

	if (!isBlockActionIDValid(action.actionID)) {
		devLog.error(`[${context} → validateBlockAction] Invalid action: missing or invalid actionID`);
		return false;
	}

	if (!isBlockActionIconValid(action.icon)) {
		devLog.error(`[${context} → validateBlockAction] Invalid action "${action.actionID}": missing icon`);
		return false;
	}

	if (!isBlockActionTitleValid(action.title)) {
		devLog.error(`[${context} → validateBlockAction] Invalid action "${action.actionID}": missing or invalid title`);
		return false;
	}

	if (!isBlockActionOnClickValid(action.onClick)) {
		devLog.error(`[${context} → validateBlockAction] Invalid action "${action.actionID}": missing or invalid onClick handler`);
		return false;
	}

	return true;
}
