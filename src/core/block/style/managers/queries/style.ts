// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { BlockID } from '@/core/block/instance/types';
import type { StyleKey } from '@/core/block/style/types';

// Helpers
import { pickBlockInstance } from '@/core/block/instance/helpers';
import { cascadeBlockStyle, validateStyleKey, renderBlockStyles, pickBlockStyles, pickStyleDefinition } from '@/core/block/style/helpers';
import { validateBlockID } from '@/core/block/instance/helpers/validators';
import { fetchPageContext } from '@/core/layout/page/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredStyles } from '@/core/block/style/registries';

/**
 * Gets a style key value with CSS cascade fallback logic for block style operations.
 * Resolves the style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to lookup
 * @returns The resolved value or undefined if not found
 */
export function getBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockStyles: pickBlockStyles(data.blockInstance),
			styleDefinition: pickStyleDefinition(data.styleKey, getRegisteredStyles()),
		}))
		.pick(() => ({
			pageContext: fetchPageContext(),
		}))
		.operate((data) => ({
			styleValue: cascadeBlockStyle(
				data.styleKey,
				data.blockStyles, //
				data.styleDefinition,
				data.pageContext
			),
		}))
		.execute();
	if (!results) return undefined;

	// Return the resolved style value
	return results.styleValue;
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * @param blockID - The block identifier
 */
export function getBlockComponentedStyles(blockID: BlockID): string | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const returns = new ResultPipeline('[BlockQueries → getBlockComponentedStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockStyles: pickBlockStyles(data.blockInstance),
		}))
		.pick(() => ({
			pageContext: fetchPageContext(),
		}))
		.operate((data) => ({
			renderedStyles: renderBlockStyles(
				data.blockStyles, //
				blockID,
				getRegisteredStyles(),
				data.pageContext
			),
		}))
		.execute();
	if (!returns) return undefined;

	// Return the rendered styles
	return returns.renderedStyles;
}
