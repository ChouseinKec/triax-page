// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { ActionDefinition, NodeID, NodeKey, NodeData, NodeIcon, NodeComponent, NodeName, NodeDescription, NodeStyles, NodeAttributes, NodeCategory } from '@/core/block/node/types/';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

// Managers
import { getNodeDefinitionActions } from '@/core/block/node/managers';
import { getNodeInstanceDefinitionKey, getNodeInstanceParentID, getNodeInstanceChildNodeIDs, getNodeInstanceData, getNodeInstanceName, getNodeInstanceIcon, getNodeInstanceComponent, getNodeInstanceElementKeys, getNodeInstanceDescription, getNodeInstanceCategory, getNodeInstanceDefaultStyles, getNodeInstanceDefaultAttributes, getNodeInstanceDefaultData, getNodeInstanceActions } from '@/core/block/node/managers/queries/instance';

/**
 * Checks if a specific node is currently selected in the editor.
 *
 * This reactive hook provides real-time updates on whether the specified node is selected,
 * enabling components to highlight or modify behavior based on selection state.
 *
 * @param nodeID - The unique identifier of the node to check for selection status
 * @returns boolean - True if the specified node is currently selected, false otherwise
 */
export function useIsNodeSelected(nodeID: NodeID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useIsNodeSelected]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useNodeStore((state) => state.selectedNodeID === results.nodeID);
}

/**
 * Retrieves the definition key of the currently selected node.
 *
 * This reactive hook accesses the selected node's definition key, which identifies the node type
 * and determines its capabilities, behavior, and available actions.
 *
 * @returns NodeKey | undefined - The definition key identifying the type of the selected node, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedDefinitionKey(): NodeKey | undefined {
	return getNodeInstanceDefinitionKey(useSelectedNodeID());
}

/**
 * Retrieves the element key of the currently selected node.
 *
 * This reactive hook accesses the selected node's element key, which specifies the HTML tag
 * or element type used for rendering the node in the UI.
 *
 * @returns ElementKey | undefined - The element key identifying the HTML tag of the selected node, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedElementKey(): ElementKey | undefined {
	return useNodeStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return undefined;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return undefined;

		// Return the block tag
		return selectedBlock.data.elementKey;
	});
}

/**
 * Retrieves the parent ID of the currently selected node.
 *
 * This reactive hook accesses the selected node's parent ID, indicating its position
 * in the hierarchical node tree structure.
 *
 * @returns NodeID | undefined - The unique identifier of the parent node, or undefined if no selection exists or the selected node is a root node
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedParentID(): NodeID | undefined {
	return getNodeInstanceParentID(useSelectedNodeID());
}

/**
 * Retrieves the ID of the currently selected node in the editor.
 *
 * This reactive hook provides real-time updates on the selected node's ID, allowing components
 * to respond to selection changes. It returns the current selection state from the node store.
 *
 * @returns NodeID - The unique identifier of the currently selected node
 */
export function useSelectedNodeID(): NodeID {
	return useNodeStore((state) => state.selectedNodeID);
}

/**
 * Retrieves the child node IDs of the currently selected node.
 *
 * This reactive hook accesses the selected node's child node IDs, representing the nodes
 * directly under it in the hierarchical tree structure.
 *
 * @returns Readonly<NodeID[]> | undefined - A readonly array of child node IDs, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeChildNodeIDs(): Readonly<NodeID[]> | undefined {
	return getNodeInstanceChildNodeIDs(useSelectedNodeID());
}

/**
 * Retrieves the data of the currently selected node.
 *
 * This reactive hook accesses the selected node's data object, which contains custom properties,
 * content, and configuration used for rendering and processing the node.
 *
 * @returns Readonly<NodeData> | undefined - The node's data object, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeData(): Readonly<NodeData> | undefined {
	return getNodeInstanceData(useSelectedNodeID());
}

/**
 * Retrieves the name of the currently selected node.
 *
 * This reactive hook accesses the selected node's human-readable name, derived from its definition.
 *
 * @returns NodeName | undefined - The name of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeName(): NodeName | undefined {
	return getNodeInstanceName(useSelectedNodeID());
}

/**
 * Retrieves the icon of the currently selected node.
 *
 * This reactive hook accesses the selected node's icon component, used for visual representation
 * in UI elements like menus or toolbars.
 *
 * @returns NodeIcon | undefined - The icon component of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeIcon(): NodeIcon | undefined {
	return getNodeInstanceIcon(useSelectedNodeID());
}

/**
 * Retrieves the component of the currently selected node.
 *
 * This reactive hook accesses the selected node's React component, used for rendering
 * the node's content and handling its interactions in the UI.
 *
 * @returns NodeComponent | undefined - The React component of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeComponent(): NodeComponent | undefined {
	return getNodeInstanceComponent(useSelectedNodeID());
}

/**
 * Retrieves the supported element keys of the currently selected node.
 *
 * This reactive hook accesses the selected node's supported element keys, which define
 * the HTML elements it can contain or interact with.
 *
 * @returns Readonly<ElementKey[]> | undefined - A readonly array of element keys, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeElementKeys(): Readonly<ElementKey[]> | undefined {
	return getNodeInstanceElementKeys(useSelectedNodeID());
}

/**
 * Retrieves the description of the currently selected node.
 *
 * This reactive hook accesses the selected node's description, providing information
 * about its purpose and usage.
 *
 * @returns NodeDescription | undefined - The description of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeDescription(): NodeDescription | undefined {
	return getNodeInstanceDescription(useSelectedNodeID());
}

/**
 * Retrieves the category of the currently selected node.
 *
 * This reactive hook accesses the selected node's category, used for organizing
 * and classifying nodes in the UI.
 *
 * @returns NodeCategory | undefined - The category of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeCategory(): NodeCategory | undefined {
	return getNodeInstanceCategory(useSelectedNodeID());
}

/**
 * Retrieves the default styles of the currently selected node.
 *
 * This reactive hook accesses the selected node's default styles, organized by device,
 * orientation, and pseudo-states for rendering.
 *
 * @returns Readonly<NodeStyles> | undefined - The default styles of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeDefaultStyles(): Readonly<NodeStyles> | undefined {
	return getNodeInstanceDefaultStyles(useSelectedNodeID());
}

/**
 * Retrieves the default attributes of the currently selected node.
 *
 * This reactive hook accesses the selected node's default attributes, applied
 * when creating new instances of the node.
 *
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeDefaultAttributes(): Readonly<NodeAttributes> | undefined {
	return getNodeInstanceDefaultAttributes(useSelectedNodeID());
}

/**
 * Retrieves the default data of the currently selected node.
 *
 * This reactive hook accesses the selected node's default data structure,
 * providing initial state for custom node implementations.
 *
 * @returns Readonly<NodeData> | undefined - The default data of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedNodeDefaultData(): Readonly<NodeData> | undefined {
	return getNodeInstanceDefaultData(useSelectedNodeID());
}

/**
 * Retrieves the actions of the currently selected node.
 *
 * This reactive hook provides the list of actions applicable to the selected node,
 * sorted by their defined order for consistent UI presentation.
 *
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions for the currently selected node
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeActions(): Readonly<ActionDefinition[]> {
	return getNodeInstanceActions(useSelectedNodeID());
}

/**
 * Retrieves action definitions for the currently selected node.
 *
 * This reactive hook provides the list of actions applicable to the selected node's type,
 * sorted by their defined order for consistent UI presentation.
 *
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions for the currently selected node
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's definition key
 */
export function useSelectedActionDefinitions(): Readonly<ActionDefinition[]> {
	const selectedNodeKey = useSelectedDefinitionKey();
	if (!selectedNodeKey) return [];

	return getNodeDefinitionActions(selectedNodeKey);
}
