// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// React
import { useMemo } from 'react';

// Types
import type { BarActionInstance, DeviceDefinition, DeviceInstance, DeviceID, PseudoID, PseudoInstance, OrientationID, OrientationInstance } from '@/src/page-builder/core/page/types/';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Registry
import { getRegisteredActions, getRegisteredOrientations, getRegisteredOrientation, getRegisteredDevices, getRegisteredDevice, getRegisteredPseudos, getRegisteredPseudo } from '@/src/page-builder/state/registries/page';

// ------------------------- DEVICE -------------------------

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
export function useSelectedDeviceID(): DeviceID | undefined {
	return usePageStore((state) => state.selectedDeviceID);
}

/**
 * Gets the currently selected device ID from the page store for page queries.
 * Returns the device identifier from the current store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = getSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function getSelectedDeviceID(): DeviceID | undefined {
	return usePageStore.getState().selectedDeviceID;
}

/**
 * Gets all available device definitions for page queries.
 * Returns an array of all registered device definitions from the registry.
 *
 * @returns Array of all device definitions
 *
 * @example
 * const devices = getAllDevices() // Returns [{ id: 'all', name: 'All' }, { id: 'mobile', name: 'Mobile' }, ...]
 */
export function getAllDevices(): DeviceDefinition[] {
	return Object.values(getRegisteredDevices());
}

// ------------------------- ORIENTATION -------------------------

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
export function useSelectedOrientationID(): OrientationID | undefined {
	return usePageStore((state) => state.selectedOrientationID);
}

/**
 * Gets the currently selected orientation ID from the page store for page queries.
 * Returns the orientation identifier from the current store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = getSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function getSelectedOrientationID(): OrientationID | undefined {
	const selectedOrientationID = usePageStore.getState().getSelectedOrientationID();
	const orientation = getRegisteredOrientation(selectedOrientationID);
	return orientation?.id;
}

/**
 * Gets all available orientation instances for page queries.
 * Returns an array of all registered orientation definitions from the registry.
 *
 * @returns Array of all orientation instances
 *
 * @example
 * const orientations = getAllOrientations() // Returns [{ id: 'all', name: 'All' }, { id: 'portrait', name: 'Portrait' }, ...]
 */
export function getAllOrientations(): OrientationInstance[] {
	return Object.values(getRegisteredOrientations());
}

// ------------------------- PSEUDO -------------------------

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
export function useSelectedPseudoID(): PseudoID | undefined {
	return usePageStore((state) => state.selectedPseudoID);
}

/**
 * Gets the currently selected pseudo ID from the page store for page queries.
 * Returns the pseudo identifier from the current store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = getSelectedPseudoID() // Returns 'hover' or undefined
 */
export function getSelectedPseudoID(): PseudoID | undefined {
	const selectedPseudoID = usePageStore.getState().getSelectedPseudoID();
	const pseudo = getRegisteredPseudo(selectedPseudoID);
	return pseudo?.id;
}

/**
 * Gets all available pseudo instances for page queries.
 * Returns an array of all registered pseudo definitions from the registry.
 *
 * @returns Array of all pseudo instances
 *
 * @example
 * const pseudos = getAllPseudos() // Returns [{ id: 'all', name: 'All' }, { id: 'hover', name: 'Hover' }, ...]
 */
export function getAllPseudos(): PseudoInstance[] {
	return Object.values(getRegisteredPseudos());
}

// ------------------------- WORKBENCH -------------------------

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

// ------------------------- ACTION -------------------------

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
