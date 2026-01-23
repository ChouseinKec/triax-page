import type { BenchDefinition, RegisteredBenches, BenchKey } from '@/core/layout/bench/types';
import type { PickResult } from '@/shared/types/result';

export function pickBenchDefinition(benchKey: BenchKey, registeredBenchs: RegisteredBenches): PickResult<BenchDefinition> {
	const definition = registeredBenchs[benchKey];
	if (!definition) return { success: false, error: `Bench definition not found: '${benchKey}' does not exist in the bench registry` };

	return { success: true, data: definition };
}
