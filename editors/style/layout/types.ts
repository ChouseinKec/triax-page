import { STYLE_LAYOUT_GROUP } from '@/editors/style/layout/components/group/types';

/**
 * Represents a layout section within the style editor.
 * Each layout contains a descriptive label and a list of grouped style fields.
 *
 * @param {string} label - The display name of the layout section.
 * @param {STYLE_LAYOUT_GROUP[]} groups - An array of style groups included in this layout.
 */
export type STYLE_LAYOUT = {
	label: string;
	groups: STYLE_LAYOUT_GROUP[];
};
