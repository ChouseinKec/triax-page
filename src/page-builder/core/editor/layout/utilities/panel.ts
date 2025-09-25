// Types
import { PanelPosition, PanelSize, PanelID, PanelTitle, PanelIcon, PanelOrder } from '@/src/page-builder/core/editor/layout/types';

/**
 * Validates if a panel ID is valid
 * @param id - The panel ID to validate
 * @returns true if valid, false otherwise
 */
export function isPanelIDValid(panelID: unknown): panelID is PanelID {
	return typeof panelID === 'string' && panelID.length > 0;
}

/**
 * Validates if a panel title is valid
 * @param title - The panel title to validate
 * @returns true if valid, false otherwise
 */
export function isPanelTitleValid(panelTitle: unknown): panelTitle is PanelTitle {
	return typeof panelTitle === 'string' && panelTitle.length > 0;
}

/**
 * Validates if a panel position is valid
 * @param position - The panel position to validate
 * @returns true if valid, false otherwise
 */
export function isPanelPositionValid(position: unknown): position is PanelPosition {
	return typeof position === 'object' && position !== null && typeof (position as Record<string, unknown>).top === 'string' && typeof (position as Record<string, unknown>).left === 'string';
}

/**
 * Validates if a panel size is valid
 * @param size - The panel size to validate
 * @returns true if valid, false otherwise
 */
export function isPanelSizeValid(size: unknown): size is PanelSize {
	return typeof size === 'object' && size !== null && typeof (size as PanelSize).width === 'string' && typeof (size as PanelSize).height === 'string' && typeof (size as PanelSize).minWidth === 'number' && typeof (size as PanelSize).minHeight === 'number';
}

/**
 * Validates if a number is valid
 * @param value - The number to validate
 * @returns true if valid, false otherwise
 */
export function isPanelOrderValid(value: unknown): value is PanelOrder {
	return typeof value === 'number' && !isNaN(value);
}

/**
 * Validates if a React icon is valid
 * @param icon - The React icon to validate
 * @returns true if valid, false otherwise
 */
export function isPanelIconValid(icon: unknown): icon is PanelIcon {
	return icon !== null && icon !== undefined;
}
