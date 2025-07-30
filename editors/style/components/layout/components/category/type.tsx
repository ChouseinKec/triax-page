import { LayoutGroup } from '@/editors/style/components/layout/group/types';
/**
 * Represents a category of groupable style fields in the layout editor.
 * Used to organize multiple style groups under a single logical category.
 * 
 * @param {LayoutGroup[]} groups - An array of style groups included in this category.
 */
export type LayoutCategoryProps = {
    groups: LayoutGroup[];
};
