import type { StyleKey } from '@/src/page/core/block/style/types';
import type { PseudoName } from '@/src/page/core/page/types/pseudo';

/**
 * Default styles applied to blocks.
*/
export const BLOCK_STYLE_DEFAULTS: Partial<Record<PseudoName, Partial<Record<StyleKey, string>>>> = {
	all: {
		'padding-top': '10px',
		'padding-bottom': '10px',
		'padding-left': '10px',
		'padding-right': '10px',

		'margin-top': '10px',
		'margin-bottom': '10px',
		// 'margin-left': '10px',
		// 'margin-right': '10px',

		'background-color': 'rgba(111, 155, 191, 0.3)',
		// 'background-color': 'rgba(255, 255, 255, 1)',

		'border-top-style': 'solid',
		'border-bottom-style': 'solid',
		'border-left-style': 'solid',
		'border-right-style': 'solid',

		'border-top-width': '1px',
		'border-bottom-width': '1px',
		'border-left-width': '1px',
		'border-right-width': '1px',

		'border-top-color': '#ffffff',
		'border-bottom-color': '#ffffff',
		'border-left-color': '#ffffff',
		'border-right-color': '#ffffff',

		'font-size': '10px',
	},
};
