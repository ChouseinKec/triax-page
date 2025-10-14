import { ReactElement, ReactNode } from 'react';

/** Props for the ActionGroup component.*/
export type ActionGroupProps = {
	/** The content to display within the action group */
	children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
	/** The direction of the action group */
	direction?: 'horizontal' | 'vertical';
	/** Optional class name for additional styling */
	className?: string;
};
