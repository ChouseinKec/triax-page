// Types
import type { NodeKey, NodeComponent } from '@/core/block/node/definition/types/definition';
import type { ElementKey } from '@/core/block/element/definition/types';
import type { AttributeKey } from '@/core/block/attribute/definition/types';
import type { ReactNode } from 'react';

// Helpers
import { pickNodeDefinition } from '@/core/block/node/definition/helpers';
import { validateNodeKey } from '@/core/block/node/definition/helpers/validators';
import { validateElementKey } from '@/core/block/element/definition/helpers/validators';

// Registry
import { getRegisteredNodes } from '@/core/block/node/definition/states/registry';
import { getRegisteredElements } from '@/core/block/element/definition/states/registry';
import { pickElementDefinition } from '@/core/block/element/definition/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Get a block type's icon from the registry.
 * @param nodeKey - The block type to get the icon for
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
 * Get a block type's render function from the registry.
 * @param nodeKey - The block type to get the render function for
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
 * Gets the available HTML element availableTags for a specific block type.
 * @param nodeKey - The block type to get availableTags for
 */
export function getNodeAvailableTags(nodeKey: NodeKey): ElementKey[] | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeAvailableTags]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.NodeDefinition.availableTags;
}

/**
 * Gets the allowed attributes for a specific HTML element.
 * @param elementKey - The HTML element tag to get allowed attributes for
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
