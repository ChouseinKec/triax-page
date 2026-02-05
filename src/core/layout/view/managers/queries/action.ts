// Types
import type { ViewKey, ActionDefinition, ActionKey } from '@/core/layout/view/types';

// Helpers
import { pickActionDefinition } from '@/core/layout/view/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateActionKey } from '@/core/layout/view/helpers/validators/action';

// Registry
import { getRegisteredActions } from '@/core/layout/view/state/registry';

/**
 * Retrieves all registered action definitions for a specific view.
 * @param viewKey - The key of the view to retrieve actions for
 */
export function getBlockNodeActionDefinitions(viewKey?: ViewKey): Readonly<ActionDefinition[]> {
	const actions = getRegisteredActions(viewKey);

	if (!viewKey) return Object.values(actions).sort((a, b) => a.order - b.order);

	return Object.values(actions)
		.filter((action) => action.viewKey === viewKey)
		.sort((a, b) => a.order - b.order);
}

/**
 * Retrieves a specific action definition by its key.
 * @param actionKey - The key of the action definition to retrieve
 */
export function getBlockNodeActionDefinition(actionKey: ActionKey): Readonly<ActionDefinition> | undefined {
	const safeData = new ResultPipeline('[ViewEditorQueries → getBlockNodeActionDefinition]')
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
