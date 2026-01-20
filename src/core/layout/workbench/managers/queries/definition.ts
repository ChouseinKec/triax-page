// Types
import type { BenchDefinition, BenchKey } from '@/src/core/layout/workbench/types/';

// Registry
import { getRegisteredBenches } from '@/src/core/layout/workbench/state/registry';

// Helpers
import { pickBenchDefinition } from '@/src/core/layout/workbench/helpers/pickers/definition';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/src/core/layout/workbench/helpers/validators';

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
