// Types
import type { BarDefinition } from '@/src/page-builder/core/editor/layout/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isBarIDValid, isBarTitleValid, isBarPositionValid, isBarSizeValid } from '@/src/page-builder/core/editor/layout/utilities/bar';
import { isWorkbenchIDValid } from '@/src/page-builder/core/editor/workbench/utilities';

/**
 * Creates a validated bar definition (pure, no validation)
 */
export function createBar(config: BarDefinition): BarDefinition {
    return config;
}

/**
 * Validates a bar definition and returns ValidationResult
 */
export function validateBar(config: BarDefinition): ValidationResult {
    const { id, title, position, size, workbenchID } = config;
    if (!isBarIDValid(id)) {
        return { success: false, error: `Bar requires a valid string id, got: ${id}` };
    }
    if (!isBarTitleValid(title)) {
        return { success: false, error: `Bar "${id}" requires a valid string title, got: ${title}` };
    }
    if (!isBarPositionValid(position)) {
        return { success: false, error: `Bar "${id}" requires a valid position object` };
    }
    if (!isBarSizeValid(size)) {
        return { success: false, error: `Bar "${id}" requires a valid size object` };
    }
    if (!isWorkbenchIDValid(workbenchID)) {
        return { success: false, error: `Bar "${id}" requires a valid workbenchID, got: ${workbenchID}` };
    }
    return { success: true };
}
