// Types
import type { PanelKey, PanelDefinition } from '@/core/layout/panel/types/';
import type { BenchKey } from '@/core/layout/workbench/types/';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validatePanelKey, pickPanelDefinition } from '@/core/layout/panel/helpers';

// Registry
import { getRegisteredPanels } from '@/core/layout/panel/registries';

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
