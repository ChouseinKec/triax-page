import type { ViewDefinition, ViewDefinitionRecord, ViewKey } from '@/src/core/layout/viewport/types/viewport';
import type { PickResult } from '@/src/shared/types/result';

export function pickViewDefinition(viewKey: ViewKey, registeredViews: ViewDefinitionRecord): PickResult<ViewDefinition> {
	const definition = registeredViews[viewKey];
	if (!definition) return { success: false, error: `View definition not found: '${viewKey}' does not exist in the view registry` };

	return { success: true, data: definition };
}