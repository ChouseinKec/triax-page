// Types
import type { BenchDefinition, BenchKey, BenchIcon, BenchOrder, BenchName, BenchComponent } from '@/core/layout/workbench/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateInteger, validateElement, validateObject } from '@/shared/helpers/validators';

/**
 * Validates a workbench ID for workbench operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param workbenchKey - The workbench key to validate
 */
export function validateBenchKey(benchKey: unknown): ValidateResult<BenchKey> {
	const stringValidation = validateString(benchKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as BenchKey };
}

/**
 * Validates a workbench order for workbench operations.
 * Checks if the order is a valid number.
 *
 * @param order - The workbench order to validate
 */
export function validateBenchOrder(benchOrder: unknown): ValidateResult<BenchOrder> {
	const integerValidation = validateInteger(benchOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value as BenchOrder };
}

/**
 * Validates a workbench title for workbench operations.
 * Checks if the title is a valid string.
 *
 * @param title - The workbench title to validate
 */
export function validateBenchName(benchName: unknown): ValidateResult<BenchName> {
	const stringValidation = validateString(benchName);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as BenchName };
}

/**
 * Validates a workbench render for workbench operations.
 * Checks if the render is a valid function.
 *
 * @param render - The workbench render to validate
 */
export function validateBenchComponent(benchComponent: unknown): ValidateResult<BenchComponent> {
	const objectValidation = validateObject(benchComponent);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: benchComponent as BenchComponent };
}

/**
 * Validates a workbench icon for workbench operations.
 * Checks if the icon is valid.
 *
 * @param icon - The workbench icon to validate
 */
export function validateBenchIcon(benchIcon: unknown): ValidateResult<BenchIcon> {
	const elementValidation = validateElement(benchIcon);
	if (elementValidation.valid) return { valid: true, value: elementValidation.value as BenchIcon };

	const stringValidation = validateString(benchIcon);
	if (stringValidation.valid) return { valid: true, value: stringValidation.value as BenchIcon };

	return { valid: false, message: `Workbench icon must be a string or React element, got: ${typeof benchIcon}` };
}

/**
 * Validates a complete workbench definition for workbench operations.
 * Checks if the definition has all required valid properties including ID, title, icon, order, and render.
 *
 * @param workbench - The workbench definition to validate
 */
export function validateBenchDefinition(benchDefinition: unknown): ValidateResult<BenchDefinition> {
	const objectValidation = validateObject(benchDefinition, ['key', 'name', 'icon', 'order', 'component']);
	if (!objectValidation.valid) return objectValidation;

	const idValidation = validateBenchKey(objectValidation.value.key);
	if (!idValidation.valid) return idValidation;

	const titleValidation = validateBenchName(objectValidation.value.name);
	if (!titleValidation.valid) return titleValidation;

	const iconValidation = validateBenchIcon(objectValidation.value.icon);
	if (!iconValidation.valid) return iconValidation;

	const orderValidation = validateBenchOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const componentValidation = validateBenchComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	return { valid: true, value: objectValidation.value as unknown as BenchDefinition };
}
