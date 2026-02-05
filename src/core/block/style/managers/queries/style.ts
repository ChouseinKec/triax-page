// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { StoredNodes } from '@/core/block/node/types/instance';
import type { StyleKey, StyleValue } from '@/core/block/style/types';
import type { DeviceKey, OrientationKey, PseudoKey } from '@/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID, pickNodeStoreState, pickNodeInstance } from '@/core/block/node/helpers';
import { cascadeNodeStyle, pickNodeStyles, pickStyleDefinition, renderNodeStyles } from '@/core/block/style/helpers';

// Managers
import { getPseudoDefinitions, getDefaultOrientationKey, getDefaultPseudoKey, getDefaultDeviceKey } from '@/core/layout/page/managers/queries';
import { getBlockElementIsStyleEditable } from '@/core/block/element/managers/queries/definition';

// Registry
import { getRegisteredStyles } from '@/core/block/style/state/registry';

/**
 * Gets a block's style value with CSS cascade fallback logic.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * This function performs cascading resolution: for pseudo-classes, it first checks pseudo-specific styles,
 * then falls back to base styles. Across devices, it prioritizes current device over default device.
 *
 * @param storedNodes - The current stored nodes
 * @param nodeID - The unique identifier of the block
 * @param styleKey - The CSS style property key to retrieve (e.g., 'backgroundColor', 'width')
 * @param deviceKey - The device context
 * @param orientationKey - The orientation context
 * @param pseudoKey - The pseudo-class context
 * @returns The resolved style value or undefined if not found
 */
export function getBlockStyle(storedNodes: StoredNodes, nodeID: NodeID, styleKey: StyleKey, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): StyleValue | undefined {
	// Use a pipeline to safely pick required data and perform operations
	const results = new ResultPipeline('[BlockQueries → getBlockStyle]')
		.pick(() => ({
			// Retrieve the block instance from the store
			blockInstance: pickNodeInstance(nodeID, storedNodes),
		}))
		.pick((data) => ({
			// Extract styles from the block instance
			NodeStyles: pickNodeStyles(data.blockInstance),
			// Get the style definition for validation and processing
			styleDefinition: pickStyleDefinition(styleKey, getRegisteredStyles()),
		}))
		.operate((data) => ({
			// Resolve the style value using cascading logic
			styleValue: cascadeNodeStyle(styleKey, data.NodeStyles, data.styleDefinition, deviceKey, orientationKey, pseudoKey, getDefaultDeviceKey(), getDefaultOrientationKey(), getDefaultPseudoKey()),
		}))
		.execute();
	if (!results) return undefined;

	// Extract and return the final resolved style value
	return results.styleValue;
}

/**
 * Gets rendered CSS styles for a block.
 * Combines block styles with device, orientation, and pseudo states to generate CSS.
 *
 * This function generates CSS rules for the block, either for all pseudo-classes or a specific one,
 * considering the provided device, orientation, and pseudo contexts.
 *
 * @param storedNodes - The current stored nodes
 * @param nodeID - The unique identifier of the block
 * @param deviceKey - The device context
 * @param orientationKey - The orientation context
 * @param pseudoKey - The pseudo-class context
 * @returns The rendered CSS string or undefined if not found
 */
export function getBlockStylesRendered(storedNodes: StoredNodes, nodeID: NodeID, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): string | undefined {
	// Use pipeline to safely retrieve and process data
	const results = new ResultPipeline('[BlockQueries → getBlockStylesRendered]')
		.pick(() => ({
			// Retrieve the block instance
			blockInstance: pickNodeInstance(nodeID, storedNodes),
		}))
		.pick((data) => ({
			// Extract styles from the block instance
			NodeStyles: pickNodeStyles(data.blockInstance),
		}))
		.operate((data) => ({
			// Render the styles into CSS string
			renderedStyles: renderNodeStyles(data.NodeStyles, nodeID, getRegisteredStyles(), getPseudoDefinitions(), deviceKey, orientationKey, pseudoKey, getDefaultDeviceKey(), getDefaultOrientationKey(), getDefaultPseudoKey()),
		}))
		.execute();
	if (!results) return undefined;

	// Return the rendered CSS string
	return results.renderedStyles;
}

/**
 * Determines if a block's styles can be edited based on its element definition.
 *
 * This function checks the element definition of the given block to see if its styles
 * are editable by users. It delegates to the element's style editability check.
 *
 * @param sourceNodeID - The unique identifier of the block to check
 * @returns boolean - True if the block's styles are editable, false otherwise
 * @see {@link getBlockElementIsStyleEditable} - The underlying element check
 */
export function canBlockStyleBeEdited(sourceNodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → canBlockStyleBeEdited]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return getBlockElementIsStyleEditable(validData.sourceNodeInstance.elementKey);
}
