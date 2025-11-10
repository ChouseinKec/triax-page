// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { PanelInstance, BarID, BarActionInstance, InfoID, InfoDataInstance } from '@/src/page-builder/core/editor/layout/types';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBarID, validateInfoID } from '@/src/page-builder/service/helpers/layout/validate';
import { validateWorkbenchID } from '@/src/page-builder/service/helpers/editor/validate';

/**
 * Reactive hook to get all action instances for a specific bar in layout queries.
 * Returns a memoized array of actions that updates when the bar's actions change.
 *
 * @param barID - The bar identifier
 * @returns Reactive array of action instances or undefined if bar not found
 *
 * @example
 * const actions = useBarActions('bar-123') // Returns reactive array of actions
 */
export function useBarActions(barID: BarID): BarActionInstance[] | undefined {
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useBarActions]')
				.validate({
					barID: validateBarID(barID),
				})
				.execute(),
		[barID]
	);
	if (!safeParams) return undefined;

	const barActions = useLayoutStore((state) => {
		const barInstance = state.allBars[safeParams.barID];
		if (!barInstance) return undefined;

		return barInstance.actions;
	});
	if (!barActions) return undefined;

	return Object.values(barActions);
}

/**
 * Reactive hook to get all data item instances for a specific info in layout queries.
 * Returns a memoized array of data items that updates when the info's data changes.
 *
 * @param infoID - The info identifier
 * @returns Reactive array of data item instances or undefined if info not found
 *
 * @example
 * const dataItems = useInfoData('info-123') // Returns reactive array of data items
 */
export function useInfoData(infoID: InfoID): InfoDataInstance[] | undefined {
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useInfoData]')
				.validate({
					infoID: validateInfoID(infoID),
				})
				.execute(),
		[infoID]
	);
	if (!safeParams) return undefined;

	const infoData = useLayoutStore((state) => {
		const infoInstance = state.allInfos[safeParams.infoID];
		if (!infoInstance) return undefined;

		return infoInstance.data;
	});
	if (!infoData) return undefined;

	return Object.values(infoData);
}

/**
 * Reactive hook to get all panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of panel instances or undefined if validation fails
 *
 * @example
 * const panels = usePanelsByWorkbench('workbench-123') // Returns all panels for workbench
 */
export function usePanelsByWorkbench(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → usePanelsByWorkbench]')
				.validate({
					workbenchID: validateWorkbenchID(workbenchID),
				})
				.execute(),
		[workbenchID]
	);
	if (!safeParams) return undefined;

	const allPanels = useLayoutStore((state) => state.allPanels);

	return useMemo(() => {
		return Object.values(allPanels).filter((panel) => panel.workbenchID === safeParams.workbenchID);
	}, [allPanels, safeParams.workbenchID]);
}

/**
 * Reactive hook to get all open panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels that are currently open and associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of open panel instances or undefined if validation fails
 *
 * @example
 * const openPanels = useOpenPanels('workbench-123') // Returns open panels for workbench
 */
export function useOpenPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useOpenPanels]')
				.validate({
					workbenchID: validateWorkbenchID(workbenchID),
				})
				.execute(),
		[workbenchID]
	);
	if (!safeParams) return undefined;

	const panels = useLayoutStore((state) => state.allPanels);

	return useMemo(() => {
		return Object.values(panels).filter((panel: PanelInstance) => panel.isOpen && panel.workbenchID === safeParams.workbenchID);
	}, [panels, safeParams.workbenchID]);
}
