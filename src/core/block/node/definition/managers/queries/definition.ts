// Types
import type { NodeKey, NodeAllowedStyles, NodeAllowedAttributes, NodeComponent } from '@/core/block/node/definition/types';
import type { ElementKey } from '@/core/block/element/types';
import type { ReactNode } from 'react';

// Helpers
import { pickNodeDefinition } from '@/core/block/node/definition/helpers';
import { validateNodeKey } from '@/core/block/node/instance/helpers/validators';

// Registry
import { getRegisteredNodes } from '@/core/block/node/definition/registries';

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
 * Gets the allowed styles for a specific block type.
 * @param nodeKey - The block type to get allowed styles for
 */
export function getNodeAllowedStyles(nodeKey: NodeKey): NodeAllowedStyles | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeAllowedStyles]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.NodeDefinition.allowedStyles;
}

/**
 * Gets the allowed attributes for a specific block type.
 * @param nodeKey - The block type to get allowed attributes for
 */
export function getNodeAllowedAttributes(nodeKey: NodeKey): NodeAllowedAttributes | undefined {
	const results = new ResultPipeline('[BlockQueries → getNodeAllowedAttributes]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return;

	return results.NodeDefinition.allowedAttributes;
}
