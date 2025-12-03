// Types
import type {  PanelTabDefinition, PanelTabID, PanelTabTitle, PanelTabComponent, PanelTabIcon, PanelTabOrder } from '@/src/core/layout/panel/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isPanelTabDefinitionValid, isPanelTabIDValid, isPanelTabTitleValid, isPanelTabComponentValid, isPanelTabIconValid, isPanelTabOrderValid } from '@/src/core/layout/panel/utilities';

// Helpers
import { validatePanelID } from '@/src/core/layout/panel/helpers/validators/panel';

/**
 * Validates a tab ID for tab operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param PanelTabID - The tab ID to validate
 * @returns ValidateResult containing validity and the validated PanelTabID if valid
 *
 * @example
 * validatePanelTabID('tab-123') → { valid: true, value: 'tab-123' }
 */
export function validatePanelTabID(PanelTabID: unknown): ValidateResult<PanelTabID> {
    if (!isPanelTabIDValid(PanelTabID)) return { valid: false, message: `Tab ID must be a valid string, got: ${PanelTabID}` };
    return { valid: true, value: PanelTabID as PanelTabID };
}

/**
 * Validates a tab title for tab operations.
 * Checks if the title is a valid string.
 *
 * @param PanelTabTitle - The tab title to validate
 * @returns ValidateResult containing validity and the validated PanelTabTitle if valid
 *
 * @example
 * validatePanelTabTitle('My Tab') → { valid: true, value: 'My Tab' }
 */
export function validatePanelTabTitle(PanelTabTitle: unknown): ValidateResult<PanelTabTitle> {
    if (!isPanelTabTitleValid(PanelTabTitle)) return { valid: false, message: `Tab title must be a valid string, got: ${PanelTabTitle}` };
    return { valid: true, value: PanelTabTitle as PanelTabTitle };
}

/**
 * Validates a tab component for tab operations.
 * Checks if the component is a valid React component.
 *
 * @param PanelTabComponent - The tab component to validate
 * @returns ValidateResult containing validity and the validated PanelTabComponent if valid
 *
 * @example
 * validatePanelTabComponent(MyComponent) → { valid: true, value: MyComponent }
 */
export function validatePanelTabComponent(PanelTabComponent: unknown): ValidateResult<PanelTabComponent> {
    if (!isPanelTabComponentValid(PanelTabComponent)) return { valid: false, message: `Tab component must be a valid React component, got: ${PanelTabComponent}` };
    return { valid: true, value: PanelTabComponent as PanelTabComponent };
}

/**
 * Validates a tab icon for tab operations.
 * Checks if the icon is a valid React icon.
 *
 * @param PanelTabIcon - The tab icon to validate
 * @returns ValidateResult containing validity and the validated PanelTabIcon if valid
 *
 * @example
 * validatePanelTabIcon(<Icon name="star" />) → { valid: true, value: <Icon name="star" /> }
 */
export function validatePanelTabIcon(PanelTabIcon: unknown): ValidateResult<PanelTabIcon> {
    if (!isPanelTabIconValid(PanelTabIcon)) return { valid: false, message: `Tab icon must be a valid React icon, got: ${PanelTabIcon}` };
    return { valid: true, value: PanelTabIcon as PanelTabIcon };
}

/**
 * Validates a tab order for tab operations.
 * Checks if the order is a valid number.
 *
 * @param PanelTabOrder - The tab order to validate
 * @returns ValidateResult containing validity and the validated PanelTabOrder if valid
 *
 * @example
 * validatePanelTabOrder(1) → { valid: true, value: 1 }
 */
export function validatePanelTabOrder(PanelTabOrder: unknown): ValidateResult<PanelTabOrder> {
    if (!isPanelTabOrderValid(PanelTabOrder)) return { valid: false, message: `Tab order must be a valid number, got: ${PanelTabOrder}` };
    return { valid: true, value: PanelTabOrder as PanelTabOrder };
}

/**
 * Validates a complete tab definition for tab operations.
 * Checks if the definition has all required valid properties including ID, title, component, icon, order, and panel ID.
 *
 * @param PanelTabDefinition - The tab definition to validate
 * @returns ValidateResult containing validity and the validated PanelTabDefinition if valid
 *
 * @example
 * validatePanelTabDefinition({ id: 'tab-1', title: 'My Tab', component: MyComponent, icon: <Icon />, order: 1, panelID: 'panel-1' }) → { valid: true, value: {...} }
 */
export function validatePanelTabDefinition(PanelTabDefinition: unknown): ValidateResult<PanelTabDefinition> {
    if (!isPanelTabDefinitionValid(PanelTabDefinition)) return { valid: false, message: `Invalid tab definition shape: ${JSON.stringify(PanelTabDefinition)}` };

    const idValidation = validatePanelTabID(PanelTabDefinition.id);
    if (!idValidation.valid) return { valid: false, message: idValidation.message };

    const titleValidation = validatePanelTabTitle(PanelTabDefinition.title);
    if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

    const componentValidation = validatePanelTabComponent(PanelTabDefinition.component);
    if (!componentValidation.valid) return { valid: false, message: componentValidation.message };

    const iconValidation = validatePanelTabIcon(PanelTabDefinition.icon);
    if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

    const orderValidation = validatePanelTabOrder(PanelTabDefinition.order);
    if (!orderValidation.valid) return { valid: false, message: orderValidation.message };

    const panelIDValidation = validatePanelID(PanelTabDefinition.panelID);
    if (!panelIDValidation.valid) return { valid: false, message: panelIDValidation.message };

    return { valid: true, value: PanelTabDefinition as PanelTabDefinition };
}
