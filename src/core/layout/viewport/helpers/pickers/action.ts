import type { ActionDefinition, ActionDefinitionRecord, ActionKey } from '@/src/core/layout/viewport/types/action';
import type { PickResult } from '@/src/shared/types/result';

export function pickActionDefinition(actionKey: ActionKey, registeredActions: ActionDefinitionRecord): PickResult<ActionDefinition> {
	const definition = registeredActions[actionKey];
	if (!definition) return { success: false, error: `Action definition not found: '${actionKey}' does not exist in the action registry` };

	return { success: true, data: definition };
}