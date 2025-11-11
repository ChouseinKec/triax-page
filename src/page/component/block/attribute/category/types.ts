import { GroupProps } from '../group/types';

/**
 * Props for an attribute category component.
 * Represents a collection of attribute groups.
 *
 * Fourth level in hierarchy: BlockAttributes -> Layouts -> Layout -> Category.
 */
export interface CategoryProps {
	/** Groups of attributes in this category */
	groups: GroupProps[];
}
