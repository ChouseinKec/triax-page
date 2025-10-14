import { PropertyProps } from '../property/types';

/** Props for an attribute group component. */
export interface GroupProps {
	/** Whether the group should be hidden */
	hidden?: boolean;
	/** Properties/attributes in this group */
	properties: PropertyProps[];
	/** Whether the group can be expanded/collapsed */
	isExpandable?: boolean;
	/** Title for the divider between groups */
	dividerTitle?: string;
	/** Custom styles for the group */
	styles?: React.CSSProperties;
}
