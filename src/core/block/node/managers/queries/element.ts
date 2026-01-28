// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';
import type { NodeKey } from '@/core/block/node/types/definition';

// Helpers
import { pickNodeInstance, pickNodeDefinition } from '@/core/block/node/helpers/pickers';
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { validateNodeKey } from '@/core/block/node/helpers/validators';
import { validateNodeElementKey } from '@/core/block/node/helpers/validators';
import { pickElementDefinition } from '@/core/block/element/helpers';
import { passesAllRules } from '@/core/block/node/helpers/checkers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/states/registry';
import { getRegisteredElements } from '@/core/block/element/states/registry';

/**
 * Determines whether a target node can accept a specific element type as a child.
 * Validates that the source element conforms to the target's content rules and requirements.
 * @param targetNodeID - The ID of the target (parent) node that would contain the child element
 * @param sourceElementKey - The element type/tag key of the source (child) element being checked for compatibility
 * @returns True if the target node can accept the specified source element type, false otherwise
 */
export function canNodeAcceptElement(targetNodeID: NodeID, sourceElementKey: ElementKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeAcceptElement]')
		.validate({
			targetNodeID: validateNodeID(targetNodeID),
			sourceElementKey: validateNodeElementKey(sourceElementKey),
		})
		.pick((data) => ({
			targetNodeInstance: pickNodeInstance(data.targetNodeID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			targetNodeDefinition: pickNodeDefinition(data.targetNodeInstance.definitionKey, getRegisteredNodes()),
			sourceElementDefinition: pickElementDefinition(data.sourceElementKey, getRegisteredElements()),
			targetElementDefinition: pickElementDefinition(data.targetNodeInstance.elementKey, getRegisteredElements()),
		}))
		.check((data) => {
			return {
				passesAllRules: passesAllRules(
					{
						id: 'test',
						parentID: targetNodeID,
						definitionKey: 'test',
						elementKey: data.sourceElementKey,
						childNodeIDs: [],
						styles: {},
						attributes: {},
						data: {},
					}, //
					data.targetNodeInstance,
					data.targetElementDefinition,
					data.sourceElementDefinition,
					blockStore.storedNodes,
					data.targetNodeInstance.childNodeIDs.length,
				),
			};
		})

		.execute();
	if (!results) return false;

	// If all checks passed, the child can be accepted
	return true;
}

/**
 * Determines whether a target node can accept at least one of the available tag variants of a source node.
 * Checks all possible tags that a source node type can render as to find a compatible match.
 * @param targetNodeID - The ID of the target (parent) node that would contain the child
 * @param sourceNodeKey - The node type key of the source (child), which may have multiple possible tags (supportedElementKeys)
 * @returns True if any of the source node's available tags are acceptable by the target, false otherwise
 */
export function doesNodeSupportElement(targetNodeID: NodeID, sourceNodeKey: NodeKey): boolean {
	const results = new ResultPipeline('[BlockQueries → doesNodeSupportElement]')
		.validate({
			targetNodeID: validateNodeID(targetNodeID),
			sourceNodeKey: validateNodeKey(sourceNodeKey),
		})
		.pick((data) => ({
			sourceElementDefinition: pickNodeDefinition(data.sourceNodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// Check if any of the child's available tags can be accepted
	return results.sourceElementDefinition.supportedElementKeys.some((tag) => canNodeAcceptElement(targetNodeID, tag));
}

/**
 * Finds the first compatible tag from a source node's available tag variants that the target node can accept.
 * Iterates through the source node's possible tags and returns the first one that passes target validation rules.
 * @param targetNodeID - The ID of the target (parent) node that would contain the child
 * @param sourceNodeKey - The node type key of the source (child), whose supportedElementKeys will be searched for compatibility
 * @returns The first acceptable element tag key from the source node's supportedElementKeys, or undefined if none are compatible
 */
export function findFirstSupportedElement(targetNodeID: NodeID, sourceNodeKey: NodeKey): ElementKey | undefined {
	const results = new ResultPipeline('[BlockQueries → findFirstSupportedElement]')
		.validate({
			targetNodeID: validateNodeID(targetNodeID),
			sourceNodeKey: validateNodeKey(sourceNodeKey),
		})
		.pick((data) => ({
			sourceElementDefinition: pickNodeDefinition(data.sourceNodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return undefined;

	// Find the first tag that can be accepted
	return results.sourceElementDefinition.supportedElementKeys.find((tag) => canNodeAcceptElement(targetNodeID, tag));
}
