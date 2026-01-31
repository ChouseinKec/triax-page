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
import { getNodeInstanceChildNodeIDs, getNodeInstanceData, getNodeInstanceName, getNodeInstanceIcon, getNodeInstanceComponent, getNodeInstanceElementKeys, getNodeInstanceDescription, getNodeInstanceCategory, getNodeInstanceDefaultStyles, getNodeInstanceDefaultAttributes, getNodeInstanceDefaultData, getNodeInstanceActions, getNodeInstanceDefinitionKey } from '@/core/block/node/managers/queries/instance';
import { getNodeDefinitionActions } from '@/core/block/node/managers/queries/definition';
/**
 * Retrieves the currently selected node ID from the block store.
 *
 * This function queries the node store to determine which block is currently selected
 * in the editor. If no block is explicitly selected, it defaults to returning 'html'
 * (the root HTML element) to ensure a valid selection state.
 *
 * @returns NodeID - The unique identifier of the currently selected node, or 'html' as fallback
 */
export function getSelectedNodeID(): NodeID {
	const validData = new ResultPipeline('[BlockQueries → getSelectedNodeID]')
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
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceChildNodeIDs} - The underlying instance query
 */
export function getSelectedNodeChildNodeIDs(): Readonly<NodeID[]> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceChildNodeIDs(selectedID);
}

/**
 * Retrieves the data of the currently selected node.
 *
 * This function accesses the selected node's data object, which contains custom
 * properties and state specific to the node's implementation.
 *
 * @returns Readonly<NodeData> | undefined - The node's data object, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceData} - The underlying instance query
 */
export function getSelectedNodeData(): Readonly<NodeData> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceData(selectedID);
}

/**
 * Retrieves the name of the currently selected node.
 *
 * This function gets the human-readable name of the selected node, used for
 * display purposes in the UI and editor interfaces.
 *
 * @returns NodeName | undefined - The name of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceName} - The underlying instance query
 */
export function getSelectedNodeName(): NodeName | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceName(selectedID);
}

/**
 * Retrieves the icon of the currently selected node.
 *
 * This function returns the icon component associated with the selected node,
 * typically used for visual representation in the editor UI.
 *
 * @returns NodeIcon | undefined - The icon component of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceIcon} - The underlying instance query
 */
export function getSelectedNodeIcon(): NodeIcon | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceIcon(selectedID);
}

/**
 * Retrieves the component of the currently selected node.
 *
 * This function returns the React component that renders the selected node,
 * defining how it appears and behaves in the application.
 *
 * @returns NodeComponent | undefined - The React component of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceComponent} - The underlying instance query
 */
export function getSelectedNodeComponent(): NodeComponent | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceComponent(selectedID);
}

/**
 * Retrieves the supported element keys of the currently selected node.
 *
 * This function returns the element keys that the selected node can support,
 * defining the types of HTML elements it can represent.
 *
 * @returns Readonly<ElementKey[]> | undefined - A readonly array of element keys, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceElementKeys} - The underlying instance query
 */
export function getSelectedNodeElementKeys(): Readonly<ElementKey[]> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceElementKeys(selectedID);
}

/**
 * Retrieves the description of the currently selected node.
 *
 * This function gets the descriptive text for the selected node, providing
 * information about its purpose and functionality.
 *
 * @returns NodeDescription | undefined - The description of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceDescription} - The underlying instance query
 */
export function getSelectedNodeDescription(): NodeDescription | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceDescription(selectedID);
}

/**
 * Retrieves the category of the currently selected node.
 *
 * This function returns the category classification of the selected node,
 * used for organizing and grouping similar node types.
 *
 * @returns NodeCategory | undefined - The category of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceCategory} - The underlying instance query
 */
export function getSelectedNodeCategory(): NodeCategory | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceCategory(selectedID);
}

/**
 * Retrieves the default styles of the currently selected node.
 *
 * This function returns the default CSS styles applied to the selected node,
 * defining its initial visual appearance.
 *
 * @returns Readonly<NodeStyles> | undefined - The default styles of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceDefaultStyles} - The underlying instance query
 */
export function getSelectedNodeDefaultStyles(): Readonly<NodeStyles> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceDefaultStyles(selectedID);
}

/**
 * Retrieves the default attributes of the currently selected node.
 *
 * This function returns the default HTML attributes applied to the selected node,
 * defining its initial properties and behavior.
 *
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceDefaultAttributes} - The underlying instance query
 */
export function getSelectedNodeDefaultAttributes(): Readonly<NodeAttributes> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceDefaultAttributes(selectedID);
}

/**
 * Retrieves the default data of the currently selected node.
 *
 * This function returns the default data object for the selected node,
 * containing initial state and configuration values.
 *
 * @returns Readonly<NodeData> | undefined - The default data of the selected node, or undefined if no selection exists
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceDefaultData} - The underlying instance query
 */
export function getSelectedNodeDefaultData(): Readonly<NodeData> | undefined {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return undefined;

	return getNodeInstanceDefaultData(selectedID);
}

/**
 * Retrieves the actions of the currently selected node.
 *
 * This function returns the available actions for the selected node, combining
 * instance-specific and definition-level actions.
 *
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions for the currently selected node
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceActions} - For instance-level actions
 * @see {@link getNodeDefinitionActions} - For definition-level actions
 */
export function getSelectedNodeActions(): Readonly<ActionDefinition[]> {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return [];

	return getNodeInstanceActions(selectedID);
}

/**
 * Retrieves the action definitions for the currently selected node.
 *
 * This function returns the action definitions from the node's definition,
 * providing the blueprint for available actions.
 *
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions for the currently selected node
 * @see {@link getSelectedNodeID} - For getting the selected node's ID
 * @see {@link getNodeInstanceDefinitionKey} - For getting the definition key
 * @see {@link getNodeDefinitionActions} - The underlying definition query
 */
export function getSelectedActionDefinitions(): Readonly<ActionDefinition[]> {
	const selectedID = getSelectedNodeID();
	if (!selectedID || selectedID === 'html') return [];

	const selectedKey = getNodeInstanceDefinitionKey(selectedID);
	if (!selectedKey) return [];

	return getNodeDefinitionActions(selectedKey);
}
