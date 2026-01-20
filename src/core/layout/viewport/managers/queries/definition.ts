// Types
import type { ViewDefinition, ViewKey } from '@/src/core/layout/viewport/types';
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Registry
import { getRegisteredViews } from '@/src/core/layout/viewport/state/registry';

// Helpers
import { pickViewDefinition } from '@/src/core/layout/viewport/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { validateViewKey } from '@/src/core/layout/viewport/helpers/validators';

/**
 * Retrieves all registered view definitions, optionally filtered by bench key.
 * @param benchKey - The key of the bench to filter views for
 */
export function getViewDefinitions(benchKey?: BenchKey): Readonly<ViewDefinition[]> {
	return Object.values(getRegisteredViews(benchKey));
}

/**
 * Retrieves a specific view definition by its key.
 * @param viewKey - The key of the view definition to retrieve
 */
export function getViewDefinition(viewKey: ViewKey): Readonly<ViewDefinition> | undefined {
	const safeData = new ResultPipeline('[ViewportQueries → getViewDefinition]')
		.validate({
			viewKey: validateViewKey(viewKey),
		})
		.pick((data) => ({
			definition: pickViewDefinition(data.viewKey, getRegisteredViews()),
		}))
		.execute();
	if (!safeData) return undefined;

	return safeData.definition;
}