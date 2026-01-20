// Types
import type { BenchKey, ActionDefinition, ActionKey, BenchDefinition } from '@/src/core/layout/workbench/types/';

// Registry
import { getRegisteredActions } from '@/src/core/layout/workbench/state/registry';

// Helpers
import { pickActionDefinition } from '@/src/core/layout/workbench/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { validateActionKey } from '@/src/core/layout/viewport/helpers/validators';
/**
 * Retrieves all registered action definitions for a specific bench.
 * @param benchKey - The key of the bench to retrieve actions for
 */
export function getActionDefinitions(benchKey?: BenchKey): Readonly<ActionDefinition[]> {
	return Object.values(getRegisteredActions(benchKey)).sort((a, b) => a.order - b.order);
}

/**
 * Retrieves a specific action definition by its key.
 * @param actionKey - The key of the action definition to retrieve
 * @param benchKey - The key of the bench to which the action belongs
 */
export function getActionDefinition(actionKey: ActionKey): Readonly<ActionDefinition> | undefined {
	const safeData = new ResultPipeline('[ViewportQueries → getActionDefinition]')
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
