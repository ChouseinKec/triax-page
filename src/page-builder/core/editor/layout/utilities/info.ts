// Types
import { InfoDataInstance, InfoDefinition, InfoID, InfoTitle, InfoPosition, InfoSize, InfoGrid, InfoDataID, InfoDataOrder, InfoDataRender } from '@/src/page-builder/core/editor/layout/types/info';

/**
 * Validates if a value is a valid info identifier.
 * Checks if the value is a non-empty string.
 * @param infoID - The value to validate
 * @returns True if valid InfoID, false otherwise
 * @example
 * isInfoIDValid('block-breadcrumb') → true
 * isInfoIDValid('') → false
 */
export function isInfoIDValid(infoID: unknown): infoID is InfoID {
	return typeof infoID === 'string' && infoID.length > 0;
}

/**
 * Validates if a value is a valid info title.
 * Checks if the value is a non-empty string.
 * @param infoTitle - The value to validate
 * @returns True if valid InfoTitle, false otherwise
 * @example
 * isInfoTitleValid('Block Breadcrumb') → true
 */
export function isInfoTitleValid(infoTitle: unknown): infoTitle is InfoTitle {
	return typeof infoTitle === 'string' && infoTitle.length > 0;
}

/**
 * Validates if a value is a valid info position.
 * Checks if the value is an object with top and left string properties.
 * @param infoPosition - The value to validate
 * @returns True if valid InfoPosition, false otherwise
 * @example
 * isInfoPositionValid({ top: '10px', left: '20px' }) → true
 */
export function isInfoPositionValid(infoPosition: unknown): infoPosition is InfoPosition {
	return (
		typeof infoPosition === 'object' && //
		infoPosition !== null &&
		typeof (infoPosition as { top?: unknown }).top === 'string' &&
		typeof (infoPosition as { left?: unknown }).left === 'string'
	);
}

/**
 * Validates if a value is a valid info size.
 * Checks if the value is an object with width and height string properties.
 * @param infoSize - The value to validate
 * @returns True if valid InfoSize, false otherwise
 * @example
 * isInfoSizeValid({ width: '200px', height: '50px' }) → true
 */
export function isInfoSizeValid(infoSize: unknown): infoSize is InfoSize {
	return (
		typeof infoSize === 'object' && //
		infoSize !== null &&
		typeof (infoSize as { width?: unknown }).width === 'string' &&
		typeof (infoSize as { height?: unknown }).height === 'string'
	);
}

/**
 * Validates if a value is a valid info grid.
 * Checks if the value is an object with columns and rows as positive integers.
 * @param grid - The value to validate
 * @returns True if valid InfoGrid, false otherwise
 * @example
 * isInfoGridValid({ columns: 3, rows: 2 }) → true
 * isInfoGridValid({ columns: 0, rows: 1 }) → false
 */
export function isInfoGridValid(grid: unknown): grid is InfoGrid {
	if (typeof grid !== 'object' || grid === null) return false;

	const gridObj = grid as { columns?: unknown; rows?: unknown };
	
	return (
		typeof gridObj.columns === 'number' &&
		typeof gridObj.rows === 'number' &&
		Number.isInteger(gridObj.columns) &&
		Number.isInteger(gridObj.rows) &&
		gridObj.columns > 0 &&
		gridObj.rows > 0
	);
}

/**
 * Validates if a value is a valid info definition.
 * Checks if the value is an object with required info properties.
 * @param infoDefinition - The value to validate
 * @returns True if valid InfoDefinition, false otherwise
 * @example
 * isInfoDefinitionValid({ id: 'info1', title: 'Status', position: {...}, size: {...}, grid: {...}, workbenchID: 'main' }) → true
 */
export function isInfoDefinitionValid(infoDefinition: unknown): infoDefinition is InfoDefinition {
	return (
		typeof infoDefinition === 'object' && //
		infoDefinition !== null &&
		'id' in infoDefinition &&
		'title' in infoDefinition &&
		'position' in infoDefinition &&
		'size' in infoDefinition &&
		'grid' in infoDefinition &&
		'workbenchID' in infoDefinition
	);
}

/**
 * Validates if a value is a valid info data identifier.
 * Checks if the value is a non-empty string.
 * @param dataID - The value to validate
 * @returns True if valid InfoDataID, false otherwise
 * @example
 * isInfoDataIDValid('breadcrumb-data') → true
 */
export function isInfoDataIDValid(dataID: unknown): dataID is InfoDataID {
	return typeof dataID === 'string' && dataID.length > 0;
}

/**
 * Validates if a value is a valid info data order.
 * Checks if the value is a non-negative integer.
 * @param dataOrder - The value to validate
 * @returns True if valid InfoDataOrder, false otherwise
 * @example
 * isInfoDataOrderValid(5) → true
 * isInfoDataOrderValid(-1) → false
 */
export function isInfoDataOrderValid(dataOrder: unknown): dataOrder is InfoDataOrder {
	return typeof dataOrder === 'number' && Number.isInteger(dataOrder) && dataOrder >= 0;
}

/**
 * Validates if a value is a valid info data render function.
 * Checks if the value is a function.
 * @param dataRender - The value to validate
 * @returns True if valid InfoDataRender, false otherwise
 * @example
 * isInfoDataRenderValid(() => <div />) → true
 */
export function isInfoDataRenderValid(dataRender: unknown): dataRender is InfoDataRender {
	return typeof dataRender === 'function';
}

/**
 * Validates if a value is a valid info data instance.
 * Checks if the value is an object with required data properties.
 * @param dataInstance - The value to validate
 * @returns True if valid InfoDataInstance, false otherwise
 * @example
 * isInfoDataInstanceValid({ id: 'data1', order: 1, render: () => {} }) → true
 */
export function isInfoDataInstanceValid(dataInstance: unknown): dataInstance is InfoDataInstance {
	return (
		typeof dataInstance === 'object' && //
		dataInstance !== null &&
		'id' in dataInstance &&
		'order' in dataInstance &&
		'render' in dataInstance
	);
}
