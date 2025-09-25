// Types
import type { PanelDefinition } from '@/src/page-builder/core/editor/layout/types';

// Utilities
import { isPanelIDValid, isPanelTitleValid, isPanelPositionValid, isPanelSizeValid, isPanelIconValid, isPanelOrderValid } from '@/src/page-builder/core/editor/layout/utilities';
import { isWorkbenchIDValid } from '@/src/page-builder/core/editor/workbench/utilities';

/**
 * Creates a validated panel definition with comprehensive error handling
 * @param config - The panel configuration
 * @returns A validated panel object
 * @throws Error if validation fails
 */
export function validatePanel(config: PanelDefinition): { success: true } | { success: false; error: string } {
	const { id, title, initialPosition, initialSize, icon, workbenchID, initialLocked, initialOpen, order } = config;
	if (!isPanelIDValid(id)) {
		return { success: false, error: `Panel requires a valid string id, got: ${id}` };
	}
	if (!isPanelTitleValid(title)) {
		return { success: false, error: `Panel "${id}" requires a valid string title, got: ${title}` };
	}
	if (!isPanelPositionValid(initialPosition)) {
		return { success: false, error: `Panel "${id}" requires a valid initialPosition object` };
	}
	if (!isPanelSizeValid(initialSize)) {
		return { success: false, error: `Panel "${id}" requires a valid initialSize object` };
	}
	if (!isWorkbenchIDValid(workbenchID)) {
		return { success: false, error: `Panel "${id}" requires a valid workbenchID, got: ${workbenchID}` };
	}
	if (typeof initialLocked !== 'boolean') {
		return { success: false, error: `Panel "${id}" requires a valid initialLocked boolean, got: ${initialLocked}` };
	}
	if (typeof initialOpen !== 'boolean') {
		return { success: false, error: `Panel "${id}" requires a valid initialOpen boolean, got: ${initialOpen}` };
	}
	if (!isPanelOrderValid(order)) {
		return { success: false, error: `Panel "${id}" requires a valid order number, got: ${order}` };
	}
	if (!isPanelIconValid(icon)) {
		return { success: false, error: `Panel "${id}" requires a valid React icon` };
	}
	return { success: true };
}

export function createPanel(config: PanelDefinition): PanelDefinition {
	return config;
}
