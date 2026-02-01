// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// React
import { useMemo } from 'react';

// Types
import type { NodeDefinition, NodeInstance, ActionDefinition, NodeID, NodeKey, NodeData, NodeIcon, NodeComponent, NodeName, NodeDescription, NodeStyles, NodeAttributes, NodeCategory } from '@/core/block/node/types/';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { pickNodeInstance, pickNodeDefinition, pickActionDefinitions, pickNodeDefinitions } from '@/core/block/node/helpers';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';

// Managers
import { useNodeCompatibleElementKeys, getNodeCompatibleDefinitions } from '@/core/block/node/managers';
import { isNodeStyleEditable, isNodeAttributeEditable, isNodeDeletable, isNodeCopyable, isNodeCloneable, isNodeOrderable } from '@/core/block/node/managers/queries/instance';
import { useNodeIsStyleEditable, useNodeIsAttributeEditable, useNodeIsDeletable, useNodeIsCopyable, useNodeIsCloneable, useNodeIsOrderable } from './node';

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
 * Retrieves the instance of the currently selected node.
 *
 * This reactive hook accesses the selected node's complete instance data,
 * including its properties, and updates reactively when the selected node changes.
 *
 * @returns NodeInstance | undefined - The complete node instance of the selected node, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeInstance(): NodeInstance | undefined {
	return useNodeStore((state) => {
		const selectedNodeID = state.selectedNodeID;

		const selectedNodeInstance = pickNodeInstance(selectedNodeID, state.storedNodes);
		return selectedNodeInstance.success ? selectedNodeInstance.data : undefined;
	});
}

/**
 * Retrieves the selectedNodeDefinition of the currently selected node.
 *
 * This reactive hook accesses the selected node's selectedNodeDefinition, which contains all the metadata
 * and configuration for the node type.
 *
 * @returns NodeDefinition | undefined - The selectedNodeDefinition of the selected node, or undefined if no selection exists or selectedNodeDefinition is not found
 * @see {@link useSelectedNodeInstance} - For getting the selected node's instance
 */
export function useSelectedNodeDefinition(): NodeDefinition | undefined {
	const selectedNodeInstance = useSelectedNodeInstance();
	if (!selectedNodeInstance) return undefined;

	const nodeDefinitions = pickNodeDefinitions(nodeRegistryState);
	if (!nodeDefinitions.success) return undefined;

	const selectedNodeDefinition = pickNodeDefinition(selectedNodeInstance.definitionKey, nodeDefinitions.data);
	return selectedNodeDefinition.success ? selectedNodeDefinition.data : undefined;
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
	const selectedNodeInstance = useSelectedNodeInstance();
	return selectedNodeInstance ? selectedNodeInstance.parentID : undefined;
}

/**
 * Retrieves the selectedNodeDefinition key of the currently selected node.
 *
 * This reactive hook accesses the selected node's selectedNodeDefinition key, which identifies the node type
 * and determines its capabilities, behavior, and available actions.
 *
 * @returns NodeKey | undefined - The selectedNodeDefinition key identifying the type of the selected node, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedDefinitionKey(): NodeKey | undefined {
	const selectedNodeInstance = useSelectedNodeInstance();
	return selectedNodeInstance ? selectedNodeInstance.definitionKey : undefined;
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
	const selectedNodeInstance = useSelectedNodeInstance();
	return selectedNodeInstance ? selectedNodeInstance.elementKey : undefined;
}

/**
 * Retrieves the child node IDs of the currently selected node.
 *
 * This reactive hook accesses the selected node's child node IDs, representing the nodes
 * directly under it in the hierarchical tree structure.
 *
 * @returns NodeID[] | undefined - A readonly array of child node IDs, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeChildNodeIDs(): Readonly<NodeID[]> | undefined {
	const selectedNodeInstance = useSelectedNodeInstance();
	return selectedNodeInstance ? selectedNodeInstance.childNodeIDs : undefined;
}

/**
 * Retrieves the data of the currently selected node.
 *
 * This reactive hook accesses the selected node's data object, which contains custom properties,
 * content, and configuration used for rendering and processing the node.
 *
 * @returns NodeData | undefined - The node's data object, or undefined if no selection exists
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeData(): Readonly<NodeData> | undefined {
	const selectedNodeInstance = useSelectedNodeInstance();
	return selectedNodeInstance ? selectedNodeInstance.data : undefined;
}

/**
 * Retrieves the name of the currently selected node.
 *
 * This reactive hook accesses the selected node's human-readable name, derived from its selectedNodeDefinition.
 *
 * @returns NodeName | undefined - The name of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeName(): NodeName | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.name : undefined;
}

/**
 * Retrieves the icon of the currently selected node.
 *
 * This reactive hook accesses the selected node's icon component, used for visual representation
 * in UI elements like menus or toolbars.
 *
 * @returns NodeIcon | undefined - The icon component of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeIcon(): NodeIcon | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.icon : undefined;
}

/**
 * Retrieves the component of the currently selected node.
 *
 * This reactive hook accesses the selected node's React component, used for rendering
 * the node's content and handling its interactions in the UI.
 *
 * @returns NodeComponent | undefined - The React component of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeComponent(): NodeComponent | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.component : undefined;
}

/**
 * Retrieves the supported element keys of the currently selected node.
 *
 * This reactive hook accesses the selected node's supported element keys, which define
 * the HTML elements it can contain or interact with.
 *
 * @returns ElementKey[] | undefined - A readonly array of element keys, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeElementKeys(): Readonly<ElementKey[]> | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.elementKeys : undefined;
}

/**
 * Retrieves the description of the currently selected node.
 *
 * This reactive hook accesses the selected node's description, providing information
 * about its purpose and usage.
 *
 * @returns NodeDescription | undefined - The description of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeDescription(): NodeDescription | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.description : undefined;
}

/**
 * Retrieves the category of the currently selected node.
 *
 * This reactive hook accesses the selected node's category, used for organizing
 * and classifying nodes in the UI.
 *
 * @returns NodeCategory | undefined - The category of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeCategory(): NodeCategory | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.category : undefined;
}

/**
 * Retrieves the default styles of the currently selected node.
 *
 * This reactive hook accesses the selected node's default styles, organized by device,
 * orientation, and pseudo-states for rendering.
 *
 * @returns NodeStyles | undefined - The default styles of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeDefaultStyles(): Readonly<NodeStyles> | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.defaultStyles : undefined;
}

/**
 * Retrieves the default attributes of the currently selected node.
 *
 * This reactive hook accesses the selected node's default attributes, applied
 * when creating new instances of the node.
 *
 * @returns NodeAttributes | undefined - The default attributes of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeDefaultAttributes(): Readonly<NodeAttributes> | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.defaultAttributes : undefined;
}

/**
 * Retrieves the default data of the currently selected node.
 *
 * This reactive hook accesses the selected node's default data structure,
 * providing initial state for custom node implementations.
 *
 * @returns NodeData | undefined - The default data of the selected node, or undefined if no selection exists
 * @see {@link useSelectedDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedNodeDefaultData(): Readonly<NodeData> | undefined {
	const selectedNodeDefinition = useSelectedNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.defaultData : undefined;
}

/**
 * Retrieves the actions of the currently selected node.
 *
 * This reactive hook provides the list of actions applicable to the selected node,
 * sorted by their defined order for consistent UI presentation.
 *
 * @returns ActionDefinition[] - A readonly array of action definitions for the currently selected node
 * @see {@link useSelectedNodeID} - For getting the selected node's ID
 */
export function useSelectedNodeActions(): Readonly<ActionDefinition[]> {
	const selectedDefinitionKey = useSelectedDefinitionKey();

	return useMemo(() => {
		if (!selectedDefinitionKey) return [];

		const actions = pickActionDefinitions(nodeRegistryState);
		if (!actions.success) return [];

		return Object.values(actions.data)
			.filter((action) => action.nodeKey === selectedDefinitionKey)
			.sort((a, b) => a.order - b.order);
	}, [selectedDefinitionKey]);
}

/**
 * Retrieves the node definitions that the currently selected node can accept as children.
 *
 * This reactive hook returns an array of node definitions that are compatible with the selected node,
 * enabling UI components to present valid options for adding child nodes.
 *
 * @returns NodeDefinition[] - An array of node definitions compatible with the selected node
 * @see {@link getNodeCompatibleDefinitions} - The underlying query function used
 */
export function useSelectedNodeCompatibleDefinitions(): NodeDefinition[] {
	const selectedNodeID = useSelectedNodeID();

	return getNodeCompatibleDefinitions(selectedNodeID);
}

/**
 * Retrieves the element keys that are compatible with the currently selected node.
 *
 * This reactive hook returns an array of element keys that the selected node can accept,
 * useful for UI components that need to display valid element options for the node.
 *
 * @returns ElementKey[] - An array of element keys compatible with the selected node
 * @see {@link useNodeCompatibleElementKeys} - The underlying hook used
 */
export function useSelectedNodeCompatibleElementKeys(): ElementKey[] {
	const selectedNodeID = useSelectedNodeID();

	return useNodeCompatibleElementKeys(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node's styles can be edited.
 *
 * This reactive hook returns a boolean indicating if the selected node's styles
 * are editable, based on its element definition.
 *
 * @returns boolean - True if the selected node's styles are editable, false otherwise
 * @see {@link useNodeIsStyleEditable} - The general hook used internally
 */
export function useSelectedNodeIsStyleEditable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsStyleEditable(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node's attributes can be edited.
 *
 * This reactive hook returns a boolean indicating if the selected node's attributes
 * are editable, based on its element definition.
 *
 * @returns boolean - True if the selected node's attributes are editable, false otherwise
 * @see {@link useNodeIsAttributeEditable} - The general hook used internally
 */
export function useSelectedNodeIsAttributeEditable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsAttributeEditable(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node can be deleted.
 *
 * This reactive hook returns a boolean indicating if the selected node
 * is deletable, based on its element definition.
 *
 * @returns boolean - True if the selected node is deletable, false otherwise
 * @see {@link useNodeIsDeletable} - The general hook used internally
 */
export function useSelectedNodeIsDeletable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsDeletable(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node can be copied.
 *
 * This reactive hook returns a boolean indicating if the selected node
 * is copyable, based on its element definition.
 *
 * @returns boolean - True if the selected node is copyable, false otherwise
 * @see {@link useNodeIsCopyable} - The general hook used internally
 */
export function useSelectedNodeIsCopyable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsCopyable(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node can be cloned.
 *
 * This reactive hook returns a boolean indicating if the selected node
 * is cloneable, based on its element definition.
 *
 * @returns boolean - True if the selected node is cloneable, false otherwise
 * @see {@link useNodeIsCloneable} - The general hook used internally
 */
export function useSelectedNodeIsCloneable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsCloneable(selectedNodeID);
}

/**
 * Retrieves whether the currently selected node can be reordered.
 *
 * This reactive hook returns a boolean indicating if the selected node
 * is orderable, based on its element definition.
 *
 * @returns boolean - True if the selected node is orderable, false otherwise
 * @see {@link useNodeIsOrderable} - The general hook used internally
 */
export function useSelectedNodeIsOrderable(): boolean {
	const selectedNodeID = useSelectedNodeID();

	return useNodeIsOrderable(selectedNodeID);
}
