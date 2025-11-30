// Types
import type { WorkbenchID, WorkbenchOrder, WorkbenchTitle, WorkbenchRender, WorkbenchInstance, WorkbenchIcon } from '@/src/core/layout/workbench/types';

/**
 * Validates if a value is a valid workbench order.
 * Checks if the value is a valid number (not NaN).
 * @param workbenchOrder - The value to validate
 * @returns True if valid WorkbenchOrder, false otherwise
 * @example
 * isWorkbenchOrderValid(1) → true
 * isWorkbenchOrderValid(NaN) → false
 */
export function isWorkbenchOrderValid(workbenchOrder: unknown): workbenchOrder is WorkbenchOrder {
    return typeof workbenchOrder === 'number' && !isNaN(workbenchOrder);
}

/**
 * Validates if a value is a valid workbench title.
 * Checks if the value is a non-empty string.
 * @param workbenchTitle - The value to validate
 * @returns True if valid WorkbenchTitle, false otherwise
 * @example
 * isWorkbenchTitleValid('Design Workbench') → true
 * isWorkbenchTitleValid('') → false
 */
export function isWorkbenchTitleValid(workbenchTitle: unknown): workbenchTitle is WorkbenchTitle {
    return typeof workbenchTitle === 'string' && workbenchTitle.length > 0;
}

/**
 * Validates if a value is a valid workbench render function.
 * Checks if the value is a function (React component).
 * @param workbenchRender - The value to validate
 * @returns True if valid WorkbenchRender, false otherwise
 * @example
 * isWorkbenchRenderValid(() => <div />) → true
 * isWorkbenchRenderValid('string') → false
 */
export function isWorkbenchRenderValid(workbenchRender: unknown): workbenchRender is WorkbenchRender {
    return typeof workbenchRender === 'function';
}

/**
 * Validates if a value is a valid workbench icon.
 * Checks if the value is not null or undefined.
 * @param workbenchIcon - The value to validate
 * @returns True if valid WorkbenchIcon, false otherwise
 * @example
 * isWorkbenchIconValid(<Icon />) → true
 * isWorkbenchIconValid(null) → false
 */
export function isWorkbenchIconValid(workbenchIcon: unknown): workbenchIcon is WorkbenchIcon {
    return workbenchIcon != null;
}

/**
 * Validates if a value is a valid workbench identifier.
 * Checks if the value is a non-empty string.
 * @param workbenchID - The value to validate
 * @returns True if valid WorkbenchID, false otherwise
 * @example
 * isWorkbenchIDValid('design-workbench') → true
 * isWorkbenchIDValid('') → false
 */
export function isWorkbenchIDValid(workbenchID: unknown): workbenchID is WorkbenchID {
    return typeof workbenchID === 'string' && workbenchID.length > 0;
}

/**
 * Validates if a value is a valid workbench definition.
 * Checks if the value is an object with all required workbench properties.
 * @param workbenchDefinition - The value to validate
 * @returns True if valid WorkbenchInstance, false otherwise
 * @example
 * isWorkbenchDefinitionValid({ id: 'wb1', title: 'Design', icon: <Icon />, order: 1, render: () => {} }) → true
 */
export function isWorkbenchDefinitionValid(workbenchDefinition: unknown): workbenchDefinition is WorkbenchInstance {
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
