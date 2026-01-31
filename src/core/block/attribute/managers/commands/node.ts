// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { AttributeKey, AttributeValue } from '@/core/block/attribute/types';
import type { NodeAttributes } from '@/core/block/node/types/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { validateAttributeKey, validateAttributeValue } from '@/core/block/attribute/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

// Clipboard storage for copy/paste operations
let attributesClipboard: NodeAttributes | null = null;

/**
 * Sets the attribute value for a specific block in block attribute operations.
 * Updates the block's attributes with the provided key-value pair after validation.
 *
 * @param nodeID - The block identifier to update
 * @param attributeKey - The attribute key to set
 * @param attributeValue - The new value for the attribute
 */
export function setNodeAttribute(nodeID: NodeID, attributeKey: AttributeKey, attributeValue: AttributeValue): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → setNodeAttribute]')
		.validate({
			nodeID: validateNodeID(nodeID),
			attributeKey: validateAttributeKey(attributeKey),
			attributeValue: validateAttributeValue(attributeValue),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useNodeStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block attributes in the store
	useNodeStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: {
				...results.blockInstance,
				attributes: {
					...results.blockInstance.attributes,
					[results.attributeKey]: results.attributeValue,
				},
			},
		};
		return { storedNodes: updatedNodes };
	});
}

/**
 * Copies the attributes of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance attributes for later pasting.
 *
 * @param nodeID - The blockInstance identifier to copy attributes from
 */
export function copyNodeAttributes(nodeID: NodeID): void {
	// Validate and pick the blockInstance to copy attributes from
	const results = new ResultPipeline('[BlockManager → copyNodeAttributes]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useNodeStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Store the attributes in clipboard
	attributesClipboard = JSON.parse(JSON.stringify(results.blockInstance.attributes));
}

/**
 * Pastes copied attributes to a target blockInstance in blockInstance CRUD operations.
 * Applies the attributes from clipboard to the specified blockInstance.
 *
 * @param nodeID - The blockInstance identifier to paste attributes to
 */
export function pasteNodeAttributes(nodeID: NodeID): void {
	if (!attributesClipboard) return (devLog.error(`[BlockManager → pasteNodeAttributes] No attributes in clipboard`), undefined);

	// Validate and pick the target blockInstance to paste attributes into
	const results = new ResultPipeline('[BlockManager → pasteNodeAttributes]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.nodeID, useNodeStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with attributes from clipboard
	useNodeStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: {
				...results.targetBlock,
				attributes: JSON.parse(JSON.stringify(attributesClipboard)),
			},
		};
		return { storedNodes: updatedNodes };
	});
}
