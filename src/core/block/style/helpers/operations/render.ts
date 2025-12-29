// Types
import type { BlockStyles, BlockID } from '@/src/core/block/instance/types';
import type { PageContext } from '@/src/core/layout/page/types';
import type { OperateResult } from '@/src/shared/types/result';
import type { StyleDefinitionRecord } from '@/src/core/block/style/types';

// Helpers
import { cascadeBlockStyles, generateCSSSelector, generateCSSRule } from '@/src/core/block/style/helpers/';

/**
 * Renders CSS rules for all pseudo-classes for a block.
 * @param styles - The block's complete style definition
 * @param blockID - The block's unique identifier for selector generation
 * @param pageContext - The current page state including registered pseudos
 */
function renderBlockStylesAllPseudos(styles: BlockStyles, blockID: BlockID, styleDefinitions: StyleDefinitionRecord, pageContext: PageContext): OperateResult<string> {
	let css = '';

	// Iterate over all registered pseudos
	for (const pseudo of Object.values(pageContext.registry.pseudos)) {
		// Create a new pageContext with the current pseudo
		const pseudoPageState = {
			...pageContext,
			store: {
				...pageContext.store,
				selectedPseudoID: pseudo.id,
			},
		};

		// Render styles for the current pseudo and append to CSS string
		const result = renderBlockStylesSinglePseudo(styles, blockID, styleDefinitions, pseudoPageState);
		if (!result.success) return result;
		css += result.data;
	}

	// Return the combined CSS string for all pseudos
	return { success: true, data: css };
}

/**
 * Renders CSS rule for a single pseudo-class for a block.
 * @param styles - The block's complete style definition
 * @param blockID - The block's unique identifier for selector generation
 * @param pageContext - The current page state including registered pseudos
 */
function renderBlockStylesSinglePseudo(styles: BlockStyles, blockID: BlockID, styleDefinitions: StyleDefinitionRecord, pageContext: PageContext): OperateResult<string> {
	// Cascade styles for the selected pseudo
	const cssStylesRes = cascadeBlockStyles(styles, styleDefinitions, pageContext);
	if (!cssStylesRes.success) return { success: false, error: cssStylesRes.error };

	// Generate the CSS selector for the block and selected pseudo
	const cssSelectorRes = generateCSSSelector(blockID, pageContext.store.selectedPseudoID, pageContext);
	if (!cssSelectorRes.success) return { success: false, error: cssSelectorRes.error };

	// Generate the CSS rule for the selected pseudo
	const cssRuleRes = generateCSSRule(cssSelectorRes.data, cssStylesRes.data);
	if (!cssRuleRes.success) return { success: false, error: cssRuleRes.error };

	// Return the generated CSS rule for the selected pseudo
	return { success: true, data: cssRuleRes.data };
}

/**
 * Renders block styles into a CSS string with proper cascading and selectors.
 * When pseudo is 'all', generates CSS rules for all pseudo-classes.
 * When pseudo is specific, generates preview styles applied to base selector.
 * @param styles - The block's complete style definition
 * @param blockID - The block's unique identifier for selector generation
 * @param pageContext - The current page state including registered pseudos
 */
export function renderBlockStyles(styles: BlockStyles, blockID: BlockID, styleDefinitions: StyleDefinitionRecord, pageContext: PageContext): OperateResult<string> {
	// If pseudo is 'all', render styles for all pseudos
	if (pageContext.store.selectedPseudoID === pageContext.constant.defaultPseudoID) return renderBlockStylesAllPseudos(styles, blockID, styleDefinitions, pageContext);

	// Otherwise, render styles for the selected pseudo only
	return renderBlockStylesSinglePseudo(styles, blockID, styleDefinitions, pageContext);
}
