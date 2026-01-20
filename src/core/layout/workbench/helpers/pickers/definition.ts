import type { BenchDefinition, BenchDefinitionRecord, BenchKey } from '@/src/core/layout/workbench/types';
import type { PickResult } from '@/src/shared/types/result';

export function pickBenchDefinition(benchKey: BenchKey, registeredBenchs: BenchDefinitionRecord): PickResult<BenchDefinition> {
	const definition = registeredBenchs[benchKey];
	if (!definition) return { success: false, error: `Bench definition not found: '${benchKey}' does not exist in the bench registry` };

	return { success: true, data: definition };
}
