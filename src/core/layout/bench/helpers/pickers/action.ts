import type { ActionDefinition, RegisteredActions, ActionKey } from '@/core/layout/bench/types/action';
import type { PickResult } from '@/shared/types/result';

export function pickActionDefinition(actionKey: ActionKey, registeredActions: RegisteredActions): PickResult<ActionDefinition> {
	const definition = registeredActions[actionKey];
	if (!definition) return { success: false, error: `Action definition not found: '${actionKey}' does not exist in the action registry` };

	return { success: true, data: definition };
}
