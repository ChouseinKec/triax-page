// Types
import type { ReactElement } from 'react';
import type { GroupProps } from '../../group/types';

/** Props for a single attributes editor layout  */
export interface LayoutProps {
	/** Label to display for the editor */
	label: string | ReactElement;
	/** Title of the attribute editor */
	title: string;
	/** Groups of attributes to display */
	groups: GroupProps[];
}
