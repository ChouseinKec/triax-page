// Types
import type { WorkbenchID, WorkbenchOrder, WorkbenchTitle, WorkbenchRender, WorkbenchDefinition, WorkbenchIcon } from '@/src/page-builder/core/editor/workbench/types';

export function isWorkbenchOrderValid(workbenchOrder: unknown): workbenchOrder is WorkbenchOrder {
	return typeof workbenchOrder === 'number' && !isNaN(workbenchOrder);
}

export function isWorkbenchTitleValid(workbenchTitle: unknown): workbenchTitle is WorkbenchTitle {
	return typeof workbenchTitle === 'string' && workbenchTitle.length > 0;
}

export function isWorkbenchRenderValid(workbenchRender: unknown): workbenchRender is WorkbenchRender {
	return typeof workbenchRender === 'function';
}

export function isWorkbenchIconValid(workbenchIcon: unknown): workbenchIcon is WorkbenchIcon {
	return workbenchIcon != null;
}

/**
 * Validates if a workbench ID is valid
 * @param workbenchID - The workbench ID to validate
 * @returns true if valid, false otherwise
 */
export function isWorkbenchIDValid(workbenchID: unknown): workbenchID is WorkbenchID {
	return typeof workbenchID === 'string' && workbenchID.length > 0;
}

export function isWorkbenchDefinitionValid(workbenchDefinition: unknown): workbenchDefinition is WorkbenchDefinition {
	return (
		typeof workbenchDefinition === 'object' && //
		workbenchDefinition !== null &&
		'id' in workbenchDefinition &&
		'title' in workbenchDefinition &&
		'icon' in workbenchDefinition &&
		'order' in workbenchDefinition &&
		'render' in workbenchDefinition
	);
}
