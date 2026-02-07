// Types
import type { StoredNodes, NodeID, NodeStyles } from '@/core/block/node/types';
import type { StyleKey, StyleValue } from '@/core/block/style/types';
import type { DeviceKey, OrientationKey, PseudoKey } from '@/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID, pickNodeStoreState, pickNodeInstance } from '@/core/block/node/helpers';
import { cascadeNodeStyle, pickNodeStyles, pickStyleDefinition, renderNodeStyles } from '@/core/block/style/helpers';
import { validateStyleKey } from '@/core/block/style/helpers';

// Managers
import { getPseudoDefinitions, getDefaultOrientationKey, getDefaultPseudoKey, getDefaultDeviceKey } from '@/core/layout/page/managers/queries';
import { validateDeviceKey, validateOrientationKey, validatePseudoKey } from '@/core/layout/page/helpers';
import { getBlockElementIsStyleEditable } from '@/core/block/element/managers/queries/definition';
import { getBlockNodeDefinitionDefaultStyles } from '@/core/block/node/managers/';

// Registry
import { getRegisteredStyles } from '@/core/block/style/state/registry';

/**
 * Gets a block's style value with CSS cascade fallback logic.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * This function performs cascading resolution: for pseudo-classes, it first checks pseudo-specific styles,
 * then falls back to base styles. Across devices, it prioritizes current device over default device.
 *
 * @param sourceNodeID - The unique identifier of the block
 * @param styleKey - The CSS style property key to retrieve (e.g., 'backgroundColor', 'width')
 * @param deviceKey - The device context
 * @param orientationKey - The orientation context
 * @param pseudoKey - The pseudo-class context
 * @returns The resolved style value or undefined if not found
 */
export function getBlockStyle(sourceNodeID: NodeID, styleKey: StyleKey, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): StyleValue | undefined {
	// Use a pipeline to safely pick required data and perform operations
	const results = new ResultPipeline('[BlockQueries → getBlockStyle]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			styleDefinition: pickStyleDefinition(styleKey, getRegisteredStyles()),
		}))
		.pick((data) => ({
			nodeStyles: pickNodeStyles(data.blockInstance),
		}))
		.operate((data) => ({
			styleValue: cascadeNodeStyle(styleKey, data.nodeStyles, data.styleDefinition, deviceKey, orientationKey, pseudoKey, getDefaultDeviceKey(), getDefaultOrientationKey(), getDefaultPseudoKey()),
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
 * @param sourceNodeID - The unique identifier of the block
 * @param deviceKey - The device context
 * @param orientationKey - The orientation context
 * @param pseudoKey - The pseudo-class context
 * @returns The rendered CSS string or undefined if not found
 */
export function getBlockStylesRendered(sourceNodeID: NodeID, deviceKey: DeviceKey, orientationKey: OrientationKey, pseudoKey: PseudoKey): string | undefined {
	// Use pipeline to safely retrieve and process data
	const results = new ResultPipeline('[BlockQueries → getBlockStylesRendered]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			deviceKey: validateDeviceKey(deviceKey),
			orientationKey: validateOrientationKey(orientationKey),
			pseudoKey: validatePseudoKey(pseudoKey),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick((data) => ({
			NodeStyles: pickNodeStyles(data.blockInstance),
		}))
		.operate((data) => ({
			renderedStyles: renderNodeStyles(data.NodeStyles, data.sourceNodeID, getRegisteredStyles(), getPseudoDefinitions(), data.deviceKey, data.orientationKey, data.pseudoKey, getDefaultDeviceKey(), getDefaultOrientationKey(), getDefaultPseudoKey()),
		}))
		.execute();
	if (!results) return undefined;

	// Return the rendered CSS string
	return results.renderedStyles;
}

/**
 * Retrieves the default styles of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default styles from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeStyles> | undefined - The default styles of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionDefaultStyles} - The underlying definition query
 */
export function getBlockStylesDefaults(sourceNodeID: NodeID): Readonly<NodeStyles> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockStylesDefaults]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionDefaultStyles(validData.blockInstance.definitionKey);
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
