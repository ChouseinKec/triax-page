// Types
import type { ViewportDefinition, ViewportDefinitionRecord, ActionDefinition, ActionDefinitionRecord } from '@/src/core/layout/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateViewportDefinition } from '@/src/core/layout/viewport/helpers/validators';

/**
 * Class-based viewport registry for managing viewport definitions
 */
class ViewportRegistry {
	private viewports: ViewportDefinitionRecord = {};

	/**
	 * Registers a viewport definition in the viewport registry.
	 * @param viewport - The viewport definition to register
	 * @returns Success status with optional error message
	 */
	registerViewport(viewport: ViewportDefinition): ValidateResult<ViewportDefinition> {
		const validation = validateViewportDefinition(viewport);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.viewports[viewport.id]) {
			return { valid: false, message: `Viewport with id "${viewport.id}" already registered` };
		}

		this.viewports = { ...this.viewports, [viewport.id]: viewport };
		return { valid: true, value: viewport };
	}

	/**
	 * Retrieves all registered viewport definitions.
	 * @returns Readonly record of all registered viewports keyed by their IDs.
	 */
	getRegisteredViewports(): Readonly<Record<string, ViewportDefinition>> {
		return { ...this.viewports };
	}

	/**
	 * Retrieves a specific viewport definition by its ID or workbench key.
	 * @param id - The viewport ID or workbench key to retrieve.
	 * @param by - Whether to search by 'viewport' ID or 'workbench' key. Defaults to 'viewport'.
	 * @returns The viewport definition if found, undefined otherwise.
	 */
	getRegisteredViewport(id: string, by: 'viewport' | 'workbench' = 'viewport'): ViewportDefinition | undefined {
		switch (by) {
			case 'viewport':
				return this.viewports[id];
			case 'workbench':
				return Object.values(this.viewports).find((viewport) => viewport.workbenchKey === id);
			default:
				return undefined;
		}
	}
}

class ActionReigstry {
	private actions: ActionDefinitionRecord = {};

	/**
	 * Registers an action definition in the action registry.
	 * @param action - The action definition to register
	 * @returns Success status with optional error message
	 */
	registerAction(action: ActionDefinition): ValidateResult<ActionDefinition> {
		// Check for duplicates
		if (this.actions[action.id]) return { valid: false, message: `Action with id "${action.id}" already registered` };

		this.actions = { ...this.actions, [action.id]: action };
		return { valid: true, value: action };
	}

	/**
	 * Retrieves all registered action definitions.
	 * @returns Readonly record of all registered actions keyed by their id
	 */
	getRegisteredActions(): Readonly<ActionDefinitionRecord> {
		return { ...this.actions };
	}

	/**
	 * Retrieves a specific action definition by its id.
	 * @param id - The action id to retrieve
	 * @returns The action definition if found, undefined otherwise
	 */
	getRegisteredAction(id: string): ActionDefinition | undefined {
		return this.actions[id];
	}
}

// Create singleton instance
const viewportRegistry = new ViewportRegistry();

// Export the registry instance methods
export const registerViewport = (viewportDefinition: ViewportDefinition) => viewportRegistry.registerViewport(viewportDefinition);
export const getRegisteredViewports = () => viewportRegistry.getRegisteredViewports();
export const getRegisteredViewport = (viewportID: string, by: 'viewport' | 'workbench' = 'viewport') => viewportRegistry.getRegisteredViewport(viewportID, by);

const actionRegistry = new ActionReigstry();
export const registerAction = (actionDefinition: ActionDefinition) => actionRegistry.registerAction(actionDefinition);
export const getRegisteredActions = () => actionRegistry.getRegisteredActions();
export const getRegisteredAction = (actionID: string) => actionRegistry.getRegisteredAction(actionID);
