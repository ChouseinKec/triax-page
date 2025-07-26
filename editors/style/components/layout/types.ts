import { LayoutGroup } from '@/editors/style/components/group/types';
import { ReactElement } from "react";

/**
 * Represents a layout section within the style editor.
 * Each layout contains a descriptive label and a list of groupable style fields.
 *
 * @param {string} label - The display name of the layout section.
 * @param {LayoutGroup[]} groups - An array of style groups included in this layout.
 */
export type LayoutProps = {
	label: string | ReactElement;
	title: string;
	groups: LayoutGroup[];
};
