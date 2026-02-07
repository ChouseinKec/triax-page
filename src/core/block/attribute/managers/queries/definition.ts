// Types
import type { AttributeDefinition, AttributeKey, AttributeCategory } from '@/core/block/attribute/types';
import type { NodeID } from '@/core/block/node/types';

// Stores
import { useNodeStore } from '@/core/block/node/states/store';
import { attributeRegistryState } from '@/core/block/attribute/states/registry';
import { elementRegistryState } from '@/core/block/element/states/registry';
import { nodeRegistryState } from '@/core/block/node/states/registry';

// Helpers
import { pickAttributeDefinition, pickAttributeDefinitions, validateAttributeKey } from '@/core/block/attribute/helpers/';
import { pickElementDefinitions, pickElementDefinition } from '@/core/block/element/helpers/pickers/definition';
import { pickNodeDefinitions, pickNodeDefinition } from '@/core/block/node/helpers/pickers/definition';
import { validateNodeID, pickNodeStoreState, pickNodeInstance } from '@/core/block/node/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

export function getBlockAttributeDefinitions(attributeCategory?: AttributeCategory): Readonly<AttributeDefinition[]> {
	const validData = new ResultPipeline('[ElementQueries → getBlockElementDefinitions]')
		.pick(() => ({
			attributeDefinitions: pickAttributeDefinitions(attributeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	const definitions = Object.values(validData.attributeDefinitions);
	if (!attributeCategory) return definitions;

	return definitions.filter((def) => def.category === attributeCategory);
}

export function getBlockAttributeDefinition(attributeKey: AttributeKey): AttributeDefinition | undefined {
	const validData = new ResultPipeline('[ElementQueries → getBlockElementDefinition]')
		.validate({
			attributeKey: validateAttributeKey(attributeKey),
		})
		.pick(() => ({
			attributeDefinitions: pickAttributeDefinitions(attributeRegistryState),
		}))

		.pick((data) => ({
			attributeDefinition: pickAttributeDefinition(data.attributeKey, data.attributeDefinitions),
		}))
		.execute();
	if (!validData) return;

	return validData.attributeDefinition;
}

export function getBlockAttributeCompatibleDefinitions(nodeID: NodeID, attributeCategory?: AttributeCategory): Readonly<AttributeDefinition[]> {
	const validData = new ResultPipeline('[BlockQueries → getBlockAttributeCompatibleDefinitions]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.pick(() => ({
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.elementKey, data.elementDefinitions),
		}))
		.pick(() => ({
			attributeDefinitions: pickAttributeDefinitions(attributeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.attributeDefinitions).filter((def) => {
		if (attributeCategory && def.category !== attributeCategory) return false;
		return validData.elementDefinition.allowedAttributes.includes(def.key);
	});
}
