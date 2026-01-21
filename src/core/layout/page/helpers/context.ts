// Types
import type { PageContext } from 'src/core/layout/page/types';
import type { ContextResult } from '@/shared/types/result';

// Stores
import { usePageStore } from '@/state/layout/page';
import { useWorkbenchStore } from '@/core/layout/workbench/state/store';

// Managers
import { useSelectedOrientationKey, useSelectedDeviceKey, useSelectedPseudoKey } from '@/core/layout/page/managers/';
import { getDeviceDefinitions, getOrientationDefinitions, getPseudoDefinitions, getDefaultOrientationKey, getDefaultPseudoKey, getDefaultDeviceKey } from '@/core/layout/page/managers/queries';
import { useSelectedBenchKey } from '@/core/layout/workbench/managers/';

// Registry
import { getRegisteredBenches, getDefaultBenchKey } from '@/core/layout/workbench/state/registry';

/**
 * Fetches the registries and constants for page context.
 */
function getRegistriesAndConstants(): ContextResult<Pick<PageContext, 'registry' | 'constant'>> {
	// Fetch registered devices from the registry
	const registeredDevices = getDeviceDefinitions();
	if (!registeredDevices) return { success: false, error: 'Failed to fetch registered devices.' };

	// Fetch registered orientations from the registry
	const registeredOrientations = getOrientationDefinitions();
	if (!registeredOrientations) return { success: false, error: 'Failed to fetch registered orientations.' };

	// Fetch registered pseudos from the registry
	const registeredPseudos = getPseudoDefinitions();
	if (!registeredPseudos) return { success: false, error: 'Failed to fetch registered pseudos.' };

	// Fetch registered workbenchs from the registry
	const registeredWorkbenchs = getRegisteredBenches();
	if (!registeredWorkbenchs) return { success: false, error: 'Failed to fetch registered workbenchs.' };

	// Fetch default device ID
	const defaultDeviceKey = getDefaultDeviceKey();
	if (!defaultDeviceKey) return { success: false, error: 'Failed to fetch default device ID.' };

	// Fetch default orientation ID
	const defaultOrientationKey = getDefaultOrientationKey();
	if (!defaultOrientationKey) return { success: false, error: 'Failed to fetch default orientation ID.' };

	// Fetch default pseudo ID
	const defaultPseudoKey = getDefaultPseudoKey();
	if (!defaultPseudoKey) return { success: false, error: 'Failed to fetch default pseudo ID.' };
	// Fetch default workbench ID
	const defaultWorkbenchKey = getDefaultBenchKey();
	if (!defaultWorkbenchKey) return { success: false, error: 'Failed to fetch default workbench ID.' };

	return {
		success: true,
		data: {
			registry: {
				devices: registeredDevices,
				orientations: registeredOrientations,
				pseudos: registeredPseudos,
				workbenches: Object.values(registeredWorkbenchs),
			},
			constant: {
				defaultDeviceKey,
				defaultOrientationKey,
				defaultPseudoKey,
				defaultWorkbenchKey,
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
	const pageState = usePageStore.getState().selected;
	if (!pageState) return { success: false, error: 'Failed to fetch selected page state.' };

	// Fetch selected IDs
	const selectedDeviceKey = pageState.deviceKey;
	if (!selectedDeviceKey) return { success: false, error: 'Failed to fetch selected device ID.' };

	// Fetch selected orientation ID
	const selectedOrientationKey = pageState.orientationKey;
	if (!selectedOrientationKey) return { success: false, error: 'Failed to fetch selected orientation ID.' };

	// Fetch selected pseudo ID
	const selectedPseudoKey = pageState.pseudoKey;
	if (!selectedPseudoKey) return { success: false, error: 'Failed to fetch selected pseudo ID.' };

	// Fetch selected workbench ID
	const selectedWorkbenchKey = useWorkbenchStore.getState().selectedKey;
	if (!selectedWorkbenchKey) return { success: false, error: 'Failed to fetch selected workbench ID.' };

	return {
		success: true,
		data: {
			store: {
				selectedDeviceKey,
				selectedOrientationKey,
				selectedPseudoKey,
				selectedWorkbenchKey,
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
	const selectedDeviceKey = useSelectedDeviceKey();
	if (!selectedDeviceKey) return { success: false, error: 'Failed to fetch selected device ID.' };

	// Fetch selected orientation ID reactively
	const selectedOrientationKey = useSelectedOrientationKey();
	if (!selectedOrientationKey) return { success: false, error: 'Failed to fetch selected orientation ID.' };

	// Fetch selected pseudo ID reactively
	const selectedPseudoKey = useSelectedPseudoKey();
	if (!selectedPseudoKey) return { success: false, error: 'Failed to fetch selected pseudo ID.' };

	// Fetch selected workbench ID reactively
	const selectedWorkbenchKey = useSelectedBenchKey();
	if (!selectedWorkbenchKey) return { success: false, error: 'Failed to fetch selected workbench ID.' };

	return {
		success: true,
		data: {
			store: {
				selectedDeviceKey,
				selectedOrientationKey,
				selectedPseudoKey,
				selectedWorkbenchKey,
			},
			...registriesAndConstants.data,
		},
	};
}
