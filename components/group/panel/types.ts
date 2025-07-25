import { ReactNode } from 'react';

export type Position = {
	top: number;
	left: number;
};

export type Size = {
	width: number;
	height: number;
	minWidth: number;
	minHeight: number;
};


export type Side = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Represents a group of tab items to be rendered together.
 */
export type PanelGroupProps = {
	children: ReactNode[] | ReactNode;
	initialPosition: Position;
	initialSize: Size;
};
