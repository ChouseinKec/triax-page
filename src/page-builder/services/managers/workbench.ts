import { useMemo } from 'react';

// Registry
import { getRegisteredWorkbenchs } from '@/src/page-builder/state/registries/workbench';

// Types
import type { WorkbenchDefinition } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Reactive hook to get all registered workbenches.
 * Returns a stable reference to the workbenches record.
 *
 * @returns Record of all registered workbenches keyed by their IDs
 */
export function useWorkbenchs(): Record<string, WorkbenchDefinition> {
    return useMemo(() => getRegisteredWorkbenchs(), []);
}