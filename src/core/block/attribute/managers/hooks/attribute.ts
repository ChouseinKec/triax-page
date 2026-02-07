// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Queries
import { getBlockAttributesRendered } from '@/core/block/attribute/managers/queries/attribute';

// React
import { useMemo } from 'react';

/**
 * Reactive hook to get a block's rendered attributes for HTML rendering.
 *
 * This hook subscribes to node store changes and returns the processed attributes
 * ready for spreading into JSX elements or HTML generation.
 *
 * @param nodeID - The unique identifier of the block
 * @returns Record<string, string | boolean> | undefined - The rendered attributes object, or undefined if the block is invalid
 * @see {@link getBlockAttributesRendered} - The underlying query function
 */
export function useBlockAttributesRendered(nodeID: NodeID): Record<string, string | boolean> | undefined {
	// Validate input parameters
	const safeParams = new ResultPipeline('[BlockHooks → useBlockAttributesRendered]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!safeParams) return undefined;

	const node = useNodeStore((state) => {
		const result = pickNodeInstance(safeParams.nodeID, state.storedNodes);
		return result.success ? result.data : null;
	});

	return useMemo(() => {
		if (!node) return undefined;

		// Get the rendered attributes
		const renderedAttributes = getBlockAttributesRendered(safeParams.nodeID);
		if (!renderedAttributes) return undefined;

		return renderedAttributes;
	}, [node]);
}
