// Types
import type { PanelDefinition, PanelID, PanelTitle, PanelPosition, PanelSize, PanelOrder, PanelIcon } from '@/src/core/layout/panel/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isPanelDefinitionValid, isPanelLockedValid, isPanelOpenValid, isPanelIDValid, isPanelTitleValid, isPanelPositionValid, isPanelSizeValid, isPanelIconValid, isPanelOrderValid } from '@/src/core/layout/panel/utilities';

// Helpers
import { validateWorkbenchID } from '@/src/core/layout/workbench/helpers';

/**
 * Validates a panel ID for panel operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param panelID - The panel ID to validate
 */
export function validatePanelID(panelID: unknown): ValidateResult<PanelID> {
	if (!isPanelIDValid(panelID)) return { valid: false, message: `Panel ID must be a valid string, got: ${panelID}` };
	return { valid: true, value: panelID as PanelID };
}

/**
 * Validates a panel title for panel operations.
 * Checks if the title is a valid string.
 *
 * @param panelTitle - The panel title to validate
 */
export function validatePanelTitle(panelTitle: unknown): ValidateResult<PanelTitle> {
	if (!isPanelTitleValid(panelTitle)) return { valid: false, message: `Panel title must be a valid string, got: ${panelTitle}` };
	return { valid: true, value: panelTitle as PanelTitle };
}

/**
 * Validates a panel position for panel operations.
 * Checks if the position is a valid position object.
 *
 * @param panelPosition - The panel position to validate
 */
export function validatePanelPosition(panelPosition: unknown): ValidateResult<PanelPosition> {
	if (!isPanelPositionValid(panelPosition)) return { valid: false, message: `Panel position must be a valid object, got: ${JSON.stringify(panelPosition)}` };
	return { valid: true, value: panelPosition as PanelPosition };
}

/**
 * Validates a panel size for panel operations.
 * Checks if the size is a valid size object.
 *
 * @param panelSize - The panel size to validate
 */
export function validatePanelSize(panelSize: unknown): ValidateResult<PanelSize> {
	if (!isPanelSizeValid(panelSize)) return { valid: false, message: `Panel size must be a valid object, got: ${JSON.stringify(panelSize)}` };
	return { valid: true, value: panelSize as PanelSize };
}

/**
 * Validates a panel order for panel operations.
 * Checks if the order is a valid number.
 *
 * @param panelOrder - The panel order to validate
 */
export function validatePanelOrder(panelOrder: unknown): ValidateResult<PanelOrder> {
	if (!isPanelOrderValid(panelOrder)) return { valid: false, message: `Panel order must be a valid number, got: ${panelOrder}` };
	return { valid: true, value: panelOrder as PanelOrder };
}

/**
 * Validates a panel icon for panel operations.
 * Checks if the icon is a valid React icon.
 *
 * @param panelIcon - The panel icon to validate
 */
export function validatePanelIcon(panelIcon: unknown): ValidateResult<PanelIcon> {
	if (!isPanelIconValid(panelIcon)) return { valid: false, message: `Panel icon must be a valid React icon, got: ${panelIcon}` };
	return { valid: true, value: panelIcon as PanelIcon };
}

/**
 * Validates a panel locked state for panel operations.
 * Checks if the locked state is a valid boolean.
 *
 * @param panelLocked - The panel locked state to validate
 */
export function validatePanelLocked(panelLocked: unknown): ValidateResult<boolean> {
	if (!isPanelLockedValid(panelLocked)) return { valid: false, message: `Panel locked state must be a boolean, got: ${panelLocked}` };
	return { valid: true, value: panelLocked as boolean };
}

/**
 * Validates a panel open state for panel operations.
 * Checks if the open state is a valid boolean.
 *
 * @param panelOpen - The panel open state to validate
 */
export function validatePanelOpen(panelOpen: unknown): ValidateResult<boolean> {
	if (!isPanelOpenValid(panelOpen)) return { valid: false, message: `Panel open state must be a boolean, got: ${panelOpen}` };
	return { valid: true, value: panelOpen as boolean };
}

/**
 * Validates a complete panel definition for panel operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, workbench ID, order, locked state, open state, and icon.
 *
 * @param panelDefinition - The panel definition to validate
 */
export function validatePanelDefinition(panelDefinition: unknown): ValidateResult<PanelDefinition> {
	if (!isPanelDefinitionValid(panelDefinition)) return { valid: false, message: `Panel definition must be a valid object, got: ${JSON.stringify(panelDefinition)}` };

	const idValidation = validatePanelID(panelDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validatePanelTitle(panelDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const positionValidation = validatePanelPosition(panelDefinition.initialPosition);
	if (!positionValidation.valid) return { valid: false, message: positionValidation.message };

	const sizeValidation = validatePanelSize(panelDefinition.initialSize);
	if (!sizeValidation.valid) return { valid: false, message: sizeValidation.message };

	const workbenchIDValidation = validateWorkbenchID(panelDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return { valid: false, message: workbenchIDValidation.message };

	const orderValidation = validatePanelOrder(panelDefinition.order);
	if (!orderValidation.valid) return { valid: false, message: orderValidation.message };

	const lockedValidation = validatePanelLocked(panelDefinition.initialLocked);
	if (!lockedValidation.valid) return { valid: false, message: lockedValidation.message };

	const openValidation = validatePanelOpen(panelDefinition.initialOpen);
	if (!openValidation.valid) return { valid: false, message: openValidation.message };

	const iconValidation = validatePanelIcon(panelDefinition.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: panelDefinition as PanelDefinition };
}
