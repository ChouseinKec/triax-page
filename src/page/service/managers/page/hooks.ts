// Stores
import { usePageStore } from '@/src/page/state/stores/page';

// React
import { useMemo } from 'react';

// Types
import type { BarActionInstance, DeviceInstance, DeviceID, PseudoID, PseudoInstance, OrientationID, OrientationInstance } from '@/src/page/core/page/types/';
import type { WorkbenchID } from '@/src/page/core/workbench/types';

// Registry
import { getRegisteredActions } from '@/src/page/state/registries/page';
import { getRegisteredDevice } from '@/src/page/state/registries/page';
import { getRegisteredPseudo } from '@/src/page/state/registries/page';
import { getRegisteredOrientation } from '@/src/page/state/registries/page';

/**
 * Reactive hook to get the currently selected device instance for page queries.
 * Returns the complete device object based on the current selection in the page store.
 *
 * @returns The current device instance or undefined if not found
 *
 * @example
 * const device = useSelectedDevice() // Returns { id: 'mobile', name: 'Mobile', ... }
 */
export function useSelectedDevice(): DeviceInstance | undefined {
	const selectedDeviceID = usePageStore((state) => state.selectedDeviceID);
	return getRegisteredDevice(selectedDeviceID);
}

/**
 * Reactive hook to get the currently selected device ID for page queries.
 * Returns the device identifier from the page store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = useSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function useSelectedDeviceID(): DeviceID {
	return usePageStore((state) => state.selectedDeviceID);
}

/**
 * Reactive hook to get the currently selected orientation instance for page queries.
 * Returns the complete orientation object based on the current selection in the page store.
 *
 * @returns The current orientation instance or undefined if not found
 *
 * @example
 * const orientation = useSelectedOrientation() // Returns { id: 'portrait', name: 'Portrait', ... }
 */
export function useSelectedOrientation(): OrientationInstance | undefined {
	const selectedOrientationID = usePageStore((state) => state.selectedOrientationID);
	return getRegisteredOrientation(selectedOrientationID);
}

/**
 * Reactive hook to get the currently selected orientation ID for page queries.
 * Returns the orientation identifier from the page store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = useSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function useSelectedOrientationID(): OrientationID {
	return usePageStore((state) => state.selectedOrientationID);
}

/**
 * Reactive hook to get the currently selected pseudo instance for page queries.
 * Returns the complete pseudo object based on the current selection in the page store.
 *
 * @returns The current pseudo instance or undefined if not found
 *
 * @example
 * const pseudo = useSelectedPseudo() // Returns { id: 'hover', name: 'Hover', ... }
 */
export function useSelectedPseudo(): PseudoInstance | undefined {
	const selectedPseudoID = usePageStore((state) => state.selectedPseudoID);
	return getRegisteredPseudo(selectedPseudoID);
}

/**
 * Reactive hook to get the currently selected pseudo ID for page queries.
 * Returns the pseudo identifier from the page store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = useSelectedPseudoID() // Returns 'hover' or undefined
 */
export function useSelectedPseudoID(): PseudoID {
	return usePageStore((state) => state.selectedPseudoID);
}

/**
 * Reactive hook to get the currently selected workbench ID for page queries.
 * Returns the workbench identifier from the page store state.
 *
 * @returns The current workbench ID
 *
 * @example
 * const workbenchID = useSelectedWorkbenchID() // Returns 'workbench-123'
 */
export function useSelectedWorkbenchID(): WorkbenchID {
	return usePageStore((state) => state.selectedWorkbenchID);
}

/**
 * Reactive hook to get all page actions for page queries.
 * Returns a reactive array of action instances sorted by order.
 *
 * @returns Reactive array of action instances sorted by order
 *
 * @example
 * const actions = usePageActions() // Returns sorted array of page actions
 */
export function usePageActions(): BarActionInstance[] {
	const actions = Object.values(getRegisteredActions()).sort((a, b) => a.order - b.order);
	return useMemo(() => actions, [actions]);
}
