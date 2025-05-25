// Constants
import { STYLE_PROPERTIES } from '@/editors/style/constants/styles';

/**
 * Represents the full style configuration for a block.
 *
 * Styles are nested by device name, orientation, and pseudo state.
 *
 * @param {string} deviceName - The name of the device (e.g., 'desktop', 'tablet').
 * @param {string} orientationName - The orientation (e.g., 'portrait', 'landscape').
 * @param {string} pseudoName - The pseudo selector (e.g., 'hover', 'active').
 * @param {STYLE_PROPERTIES} key - A style property key (e.g., 'margin', 'color').
 */
export type STYLE = {
	[deviceName: string]: {
		[orientationName: string]: {
			[pseudoName: string]: {
				[key in STYLE_PROPERTIES]?: string;
			};
		};
	};
};

export type BLOCK = {
	id: string;
	styles: STYLE;
};

export interface BLOCK_EDITOR_STORE {
	selectedBlock: string | null;
	blocks: Record<string, BLOCK>;

	getSelected: () => string | null;
	setSelected: (id: string) => void;
	getBlock: (id?: string) => BLOCK | null;

	getBlockStyles: (id?: string) => STYLE | null;
	setBlockStyles: (style: STYLE, id?: string) => void;
	setBlockStyle: (device: string, orientation: string, pseudo: string, property: string, value: string, id: string) => void;
}
