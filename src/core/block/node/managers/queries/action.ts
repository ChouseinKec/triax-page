// Types
import type { ActionDefinition, ActionKey } from '@/core/block/node/types';

// Helpers
import { validateActionKey, pickActionDefinitions, pickActionDefinition } from '@/core/block/node/helpers';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves all registered action definitions.
 *
 * This function extracts all action definitions from the node registry.
 * It performs validation and returns a list of action definitions for use in the UI.
 * Used for populating action selection interfaces and configuration panels.
 *
 * @returns An array of all registered action definitions
 * @see {@link pickActionDefinitions} - Helper function used to extract definitions from registry
 */
export function getActionDefinitions(): Readonly<ActionDefinition[]> {
	const validData = new ResultPipeline('[NodeEditorQueries → getActionDefinitions]')
		.pick(() => ({
			actionDefinitions: pickActionDefinitions(nodeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.actionDefinitions);
}

/**
 * Retrieves a specific action definition by its unique key.
 *
 * This function looks up an action definition in the registry using the provided action key.
 * It performs validation on the key and returns the complete action definition if found.
 * Used for dynamic action instantiation and configuration in the UI.
 *
 * @param actionKey - The unique key of the action definition to retrieve
 * @returns The action definition if found, or undefined if the key is invalid or not registered
 * @see {@link pickActionDefinition} - Helper function used to extract the definition from registry
 * @see {@link validateActionKey} - Validation function for action keys
 */
export function getActionDefinition(actionKey: ActionKey): Readonly<ActionDefinition> | undefined {
	const validData = new ResultPipeline('[NodeEditorQueries → getActionDefinition]')
		.validate({
			actionKey: validateActionKey(actionKey),
		})
		.pick(() => ({
			actionDefinitions: pickActionDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			definition: pickActionDefinition(data.actionKey, data.actionDefinitions),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.definition;
}
