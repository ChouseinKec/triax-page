// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { StyleKey } from '@/core/block/style/types';
import type { DeviceKey, OrientationKey, PseudoKey } from '@/core/layout/page/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers/';
import { validateStyleKey } from '@/core/block/style/helpers';
import { validateDeviceKey, validateOrientationKey, validatePseudoKey } from '@/core/layout/page/helpers';

// Managers
import { useSelectedOrientationKey, useSelectedDeviceKey, useSelectedPseudoKey } from '@/core/layout/page/managers/';

// Queries
import { getBlockStyle, getBlockStylesRendered, canBlockStyleBeEdited } from '@/core/block/style/managers/queries/style';

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * This hook performs cascading resolution: for pseudo-classes, it first checks pseudo-specific styles,
 * then falls back to base styles. Across devices, it prioritizes current device over default device.
 *
 * @param nodeID - The unique identifier of the block
 * @param styleKey - The CSS style property key to retrieve (e.g., 'backgroundColor', 'width')
 */
export function useBlockStyle(nodeID: NodeID, styleKey: StyleKey): string | undefined {
	// Validate input parameters to ensure they are valid before proceeding
	const safeParams = new ResultPipeline('[BlockQueries → useBlockStyle]')
		.validate({
			nodeID: validateNodeID(nodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!safeParams) return undefined;

	// Retrieve reactive state for current device, orientation, and pseudo selections
	const selectedDeviceKey = useSelectedDeviceKey();
	const selectedOrientationKey = useSelectedOrientationKey();
	const selectedPseudoKey = useSelectedPseudoKey();

	// Subscribe to block store changes and compute the style value reactively
	return useNodeStore((state) => {
		// Check if node exists first
		const nodeExists = pickNodeInstance(safeParams.nodeID, state.storedNodes).success;
		if (!nodeExists) return undefined;

		return getBlockStyle(state.storedNodes, safeParams.nodeID, safeParams.styleKey, selectedDeviceKey, selectedOrientationKey, selectedPseudoKey);
	});
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * This hook generates CSS rules for the block, either for all pseudo-classes or a specific one,
 * considering the provided device, orientation, and pseudo contexts.
 *
 * @param nodeID - The unique identifier of the block
 * @param deviceKey - The device context (e.g., 'default', 'tablet-sm')
 * @param orientationKey - The orientation context (e.g., 'portrait', 'landscape')
 * @param pseudoKey - The pseudo-class context ('all' for all pseudos, or specific like 'hover')
 */
export function useBlockStylesRendered(nodeID: NodeID, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): string | undefined {
	// Validate input parameters
	const safeParams = new ResultPipeline('[BlockQueries → useBlockStylesRendered]')
		.validate({
			nodeID: validateNodeID(nodeID),
			deviceKey: validateDeviceKey(deviceKey),
			orientationKey: validateOrientationKey(orientationKey),
			pseudoKey: validatePseudoKey(pseudoKey),
		})
		.execute();
	if (!safeParams) return undefined;

	// Subscribe to block store changes and compute the rendered styles reactively
	return useNodeStore((state) => {
		// Check if node exists first
		const nodeExists = pickNodeInstance(safeParams.nodeID, state.storedNodes).success;
		if (!nodeExists) return undefined;

		return getBlockStylesRendered(state.storedNodes, safeParams.nodeID, safeParams.deviceKey, safeParams.orientationKey, safeParams.pseudoKey);
	});
}

/**
 * Checks if a specific block's styles can be edited.
 *
 * This hook determines whether the styles of the given block are editable,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the block to check
 * @returns boolean - True if the block's styles are editable, false otherwise
 * @see {@link canBlockStyleBeEdited} - The underlying query function
 */
export function useBlockStyleIsEditable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockStyleBeEdited(sourceNodeID);
	});
}
