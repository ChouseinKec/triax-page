import { LAYOUT_GROUP } from '@/editors/style/layout/components/group/types';
/**
 * Represents a category of grouped style fields in the layout editor.
 * Used to organize multiple style groups under a single logical category.
 * 
 * @param {LAYOUT_GROUP[]} groups - An array of style groups included in this category.
 */
export type LAYOUT_CATEGORY = {
    groups: LAYOUT_GROUP[];
};
