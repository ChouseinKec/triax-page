// Types
import type { PanelDefinition, PanelKey, PanelTitle, PanelPosition, PanelSize, PanelOrder, PanelIcon } from '@/core/layout/panel/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateObject, validateElement, validateInteger, validateBoolean } from '@/shared/helpers/validators';
import { validateBenchKey } from '@/core/layout/workbench/helpers/validators/bench';

/**
 * Validates a panel ID for panel operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param panelKey - The panel key to validate
 */
export function validatePanelKey(panelKey: unknown): ValidateResult<PanelKey> {
	const stringValidation = validateString(panelKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: panelKey as PanelKey };
}

/**
 * Validates a panel title for panel operations.
 * Checks if the title is a valid string.
 *
 * @param panelTitle - The panel title to validate
 */
export function validatePanelTitle(panelTitle: unknown): ValidateResult<PanelTitle> {
	const stringValidation = validateString(panelTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: panelTitle as PanelTitle };
}

/**
 * Validates a panel position for panel operations.
 * Checks if the position is a valid position object.
 *
 * @param panelPosition - The panel position to validate
 */
export function validatePanelPosition(panelPosition: unknown): ValidateResult<PanelPosition> {
	const objectValidation = validateObject(panelPosition);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: panelPosition as PanelPosition };
}

/**
 * Validates a panel size for panel operations.
 * Checks if the size is a valid size object.
 *
 * @param panelSize - The panel size to validate
 */
export function validatePanelSize(panelSize: unknown): ValidateResult<PanelSize> {
	const objectValidation = validateObject(panelSize);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: panelSize as PanelSize };
}

/**
 * Validates a panel order for panel operations.
 * Checks if the order is a valid number.
 *
 * @param panelOrder - The panel order to validate
 */
export function validatePanelOrder(panelOrder: unknown): ValidateResult<PanelOrder> {
	const integerValidation = validateInteger(panelOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: panelOrder as PanelOrder };
}

/**
 * Validates a panel icon for panel operations.
 * Checks if the icon is a valid React icon.
 *
 * @param panelIcon - The panel icon to validate
 */
export function validatePanelIcon(panelIcon: unknown): ValidateResult<PanelIcon> {
	const elementValidation = validateElement(panelIcon);
	if (!elementValidation.valid) return elementValidation;

	return { valid: true, value: panelIcon as PanelIcon };
}

/**
 * Validates a panel locked state for panel operations.
 * Checks if the locked state is a valid boolean.
 *
 * @param panelLocked - The panel locked state to validate
 */
export function validatePanelLocked(panelLocked: unknown): ValidateResult<boolean> {
	const booleanValidation = validateBoolean(panelLocked);
	if (!booleanValidation.valid) return booleanValidation;

	return { valid: true, value: panelLocked as boolean };
}

/**
 * Validates a panel open state for panel operations.
 * Checks if the open state is a valid boolean.
 *
 * @param panelOpen - The panel open state to validate
 */
export function validatePanelOpen(panelOpen: unknown): ValidateResult<boolean> {
	const booleanValidation = validateBoolean(panelOpen);
	if (!booleanValidation.valid) return booleanValidation;

	return { valid: true, value: panelOpen as boolean };
}

/**
 * Validates a complete panel definition for panel operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, workbench ID, order, locked state, open state, and icon.
 *
 * @param panelDefinition - The panel definition to validate
 */
export function validatePanelDefinition(panelDefinition: unknown): ValidateResult<PanelDefinition> {
	const objectValidation = validateObject(panelDefinition, ['key', 'benchKey', 'title', 'initialPosition', 'initialSize', 'order', 'initialLocked', 'initialOpen', 'icon']);
	if (!objectValidation.valid) return objectValidation;

	const benchKeyValidation = validateBenchKey(objectValidation.value.benchKey);
	if (!benchKeyValidation.valid) return benchKeyValidation;

	const keyValidation = validatePanelKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const titleValidation = validatePanelTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	const positionValidation = validatePanelPosition(objectValidation.value.initialPosition);
	if (!positionValidation.valid) return positionValidation;

	const sizeValidation = validatePanelSize(objectValidation.value.initialSize);
	if (!sizeValidation.valid) return sizeValidation;

	const orderValidation = validatePanelOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const lockedValidation = validatePanelLocked(objectValidation.value.initialLocked);
	if (!lockedValidation.valid) return lockedValidation;

	const openValidation = validatePanelOpen(objectValidation.value.initialOpen);
	if (!openValidation.valid) return openValidation;

	const iconValidation = validatePanelIcon(objectValidation.value.icon);
	if (!iconValidation.valid) return iconValidation;

	return { valid: true, value: panelDefinition as PanelDefinition };
}
