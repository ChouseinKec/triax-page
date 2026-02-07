// Types
import type { NodeAttributes } from '@/core/block/node/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Managers
import { useSelectedBlockNodeDefinition, useSelectedBlockNodeID } from '@/core/block/node/managers';
import { useBlockAttributeIsEditable, useBlockAttributesAllowed } from '@/core/block/attribute/managers';

/**
 * Retrieves whether the currently selected node's attributes can be edited.
 *
 * This reactive hook returns a boolean indicating if the selected node's attributes
 * are editable, based on its element definition.
 *
 * @returns boolean - True if the selected node's attributes are editable, false otherwise
 * @see {@link useBlockAttributeIsEditable} - The general hook used internally
 */
export function useSelectedBlockAttributeIsEditable(): boolean {
	const selectedNodeID = useSelectedBlockNodeID();

	return useBlockAttributeIsEditable(selectedNodeID);
}

/**
 * Retrieves the default attributes of the currently selected node.
 *
 * This reactive hook accesses the selected node's default attributes, applied
 * when creating new instances of the node.
 *
 * @returns NodeAttributes | undefined - The default attributes of the selected node, or undefined if no selection exists
 * @see {@link useSelectedBlockNodeDefinition} - For getting the selected node's definition
 */
export function useSelectedBlockAttributesDefaults(): Readonly<NodeAttributes> | undefined {
	const selectedNodeDefinition = useSelectedBlockNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.defaultAttributes : undefined;
}

/**
 * Retrieves the allowed attributes for the currently selected node.
 * This reactive hook returns an array of attribute keys that are allowed for the selected node,
 * based on its element definition. This can be used to determine which attributes to show in the UI.
 *
 * @returns Readonly<AttributeKey[]> - An array of allowed attribute keys for the selected node, or an empty array if no selection exists
 * @see {@link useBlockAttributesAllowed} - For getting allowed attributes by node ID
 */
export function useSelectedBlockAttributesAllowed(): Readonly<AttributeKey[]> | undefined {
	const selectedNodeID = useSelectedBlockNodeID();

	return useBlockAttributesAllowed(selectedNodeID);
}
