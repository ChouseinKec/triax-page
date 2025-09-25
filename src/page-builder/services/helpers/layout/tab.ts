// Types
import type { TabDefinition } from '@/src/page-builder/core/editor/layout/types/tab';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isTabIDValid, isTabTitleValid, isTabComponentValid, isTabIconValid, isTabOrderValid,isPanelIDValid } from '@/src/page-builder/core/editor/layout/utilities';

/**
 * Creates a validated tab definition (pure, no validation)
 */
export function createTab(config: TabDefinition): TabDefinition {
	return config;
}

/**
 * Validates a tab definition and returns ValidationResult
 */
export function validateTab(config: TabDefinition): ValidationResult {
	const { id, panelID, title, component, icon, order } = config;
	if (!isTabIDValid(id)) {
		return { success: false, error: `Tab requires a valid string ID, got: ${id}` };
	}
	if (!isPanelIDValid(panelID)) {
		return { success: false, error: `Tab "${id}" requires a valid string panelID, got: ${panelID}` };
	}
	if (!isTabTitleValid(title)) {
		return { success: false, error: `Tab "${id}" requires a valid string title, got: ${title}` };
	}
	if (!isTabComponentValid(component)) {
		return { success: false, error: `Tab "${id}" requires a valid React component, got: ${component}` };
	}
	if (!isTabIconValid(icon)) {
		return { success: false, error: `Tab "${id}" requires a valid icon, got: ${icon}` };
	}
	if (!isTabOrderValid(order)) {
		return { success: false, error: `Tab "${id}" requires a valid order number, got: ${order}` };
	}
	return { success: true };
}
