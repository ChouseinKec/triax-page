// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { InfoID, InfoInstance, InfoDataInstance, InfoDataID } from '@/src/page-builder/core/editor/layout/types/info';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateWorkbenchID, validateInfoID, validateInfoDataID } from '@/src/page-builder/services/helpers/validate';

/**
 * Gets all info instances filtered by workbench ID for layout management operations.
 * Returns an array of infos associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter infos
 * @returns Array of info instances or undefined if validation fails
 *
 * @example
 * const infos = getInfosByWorkbench('workbench-123') // Returns infos for specific workbench
 */
export function getInfosByWorkbench(workbenchID: WorkbenchID): InfoInstance[] | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutManager → getInfosByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return undefined;

	return Object.values(layoutStore.layoutInfos).filter((info: InfoInstance) => info.workbenchID === safeData.workbenchID);
}

/**
 * Gets an info instance by its unique identifier for layout management operations.
 * Retrieves the complete info object from the layout store.
 *
 * @param infoID - The info identifier
 * @returns The info instance or undefined if not found or validation fails
 *
 * @example
 * const info = getInfoById('info-123') // Returns info instance or undefined
 */
export function getInfoById(infoID: InfoID): InfoInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutManager → getInfoById]')
		.validate({
			infoID: validateInfoID(infoID),
		})
		.execute();
	if (!safeData) return undefined;

	return layoutStore.getInfo(safeData.infoID);
}

/**
 * Registers a new data item instance to an info for layout management operations.
 * Adds the data item to the info's data collection if it doesn't already exist.
 *
 * @param infoID - The info identifier to register the data item for
 * @param dataItem - The data item instance to register
 * @returns void
 *
 * @example
 * registerInfoData('info-123', { id: 'data-456', ... }) // Registers data item to info
 */
export function registerInfoData(infoID: InfoID, dataItem: InfoDataInstance): void {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutManager → registerInfoData]')
		.validate({
			infoID: validateInfoID(infoID),
		})
		.execute();
	if (!safeData) return;

	const info = layoutStore.getInfo(safeData.infoID);
	if (!info) return devLog.error(`[LayoutManager → registerInfoData] Info with ID "${safeData.infoID}" not found.`);
	if (info.data[dataItem.id]) return devLog.warn(`[LayoutManager → registerInfoData] Data item with ID "${dataItem.id}" already exists in info "${infoID}". Skipping.`);

	layoutStore.registerInfoData(infoID, dataItem);
}

/**
 * Unregisters a data item from an info for layout management operations.
 * Removes the specified data item from the info's data collection.
 *
 * @param infoID - The info identifier
 * @param dataID - The data item identifier to unregister
 * @returns void
 *
 * @example
 * unregisterInfoData('info-123', 'data-456') // Removes data item from info
 */
export function unregisterInfoData(infoID: InfoID, dataID: InfoDataID): void {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutManager → unregisterInfoData]')
		.validate({
			infoID: validateInfoID(infoID),
			dataID: validateInfoDataID(dataID),
		})
		.execute();
	if (!safeData) return;

	const info = layoutStore.getInfo(safeData.infoID);
	if (!info) return devLog.warn(`[LayoutManager → unregisterInfoData] Info with ID "${safeData.infoID}" not found.`);
	if (!info.data) return devLog.warn(`[LayoutManager → unregisterInfoData] Data item with ID "${safeData.dataID}" not found in info "${safeData.infoID}". Skipping.`);

	layoutStore.unregisterInfoData(safeData.infoID, safeData.dataID);
}

/**
 * Reactive hook to get all data item instances for a specific info in layout management operations.
 * Returns a memoized array of data items that updates when the info's data changes.
 *
 * @param infoID - The info identifier
 * @returns Reactive array of data item instances or undefined if info not found
 *
 * @example
 * const dataItems = useInfoData('info-123') // Returns reactive array of data items
 */
export function useInfoData(infoID: InfoID): InfoDataInstance[] | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[LayoutManager → useInfoData]')
				.validate({
					infoID: validateInfoID(infoID),
				})
				.execute(),
		[infoID]
	);

	const dataRecord = useLayoutStore((state) => {
		if (!safeData) return undefined;
		return state.getInfo(safeData.infoID)?.data;
	});

	return useMemo(() => {
		if (!safeData || !dataRecord) {
			if (!safeData) return undefined;
			devLog.warn(`[LayoutManager → useInfoData] Data items for info with ID "${safeData.infoID}" not found.`);
			return undefined;
		}
		return Object.values(dataRecord);
	}, [dataRecord, safeData]);
}
