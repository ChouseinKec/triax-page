// Types
import type { PageContext } from 'src/core/layout/page/types';
import type { ContextResult } from '@/src/shared/types/result';

// Stores
import { usePageStore } from '@/src/state/layout/page';

// Managers
import { useSelectedOrientationID, useSelectedDeviceID, useSelectedPseudoID, useSelectedWorkbenchID } from '@/src/core/layout/page/manager/';
import { getDeviceDefinitions, getAllOrientations, getAllPseudos, getDeviceDefaultID, getDefaultOrientationID, getDefaultPseudoID } from '@/src/core/layout/page/manager/queries';
import { getWorkbenchInstances, getWorkbenchDefaultID } from '@/src/core/layout/workbench/manager/queries';

/**
 * Fetches the registries and constants for page context.
 */
function getRegistriesAndConstants(): ContextResult<Pick<PageContext, 'registry' | 'constant'>> {
	// Fetch registered devices from the registry
	const registeredDevices = getDeviceDefinitions();
	if (!registeredDevices) return { success: false, error: 'Failed to fetch registered devices.' };

	// Fetch registered orientations from the registry
	const registeredOrientations = getAllOrientations();
	if (!registeredOrientations) return { success: false, error: 'Failed to fetch registered orientations.' };

	// Fetch registered pseudos from the registry
	const registeredPseudos = getAllPseudos();
	if (!registeredPseudos) return { success: false, error: 'Failed to fetch registered pseudos.' };

	// Fetch registered workbenchs from the registry
	const registeredWorkbenchs = getWorkbenchInstances();
	if (!registeredWorkbenchs) return { success: false, error: 'Failed to fetch registered workbenchs.' };

	// Fetch default device ID
	const defaultDeviceID = getDeviceDefaultID();
	if (!defaultDeviceID) return { success: false, error: 'Failed to fetch default device ID.' };

	// Fetch default orientation ID
	const defaultOrientationID = getDefaultOrientationID();
	if (!defaultOrientationID) return { success: false, error: 'Failed to fetch default orientation ID.' };

	// Fetch default pseudo ID
	const defaultPseudoID = getDefaultPseudoID();
	if (!defaultPseudoID) return { success: false, error: 'Failed to fetch default pseudo ID.' };
	// Fetch default workbench ID
	const defaultWorkbenchID = getWorkbenchDefaultID();
	if (!defaultWorkbenchID) return { success: false, error: 'Failed to fetch default workbench ID.' };

	return {
		success: true,
		data: {
			registry: {
				devices: registeredDevices,
				orientations: registeredOrientations,
				pseudos: registeredPseudos,
				workbenches: registeredWorkbenchs,
			},
			constant: {
				defaultDeviceID,
				defaultOrientationID,
				defaultPseudoID,
				defaultWorkbenchID,
			},
		},
	};
}

/**
 * Fetches the page context containing selected state, registries, and constants.
 */
export function fetchPageContext(): ContextResult<PageContext> {
	// Fetch registries and constants
	const registriesAndConstants = getRegistriesAndConstants();
	if (!registriesAndConstants.success) return registriesAndConstants;

	// Fetch selected state from the store
	const selectedState = usePageStore.getState().selected;
	if (!selectedState) return { success: false, error: 'Failed to fetch selected page state.' };

	// Fetch selected IDs
	const selectedDeviceID = selectedState.deviceID;
	if (!selectedDeviceID) return { success: false, error: 'Failed to fetch selected device ID.' };

	// Fetch selected orientation ID
	const selectedOrientationID = selectedState.orientationID;
	if (!selectedOrientationID) return { success: false, error: 'Failed to fetch selected orientation ID.' };

	// Fetch selected pseudo ID
	const selectedPseudoID = selectedState.pseudoID;
	if (!selectedPseudoID) return { success: false, error: 'Failed to fetch selected pseudo ID.' };

	// Fetch selected workbench ID
	const selectedWorkbenchID = selectedState.workbenchID;
	if (!selectedWorkbenchID) return { success: false, error: 'Failed to fetch selected workbench ID.' };

	return {
		success: true,
		data: {
			store: {
				selectedDeviceID,
				selectedOrientationID,
				selectedPseudoID,
				selectedWorkbenchID,
			},
			...registriesAndConstants.data,
		},
	};
}

/**
 * Reactive hook to get the current page context for block style operations.
 */
export function usePageContext(): ContextResult<PageContext> {
	// Fetch registries and constants
	const registriesAndConstants = getRegistriesAndConstants();
	if (!registriesAndConstants.success) return registriesAndConstants;

	// Fetch selected IDs reactively
	const selectedDeviceID = useSelectedDeviceID();
	if (!selectedDeviceID) return { success: false, error: 'Failed to fetch selected device ID.' };

	// Fetch selected orientation ID reactively
	const selectedOrientationID = useSelectedOrientationID();
	if (!selectedOrientationID) return { success: false, error: 'Failed to fetch selected orientation ID.' };

	// Fetch selected pseudo ID reactively
	const selectedPseudoID = useSelectedPseudoID();
	if (!selectedPseudoID) return { success: false, error: 'Failed to fetch selected pseudo ID.' };

	// Fetch selected workbench ID reactively
	const selectedWorkbenchID = useSelectedWorkbenchID();
	if (!selectedWorkbenchID) return { success: false, error: 'Failed to fetch selected workbench ID.' };

	return {
		success: true,
		data: {
			store: {
				selectedDeviceID,
				selectedOrientationID,
				selectedPseudoID,
				selectedWorkbenchID,
			},
			...registriesAndConstants.data,
		},
	};
}
