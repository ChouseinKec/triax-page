// Types
import type { PanelKey, PanelDefinition } from '@/core/layout/panel/types/';
import type { BenchKey } from '@/core/layout/bench/types/';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validatePanelKey, pickPanelDefinition } from '@/core/layout/panel/helpers';

// Registry
import { getRegisteredPanels } from '@/core/layout/panel/state/registry';

// Store
import { usePanelStore } from '@/core/layout/panel/state/store';

export function getPanelDefinitions(benchKey?: BenchKey): PanelDefinition[] {
	return Object.values(getRegisteredPanels(benchKey));
}

/**
 * Gets a panel definition by key.
 * @param panelKey - The key of the panel
 * @returns The panel definition or undefined
 */
export function getPanelDefinition(panelKey: PanelKey): PanelDefinition | undefined {
	// Validate and pick
	const results = new ResultPipeline('[PanelQueries → getPanelDefinition]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.pick((data) => ({
			definition: pickPanelDefinition(data.panelKey, getRegisteredPanels()),
		}))
		.execute();
	if (!results) return undefined;

	return results.definition;
}

/**
 * Retrieves the open state of a panel.
 * @param panelKey - The key of the panel
 * @returns True if the panel is open, false if closed, or undefined if the panel does not exist
 */
export function isPanelOpen(panelKey: PanelKey): boolean | undefined {
	return usePanelStore.getState().allPanels[panelKey]?.isOpen;
}

/**
 * Retrieves the locked state of a panel.
 * @param panelKey - The key of the panel
 * @returns True if the panel is locked, false if unlocked, or undefined if the panel does not exist
 */
export function isPanelLocked(panelKey: PanelKey): boolean | undefined {
	return usePanelStore.getState().allPanels[panelKey]?.isLocked;
}
