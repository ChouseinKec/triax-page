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
import { cascadeNodeStyle, pickNodeStyles, renderNodeStyles, pickStyleDefinition } from '@/core/block/style/helpers';
import { validateStyleKey } from '@/core/block/style/helpers';
import { validateDeviceKey, validateOrientationKey, validatePseudoKey } from '@/core/layout/page/helpers';

// Managers
import { getPseudoDefinitions, getDefaultOrientationKey, getDefaultPseudoKey, getDefaultDeviceKey } from '@/core/layout/page/managers/queries';
import { useSelectedOrientationKey, useSelectedDeviceKey, useSelectedPseudoKey } from '@/core/layout/page/managers/';

// Registry
import { getRegisteredStyles } from '@/core/block/style/state/registry';

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * This hook performs cascading resolution: for pseudo-classes, it first checks pseudo-specific styles,
 * then falls back to base styles. Across devices, it prioritizes current device over default device.
 *
 * @param NodeID - The unique identifier of the block
 * @param styleKey - The CSS style property key to retrieve (e.g., 'backgroundColor', 'width')
 */
export function useBlockStyle(NodeID: NodeID, styleKey: StyleKey): string | undefined {
	// Validate input parameters to ensure they are valid before proceeding
	const safeParams = new ResultPipeline('[BlockQueries → useBlockStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
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
		// Use a pipeline to safely pick required data and perform operations
		const results = new ResultPipeline('[BlockQueries → useBlockStyle]')
			.pick(() => ({
				// Retrieve the block instance from the store
				blockInstance: pickNodeInstance(safeParams.NodeID, state.storedNodes),
			}))
			.pick((data) => ({
				// Extract styles from the block instance
				NodeStyles: pickNodeStyles(data.blockInstance),
				// Get the style definition for validation and processing
				styleDefinition: pickStyleDefinition(safeParams.styleKey, getRegisteredStyles()),
			}))
			.operate((data) => ({
				// Resolve the style value using cascading logic
				styleValue: cascadeNodeStyle(
					safeParams.styleKey,
					data.NodeStyles,
					data.styleDefinition,
					selectedDeviceKey,
					selectedOrientationKey,
					selectedPseudoKey,
					getDefaultDeviceKey(),
					getDefaultOrientationKey(),
					getDefaultPseudoKey(),
				),
			}))
			.execute();
		if (!results) return undefined;

		// Extract and return the final resolved style value
		return results.styleValue;
	});
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * This hook generates CSS rules for the block, either for all pseudo-classes or a specific one,
 * considering the provided device, orientation, and pseudo contexts.
 *
 * @param NodeID - The unique identifier of the block
 * @param deviceKey - The device context (e.g., 'default', 'tablet-sm')
 * @param orientationKey - The orientation context (e.g., 'portrait', 'landscape')
 * @param pseudoKey - The pseudo-class context ('all' for all pseudos, or specific like 'hover')
 */
export function useBlockRenderedStyles(NodeID: NodeID, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): string | undefined {
	// Validate input parameters
	const safeParams = new ResultPipeline('[BlockQueries → useBlockRenderedStyles]')
		.validate({
			NodeID: validateNodeID(NodeID),
			deviceKey: validateDeviceKey(deviceKey),
			orientationKey: validateOrientationKey(orientationKey),
			pseudoKey: validatePseudoKey(pseudoKey),
		})
		.execute();
	if (!safeParams) return undefined;

	// Subscribe to block store changes and compute the rendered styles reactively
	return useNodeStore((state) => {
		// Use pipeline to safely retrieve and process data
		const results = new ResultPipeline('[BlockQueries → useBlockRenderedStyles]')
			.pick(() => ({
				// Retrieve the block instance
				blockInstance: pickNodeInstance(safeParams.NodeID, state.storedNodes),
			}))
			.pick((data) => ({
				// Extract styles from the block instance
				NodeStyles: pickNodeStyles(data.blockInstance),
			}))
			.operate((data) => ({
				// Render the styles into CSS string
				renderedStyles: renderNodeStyles(
					data.NodeStyles,
					safeParams.NodeID,
					getRegisteredStyles(),
					getPseudoDefinitions(),
					safeParams.deviceKey,
					safeParams.orientationKey,
					safeParams.pseudoKey,
					getDefaultDeviceKey(),
					getDefaultOrientationKey(),
					getDefaultPseudoKey(),
				),
			}))
			.execute();
		if (!results) return undefined;

		// Return the rendered CSS string
		return results.renderedStyles;
	});
}
