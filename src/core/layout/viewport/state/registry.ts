// Types
import type { ViewDefinition, ViewDefinitionRecord, ViewKey } from '@/src/core/layout/viewport/types';
import type { ActionDefinition, ActionDefinitionRecord, ActionKey } from '@/src/core/layout/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Helpers
import { validateViewDefinition } from '@/src/core/layout/viewport/helpers/validators';
import { validateActionDefinition } from '@/src/core/layout/viewport/helpers/validators/action';

/**
 * Class-based viewport registry for managing viewport definitions
 */
class ViewportRegistry {
	private views: ViewDefinitionRecord = {};
	private actions: ActionDefinitionRecord = {};

	/**
	 * Registers a viewport definition in the viewport registry.
	 * @param viewport - The viewport definition to register
	 * @returns Success status with optional error message
	 */
	registerView(viewDefinition: ViewDefinition): ValidateResult<ViewDefinition> {
		const validation = validateViewDefinition(viewDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.views[viewDefinition.key]) return { valid: false, message: `Viewport with key "${viewDefinition.key}" already registered` };

		this.views = { ...this.views, [viewDefinition.key]: viewDefinition };
		return { valid: true, value: viewDefinition };
	}

	/**
	 * Registers an action definition in the viewport registry.
	 * @param action - The action definition to register
	 */
	registerAction(actionDefinition: ActionDefinition): ValidateResult<ActionDefinition> {
		const validation = validateActionDefinition(actionDefinition);
		if (!validation.valid) return { valid: false, message: validation.message };

		// Check for duplicates
		if (this.actions[actionDefinition.key]) return { valid: false, message: `Action with key "${actionDefinition.key}" already registered` };

		this.actions = { ...this.actions, [actionDefinition.key]: actionDefinition };

		return { valid: true, value: actionDefinition };
	}

	/**
	 * Retrieves all registered viewport definitions.
	 * @returns Readonly record of all registered views keyed by their IDs.
	 */
	getRegisteredViews(benchKey?: BenchKey): Readonly<Record<string, ViewDefinition>> {
		if (!benchKey) return { ...this.views };

		const filteredViews: ViewDefinitionRecord = {};
		for (const [key, view] of Object.entries(this.views)) {
			if (view.benchKey === benchKey) {
				filteredViews[key] = view;
			}
		}
		return filteredViews;
	}

	/**
	 * Retrieves a specific viewport definition by its ID or workbench key.
	 * @param key - The viewport ID or workbench key to retrieve.
	 * @param by - Whether to search by 'viewport' ID or 'workbench' key. Defaults to 'viewport'.
	 * @returns The viewport definition if found, undefined otherwise.
	 */
	getRegisteredView(viewKey: ViewKey): ViewDefinition | undefined {
		return this.views[viewKey];
	}

	/**
	 * Retrieves all registered action definitions, optionally filtered by viewport key.
	 * @param viewKey - Optional viewport key to filter actions by their associated viewport.
	 */
	getRegisteredActions(viewKey?: ViewKey): Readonly<ActionDefinitionRecord> {
		if (!viewKey) return { ...this.actions };

		return Object.fromEntries(Object.entries(this.actions).filter(([key, action]) => action.viewKey === viewKey));
	}

	/**
	 * Retrieves a specific action definition by its key.
	 * @param actionKey - The action key to retrieve.
	 */
	getRegisteredAction(actionKey: ActionKey): ActionDefinition | undefined {
		return this.actions[actionKey];
	}
}

// Create singleton instance
const viewportRegistry = new ViewportRegistry();

// Export the registry instance methods
export const registerView = (viewDefinition: ViewDefinition) => viewportRegistry.registerView(viewDefinition);
export const getRegisteredViews = (benchKey?: BenchKey) => viewportRegistry.getRegisteredViews(benchKey);
export const getRegisteredView = (viewKey: ViewKey) => viewportRegistry.getRegisteredView(viewKey);

export const registerAction = (actionDefinition: ActionDefinition) => viewportRegistry.registerAction(actionDefinition);
export const getRegisteredActions = (viewKey?: ViewKey) => viewportRegistry.getRegisteredActions(viewKey);
export const getRegisteredAction = (actionKey: ActionKey) => viewportRegistry.getRegisteredAction(actionKey);
