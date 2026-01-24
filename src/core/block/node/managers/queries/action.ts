// Types
import type { NodeKey, ActionDefinition, ActionKey } from '@/core/block/node/types';

// Helpers
import { pickActionDefinition } from '@/core/block/node/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateActionKey } from '@/core/block/node/helpers/validators/action';

// Registry
import { getRegisteredActions } from '@/core/block/node/states/registry';

/**
 * Retrieves all registered action definitions for a specific node.
 * @param nodeKey - The key of the node to retrieve actions for
 */
export function getActionDefinitions(nodeKey?: NodeKey): Readonly<ActionDefinition[]> {
	const actions = Object.values(getRegisteredActions(nodeKey)).sort((a, b) => a.order - b.order);

	// If no nodeKey is provided, return all actions
	if (!nodeKey) return actions;

	// Filter actions by the specified nodeKey
	return actions.filter((action) => action.nodeKey === nodeKey);
}

/**
 * Retrieves a specific action definition by its key.
 * @param actionKey - The key of the action definition to retrieve
 */
export function getActionDefinition(actionKey: ActionKey): Readonly<ActionDefinition> | undefined {
	const safeData = new ResultPipeline('[NodeEditorQueries → getActionDefinition]')
		.validate({
			actionKey: validateActionKey(actionKey),
		})
		.pick((data) => ({
			definition: pickActionDefinition(data.actionKey, getRegisteredActions()),
		}))
		.execute();
	if (!safeData) return undefined;

	return safeData.definition;
}
