import { GroupProps } from '../group/type';
/**
 * Represents a category of groupable style fields in the layout editor.
 * Used to organize multiple style groups under a single logical category.
 *
 * @param {Group[]} groups - An array of style groups included in this category.
 */
export type CategoryProps = {
    groups: GroupProps[];
};
