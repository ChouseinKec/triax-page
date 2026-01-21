// Types
import type { BenchDefinition, BenchKey } from '@/core/layout/workbench/types/';

// Registry
import { getRegisteredBenches } from '@/core/layout/workbench/state/registry';

// Helpers
import { pickBenchDefinition } from '@/core/layout/workbench/helpers/pickers/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/core/layout/workbench/helpers/validators';

/**
 * Retrieves all registered bench definitions.
 */
export function getBenchDefinitions(): Readonly<BenchDefinition[]> {
	return Object.values(getRegisteredBenches());
}

/**
 * Retrieves a specific bench definition by its key.
 * @param benchKey - The key of the bench definition to retrieve
 */
export function getBenchDefinition(benchKey: BenchKey): Readonly<BenchDefinition> | undefined {
	const safeData = new ResultPipeline('[WorkbenchQueries → getBenchDefinition]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.pick((data) => ({
			definition: pickBenchDefinition(data.benchKey, getRegisteredBenches()),
		}))
		.execute();
	if (!safeData) return undefined;

	return safeData.definition;
}
