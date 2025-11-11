import { ReactNode } from 'react';

/** Props for a style group component. */
export interface GroupLayoutProps {
	/** Whether the group should be hidden */
	isHidden?: boolean;
	/** Whether the group can be expanded/collapsed */
	isExpandable?: boolean;
	/** Title for the divider between groups */
	dividerTitle?: string;
	/** Custom styles for the group */
	styles?: React.CSSProperties;
	/** Style properties in this group */
	content: () => ReactNode;
}
