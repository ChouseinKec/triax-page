// Types
import type { PanelKey, PanelInstance, PanelInstanceRecord } from '@/core/layout/panel/types';
import type { PickResult } from '@/shared/types/result';


/**
 * Picks a panel instance from the record by key.
 * @param panelKey - The key of the panel
 * @param panels - The record of panel instances
 * @returns The pick result with the panel instance or error
 */
export function pickPanelInstance(panelKey: PanelKey, panelInstances: PanelInstanceRecord): PickResult<PanelInstance> {
	const instance = panelInstances[panelKey];
	if (!instance) return { success: false, error: `Panel not found: '${panelKey}' does not exist in the panel collection` };

	return { success: true, data: instance };
}
