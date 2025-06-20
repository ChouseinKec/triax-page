import { LayoutGroup } from '@/editors/style/components/group/types';
/**
 * Represents a category of grouped style fields in the layout editor.
 * Used to organize multiple style groups under a single logical category.
 * 
 * @param {LayoutGroup[]} groups - An array of style groups included in this category.
 */
export type LAYOUT_CATEGORY = {
    groups: LayoutGroup[];
};
