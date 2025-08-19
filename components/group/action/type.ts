import { ReactElement } from 'react';

export type ActionGroupProps = {
	/** The content to display within the action group */
	children: ReactElement | ReactElement[];

	/** The direction of the action group */
	direction?: 'horizontal' | 'vertical';

	/** Optional class name for additional styling */
	className?: string;
};
