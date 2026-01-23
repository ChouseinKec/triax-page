// Types
import type { BenchDefinition, BenchKey } from '@/core/layout/bench/types/';

// Registry
import { getRegisteredBenches } from '@/core/layout/bench/state/registry';

// Helpers
import { pickBenchDefinition } from '@/core/layout/bench/helpers/pickers/bench';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';

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
	const safeData = new ResultPipeline('[BenchEditorQueries → getBenchDefinition]')
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
