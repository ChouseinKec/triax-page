// Types
import type { BarActionInstance, BarActionID, BarActionOrder, BarActionRender, BarActionTitle, BarDefinition, BarID, BarTitle, BarPosition, BarSize } from '@/src/page/layout/core/types';
import type { InfoDataInstance, InfoDataID, InfoDataOrder, InfoDataRender, InfoDefinition, InfoID, InfoTitle, InfoPosition, InfoSize, InfoGrid } from '@/src/page/layout/core/types/info';
import type { PanelDefinition, PanelID, PanelTitle, PanelPosition, PanelSize, PanelOrder, PanelIcon } from '@/src/page/layout/core/types';
import type { TabDefinition, TabID, TabTitle, TabComponent, TabIcon, TabOrder } from '@/src/page/layout/core/types/tab';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isBarActionInstanceValid, isBarActionIDValid, isBarActionOrderValid, isBarActionRenderValid, isBarActionTitleValid, isBarDefinitionValid, isBarIDValid, isBarTitleValid, isBarPositionValid, isBarSizeValid } from '@/src/page/layout/core/utilities/bar';
import { isInfoDataInstanceValid, isInfoDataIDValid, isInfoDataOrderValid, isInfoDataRenderValid, isInfoDefinitionValid, isInfoIDValid, isInfoTitleValid, isInfoPositionValid, isInfoSizeValid, isInfoGridValid } from '@/src/page/layout/core/utilities/info';
import { isPanelDefinitionValid, isPanelLockedValid, isPanelOpenValid, isPanelIDValid, isPanelTitleValid, isPanelPositionValid, isPanelSizeValid, isPanelIconValid, isPanelOrderValid } from '@/src/page/layout/core/utilities';
import { isTabDefinitionValid, isTabIDValid, isTabTitleValid, isTabComponentValid, isTabIconValid, isTabOrderValid } from '@/src/page/layout/core/utilities';

// Helpers
import { validateWorkbenchID } from '@/src/page/service/helpers/editor';

/**
 * Validates a bar ID for bar operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param barID - The bar ID to validate
 * @returns ValidateResult containing validity and the validated BarID if valid
 *
 * @example
 * validateBarID('bar-123') → { valid: true, value: 'bar-123' }
 */
export function validateBarID(barID: unknown): ValidateResult<BarID> {
	if (!isBarIDValid(barID)) return { valid: false, message: `Bar ID must be a valid string, got: ${barID}` };
	return { valid: true, value: barID as BarID };
}

/**
 * Validates a bar title for bar operations.
 * Checks if the title is a valid string.
 *
 * @param barTitle - The bar title to validate
 * @returns ValidateResult containing validity and the validated BarTitle if valid
 *
 * @example
 * validateBarTitle('My Bar') → { valid: true, value: 'My Bar' }
 */
export function validateBarTitle(barTitle: unknown): ValidateResult<BarTitle> {
	if (!isBarTitleValid(barTitle)) return { valid: false, message: `Bar title must be a valid string, got: ${barTitle}` };
	return { valid: true, value: barTitle as BarTitle };
}

/**
 * Validates a bar position for bar operations.
 * Checks if the position is a valid position object.
 *
 * @param barPosition - The bar position to validate
 * @returns ValidateResult containing validity and the validated BarPosition if valid
 *
 * @example
 * validateBarPosition({ x: 10, y: 20 }) → { valid: true, value: { x: 10, y: 20 } }
 */
export function validateBarPosition(barPosition: unknown): ValidateResult<BarPosition> {
	if (!isBarPositionValid(barPosition)) return { valid: false, message: `Bar position must be a valid object, got: ${JSON.stringify(barPosition)}` };
	return { valid: true, value: barPosition as BarPosition };
}

/**
 * Validates a bar size for bar operations.
 * Checks if the size is a valid size object.
 *
 * @param barSize - The bar size to validate
 * @returns ValidateResult containing validity and the validated BarSize if valid
 *
 * @example
 * validateBarSize({ width: 100, height: 50 }) → { valid: true, value: { width: 100, height: 50 } }
 */
export function validateBarSize(barSize: unknown): ValidateResult<BarSize> {
	if (!isBarSizeValid(barSize)) return { valid: false, message: `Bar size must be a valid object, got: ${JSON.stringify(barSize)}` };
	return { valid: true, value: barSize as BarSize };
}

/**
 * Validates a complete bar definition for bar operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, and workbench ID.
 *
 * @param barDefinition - The bar definition to validate
 * @returns ValidateResult containing validity and the validated BarDefinition if valid
 *
 * @example
 * validateBarDefinition({ id: 'bar-1', title: 'My Bar', position: { x: 0, y: 0 }, size: { width: 200, height: 50 }, workbenchID: 'wb-1' }) → { valid: true, value: {...} }
 */
export function validateBarDefinition(barDefinition: unknown): ValidateResult<BarDefinition> {
	if (!isBarDefinitionValid(barDefinition)) return { valid: false, message: `Bar definition is not a valid object, got: ${JSON.stringify(barDefinition)}` };

	const idValidation = validateBarID(barDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateBarTitle(barDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const positionValidation = validateBarPosition(barDefinition.position);
	if (!positionValidation.valid) return { valid: false, message: positionValidation.message };

	const sizeValidation = validateBarSize(barDefinition.size);
	if (!sizeValidation.valid) return { valid: false, message: sizeValidation.message };

	const workbenchIDValidation = validateWorkbenchID(barDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return { valid: false, message: workbenchIDValidation.message };

	return { valid: true, value: barDefinition as BarDefinition };
}

/**
 * Validates a bar action ID for bar action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param actionID - The bar action ID to validate
 * @returns ValidateResult containing validity and the validated BarActionID if valid
 *
 * @example
 * validateBarActionID('action-123') → { valid: true, value: 'action-123' }
 */
export function validateBarActionID(actionID: unknown): ValidateResult<BarActionID> {
	if (!isBarActionIDValid(actionID)) return { valid: false, message: `Bar action ID must be a valid string, got: ${actionID}` };
	return { valid: true, value: actionID as BarActionID };
}

/**
 * Validates a bar action title for bar action operations.
 * Checks if the title is a valid string.
 *
 * @param actionTitle - The bar action title to validate
 * @returns ValidateResult containing validity and the validated BarActionTitle if valid
 *
 * @example
 * validateBarActionTitle('Save') → { valid: true, value: 'Save' }
 */
export function validateBarActionTitle(actionTitle: unknown): ValidateResult<BarActionTitle> {
	if (!isBarActionTitleValid(actionTitle)) return { valid: false, message: `Bar action title must be a valid string, got: ${actionTitle}` };
	return { valid: true, value: actionTitle as BarActionTitle };
}

/**
 * Validates a bar action order for bar action operations.
 * Checks if the order is a valid number.
 *
 * @param actionOrder - The bar action order to validate
 * @returns ValidateResult containing validity and the validated BarActionOrder if valid
 *
 * @example
 * validateBarActionOrder(1) → { valid: true, value: 1 }
 */
export function validateBarActionOrder(actionOrder: unknown): ValidateResult<BarActionOrder> {
	if (!isBarActionOrderValid(actionOrder)) return { valid: false, message: `Bar action order must be a valid number, got: ${actionOrder}` };
	return { valid: true, value: actionOrder as BarActionOrder };
}

/**
 * Validates a bar action render for bar action operations.
 * Checks if the render is a valid function or Vue component.
 *
 * @param actionRender - The bar action render to validate
 * @returns ValidateResult containing validity and the validated BarActionRender if valid
 *
 * @example
 * validateBarActionRender(() => <button>Click</button>) → { valid: true, value: () => <button>Click</button> }
 */
export function validateBarActionRender(actionRender: unknown): ValidateResult<BarActionRender> {
	if (!isBarActionRenderValid(actionRender)) return { valid: false, message: `Bar action render must be a valid function or Vue component, got: ${actionRender}` };
	return { valid: true, value: actionRender as BarActionRender };
}

/**
 * Validates a bar action instance for bar action operations.
 * Checks if the instance is a valid bar action object.
 *
 * @param action - The bar action instance to validate
 * @returns ValidateResult containing validity and the validated BarActionInstance if valid
 *
 * @example
 * validateBarActionInstance({ id: 'action-1', title: 'Save', order: 1, render: () => <button>Save</button> }) → { valid: true, value: {...} }
 */
export function validateBarActionInstance(action: unknown): ValidateResult<BarActionInstance> {
	if (!isBarActionInstanceValid(action)) return { valid: false, message: `Bar action instance is not a valid object, got: ${JSON.stringify(action)}` };
	return { valid: true, value: action as BarActionInstance };
}

/**
 * Validates an info ID for info operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param infoID - The info ID to validate
 * @returns ValidateResult containing validity and the validated InfoID if valid
 *
 * @example
 * validateInfoID('info-123') → { valid: true, value: 'info-123' }
 */
export function validateInfoID(infoID: unknown): ValidateResult<InfoID> {
	if (!isInfoIDValid(infoID)) return { valid: false, message: `Info ID must be a valid string, got: ${infoID}` };
	return { valid: true, value: infoID as InfoID };
}

/**
 * Validates an info title for info operations.
 * Checks if the title is a valid string.
 *
 * @param infoTitle - The info title to validate
 * @returns ValidateResult containing validity and the validated InfoTitle if valid
 *
 * @example
 * validateInfoTitle('My Info') → { valid: true, value: 'My Info' }
 */
export function validateInfoTitle(infoTitle: unknown): ValidateResult<InfoTitle> {
	if (!isInfoTitleValid(infoTitle)) return { valid: false, message: `Info title must be a valid string, got: ${infoTitle}` };
	return { valid: true, value: infoTitle as InfoTitle };
}

/**
 * Validates an info position for info operations.
 * Checks if the position is a valid position object.
 *
 * @param infoPosition - The info position to validate
 * @returns ValidateResult containing validity and the validated InfoPosition if valid
 *
 * @example
 * validateInfoPosition({ top: '10px', left: '20px' }) → { valid: true, value: { top: '10px', left: '20px' } }
 */
export function validateInfoPosition(infoPosition: unknown): ValidateResult<InfoPosition> {
	if (!isInfoPositionValid(infoPosition)) return { valid: false, message: `Info position must be a valid object, got: ${JSON.stringify(infoPosition)}` };
	return { valid: true, value: infoPosition as InfoPosition };
}

/**
 * Validates an info size for info operations.
 * Checks if the size is a valid size object.
 *
 * @param infoSize - The info size to validate
 * @returns ValidateResult containing validity and the validated InfoSize if valid
 *
 * @example
 * validateInfoSize({ width: '100px', height: '50px' }) → { valid: true, value: { width: '100px', height: '50px' } }
 */
export function validateInfoSize(infoSize: unknown): ValidateResult<InfoSize> {
	if (!isInfoSizeValid(infoSize)) return { valid: false, message: `Info size must be a valid object, got: ${JSON.stringify(infoSize)}` };
	return { valid: true, value: infoSize as InfoSize };
}

/**
 * Validates an info grid for info operations.
 * Checks if the grid has valid columns and rows.
 *
 * @param grid - The info grid to validate
 * @returns ValidateResult containing validity and the validated InfoGrid if valid
 *
 * @example
 * validateInfoGrid({ columns: 3, rows: 2 }) → { valid: true, value: { columns: 3, rows: 2 } }
 */
export function validateInfoGrid(grid: unknown): ValidateResult<InfoGrid> {
	if (!isInfoGridValid(grid)) return { valid: false, message: `Info grid must have valid positive integer columns and rows, got: ${JSON.stringify(grid)}` };
	return { valid: true, value: grid as InfoGrid };
}

/**
 * Validates a complete info definition for info operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, grid, and workbench ID.
 *
 * @param infoDefinition - The info definition to validate
 * @returns ValidateResult containing validity and the validated InfoDefinition if valid
 *
 * @example
 * validateInfoDefinition({ id: 'info-1', title: 'My Info', position: { top: '0px', left: '0px' }, size: { width: '200px', height: '50px' }, grid: { columns: 1, rows: 1 }, workbenchID: 'wb-1' }) → { valid: true, value: {...} }
 */
export function validateInfoDefinition(infoDefinition: unknown): ValidateResult<InfoDefinition> {
	if (!isInfoDefinitionValid(infoDefinition)) return { valid: false, message: `Info definition is not a valid object, got: ${JSON.stringify(infoDefinition)}` };

	const idValidation = validateInfoID(infoDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateInfoTitle(infoDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const positionValidation = validateInfoPosition(infoDefinition.position);
	if (!positionValidation.valid) return { valid: false, message: positionValidation.message };

	const sizeValidation = validateInfoSize(infoDefinition.size);
	if (!sizeValidation.valid) return { valid: false, message: sizeValidation.message };

	const gridValidation = validateInfoGrid(infoDefinition.grid);
	if (!gridValidation.valid) return { valid: false, message: gridValidation.message };

	const workbenchIDValidation = validateWorkbenchID(infoDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return { valid: false, message: workbenchIDValidation.message };

	return { valid: true, value: infoDefinition as InfoDefinition };
}

/**
 * Validates an info data ID for info data operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param dataID - The info data ID to validate
 * @returns ValidateResult containing validity and the validated InfoDataID if valid
 *
 * @example
 * validateInfoDataID('data-123') → { valid: true, value: 'data-123' }
 */
export function validateInfoDataID(dataID: unknown): ValidateResult<InfoDataID> {
	if (!isInfoDataIDValid(dataID)) return { valid: false, message: `Info data ID must be a valid string, got: ${dataID}` };
	return { valid: true, value: dataID as InfoDataID };
}

/**
 * Validates an info data order for info data operations.
 * Checks if the order is a valid number.
 *
 * @param dataOrder - The info data order to validate
 * @returns ValidateResult containing validity and the validated InfoDataOrder if valid
 *
 * @example
 * validateInfoDataOrder(1) → { valid: true, value: 1 }
 */
export function validateInfoDataOrder(dataOrder: unknown): ValidateResult<InfoDataOrder> {
	if (!isInfoDataOrderValid(dataOrder)) return { valid: false, message: `Info data order must be a valid number, got: ${dataOrder}` };
	return { valid: true, value: dataOrder as InfoDataOrder };
}

/**
 * Validates an info data render for info data operations.
 * Checks if the render is a valid function.
 *
 * @param dataRender - The info data render to validate
 * @returns ValidateResult containing validity and the validated InfoDataRender if valid
 *
 * @example
 * validateInfoDataRender(() => <div>Content</div>) → { valid: true, value: () => <div>Content</div> }
 */
export function validateInfoDataRender(dataRender: unknown): ValidateResult<InfoDataRender> {
	if (!isInfoDataRenderValid(dataRender)) return { valid: false, message: `Info data render must be a valid function, got: ${dataRender}` };
	return { valid: true, value: dataRender as InfoDataRender };
}

/**
 * Validates an info data instance for info data operations.
 * Checks if the instance is a valid info data object.
 *
 * @param dataInstance - The info data instance to validate
 * @returns ValidateResult containing validity and the validated InfoDataInstance if valid
 *
 * @example
 * validateInfoDataInstance({ id: 'data-1', order: 1, render: () => <div>Content</div> }) → { valid: true, value: {...} }
 */
export function validateInfoDataInstance(dataInstance: unknown): ValidateResult<InfoDataInstance> {
	if (!isInfoDataInstanceValid(dataInstance)) return { valid: false, message: `Info data instance is not a valid object, got: ${JSON.stringify(dataInstance)}` };
	return { valid: true, value: dataInstance as InfoDataInstance };
}

/**
 * Validates a panel ID for panel operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param panelID - The panel ID to validate
 * @returns ValidateResult containing validity and the validated PanelID if valid
 *
 * @example
 * validatePanelID('panel-123') → { valid: true, value: 'panel-123' }
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
 * @returns ValidateResult containing validity and the validated PanelTitle if valid
 *
 * @example
 * validatePanelTitle('My Panel') → { valid: true, value: 'My Panel' }
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
 * @returns ValidateResult containing validity and the validated PanelPosition if valid
 *
 * @example
 * validatePanelPosition({ x: 10, y: 20 }) → { valid: true, value: { x: 10, y: 20 } }
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
 * @returns ValidateResult containing validity and the validated PanelSize if valid
 *
 * @example
 * validatePanelSize({ width: 100, height: 50 }) → { valid: true, value: { width: 100, height: 50 } }
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
 * @returns ValidateResult containing validity and the validated PanelOrder if valid
 *
 * @example
 * validatePanelOrder(1) → { valid: true, value: 1 }
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
 * @returns ValidateResult containing validity and the validated PanelIcon if valid
 *
 * @example
 * validatePanelIcon(<Icon name="star" />) → { valid: true, value: <Icon name="star" /> }
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
 * @returns ValidateResult containing validity and the validated boolean if valid
 *
 * @example
 * validatePanelLocked(true) → { valid: true, value: true }
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
 * @returns ValidateResult containing validity and the validated boolean if valid
 *
 * @example
 * validatePanelOpen(false) → { valid: true, value: false }
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
 * @returns ValidateResult containing validity and the validated PanelDefinition if valid
 *
 * @example
 * validatePanelDefinition({ id: 'panel-1', title: 'My Panel', initialPosition: { x: 0, y: 0 }, initialSize: { width: 200, height: 100 }, workbenchID: 'wb-1', order: 1, initialLocked: false, initialOpen: true, icon: <Icon /> }) → { valid: true, value: {...} }
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

/**
 * Validates a tab ID for tab operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param tabID - The tab ID to validate
 * @returns ValidateResult containing validity and the validated TabID if valid
 *
 * @example
 * validateTabID('tab-123') → { valid: true, value: 'tab-123' }
 */
export function validateTabID(tabID: unknown): ValidateResult<TabID> {
	if (!isTabIDValid(tabID)) return { valid: false, message: `Tab ID must be a valid string, got: ${tabID}` };
	return { valid: true, value: tabID as TabID };
}

/**
 * Validates a tab title for tab operations.
 * Checks if the title is a valid string.
 *
 * @param tabTitle - The tab title to validate
 * @returns ValidateResult containing validity and the validated TabTitle if valid
 *
 * @example
 * validateTabTitle('My Tab') → { valid: true, value: 'My Tab' }
 */
export function validateTabTitle(tabTitle: unknown): ValidateResult<TabTitle> {
	if (!isTabTitleValid(tabTitle)) return { valid: false, message: `Tab title must be a valid string, got: ${tabTitle}` };
	return { valid: true, value: tabTitle as TabTitle };
}

/**
 * Validates a tab component for tab operations.
 * Checks if the component is a valid React component.
 *
 * @param tabComponent - The tab component to validate
 * @returns ValidateResult containing validity and the validated TabComponent if valid
 *
 * @example
 * validateTabComponent(MyComponent) → { valid: true, value: MyComponent }
 */
export function validateTabComponent(tabComponent: unknown): ValidateResult<TabComponent> {
	if (!isTabComponentValid(tabComponent)) return { valid: false, message: `Tab component must be a valid React component, got: ${tabComponent}` };
	return { valid: true, value: tabComponent as TabComponent };
}

/**
 * Validates a tab icon for tab operations.
 * Checks if the icon is a valid React icon.
 *
 * @param tabIcon - The tab icon to validate
 * @returns ValidateResult containing validity and the validated TabIcon if valid
 *
 * @example
 * validateTabIcon(<Icon name="star" />) → { valid: true, value: <Icon name="star" /> }
 */
export function validateTabIcon(tabIcon: unknown): ValidateResult<TabIcon> {
	if (!isTabIconValid(tabIcon)) return { valid: false, message: `Tab icon must be a valid React icon, got: ${tabIcon}` };
	return { valid: true, value: tabIcon as TabIcon };
}

/**
 * Validates a tab order for tab operations.
 * Checks if the order is a valid number.
 *
 * @param tabOrder - The tab order to validate
 * @returns ValidateResult containing validity and the validated TabOrder if valid
 *
 * @example
 * validateTabOrder(1) → { valid: true, value: 1 }
 */
export function validateTabOrder(tabOrder: unknown): ValidateResult<TabOrder> {
	if (!isTabOrderValid(tabOrder)) return { valid: false, message: `Tab order must be a valid number, got: ${tabOrder}` };
	return { valid: true, value: tabOrder as TabOrder };
}

/**
 * Validates a complete tab definition for tab operations.
 * Checks if the definition has all required valid properties including ID, title, component, icon, order, and panel ID.
 *
 * @param tabDefinition - The tab definition to validate
 * @returns ValidateResult containing validity and the validated TabDefinition if valid
 *
 * @example
 * validateTabDefinition({ id: 'tab-1', title: 'My Tab', component: MyComponent, icon: <Icon />, order: 1, panelID: 'panel-1' }) → { valid: true, value: {...} }
 */
export function validateTabDefinition(tabDefinition: unknown): ValidateResult<TabDefinition> {
	if (!isTabDefinitionValid(tabDefinition)) return { valid: false, message: `Invalid tab definition shape: ${JSON.stringify(tabDefinition)}` };

	const idValidation = validateTabID(tabDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateTabTitle(tabDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const componentValidation = validateTabComponent(tabDefinition.component);
	if (!componentValidation.valid) return { valid: false, message: componentValidation.message };

	const iconValidation = validateTabIcon(tabDefinition.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	const orderValidation = validateTabOrder(tabDefinition.order);
	if (!orderValidation.valid) return { valid: false, message: orderValidation.message };

	const panelIDValidation = validatePanelID(tabDefinition.panelID);
	if (!panelIDValidation.valid) return { valid: false, message: panelIDValidation.message };

	return { valid: true, value: tabDefinition as TabDefinition };
}