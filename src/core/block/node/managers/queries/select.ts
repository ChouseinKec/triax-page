// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';
import type { NodeIcon, NodeComponent, NodeName, NodeDescription, NodeCategory, NodeStyles, NodeAttributes, NodeData, ActionDefinition } from '@/core/block/node/types';

// Helpers
import { pickSelectedNodeID, pickNodeStoreState } from '@/core/block/node/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline';
// Managers
import { getBlockNodeChildNodeIDs, getBlockNodeData, getBlockNodeName, getBlockNodeIcon, getBlockNodeComponent, getBlockNodeElementKeys, getBlockNodeDescription, getBlockNodeCategory, getBlockNodeDefaultData, getBlockNodeActions } from '@/core/block/node/managers/queries/node';
import { getBlockNodeDefinitionActions } from '@/core/block/node/managers/queries/definition';
/**
 * Retrieves the currently selected node ID from the block store.
 *
 * This function queries the node store to determine which block is currently selected
 * in the editor. If no block is explicitly selected, it defaults to returning 'html'
 * (the root HTML element) to ensure a valid selection state.
 *
 * @returns NodeID - The unique identifier of the currently selected node, or 'html' as fallback
 */
export function getSelectedBlockNodeID(): NodeID {
	const validData = new ResultPipeline('[BlockQueries → getSelectedBlockNodeID]')
		.pick(() => ({
			blockStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			selectedNodeID: pickSelectedNodeID(data.blockStoreState),
		}))
		.execute();
	if (!validData) return 'html';

	return validData.selectedNodeID;
}

/**
 * Retrieves the child node IDs of the currently selected node.
 *
 * This function accesses the selected node's child node IDs, representing the nodes
 * directly under it in the hierarchical tree structure.
 *
 * @returns Readonly<NodeID[]> | undefined - A readonly array of child node IDs, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeChildNodeIDs} - The underlying instance query
 */
export function getSelectedBlockNodeChildNodeIDs(): Readonly<NodeID[]> | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeChildNodeIDs(selectedID);
}

/**
 * Retrieves the data of the currently selected node.
 *
 * This function accesses the selected node's data object, which contains custom
 * properties and state specific to the node's implementation.
 *
 * @returns Readonly<NodeData> | undefined - The node's data object, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeData} - The underlying instance query
 */
export function getSelectedBlockNodeData(): Readonly<NodeData> | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeData(selectedID);
}

/**
 * Retrieves the name of the currently selected node.
 *
 * This function gets the human-readable name of the selected node, used for
 * display purposes in the UI and editor interfaces.
 *
 * @returns NodeName | undefined - The name of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeName} - The underlying instance query
 */
export function getSelectedBlockNodeName(): NodeName | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeName(selectedID);
}

/**
 * Retrieves the icon of the currently selected node.
 *
 * This function returns the icon component associated with the selected node,
 * typically used for visual representation in the editor UI.
 *
 * @returns NodeIcon | undefined - The icon component of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeIcon} - The underlying instance query
 */
export function getSelectedBlockNodeIcon(): NodeIcon | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeIcon(selectedID);
}

/**
 * Retrieves the component of the currently selected node.
 *
 * This function returns the React component that renders the selected node,
 * defining how it appears and behaves in the application.
 *
 * @returns NodeComponent | undefined - The React component of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeComponent} - The underlying instance query
 */
export function getSelectedBlockNodeComponent(): NodeComponent | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeComponent(selectedID);
}

/**
 * Retrieves the supported element keys of the currently selected node.
 *
 * This function returns the element keys that the selected node can support,
 * defining the types of HTML elements it can represent.
 *
 * @returns Readonly<ElementKey[]> | undefined - A readonly array of element keys, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeElementKeys} - The underlying instance query
 */
export function getSelectedBlockNodeElementKeys(): Readonly<ElementKey[]> | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeElementKeys(selectedID);
}

/**
 * Retrieves the description of the currently selected node.
 *
 * This function gets the descriptive text for the selected node, providing
 * information about its purpose and functionality.
 *
 * @returns NodeDescription | undefined - The description of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeDescription} - The underlying instance query
 */
export function getSelectedBlockNodeDescription(): NodeDescription | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeDescription(selectedID);
}

/**
 * Retrieves the category of the currently selected node.
 *
 * This function returns the category classification of the selected node,
 * used for organizing and grouping similar node types.
 *
 * @returns NodeCategory | undefined - The category of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeCategory} - The underlying instance query
 */
export function getSelectedBlockNodeCategory(): NodeCategory | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeCategory(selectedID);
}

/**
 * Retrieves the default data of the currently selected node.
 *
 * This function returns the default data object for the selected node,
 * containing initial state and configuration values.
 *
 * @returns Readonly<NodeData> | undefined - The default data of the selected node, or undefined if no selection exists
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeDefaultData} - The underlying instance query
 */
export function getSelectedBlockNodeDefaultData(): Readonly<NodeData> | undefined {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getBlockNodeDefaultData(selectedID);
}

/**
 * Retrieves the actions of the currently selected node.
 *
 * This function returns the available actions for the selected node, combining
 * instance-specific and definition-level actions.
 *
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions for the currently selected node
 * @see {@link getSelectedBlockNodeID} - For getting the selected node's ID
 * @see {@link getBlockNodeActions} - For instance-level actions
 * @see {@link getBlockNodeDefinitionActions} - For definition-level actions
 */
export function getSelectedBlockNodeActions(): Readonly<ActionDefinition[]> {
	const selectedID = getSelectedBlockNodeID();
	if (!selectedID || selectedID === 'html') return [];

	return getBlockNodeActions(selectedID);
}
