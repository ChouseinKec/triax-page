import { ReactElement } from 'react';
import type { GroupProps } from '../group/types';

/** Props for the style editor layout component. */
export type LayoutProps = {
	/** Label to display for the editor */
	label: string | ReactElement;
	/** Title of the style editor */
	title: string;
	/** Groups of styles to display */
	groups: GroupProps[];
};
