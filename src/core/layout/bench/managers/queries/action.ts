// Types
import type { BenchKey, ActionDefinition, ActionKey, BenchDefinition } from '@/core/layout/bench/types/';

// Registry
import { getRegisteredActions } from '@/core/layout/bench/state/registry';

// Helpers
import { pickActionDefinition } from '@/core/layout/bench/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateActionKey } from '@/core/layout/view/helpers/validators';
/**
 * Retrieves all registered action definitions for a specific bench.
 * @param benchKey - The key of the bench to retrieve actions for
 */
export function getBlockNodeActionDefinitions(benchKey?: BenchKey): Readonly<ActionDefinition[]> {
	return Object.values(getRegisteredActions(benchKey)).sort((a, b) => a.order - b.order);
}

/**
 * Retrieves a specific action definition by its key.
 * @param actionKey - The key of the action definition to retrieve
 * @param benchKey - The key of the bench to which the action belongs
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
