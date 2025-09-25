// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Validates if a workbench ID is valid
 * @param workbenchID - The workbench ID to validate
 * @returns true if valid, false otherwise
 */
export function isWorkbenchIDValid(workbenchID: unknown): workbenchID is WorkbenchID {
	return typeof workbenchID === 'string' && workbenchID.length > 0;
}
