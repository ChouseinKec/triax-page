// Types
import type { NodeStyles } from '@/core/block/node/types';

// Managers
import { useSelectedBlockNodeID, useSelectedBlockNodeDefinition } from '@/core/block/node/managers';
import { useBlockStyleIsEditable } from '@/core/block/style/managers/hooks/style';

/**
 * Retrieves whether the currently selected node's styles can be edited.
 *
 * This reactive hook returns a boolean indicating if the selected node's styles
 * are editable, based on its element definition.
 *
 * @returns boolean - True if the selected node's styles are editable, false otherwise
 * @see {@link useBlockStyleIsEditable} - The general hook used internally
 */
export function useSelectedBlockStyleIsEditable(): boolean {
	const selectedNodeID = useSelectedBlockNodeID();

	return useBlockStyleIsEditable(selectedNodeID);
}

/**
 * Retrieves the default styles of the currently selected node.
 *
 * This reactive hook accesses the selected node's default styles, organized by device,
 * orientation, and pseudo-states for rendering.
 *
 * @returns NodeStyles | undefined - The default styles of the selected node, or undefined if no selection exists
 * @see {@link useSelectedBlockNodeDefinitionKey} - For getting the selected node's selectedNodeDefinition key
 */
export function useSelectedBlockStylesDefaults(): Readonly<NodeStyles> | undefined {
	const selectedNodeDefinition = useSelectedBlockNodeDefinition();
	return selectedNodeDefinition ? selectedNodeDefinition.defaultStyles : undefined;
}
