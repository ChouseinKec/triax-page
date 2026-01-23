import type { ViewDefinition, RegisteredViews, ViewKey } from '@/core/layout/view/types/viewport';
import type { PickResult } from '@/shared/types/result';

export function pickViewDefinition(viewKey: ViewKey, registeredViews: RegisteredViews): PickResult<ViewDefinition> {
	const definition = registeredViews[viewKey];
	if (!definition) return { success: false, error: `View definition not found: '${viewKey}' does not exist in the view registry` };

	return { success: true, data: definition };
}