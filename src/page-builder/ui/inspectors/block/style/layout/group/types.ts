import { PropertyProps } from '../property/types';

/** Props for a style group component. */
export type GroupProps = {
	/** Whether the group should be hidden */
	hidden?: boolean;
	/** Style properties in this group */
	properties: PropertyProps[];
	/** Whether the group can be expanded/collapsed */
	isExpandable?: boolean;
	/** Title for the divider between groups */
	dividerTitle?: string;
	/** Custom styles for the group */
	styles?: React.CSSProperties;
};
