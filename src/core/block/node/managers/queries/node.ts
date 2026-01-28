// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID, NodeKey, NodeComponent } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';
import type { ReactNode } from 'react';

// Helpers
import { validateNodeKey, validateNodeID, pickNodeDefinition, pickNodeInstance } from '@/core/block/node/helpers';
import { validateElementKey } from '@/core/block/element/helpers/validators';
import { pickElementDefinition } from '@/core/block/element/helpers';

// Registry
import { getRegisteredNodes } from '@/core/block/node/states/registry';
import { getRegisteredElements } from '@/core/block/element/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves the icon component associated with a specific node type from the registry.
 * Used for displaying visual representations of different block types in the UI.
 * @param nodeKey - The unique key identifying the node type whose icon should be retrieved
 * @returns The React node representing the icon, or undefined if the node type is not found or has no icon
 */
export function getNodeIcon(nodeKey: NodeKey): ReactNode | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeIcon]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.NodeDefinition.icon;
}

/**
 * Retrieves the React component used for rendering a specific node type from the registry.
 * This component handles the visual presentation and behavior of blocks in the editor.
 * @param nodeKey - The unique key identifying the node type whose render component should be retrieved
 * @returns The React component function for rendering the node type, or undefined if not found
 */
export function getNodeComponent(nodeKey: NodeKey): NodeComponent | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeComponent]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.NodeDefinition.component;
}

/**
 * Retrieves the list of available HTML element tags that a specific node type can render as.
 * Node types can support multiple HTML elements, and this function returns all valid options.
 * @param nodeKey - The unique key identifying the node type whose available HTML tags should be retrieved
 * @returns An array of element keys representing valid HTML tags, or undefined if the node type is not found
 */
export function getNodeAvailableTags(nodeKey: NodeKey): ElementKey[] | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeAvailableTags]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.nodeDefinition.availableTags;
}

/**
 * Retrieves the list of attributes that are permitted for a specific HTML element type.
 * Used to validate and restrict which attributes can be applied to different HTML elements.
 * @param elementKey - The unique key identifying the HTML element type whose allowed attributes should be retrieved
 * @returns An array of attribute keys representing valid attributes for the element, or undefined if the element is not found
 */
export function getNodeAllowedAttributes(elementKey: ElementKey): AttributeKey[] | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeAllowedAttributes]')
		.validate({
			elementKey: validateElementKey(elementKey),
		})
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.elementKey, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	return results.elementDefinition.allowedAttributes;
}

/**
 * Determines whether a node can contain child elements based on its element definition.
 * Checks if the node's element type permits any child content at all.
 * @param nodeID - The ID of the node to check for child-bearing capability
 * @returns True if the node can have children (allowedChildren is undefined, null, or non-empty), false otherwise
 */
export function canNodeHaveChildren(nodeID: NodeID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveChildren]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.storedNodes),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (results.elementDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return results.elementDefinition.allowedChildren.length > 0;
}
