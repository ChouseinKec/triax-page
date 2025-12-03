// Stores
import { useBlockStore } from '@/src/state/block/block';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { devLog } from '@/src/shared/utilities/dev';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/src/core/block/instance/helpers/';
import { validateStyleKey, cascadeBlockStyle, pickBlockStyles, renderBlockStyles, useStyleContext } from '@/src/core/block/style/helpers';
import { usePageContext } from '@/src/core/layout/page/helpers';

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to retrieve
 */
export function useBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	// Validate parameters first
	const safeParams = new ResultPipeline('[BlockQueries → useBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!safeParams) return undefined;

	// Fetch the page context reactively
	const pageContextResult = usePageContext();
	if (!pageContextResult.success) return devLog.error(`[BlockQueries → useBlockStyle] ${pageContextResult.error}`), undefined;

	// Fetch the style context reactively
	const styleContextResult = useStyleContext();
	if (!styleContextResult.success) return devLog.error(`[BlockQueries → useBlockStyle] ${styleContextResult.error}`), undefined;

	// Return a reactive style value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const results = new ResultPipeline('[BlockQueries → useBlockStyle]')
			.pick(() => ({
				blockInstance: pickBlockInstance(safeParams.blockID, state.allBlocks),
			}))
			.pick((data) => ({
				blockStyles: pickBlockStyles(data.blockInstance),
			}))
			.operate((data) => ({
				styleValue: cascadeBlockStyle(
					safeParams.styleKey,
					data.blockStyles, //
					styleContextResult.data,
					pageContextResult.data
				),
			}))
			.execute();
		if (!results) return undefined;

		// Return the resolved style value
		return results.styleValue;
	});
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * @param blockID - The block identifier
 */
export function useBlockRenderedStyles(blockID: BlockID): string | undefined {
	// Validate parameters first
	const safeParams = new ResultPipeline('[BlockQueries → useBlockRenderedStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeParams) return undefined;

	// Fetch the page context reactively
	const pageContextResult = usePageContext();
	if (!pageContextResult.success) return devLog.error(`[BlockQueries → useBlockRenderedStyles] ${pageContextResult.error}`), undefined;

	// Return a reactive style value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const results = new ResultPipeline('[BlockQueries → useBlockRenderedStyles]')
			.pick(() => ({
				blockInstance: pickBlockInstance(safeParams.blockID, state.allBlocks),
			}))
			.pick((data) => ({
				blockStyles: pickBlockStyles(data.blockInstance),
			}))
			.operate((data) => ({
				renderedStyles: renderBlockStyles(
					data.blockStyles, //
					blockID,
					pageContextResult.data
				),
			}))
			.execute();
		if (!results) return undefined;

		// Return the resolved style value
		return results.renderedStyles;
	});
}
