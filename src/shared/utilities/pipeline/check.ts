// Types
import type { CheckResult } from '@/src/shared/types/result';

/**
 * Run a sequence of CheckResult-producing functions.
 * - Returns the first failure (success:false) encountered
 * - Returns { success: true, ok: false } on first explicit denial
 * - Returns { success: true, ok: true } if all checks pass
 */
export function runChecks(...checks: Array<() => CheckResult>): CheckResult {
	for (const fn of checks) {
		const r = fn();
		if (!r.success) return r;
		if (!r.ok) return { success: true, ok: false };
	}
	return { success: true, ok: true };
}
